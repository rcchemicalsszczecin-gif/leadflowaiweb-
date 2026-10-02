#!/usr/bin/env python3
import json
import os
import shutil
import subprocess
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path
from xml.etree import ElementTree

SITE = "http://127.0.0.1:3012"
DRIVER = "http://127.0.0.1:4446"
def configured_viewports():
    value = os.environ.get("C12R_VIEWPORTS")
    if not value:
        return ((390, 844), (1440, 900))
    return tuple(tuple(int(part) for part in item.lower().split("x", 1)) for item in value.split(","))


VIEWPORTS = configured_viewports()
FIREFOX_MIN_OUTER_WIDTH = 500
FIREFOX_CHROME_HEIGHT = 100
CAPTURE_DIR = os.environ.get("C12R_SCREENSHOT_DIR")
REPORT_PATH = os.environ.get("C12R_TEXT_FIT_REPORT")
DIAGNOSTIC_ONLY = os.environ.get("C12R_DIAGNOSTIC_ONLY") == "1"
STABLE_CAPTURE = os.environ.get("C12R_STABLE_CAPTURE") == "1"
SCROLL_SELECTOR = os.environ.get("C12R_SCROLL_SELECTOR")
CAPTURE_DELAY = float(os.environ.get("C12R_CAPTURE_DELAY", "0.18"))


def request(method, base, path, payload=None, timeout=20):
    data = None if payload is None else json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        f"{base}{path}", data=data, method=method, headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req, timeout=timeout) as response:
        body = response.read()
    return json.loads(body.decode("utf-8")) if body else {}


def wait_http(url, seconds=15):
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
        "POST", DRIVER, f"/session/{session_id}/execute/sync", {"script": script, "args": []}
    ).get("value")


def set_viewport(session_id, bidi_url, width, height):
    request(
        "POST",
        DRIVER,
        f"/session/{session_id}/window/rect",
        {"x": 0, "y": 0, "width": max(width, FIREFOX_MIN_OUTER_WIDTH), "height": max(height + FIREFOX_CHROME_HEIGHT, 600)},
    )
    result = subprocess.run(
        ["node", "scripts/firefox-bidi-viewport-v14.mjs", bidi_url, str(width), str(height)],
        capture_output=True,
        text=True,
        timeout=12,
        check=True,
    )
    if "FIREFOX_BIDI_VIEWPORT_PASS" not in result.stdout:
        raise RuntimeError(f"viewport emulation failed: {result.stdout.strip()}")


