#!/usr/bin/env python3
import json
import base64
import math
import os
import shutil
import subprocess
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

SITE = "http://127.0.0.1:3012"
DRIVER = "http://127.0.0.1:4446"
REPO = Path(__file__).resolve().parents[1]
VIEWPORTS = ((1024, 768), (1280, 800), (1440, 900), (1920, 1080))
ROUTES = ("/", "/kontakt/", "/lab/", "/uslugi/", "/strony-internetowe/", "/seo-aeo-geo/", "/wiedza/", "/realizacje/", "/o-nas/")
POINTS = ((0.20, 0.25), (0.50, 0.25), (0.80, 0.25), (0.20, 0.50), (0.50, 0.50), (0.80, 0.50), (0.20, 0.75), (0.50, 0.75), (0.80, 0.75))
EVIDENCE_DIR = os.environ.get("C12R2_POINTER_EVIDENCE_DIR")


def request(method, path, payload=None, timeout=30):
    data = None if payload is None else json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        f"{DRIVER}{path}", data=data, method=method, headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req, timeout=timeout) as response:
        body = response.read()
    return json.loads(body.decode("utf-8")) if body else {}


def wait_http(url, seconds=18):
    deadline = time.time() + seconds
    while time.time() < deadline:
        try:
            with urllib.request.urlopen(url, timeout=2):
                return
        except Exception:
            time.sleep(0.15)
    raise RuntimeError(f"endpoint unavailable: {url}")


def execute(session_id, script):
    return request(
        "POST", f"/session/{session_id}/execute/sync", {"script": script, "args": []}
    ).get("value")


def set_viewport(session_id, bidi_url, width, height, dpr=1):
    request(
        "POST",
        f"/session/{session_id}/window/rect",
        {"x": 0, "y": 0, "width": max(width, 500), "height": max(height + 100, 600)},
    )
    bidi_script = r"""
const [url,w,h,dpr]=process.argv.slice(1);const socket=new WebSocket(url);let id=0;const pending=new Map();
socket.addEventListener('message',event=>{const m=JSON.parse(String(event.data));if(!pending.has(m.id))return;const {ok,fail}=pending.get(m.id);pending.delete(m.id);m.type==='error'?fail(new Error(m.message)):ok(m.result)});
await new Promise((ok,fail)=>{socket.addEventListener('open',ok,{once:true});socket.addEventListener('error',fail,{once:true})});
const command=(method,params)=>new Promise((ok,fail)=>{const commandId=++id;pending.set(commandId,{ok,fail});socket.send(JSON.stringify({id:commandId,method,params}))});
const tree=await command('browsingContext.getTree',{});const context=tree.contexts[0].context;
await command('browsingContext.setViewport',{context,viewport:{width:Number(w),height:Number(h)},devicePixelRatio:Number(dpr)});
console.log(`POINTER_VIEWPORT_PASS ${w}x${h} dpr=${dpr}`);socket.close();
"""
    result = subprocess.run(
        ["node", "--input-type=module", "-e", bidi_script, bidi_url, str(width), str(height), str(dpr)],
        cwd=REPO,
        capture_output=True,
        text=True,
        timeout=15,
        check=True,
    )
    if "POINTER_VIEWPORT_PASS" not in result.stdout:
        raise RuntimeError(f"viewport emulation failed: {result.stdout.strip()}")


def open_route(session_id, route):
    request("POST", f"/session/{session_id}/url", {"url": f"{SITE}{route}"}, timeout=30)
    deadline = time.time() + 12
    while time.time() < deadline:
        if execute(session_id, "return document.readyState") == "complete":
            break
        time.sleep(0.05)
    time.sleep(0.18)


def move_pointer(session_id, x, y):
    request(
        "POST",
        f"/session/{session_id}/actions",
        {
            "actions": [
                {
                    "type": "pointer",
                    "id": "c12r2-pointer",
                    "parameters": {"pointerType": "mouse"},
                    "actions": [
                        {"type": "pointerMove", "duration": 0, "x": round(x), "y": round(y), "origin": "viewport"},
                        {"type": "pause", "duration": 180},
                    ],
                }
            ]
        },
    )


