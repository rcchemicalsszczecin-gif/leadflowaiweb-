#!/usr/bin/env python3
import json
import shutil
import subprocess
import sys
import time
import urllib.error
import urllib.request

SITE = "http://127.0.0.1:3000"
FIREFOX_MIN_OUTER_WIDTH = 500
FIREFOX_CHROME_HEIGHT = 100

VIEWPORTS = [
    (360, 800),
    (390, 844),
    (768, 1024),
    (1366, 900),
    (1440, 1000),
    (1920, 1080),
]

REPRESENTATIVE_ROUTES = [
    ("/strony-internetowe/", "Tworzenie stron internetowych dla firm ze Szczecina"),
    ("/local-seo/", "SEO lokalne dla firm ze Szczecina"),
    ("/wiedza/", "KLASTRY TEMATYCZNE"),
    ("/kontakt/", "Formularz online jest obecnie wyłączony"),
    ("/lab/", "Działające doświadczenia"),
]


def http_json(method, base, path, payload=None, timeout=15):
    data = None if payload is None else json.dumps(payload).encode("utf-8")
    request = urllib.request.Request(
        f"{base}{path}",
        data=data,
        method=method,
        headers={"Content-Type": "application/json"},
    )
    with urllib.request.urlopen(request, timeout=timeout) as response:
        body = response.read()
    return json.loads(body.decode("utf-8")) if body else {}


def wait_driver(base):
    deadline = time.time() + 12
    while time.time() < deadline:
        try:
            response = http_json("GET", base, "/status", timeout=2)
            value = response.get("value", {})
            if value.get("ready", True):
                return
        except Exception:
            pass
        time.sleep(0.2)
    raise RuntimeError(f"driver did not become ready at {base}")


def stop_driver(process):
    process.terminate()
    try:
        process.wait(timeout=5)
    except subprocess.TimeoutExpired:
        process.kill()
        process.wait(timeout=5)


