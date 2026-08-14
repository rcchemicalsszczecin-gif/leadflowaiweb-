#!/usr/bin/env python3
import json
import shutil
import subprocess
import sys
import time
import urllib.error
import urllib.request

SITE = "http://127.0.0.1:3000"

VIEWPORTS = [
    (360, 800),
    (390, 844),
    (768, 1024),
    (1366, 900),
    (1440, 1000),
    (1920, 1080),
]

REPRESENTATIVE_ROUTES = [
    ("/strony-internetowe/", "ODPOWIEDŹ WPROST"),
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
    wait_driver(base)
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
    else:
        always_match = {
            "browserName": "firefox",
            "moz:firefoxOptions": {"args": ["-headless"]},
        }

    response = http_json(
        "POST",
        base,
        "/session",
        {"capabilities": {"alwaysMatch": always_match}},
        timeout=25,
    )
    value = response.get("value", {})
    session_id = value.get("sessionId") or response.get("sessionId")
    if not session_id:
        raise RuntimeError(f"failed to create {browser} session: {response}")
    return session_id


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


def set_viewport(base, session_id, width, height):
    http_json(
        "POST",
        base,
        f"/session/{session_id}/window/rect",
        {"x": 0, "y": 0, "width": width, "height": height},
    )


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
    if abs(float(state.get("innerWidth", 0)) - width) > 40:
        raise RuntimeError(f"{browser} {path} {width}: viewport mismatch {state}")
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


def run_browser(browser):
    process, base = start_driver(browser)
    session_id = None
    checks = 0
    try:
        session_id = create_session(browser, base)

        for width, height in VIEWPORTS:
            set_viewport(base, session_id, width, height)
            navigate(base, session_id, "/")
            state = inspect_page(base, session_id, "pracują jak produkt")
            validate(browser, "/", width, "pracują jak produkt", state)
            checks += 1
            print(f"BROWSER_MATRIX_V14_CASE browser={browser} route=/ viewport={width}x{height} overflow={state['overflow']} nav=PASS")

        for path, truth in REPRESENTATIVE_ROUTES:
            for width, height in ((390, 844), (1440, 1000)):
                set_viewport(base, session_id, width, height)
                navigate(base, session_id, path)
                state = inspect_page(base, session_id, truth)
                validate(browser, path, width, truth, state)
                checks += 1
                print(f"BROWSER_MATRIX_V14_CASE browser={browser} route={path} viewport={width}x{height} overflow={state['overflow']} nav=PASS")

        return checks
    finally:
        if session_id:
            try:
                http_json("DELETE", base, f"/session/{session_id}", timeout=5)
            except Exception:
                pass
        process.terminate()
        try:
            process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            process.kill()


def main():
    total = 0
    versions = {
        "chrome": shutil.which("google-chrome") or shutil.which("chromium") or shutil.which("chromium-browser"),
        "chromedriver": shutil.which("chromedriver"),
        "firefox": shutil.which("firefox"),
        "geckodriver": shutil.which("geckodriver"),
    }
    print("BROWSER_MATRIX_V14_BINARIES " + " ".join(f"{key}={value or 'MISSING'}" for key, value in versions.items()))
    if not versions["chrome"] or not versions["chromedriver"]:
        raise RuntimeError("Chromium/Chrome WebDriver toolchain missing")
    if not versions["firefox"] or not versions["geckodriver"]:
        raise RuntimeError("Firefox WebDriver toolchain missing")

    for browser in ("chromium", "firefox"):
        total += run_browser(browser)

    expected = (len(VIEWPORTS) + len(REPRESENTATIVE_ROUTES) * 2) * 2
    if total != expected:
        raise RuntimeError(f"matrix coverage mismatch: {total} != {expected}")
    print(f"BROWSER_MATRIX_V14_PASS browsers=2 cases={total} homepage-viewports=6 representative-routes=4x2 overflow=PASS navigation=PASS landmarks=PASS truth=PASS")


if __name__ == "__main__":
    try:
        main()
    except (RuntimeError, urllib.error.URLError, json.JSONDecodeError) as error:
        print(f"BROWSER_MATRIX_V14_FAIL: {error}", file=sys.stderr)
        sys.exit(1)