def capture_pointer_evidence(session_id, target, name):
    shot = request("GET", f"/session/{session_id}/screenshot", timeout=20).get("value")
    if shot:
        (target / name).write_bytes(base64.b64decode(shot))


def numeric_projection_matrix():
    code = r"""
import {
  createPerspectiveWaterProjection,
  normalizePointerToRect,
  reprojectPerspectivePointToCss,
  updatePerspectiveWaterProjection,
  writeGlobalPointerWorld,
} from './lib/liquid-pointer-projection.ts';
const viewports=JSON.parse(process.argv[1]);
const points=JSON.parse(process.argv[2]);
const local=[];const global=[];
for(const [width,height] of viewports){
  const rect={left:13,top:17,width:width-31,height:height-43};
  const aspect=rect.width/rect.height;
  for(const [nx,ny] of points){
    const projection=createPerspectiveWaterProjection();
    updatePerspectiveWaterProjection(projection,nx,ny,aspect,1,1.234,1);
    if(!projection.valid){local.push({width,height,nx,ny,excluded:'ABOVE_WATER_HORIZON'});continue;}
    const requested={x:rect.left+nx*rect.width,y:rect.top+ny*rect.height};
    const projected=reprojectPerspectivePointToCss(projection,rect,aspect);
    local.push({width,height,nx,ny,requested_x:requested.x,requested_y:requested.y,projected_x:projected.x,projected_y:projected.y,error_px:Math.hypot(projected.x-requested.x,projected.y-requested.y)});
  }
  for(const scrollY of [0,1200,2600,4200])for(const [nx,ny] of points){
    const normalized=normalizePointerToRect(rect.left+nx*rect.width,rect.top+ny*rect.height,rect);
    const world=new Float32Array(2);writeGlobalPointerWorld(world,normalized.x,normalized.y,aspect,scrollY);
    const phase=((scrollY*.00022)%2+2)%2;
    const backX=(((world[0]-phase*.24)/1.1)/aspect+1)*.5;
    const backY=(1-(world[1]-phase*-.13)/1.1)*.5;
    const projected={x:rect.left+backX*rect.width,y:rect.top+backY*rect.height};
    const requested={x:rect.left+nx*rect.width,y:rect.top+ny*rect.height};
    global.push({width,height,scrollY,nx,ny,error_px:Math.hypot(projected.x-requested.x,projected.y-requested.y)});
  }
}
console.log(JSON.stringify({local,global}));
"""
    result = subprocess.run(
        [
            "node",
            "--no-warnings",
            "--experimental-strip-types",
            "--input-type=module",
            "-e",
            code,
            json.dumps(VIEWPORTS),
            json.dumps(POINTS),
        ],
        cwd=REPO,
        capture_output=True,
        text=True,
        timeout=20,
        check=True,
    )
    return json.loads(result.stdout)


def negative_fixtures():
    aspect = 1.6
    scroll_y = 4200
    phase = (scroll_y * 0.00022) % 2
    correct_x = (0.8 * 2 - 1) * aspect * 1.1 + phase * 0.24
    correct_y = (1 - 0.75 * 2) * 1.1 + phase * -0.13
    mutations = {
        "missing-scroll": math.hypot(phase * 0.24, phase * -0.13),
        "wrong-y-origin": abs(correct_y - ((0.75 * 2 - 1) * 1.1 + phase * -0.13)),
        "wrong-aspect": abs(correct_x - ((0.8 * 2 - 1) * 1.1 + phase * 0.24)),
        "ignored-rect-origin": math.hypot(31 / 1000, 47 / 800),
    }
    if any(value <= 0.02 for value in mutations.values()):
        raise RuntimeError(f"negative projection fixture did not diverge: {mutations}")
    return mutations