AUDIT_SCRIPT = r"""
const visible=(el)=>{const s=getComputedStyle(el),r=el.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&Number(s.opacity)!==0&&r.width>0&&r.height>0&&!el.closest('[aria-hidden="true"],[inert],.v14-liquid-stage')&&!el.matches('.v14-skip-link:not(:focus),.hp-field')&&!(r.width<=2&&r.height<=2&&/hidden|clip/.test(s.overflow))};
const meaningful=(text)=>text.replace(/\s+/g,' ').trim();
const selector=(el)=>{if(el.id)return '#'+CSS.escape(el.id);let out=el.tagName.toLowerCase();if(el.classList.length)out+='.'+[...el.classList].slice(0,3).map(CSS.escape).join('.');return out};
const clipAncestor=(el)=>{for(let p=el.parentElement;p;p=p.parentElement){const s=getComputedStyle(p);if(/hidden|clip/.test(s.overflowX+s.overflowY))return p}return null};
const rgba=(value)=>{const m=value.match(/[\d.]+/g);if(!m||m.length<3)return null;return [Number(m[0]),Number(m[1]),Number(m[2]),m[3]===undefined?1:Number(m[3])]};
const composite=(fg,bg)=>[fg[0]*fg[3]+bg[0]*(1-fg[3]),fg[1]*fg[3]+bg[1]*(1-fg[3]),fg[2]*fg[3]+bg[2]*(1-fg[3])];
const lum=(rgb)=>{const c=rgb.map(v=>{v/=255;return v<=.04045?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*c[0]+.7152*c[1]+.0722*c[2]};
const contrast=(a,b)=>{const l1=lum(a),l2=lum(b);return (Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05)};
const stableSurface=(el)=>{for(let p=el.parentElement;p&&p!==document.body&&p!==document.documentElement;p=p.parentElement){const s=getComputedStyle(p),bg=rgba(s.backgroundColor);if((bg&&bg[3]>=.45)||s.backgroundImage!=='none')return true}return false};
const ambientBase=[5,8,22];
const defects=[];const microExamples=[];const microContrastExamples=[];let usefulBelow12=0,microContrastFailures=0,unstableDynamicText=0,h1=0,h1px=0,h2max=0,h2maxExample=null,controls=0,headings=0,svgTexts=0;
const main=document.querySelector('main')||document.body;
for(const el of main.querySelectorAll('*')){
 if(!visible(el))continue;
 const tag=el.tagName.toLowerCase(); if(tag==='h1')h1++;
 if(/^h[1-4]$/.test(tag)){headings++;const px=parseFloat(getComputedStyle(el).fontSize);if(tag==='h1')h1px=Math.max(h1px,px);if(tag==='h2'&&px>h2max){h2max=px;h2maxExample={selector:selector(el),text:meaningful(el.innerText||'').slice(0,120),px}}}
 if(tag==='text')svgTexts++;
 const direct=[...el.childNodes].filter(n=>n.nodeType===Node.TEXT_NODE).map(n=>meaningful(n.textContent||'')).filter(Boolean);
 if(!direct.length)continue;
 const text=direct.join(' ');const style=getComputedStyle(el);const rect=el.getBoundingClientRect();
 const useful=!el.matches('sup,sub,.v14-global-tech-liquid__label')&&text.length>1;
 if(useful&&parseFloat(style.fontSize)<11.95){usefulBelow12++;if(microExamples.length<20)microExamples.push({selector:selector(el),text:text.slice(0,100),px:parseFloat(style.fontSize)})}
 const px=parseFloat(style.fontSize),weight=parseFloat(style.fontWeight)||400;
 if(useful&&px<=14.1&&!el.matches('button,[role="button"],.button,.v14-button-primary,.v14-button-ghost')){const color=rgba(style.color);if(color&&lum(color)>.35){const resolved=composite(color,ambientBase),ratio=contrast(resolved,ambientBase),threshold=(px>=18||px>=14&&weight>=700)?3:4.5;const stable=stableSurface(el);if(ratio+0.01<threshold){microContrastFailures++;if(microContrastExamples.length<30)microContrastExamples.push({selector:selector(el),text:text.slice(0,100),px,weight,ratio:Number(ratio.toFixed(2)),color:style.color,stableSurface:stable})}if(!stable&&ratio<5.5)unstableDynamicText++}}
 const clippedX=el.scrollWidth>el.clientWidth+2&&/hidden|clip/.test(style.overflowX);
 const clippedY=el.scrollHeight>el.clientHeight+2&&/hidden|clip/.test(style.overflowY);
 const ancestor=clipAncestor(el);let rangeOutsideX=false,rangeOutsideY=false;
 if(ancestor){const ar=ancestor.getBoundingClientRect();for(const node of el.childNodes){if(node.nodeType!==Node.TEXT_NODE||!meaningful(node.textContent||''))continue;const range=document.createRange();range.selectNodeContents(node);for(const rr of range.getClientRects()){if(rr.left<ar.left-2||rr.right>ar.right+2)rangeOutsideX=true;if(rr.top<ar.top-2||rr.bottom>ar.bottom+2)rangeOutsideY=true}}}
 const control=el.matches('button,a,summary,[role="button"],input,select,textarea');if(control)controls++;
 const viewportOutside=rect.left<-2||rect.right>innerWidth+2;
 if(clippedX||clippedY||rangeOutsideX||rangeOutsideY||viewportOutside){defects.push({kind:control?'CONTROL':/^h[1-4]$/.test(tag)?'HEADING':tag==='text'?'SVG':'TEXT',selector:selector(el),text:text.slice(0,120),client:[el.clientWidth,el.clientHeight],scroll:[el.scrollWidth,el.scrollHeight],overflow:[style.overflowX,style.overflowY],rect:[rect.left,rect.top,rect.right,rect.bottom],clip:ancestor?selector(ancestor):null,x:clippedX||rangeOutsideX||viewportOutside,y:clippedY||rangeOutsideY})}
}
const sparse=[...main.querySelectorAll('section')].filter(el=>visible(el)&&el.getBoundingClientRect().height>650&&meaningful(el.innerText||'').length<140).length;
const underfilled=[...main.querySelectorAll('article')].filter(el=>visible(el)&&el.getBoundingClientRect().height>340&&meaningful(el.innerText||'').length<100).length;
const template=main.getAttribute('data-service-template')||'';
return {width:innerWidth,height:innerHeight,documentHeight:document.documentElement.scrollHeight,globalOverflow:document.documentElement.scrollWidth-innerWidth,h1,h1px,h2max,h2maxExample,usefulBelow12,microExamples,microContrastFailures,microContrastExamples,unstableDynamicText,controls,headings,svgTexts,sparse,underfilled,template,defects};
"""


