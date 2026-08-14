#!/usr/bin/env python3
import base64
import json
import shutil
import subprocess
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

HOST = "http://127.0.0.1:9516"
SITE = "http://127.0.0.1:3000"
OUTPUT = Path("route-preview")

ROUTES = (
    ("service-desktop", "/strony-internetowe/", 1440, 1600),
    ("service-mobile", "/strony-internetowe/", 390, 1200),
    ("local-seo-desktop", "/local-seo/", 1440, 1600),
    ("local-seo-mobile", "/local-seo/", 390, 1200),
    ("aeo-desktop", "/aeo/", 1440, 1600),
    ("aeo-mobile", "/aeo/", 390, 1200),
    ("geo-ai-search-desktop", "/geo-ai-search/", 1440, 1600),
    ("geo-ai-search-mobile", "/geo-ai-search/", 390, 1200),
    ("seo-aeo-geo-desktop", "/seo-aeo-geo/", 1440, 1600),
    ("seo-aeo-geo-mobile", "/seo-aeo-geo/", 390, 1200),
    ("ai-search-article-desktop", "/wiedza/ai-search-google-co-robic-2026/", 1440, 1600),
    ("ai-search-article-mobile", "/wiedza/ai-search-google-co-robic-2026/", 390, 1200),
    ("knowledge-desktop", "/wiedza/", 1440, 1600),
    ("knowledge-mobile", "/wiedza/", 390, 1200),
    ("contact-desktop", "/kontakt/", 1440, 1400),
    ("contact-mobile", "/kontakt/", 390, 1100),
    ("lab-desktop", "/lab/", 1440, 1400),
    ("lab-mobile", "/lab/", 390, 1100),
)


def request(method: str, path: str, payload=None, timeout=15):
    data = None if payload is None else json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        f"{HOST}{path}",
        data=data,
        method=method,
        headers={"Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=timeout) as response:
        body = response.read()
    return json.loads(body.decode("utf-8")) if body else {}


def wait_for_driver():
    deadline = time.time() + 12
    while time.time() < deadline:
        try:
            status = request("GET", "/status", timeout=2)
            if status.get("value", {}).get("ready") is not False:
                return
        except Exception:
            pass
        time.sleep(0.2)
    raise RuntimeError("chromedriver did not become ready")


def create_session():
    response = request(
        "POST",
        "/session",
        {
            "capabilities": {
                "alwaysMatch": {
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
                            "--hide-scrollbars",
                            "--use-gl=angle",
                            "--use-angle=swiftshader-webgl",
                            "--enable-webgl",
                            "--ignore-gpu-blocklist",
                        ]
                    },
                }
            }
        },
        timeout=20,
    )
    value = response.get("value", {})
    session_id = value.get("sessionId") or response.get("sessionId")
    if not session_id:
        raise RuntimeError(f"failed to create Chrome session: {response}")
    return session_id


def execute(session_id: str, script: str):
    response = request(
        "POST",
        f"/session/{session_id}/execute/sync",
        {"script": script, "args": []},
    )
    return response.get("value")


def wait_ready(session_id: str):
    deadline = time.time() + 10
    while time.time() < deadline:
        if execute(session_id, "return document.readyState") == "complete":
            return
        time.sleep(0.1)
    raise RuntimeError("document did not reach readyState=complete")


def measure(session_id: str):
    return execute(
        session_id,
        "const root=document.querySelector('.v14-global-tech-liquid');"
        "const canvas=root?root.querySelector('canvas'):null;"
        "let gl=false; try { gl=Boolean(canvas&&canvas.getContext('webgl2')); } catch(e) {}"
        "const main=document.getElementById('main-content');"
        "return {"
        "globalPresent:Boolean(root),mainPresent:Boolean(main),"
        "fallback:root?(root.dataset.renderFallback||''):'missing-global-field',"
        "renderMode:root?(root.dataset.renderMode||''):'',webgl2:gl,"
        "overflow:document.documentElement.scrollWidth-window.innerWidth,"
        "innerWidth:window.innerWidth,innerHeight:window.innerHeight,"
        "bodyBackground:getComputedStyle(document.body).backgroundColor"
        "};",
    )


def capture(name: str, path: str, width: int, height: int):
    session_id = create_session()
    try:
        request(
            "POST",
            f"/session/{session_id}/window/rect",
            {"x": 0, "y": 0, "width": width, "height": height},
        )
        request(
            "POST",
            f"/session/{session_id}/url",
            {"url": f"{SITE}{path}?qa=global-liquid-route"},
            timeout=20,
        )
        wait_ready(session_id)
        time.sleep(0.75)
        state = measure(session_id)
        if not isinstance(state, dict):
            raise RuntimeError(f"invalid route state for {name}: {state}")
        if not state.get("globalPresent") or not state.get("mainPresent"):
            raise RuntimeError(f"global field/main missing for {name}: {state}")
        if state.get("fallback"):
            raise RuntimeError(f"global field fallback on {name}: {state}")
        if not state.get("webgl2"):
            raise RuntimeError(f"WebGL2 missing on {name}: {state}")
        if float(state.get("overflow", 999)) > 2:
            raise RuntimeError(f"horizontal overflow on {name}: {state}")

        screenshot = request("GET", f"/session/{session_id}/screenshot", timeout=20).get("value")
        if not screenshot:
            raise RuntimeError(f"empty screenshot for {name}")
        output = OUTPUT / f"{name}.png"
        output.write_bytes(base64.b64decode(screenshot))
        if output.stat().st_size < 10000:
            raise RuntimeError(f"screenshot unexpectedly small for {name}: {output.stat().st_size}")
        return state
    finally:
        try:
            request("DELETE", f"/session/{session_id}", timeout=5)
        except Exception:
            pass


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    driver = shutil.which("chromedriver")
    if not driver:
        raise RuntimeError("chromedriver is unavailable on the GitHub runner")

    process = subprocess.Popen(
        [driver, "--port=9516", "--allowed-ips="],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    try:
        wait_for_driver()
        evidence = {}
        for name, path, width, height in ROUTES:
            evidence[name] = capture(name, path, width, height)
        (OUTPUT / "route-webdriver-status.json").write_text(
            json.dumps(evidence, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        print("V15_ROUTE_WEBDRIVER_PASS routes=9 viewports=2 captures=18 global-liquid=WEBGL2 overflow=PASS")
    finally:
        process.terminate()
        try:
            process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            process.kill()


if __name__ == "__main__":
    try:
        main()
    except (RuntimeError, urllib.error.URLError, json.JSONDecodeError) as error:
        print(f"V15_ROUTE_WEBDRIVER_FAIL: {error}", file=sys.stderr)
        sys.exit(1)