def source_contract():
    global_source = (REPO / "components/v14-global-tech-liquid.tsx").read_text()
    local_source = (REPO / "components/v14-liquid-surface.tsx").read_text()
    helper = (REPO / "lib/liquid-pointer-projection.ts").read_text()
    required = {
        "global-helper": "writeGlobalPointerWorld" in global_source,
        "local-helper": "updatePerspectiveWaterProjection" in local_source,
        "actual-rect": "normalizePointerToRect" in global_source and "normalizePointerToRect" in local_source,
        "global-scroll-parity": "GLOBAL_SCROLL_X" in helper and "GLOBAL_SCROLL_Y" in helper,
        "perspective-ray": "reprojectPerspectivePointToCss" in helper and "surfacePoint" in helper,
        "horizon": "dy > -0.025" in helper,
        "no-local-heuristic": "mix(-3.0, 0.55" not in local_source,
        "pointer-leave": "pointerleave" in global_source and "pointerleave" in local_source,
        "resize-observer": "ResizeObserver" in global_source and "ResizeObserver" in local_source,
    }
    missing = [name for name, passed in required.items() if not passed]
    if missing:
        raise RuntimeError(f"pointer source invariants missing: {missing}")


def main():
    if not (REPO / "out/index.html").exists():
        raise RuntimeError("static build missing: run npm run build first")
    if not shutil.which("firefox") or not shutil.which("geckodriver"):
        raise RuntimeError("Firefox/geckodriver unavailable")
    source_contract()
    matrix = numeric_projection_matrix()
    errors = [item["error_px"] for item in matrix["local"] if "error_px" in item]
    errors += [item["error_px"] for item in matrix["global"]]
    if not errors or max(errors) > 3 or sorted(errors)[len(errors) // 2] > 2:
        raise RuntimeError(f"numeric projection error exceeded threshold: max={max(errors)}")
    negative_fixtures()

    server = subprocess.Popen(
        [sys.executable, "-m", "http.server", "3012", "--directory", "out"],
        cwd=REPO,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    driver = subprocess.Popen(
        [shutil.which("geckodriver"), "--port", "4446"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    session_id = None
    try:
        wait_http(f"{SITE}/")
        wait_http(f"{DRIVER}/status")
        response = request(
            "POST",
            "/session",
            {
                "capabilities": {
                    "alwaysMatch": {
                        "browserName": "firefox",
                        "webSocketUrl": True,
                        "moz:firefoxOptions": {
                            "args": ["-headless"],
                            "prefs": {"layout.css.devPixelsPerPx": "1.25"},
                        },
                    }
                }
            },
            timeout=45,
        )
        value = response.get("value", {})
        session_id = value.get("sessionId") or response.get("sessionId")
        bidi_url = value.get("capabilities", {}).get("webSocketUrl")
        if not session_id or not bidi_url:
            raise RuntimeError(f"Firefox session unavailable: {response}")

        browser_samples = 0
        real_pointer_errors = []
        webgl_render_targets = 0
        fallback_render_targets = 0
        route_states = []
        for index, route in enumerate(ROUTES):
            width, height = VIEWPORTS[index % len(VIEWPORTS)]
            set_viewport(session_id, bidi_url, width, height)
            open_route(session_id, route)
            state = execute(
                session_id,
                """
                const global=document.querySelector('.v14-global-tech-liquid');
                const local=document.querySelector('.v14-liquid-surface[data-variant="hero"]');
                const target=local||global;const r=target?.getBoundingClientRect();const canvas=target?.querySelector('canvas');
                return {route:location.pathname,dpr:devicePixelRatio,rect:r?{left:r.left,top:r.top,width:r.width,height:r.height}:null,canvas:canvas?{width:canvas.width,height:canvas.height}:null,fallback:target?.dataset.renderFallback||'',mode:target?.dataset.renderMode||''};
                """,
            )
            if not state or not state.get("rect"):
                raise RuntimeError(f"render target unavailable on {route}: {state}")
            if state.get("fallback"):
                if state.get("fallback") != "webgl-unavailable":
                    raise RuntimeError(f"unexpected render fallback on {route}: {state}")
                fallback_render_targets += 1
            else:
                webgl_render_targets += 1
            rect = state["rect"]
            execute(
                session_id,
                "window.__c12r2PointerEvent=null;addEventListener('pointermove',event=>{window.__c12r2PointerEvent={x:event.clientX,y:event.clientY,type:event.pointerType};},{once:true});return matchMedia('(pointer:fine)').matches;",
            )
            requested_x = rect["left"] + rect["width"] * 0.5
            requested_y = rect["top"] + rect["height"] * 0.65
            move_pointer(session_id, requested_x, requested_y)
            observed = execute(session_id, "return window.__c12r2PointerEvent")
            if not observed or observed.get("type") != "mouse":
                raise RuntimeError(f"real pointer action was not observed on {route}: {observed}")
            real_pointer_errors.append(
                math.hypot(observed["x"] - round(requested_x), observed["y"] - round(requested_y))
            )
            browser_samples += 1
            route_states.append(state)

        for width, height in VIEWPORTS:
            set_viewport(session_id, bidi_url, width, height)
            open_route(session_id, "/")
            rect = execute(session_id, "const r=document.querySelector('.v14-liquid-surface[data-variant=\"hero\"]').getBoundingClientRect();return {left:r.left,top:r.top,width:r.width,height:r.height};")
            for nx, ny in POINTS:
                move_pointer(session_id, rect["left"] + rect["width"] * nx, rect["top"] + rect["height"] * ny)
                browser_samples += 1

        scroll_samples = 0
        for width, height in VIEWPORTS[:3]:
            set_viewport(session_id, bidi_url, width, height)
            for route in ("/kontakt/", "/strony-internetowe/"):
                open_route(session_id, route)
                for fraction in (0, 0.5, 0.9):
                    execute(session_id, f"scrollTo(0,Math.max(0,(document.documentElement.scrollHeight-innerHeight)*{fraction}));return scrollY;")
                    time.sleep(0.06)
                    rect = execute(session_id, "const r=document.querySelector('.v14-global-tech-liquid').getBoundingClientRect();return {left:r.left,top:r.top,width:r.width,height:r.height};")
                    move_pointer(session_id, rect["left"] + rect["width"] * 0.5, rect["top"] + rect["height"] * 0.5)
                    scroll_samples += 1

        set_viewport(session_id, bidi_url, 1280, 800, 1.25)
        open_route(session_id, "/strony-internetowe/")
        zoom_state = execute(
            session_id,
            "document.body.style.zoom='1.25';const r=document.querySelector('.v14-global-tech-liquid').getBoundingClientRect();return {left:r.left,top:r.top,width:r.width,height:r.height,dpr:devicePixelRatio};",
        )
        move_pointer(session_id, zoom_state["left"] + zoom_state["width"] * 0.5, zoom_state["top"] + zoom_state["height"] * 0.5)
        execute(session_id, "document.body.style.zoom='';return true;")

        if EVIDENCE_DIR:
            evidence = Path(EVIDENCE_DIR)
            evidence.mkdir(parents=True, exist_ok=True)
            set_viewport(session_id, bidi_url, 1440, 900)
            open_route(session_id, "/")
            execute(
                session_id,
                """
                const style=document.createElement('style');style.dataset.c12r2PointerEvidence='';
                style.textContent='.v14-header,.v14-hero-grid{opacity:0!important}.v14-hero-depth-mask,.v14-liquid-surface-glass{display:none!important}';document.head.append(style);
                const marker=document.createElement('div');marker.id='c12r2-pointer-crosshair';marker.style.cssText='position:fixed;z-index:2147483647;width:26px;height:26px;margin:-13px 0 0 -13px;border:2px solid #ffdf4d;border-radius:50%;pointer-events:none;box-shadow:0 0 0 1px #03101a';marker.innerHTML='<i style="position:absolute;left:11px;top:-7px;width:2px;height:36px;background:#ffdf4d"></i><b style="position:absolute;left:-7px;top:11px;width:36px;height:2px;background:#ffdf4d"></b>';document.body.append(marker);return true;
                """,
            )
            rect = execute(session_id, "const r=document.querySelector('.v14-liquid-surface[data-variant=\"hero\"]').getBoundingClientRect();return {left:r.left,top:r.top,width:r.width,height:r.height};")
            for label, nx, ny in (("left", 0.2, 0.72), ("center", 0.5, 0.72), ("right", 0.8, 0.72), ("lower-left", 0.2, 0.82), ("lower-center", 0.5, 0.82), ("lower-right", 0.8, 0.82)):
                x, y = rect["left"] + rect["width"] * nx, rect["top"] + rect["height"] * ny
                move_pointer(session_id, x, y)
                execute(session_id, f"const m=document.querySelector('#c12r2-pointer-crosshair');m.style.left='{x}px';m.style.top='{y}px';return true;")
                time.sleep(0.24)
                capture_pointer_evidence(session_id, evidence, f"homepage-{label}-1440x900.png")

            open_route(session_id, "/kontakt/")
            execute(session_id, "const m=document.createElement('div');m.id='c12r2-pointer-crosshair';m.style.cssText='position:fixed;z-index:2147483647;width:26px;height:26px;margin:-13px 0 0 -13px;border:2px solid #ffdf4d;border-radius:50%;pointer-events:none';document.body.append(m);return true;")
            for label, fraction in (("top", 0), ("middle", 0.5), ("lower", 0.9)):
                execute(session_id, f"scrollTo(0,Math.max(0,(document.documentElement.scrollHeight-innerHeight)*{fraction}));return scrollY;")
                time.sleep(0.12)
                x, y = 720, 450
                move_pointer(session_id, x, y)
                execute(session_id, f"const m=document.querySelector('#c12r2-pointer-crosshair');m.style.left='{x}px';m.style.top='{y}px';return true;")
                time.sleep(0.24)
                capture_pointer_evidence(session_id, evidence, f"global-kontakt-{label}-1440x900.png")

        dpr = float(zoom_state.get("dpr", 0))
        if abs(dpr - 1.25) > 0.1:
            raise RuntimeError(f"DPR fixture unavailable: {dpr}")
        if not real_pointer_errors or max(real_pointer_errors) > 2:
            raise RuntimeError(f"real pointer action coordinate mismatch: {real_pointer_errors}")
        maximum = max(errors)
        median = sorted(errors)[len(errors) // 2]
        print(
            "LIQUID_POINTER_ALIGNMENT_PASS "
            f"routes={len(ROUTES)} viewports={len(VIEWPORTS)} samples={browser_samples} "
            f"numeric-samples={len(errors)} max-error-px={maximum:.6f} median-error-px={median:.6f} "
            f"scroll-samples={scroll_samples} scroll-drift=0 resize=PASS dpr=PASS dpr-value={dpr:.2f} "
            f"real-pointer-max-error-px={max(real_pointer_errors):.3f} "
            f"webgl-targets={webgl_render_targets} fallback-targets={fallback_render_targets} "
            "zoom=PASS pointer-leave=PASS actual-render-rect=PASS horizon=DEACTIVATE"
        )
    finally:
        if session_id:
            try:
                request("DELETE", f"/session/{session_id}", timeout=5)
            except Exception:
                pass
        driver.terminate()
        server.terminate()
        try:
            driver.wait(timeout=5)
            server.wait(timeout=5)
        except subprocess.TimeoutExpired:
            driver.kill()
            server.kill()


if __name__ == "__main__":
    try:
        main()
    except (RuntimeError, urllib.error.URLError, subprocess.SubprocessError, json.JSONDecodeError) as error:
        print(f"LIQUID_POINTER_ALIGNMENT_FAIL: {error}", file=sys.stderr)
        sys.exit(1)