def start_driver(browser):
    if browser == "chromium":
        binary = shutil.which("chromedriver")
        if not binary:
            raise RuntimeError("chromedriver unavailable")
        port = 9516
        args = [binary, f"--port={port}", "--allowed-ips="]
    else:
        binary = shutil.which("geckodriver")
        if not binary:
            raise RuntimeError("geckodriver unavailable")
        port = 4445
        args = [binary, "--port", str(port)]

    process = subprocess.Popen(args, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    base = f"http://127.0.0.1:{port}"
    try:
        wait_driver(base)
    except Exception:
        stop_driver(process)
        raise
    return process, base


def create_session(browser, base):
    if browser == "chromium":
        always_match = {
            "browserName": "chrome",
            "goog:chromeOptions": {
                "args": [
                    "--headless=new",
                    "--no-sandbox",
                    "--disable-dev-shm-usage",
                    "--disable-background-networking",
                    "--disable-component-update",
                    "--no-first-run",
                    "--no-default-browser-check",
                    "--use-gl=angle",
                    "--use-angle=swiftshader-webgl",
                    "--enable-webgl",
                    "--ignore-gpu-blocklist",
                ]
            },
        }
        session_timeout = 25
    else:
        always_match = {
            "browserName": "firefox",
            "webSocketUrl": True,
            "moz:firefoxOptions": {"args": ["-headless"]},
        }
        session_timeout = 45

    response = http_json(
        "POST",
        base,
        "/session",
        {"capabilities": {"alwaysMatch": always_match}},
        timeout=session_timeout,
    )
    value = response.get("value", {})
    session_id = value.get("sessionId") or response.get("sessionId")
    if not session_id:
        raise RuntimeError(f"failed to create {browser} session: {response}")

    capabilities = value.get("capabilities", {}) if isinstance(value, dict) else {}
    bidi_url = capabilities.get("webSocketUrl") if browser == "firefox" else None
    if browser == "firefox" and not bidi_url:
        raise RuntimeError(f"Firefox session did not expose webSocketUrl: {response}")
    return session_id, bidi_url


def open_browser(browser):
    attempts = 2 if browser == "firefox" else 1
    last_error = None
    for attempt in range(1, attempts + 1):
        process = None
        try:
            process, base = start_driver(browser)
            session_id, bidi_url = create_session(browser, base)
            if attempt > 1:
                print(f"BROWSER_MATRIX_V15_DRIVER_RECOVERED browser={browser} attempt={attempt}")
            return process, base, session_id, bidi_url
        except (RuntimeError, urllib.error.URLError, TimeoutError) as error:
            last_error = error
            if process is not None:
                try:
                    stop_driver(process)
                except Exception:
                    pass
            if attempt < attempts:
                print(
                    f"BROWSER_MATRIX_V15_DRIVER_RETRY browser={browser} attempt={attempt} reason={type(error).__name__}",
                    file=sys.stderr,
                )
                time.sleep(1.0)
    raise RuntimeError(f"failed to start {browser} WebDriver session after {attempts} attempt(s): {last_error}")


def delete_session(base, session_id):
    if not session_id:
        return
    try:
        http_json("DELETE", base, f"/session/{session_id}", timeout=5)
    except Exception:
        pass


def execute(base, session_id, script):
    response = http_json(
        "POST",
        base,
        f"/session/{session_id}/execute/sync",
        {"script": script, "args": []},
    )
    return response.get("value")


def wait_ready(base, session_id):
    deadline = time.time() + 10
    while time.time() < deadline:
        if execute(base, session_id, "return document.readyState") == "complete":
            return
        time.sleep(0.1)
    raise RuntimeError("document did not reach readyState=complete")


def set_firefox_bidi_viewport(bidi_url, width, height):
    try:
        result = subprocess.run(
            [
                "node",
                "scripts/firefox-bidi-viewport-v14.mjs",
                bidi_url,
                str(width),
                str(height),
            ],
            capture_output=True,
            text=True,
            check=True,
            timeout=12,
        )
    except subprocess.CalledProcessError as error:
        detail = (error.stderr or error.stdout or str(error)).strip()
        raise RuntimeError(f"Firefox BiDi viewport failed for {width}x{height}: {detail}") from error
    except subprocess.TimeoutExpired as error:
        raise RuntimeError(f"Firefox BiDi viewport timed out for {width}x{height}") from error

    if "FIREFOX_BIDI_VIEWPORT_PASS" not in result.stdout:
        raise RuntimeError(f"Firefox BiDi viewport returned no PASS marker: {result.stdout.strip()}")


def set_viewport(browser, base, session_id, bidi_url, width, height):
    if browser == "firefox":
        outer_width = max(width, FIREFOX_MIN_OUTER_WIDTH)
        outer_height = max(height + FIREFOX_CHROME_HEIGHT, 600)
    else:
        outer_width = width
        outer_height = height

    http_json(
        "POST",
        base,
        f"/session/{session_id}/window/rect",
        {"x": 0, "y": 0, "width": outer_width, "height": outer_height},
    )

    if browser == "firefox":
        if not bidi_url:
            raise RuntimeError("Firefox BiDi URL missing")
        set_firefox_bidi_viewport(bidi_url, width, height)
        time.sleep(0.08)


def navigate(base, session_id, path):
    http_json(
        "POST",
        base,
        f"/session/{session_id}/url",
        {"url": f"{SITE}{path}"},
        timeout=20,
    )
    wait_ready(base, session_id)
    time.sleep(0.18)


def inspect_page(base, session_id, truth):
    truth_json = json.dumps(truth)
    return execute(
        base,
        session_id,
        "const main=document.getElementById('main-content');"
        "const mobile=document.querySelector('.v14-mobile-nav');"
        "const desktop=document.querySelector('.v14-nav');"
        "const h1=document.querySelector('h1');"
        "const skip=document.querySelector('.v14-skip-link');"
        "const text=document.body.innerText || '';"
        f"const truth={truth_json};"
        "return {"
        "innerWidth:window.innerWidth,innerHeight:window.innerHeight,"
        "overflow:document.documentElement.scrollWidth-window.innerWidth,"
        "main:Boolean(main),mainTabIndex:main?main.getAttribute('tabindex'):null,"
        "mobile:mobile?getComputedStyle(mobile).display:null,"
        "desktop:desktop?getComputedStyle(desktop).display:null,"
        "h1:Boolean(h1&&h1.textContent.trim()),skip:Boolean(skip),"
        "truth:text.includes(truth),"
        "bodyWidth:document.body.getBoundingClientRect().width"
        "};",
    )


def validate(browser, path, width, expected_truth, state):
    if not isinstance(state, dict):
        raise RuntimeError(f"{browser} {path} {width}: invalid state {state}")
    if abs(float(state.get("innerWidth", 0)) - width) > 2:
        raise RuntimeError(f"{browser} {path} {width}: CSS viewport mismatch {state}")
    if float(state.get("overflow", 999)) > 2:
        raise RuntimeError(f"{browser} {path} {width}: horizontal overflow {state}")
    if not state.get("main") or not state.get("skip") or not state.get("h1"):
        raise RuntimeError(f"{browser} {path} {width}: landmark/skip/h1 missing {state}")
    if not state.get("truth"):
        raise RuntimeError(f"{browser} {path} {width}: truth marker missing: {expected_truth}")
    if width <= 980:
        if state.get("mobile") == "none":
            raise RuntimeError(f"{browser} {path} {width}: mobile navigation hidden {state}")
        if state.get("desktop") != "none":
            raise RuntimeError(f"{browser} {path} {width}: desktop navigation still visible {state}")
    else:
        if state.get("mobile") != "none":
            raise RuntimeError(f"{browser} {path} {width}: mobile navigation visible on desktop {state}")
        if state.get("desktop") == "none":
            raise RuntimeError(f"{browser} {path} {width}: desktop navigation hidden {state}")


def run_case(browser, base, session_id, bidi_url, path, width, height, truth):
    set_viewport(browser, base, session_id, bidi_url, width, height)
    navigate(base, session_id, path)
    state = inspect_page(base, session_id, truth)
    validate(browser, path, width, truth, state)
    print(
        f"BROWSER_MATRIX_V15_CASE browser={browser} route={path} target={width}x{height} actual={state['innerWidth']}x{state['innerHeight']} overflow={state['overflow']} nav=PASS"
    )
    return 1


def run_browser(browser):
    process, base, session_id, bidi_url = open_browser(browser)
    checks = 0
    try:
        for width, height in VIEWPORTS:
            checks += run_case(browser, base, session_id, bidi_url, "/", width, height, "pracują jak produkt")
        for path, truth in REPRESENTATIVE_ROUTES:
            for width, height in ((390, 844), (1440, 1000)):
                checks += run_case(browser, base, session_id, bidi_url, path, width, height, truth)
        return checks
    finally:
        delete_session(base, session_id)
        stop_driver(process)


def main():
    total = 0
    versions = {
        "chrome": shutil.which("google-chrome") or shutil.which("chromium") or shutil.which("chromium-browser"),
        "chromedriver": shutil.which("chromedriver"),
        "firefox": shutil.which("firefox"),
        "geckodriver": shutil.which("geckodriver"),
    }
    print("BROWSER_MATRIX_V15_BINARIES " + " ".join(f"{key}={value or 'MISSING'}" for key, value in versions.items()))
    if not versions["chrome"] or not versions["chromedriver"]:
        raise RuntimeError("Chromium/Chrome WebDriver toolchain missing")
    if not versions["firefox"] or not versions["geckodriver"]:
        raise RuntimeError("Firefox WebDriver toolchain missing")

    for browser in ("chromium", "firefox"):
        total += run_browser(browser)

    expected = (len(VIEWPORTS) + len(REPRESENTATIVE_ROUTES) * 2) * 2
    if total != expected:
        raise RuntimeError(f"matrix coverage mismatch: {total} != {expected}")
    print(
        f"BROWSER_MATRIX_V15_PASS browsers=2 cases={total} homepage-viewports=6 representative-routes=5x2 overflow=PASS navigation=PASS landmarks=PASS truth=PASS firefox-mobile=BIDI_TRUE_CSS_VIEWPORT session-retry=BOUNDED"
    )


if __name__ == "__main__":
    try:
        main()
    except (RuntimeError, urllib.error.URLError, json.JSONDecodeError, TimeoutError) as error:
        print(f"BROWSER_MATRIX_V15_FAIL: {error}", file=sys.stderr)
        sys.exit(1)