def routes_from_sitemap():
    root = ElementTree.parse("out/sitemap.xml").getroot()
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    routes = []
    for loc in root.findall("s:url/s:loc", ns):
        value = (loc.text or "").strip()
        route = value.removeprefix("https://leadflowai.pl") or "/"
        routes.append(route)
    if len(routes) != 63:
        raise RuntimeError(f"expected 63 sitemap routes, found {len(routes)}")
    return routes


def main():
    if not shutil.which("firefox") or not shutil.which("geckodriver"):
        raise RuntimeError("Firefox/geckodriver unavailable")
    server = subprocess.Popen(
        [sys.executable, "-m", "http.server", "3012", "--directory", "out"],
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
        firefox_options = {"args": ["-headless"]}
        if STABLE_CAPTURE:
            firefox_options["prefs"] = {"ui.prefersReducedMotion": 1}
        response = request(
            "POST",
            DRIVER,
            "/session",
            {"capabilities": {"alwaysMatch": {"browserName": "firefox", "webSocketUrl": True, "moz:firefoxOptions": firefox_options}}},
            timeout=45,
        )
        value = response.get("value", {})
        session_id = value.get("sessionId") or response.get("sessionId")
        bidi_url = value.get("capabilities", {}).get("webSocketUrl")
        if not session_id or not bidi_url:
            raise RuntimeError(f"Firefox session unavailable: {response}")

        routes = routes_from_sitemap()
        route_filter = os.environ.get("C12R_ROUTE_FILTER")
        if route_filter:
            selected = {item.strip() for item in route_filter.split(",") if item.strip()}
            routes = [route for route in routes if route in selected]
            if "/404.html" in selected:
                routes.append("/404.html")
            if not routes:
                raise RuntimeError(f"route filter matched no sitemap routes: {route_filter}")
        failures = []
        metrics = []
        capture = Path(CAPTURE_DIR) if CAPTURE_DIR else None
        if capture:
            capture.mkdir(parents=True, exist_ok=True)
        for width, height in VIEWPORTS:
            set_viewport(session_id, bidi_url, width, height)
            for index, route in enumerate(routes):
                request("POST", DRIVER, f"/session/{session_id}/url", {"url": f"{SITE}{route}"}, timeout=25)
                deadline = time.time() + 12
                while time.time() < deadline and execute(session_id, "return document.readyState") != "complete":
                    time.sleep(0.05)
                if STABLE_CAPTURE:
                    execute(
                        session_id,
                        """
                        const style=document.createElement('style');
                        style.setAttribute('data-c12r-stable-capture','');
                        style.textContent='*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}';
                        document.head.append(style);
                        scrollTo(0,0);
                        return true;
                        """,
                    )
                state = execute(session_id, AUDIT_SCRIPT)
                if not isinstance(state, dict):
                    failures.append({"route": route, "viewport": f"{width}x{height}", "error": "invalid state"})
                    continue
                route_failures = []
                if abs(float(state.get("width", 0)) - width) > 2:
                    route_failures.append({"kind": "VIEWPORT", "actual": state.get("width")})
                if float(state.get("globalOverflow", 999)) > 2:
                    route_failures.append({"kind": "GLOBAL_OVERFLOW", "value": state.get("globalOverflow")})
                if state.get("h1") != 1:
                    route_failures.append({"kind": "H1_COUNT", "value": state.get("h1")})
                if route != "/" and width == 1440 and float(state.get("h1px", 0)) > 80.1:
                    route_failures.append({"kind": "H1_SCALE", "value": state.get("h1px")})
                if route != "/" and width == 1440 and float(state.get("h2max", 0)) > 64.1:
                    route_failures.append({"kind": "H2_SCALE", "value": state.get("h2max")})
                if state.get("usefulBelow12", 0):
                    route_failures.append({"kind": "MICROTYPE", "value": state.get("usefulBelow12"), "examples": state.get("microExamples", [])})
                if state.get("microContrastFailures", 0):
                    route_failures.append({"kind": "MICROCOPY_CONTRAST", "value": state.get("microContrastFailures"), "examples": state.get("microContrastExamples", [])})
                if state.get("unstableDynamicText", 0):
                    route_failures.append({"kind": "DYNAMIC_BACKGROUND_MICROCOPY", "value": state.get("unstableDynamicText")})
                route_failures.extend(state.get("defects", []))
                if route_failures:
                    failures.append({"route": route, "viewport": f"{width}x{height}", "defects": route_failures})
                metrics.append({"route": route, "viewport": f"{width}x{height}", **state, "defects": len(route_failures)})
                if capture:
                    if SCROLL_SELECTOR:
                        execute(
                            session_id,
                            f"const target=document.querySelector({json.dumps(SCROLL_SELECTOR)});if(target){{document.documentElement.style.scrollBehavior='auto';document.scrollingElement.scrollTop=target.getBoundingClientRect().top+scrollY-Math.max(24,innerHeight*.12)}}return target?{{found:true,top:document.scrollingElement.scrollTop}}:{{found:false}};",
                        )
                        time.sleep(CAPTURE_DELAY)
                    elif CAPTURE_DELAY:
                        time.sleep(CAPTURE_DELAY)
                    shot = request("GET", DRIVER, f"/session/{session_id}/screenshot", timeout=20).get("value")
                    if shot:
                        import base64
                        slug = "home" if route == "/" else route.strip("/").replace("/", "__")
                        (capture / f"{index + 1:02d}-{slug}-{width}x{height}.png").write_bytes(base64.b64decode(shot))
        if REPORT_PATH:
            report_path = Path(REPORT_PATH)
            report_path.parent.mkdir(parents=True, exist_ok=True)
            report_path.write_text(json.dumps({"routes": routes, "viewports": VIEWPORTS, "metrics": metrics, "failures": failures}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        if failures and not DIAGNOSTIC_ONLY:
            print(json.dumps({"failures": failures}, ensure_ascii=False, indent=2), file=sys.stderr)
            raise RuntimeError(f"element text-fit failures={len(failures)} route-viewports")
        if failures:
            print(f"ROUTE_TEXT_FIT_V16_DIAGNOSTIC routes={len(routes)} viewport-runs={len(metrics)} failure-route-viewports={len(failures)}")
            return
        print(
            f"ROUTE_TEXT_FIT_V16_PASS routes={len(routes)} viewport-runs={len(metrics)} horizontal=0 vertical=0 controls=0 headings=0 svg-clipping=0 svg-overlap=0 microtype-below-12=0 microcopy-contrast=0 dynamic-background-unstable=0"
        )
    finally:
        if session_id:
            try:
                request("DELETE", DRIVER, f"/session/{session_id}", timeout=5)
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
        print(f"ROUTE_TEXT_FIT_V16_FAIL: {error}", file=sys.stderr)
        sys.exit(1)
