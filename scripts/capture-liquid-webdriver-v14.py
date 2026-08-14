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

HOST = "http://127.0.0.1:9515"
SITE = "http://127.0.0.1:3000/"
PREVIEW = Path("preview")


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


def capture(name: str, width: int, height: int, query: str):
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
            {"url": f"{SITE}?qa={query}#liquid"},
            timeout=20,
        )
        wait_ready(session_id)

        execute(
            session_id,
            "const section=document.getElementById('liquid');"
            "const stage=document.querySelector('.v14-liquid-stage');"
            "if(!section || !stage) throw new Error('missing Liquid QA target');"
            "stage.scrollIntoView({block:'center', inline:'nearest'}); return true;",
        )
        time.sleep(0.45)

        state = execute(
            session_id,
            "const section=document.getElementById('liquid');"
            "const stage=document.querySelector('.v14-liquid-stage');"
            "const surface=document.querySelector('.v14-liquid-surface');"
            "const canvas=document.querySelector('.v14-liquid-surface-canvas');"
            "const rect=stage ? stage.getBoundingClientRect() : null;"
            "const visible=rect ? Math.max(0, Math.min(rect.bottom, window.innerHeight)-Math.max(rect.top,0)) : 0;"
            "const basis=rect ? Math.max(1, Math.min(rect.height, window.innerHeight)) : 1;"
            "let gl=false; try { gl=Boolean(canvas && canvas.getContext('webgl2')); } catch(e) {}"
            "return {"
            "sectionPresent:Boolean(section), stagePresent:Boolean(stage),"
            "top:rect?rect.top:null,bottom:rect?rect.bottom:null,height:rect?rect.height:null,"
            "visible:visible,visibleRatio:visible/basis,"
            "fallback:surface?(surface.dataset.renderFallback||''):'missing-surface',"
            "webgl2:gl,innerWidth:window.innerWidth,innerHeight:window.innerHeight,"
            "overflow:document.documentElement.scrollWidth-window.innerWidth"
            "};",
        )
        if not isinstance(state, dict):
            raise RuntimeError(f"invalid Liquid state: {state}")
        if not state.get("sectionPresent") or not state.get("stagePresent"):
            raise RuntimeError(f"Liquid scene target missing: {state}")
        if float(state.get("visibleRatio", 0)) < 0.55 or float(state.get("visible", 0)) < 420:
            raise RuntimeError(f"Liquid stage is not sufficiently visible: {state}")
        if state.get("fallback"):
            raise RuntimeError(f"Liquid active render fell back: {state}")
        if not state.get("webgl2"):
            raise RuntimeError(f"Liquid active WebGL2 context missing: {state}")
        if float(state.get("overflow", 999)) > 2:
            raise RuntimeError(f"horizontal overflow detected: {state}")

        screenshot = request("GET", f"/session/{session_id}/screenshot", timeout=20).get("value")
        if not screenshot:
            raise RuntimeError("WebDriver returned an empty screenshot")
        output = PREVIEW / f"{name}.png"
        output.write_bytes(base64.b64decode(screenshot))
        if output.stat().st_size < 10000:
            raise RuntimeError(f"Liquid screenshot unexpectedly small: {output.stat().st_size}")
        return state
    finally:
        try:
            request("DELETE", f"/session/{session_id}", timeout=5)
        except Exception:
            pass


def main():
    PREVIEW.mkdir(parents=True, exist_ok=True)
    driver = shutil.which("chromedriver")
    if not driver:
        raise RuntimeError("chromedriver is unavailable on the GitHub runner")

    process = subprocess.Popen(
        [driver, "--port=9515", "--allowed-ips="],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    try:
        wait_for_driver()
        evidence = {
            "desktop": capture("v14-desktop-liquid-active", 1440, 1350, "desktop-liquid"),
            "mobile": capture("v14-mobile-liquid-active", 390, 1600, "mobile-liquid"),
        }
        (PREVIEW / "liquid-webdriver-status.json").write_text(
            json.dumps(evidence, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        print("V14_LIQUID_WEBDRIVER_PASS desktop=WEBGL2 mobile=WEBGL2 stage-visible=PASS overflow=PASS")
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
        print(f"V14_LIQUID_WEBDRIVER_FAIL: {error}", file=sys.stderr)
        sys.exit(1)
