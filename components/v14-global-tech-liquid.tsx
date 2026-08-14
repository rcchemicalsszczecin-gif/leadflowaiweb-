"use client";

import { useEffect, useRef } from "react";

const DESKTOP_FRAME_INTERVAL = 1000 / 36;
const COMPACT_FRAME_INTERVAL = 1000 / 24;
const DESKTOP_DPR = 1.15;
const COMPACT_DPR = 1;

const VERTEX_SHADER = `#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;
out vec4 outColor;
uniform vec2 uResolution;
uniform float uTime;
uniform float uScroll;
uniform vec2 uPointer;
uniform float uPointerActive;

#define PI 3.14159265359

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float sdBox(vec2 p, vec2 b) {
  vec2 d = abs(p) - b;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

float aaMask(float distanceValue, float width) {
  return 1.0 - smoothstep(0.0, width, distanceValue);
}

float lineMask(float value, float center, float width) {
  return 1.0 - smoothstep(width, width * 1.8, abs(value - center));
}

float waveHeight(vec2 p, float t, vec2 pointerWorld, float pointerActive) {
  float h = 0.0;
  h += sin(p.x * 2.15 + t * 0.72) * 0.050;
  h += sin(p.y * 1.74 - t * 0.60) * 0.042;
  h += sin((p.x + p.y) * 3.15 + t * 0.48) * 0.022;
  h += sin((p.x * 0.82 - p.y * 1.37) * 4.1 - t * 0.94) * 0.014;

  float d = length(p - pointerWorld);
  float ripple = sin(d * 18.0 - t * 5.0) * exp(-d * 3.5);
  h += ripple * 0.065 * pointerActive;
  return h;
}

vec2 waterGradient(vec2 p, float t, vec2 pointerWorld, float pointerActive) {
  float e = 0.018;
  float l = waveHeight(p - vec2(e, 0.0), t, pointerWorld, pointerActive);
  float r = waveHeight(p + vec2(e, 0.0), t, pointerWorld, pointerActive);
  float b = waveHeight(p - vec2(0.0, e), t, pointerWorld, pointerActive);
  float f = waveHeight(p + vec2(0.0, e), t, pointerWorld, pointerActive);
  return vec2(l - r, b - f) / (2.0 * e);
}

float traceLayer(vec2 p, float scale, float seed) {
  vec2 g = p * scale;
  vec2 cell = floor(g);
  vec2 f = fract(g);
  float rnd = hash21(cell + seed);

  float horizontal = lineMask(f.y, 0.5, 0.020) * step(0.28, rnd);
  float vertical = lineMask(f.x, 0.5, 0.020) * step(rnd, 0.70);
  float elbow = horizontal * step(0.45, f.x) + vertical * step(f.y, 0.58);

  float via = 1.0 - smoothstep(0.045, 0.075, length(f - vec2(0.5)));
  via *= step(0.70, hash21(cell + seed * 4.17));
  return max(elbow, via * 0.82);
}

float pinBank(vec2 p, vec2 halfSize, float density) {
  vec2 q = abs(p);
  float horizontalZone = aaMask(abs(q.y - halfSize.y - 0.035), 0.016) * step(q.x, halfSize.x + 0.02);
  float verticalZone = aaMask(abs(q.x - halfSize.x - 0.035), 0.016) * step(q.y, halfSize.y + 0.02);
  float pinX = step(0.46, fract((p.x + 2.0) * density));
  float pinY = step(0.46, fract((p.y + 2.0) * density));
  return max(horizontalZone * pinX, verticalZone * pinY);
}

vec3 chip(vec2 p, vec2 center, vec2 halfSize, float kind) {
  vec2 q = p - center;
  float body = aaMask(sdBox(q, halfSize), 0.015);
  float bevel = aaMask(sdBox(q, halfSize * 0.86), 0.015);
  float core = aaMask(sdBox(q, halfSize * vec2(0.55, 0.50)), 0.018);
  float pins = pinBank(q, halfSize, mix(18.0, 28.0, kind));

  vec3 base = mix(vec3(0.010, 0.026, 0.030), vec3(0.020, 0.042, 0.046), bevel);
  vec3 coreTint = mix(vec3(0.020, 0.085, 0.070), vec3(0.030, 0.070, 0.105), kind);
  vec3 result = base * body;
  result += coreTint * core * 0.80;
  result += vec3(0.48, 0.78, 0.23) * pins * 0.45;

  float dieGridX = lineMask(fract((q.x + 1.0) * 13.0), 0.5, 0.035);
  float dieGridY = lineMask(fract((q.y + 1.0) * 13.0), 0.5, 0.035);
  result += vec3(0.12, 0.31, 0.27) * core * max(dieGridX, dieGridY) * 0.17;
  return result;
}

vec3 pcb(vec2 p) {
  vec3 board = vec3(0.008, 0.030, 0.031);

  float fine = traceLayer(p + vec2(0.15, -0.08), 3.2, 1.1);
  float coarse = traceLayer(p + vec2(-0.31, 0.19), 1.65, 8.7);
  float micro = traceLayer(p + vec2(0.08, 0.12), 6.4, 17.0);

  board += vec3(0.18, 0.48, 0.26) * fine * 0.34;
  board += vec3(0.08, 0.42, 0.56) * coarse * 0.28;
  board += vec3(0.34, 0.56, 0.19) * micro * 0.13;

  board += chip(p, vec2(-0.42, 0.18), vec2(0.31, 0.22), 0.0);
  board += chip(p, vec2(0.43, -0.18), vec2(0.43, 0.16), 1.0);

  float socket = aaMask(abs(sdBox(p - vec2(-0.42, 0.18), vec2(0.39, 0.30))) - 0.012, 0.015);
  float gpuRail = aaMask(abs((p.y + 0.44)) - 0.012, 0.014) * step(abs(p.x - 0.34), 0.72);
  board += vec3(0.48, 0.74, 0.22) * socket * 0.25;
  board += vec3(0.07, 0.43, 0.55) * gpuRail * 0.30;

  return board;
}

void main() {
  vec2 uv = gl_FragCoord.xy / max(uResolution, vec2(1.0));
  uv.y = 1.0 - uv.y;
  vec2 p = uv * 2.0 - 1.0;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  p.x *= aspect;

  float scrollPhase = mod(uScroll * 0.00022, 2.0);
  vec2 world = p * 1.10 + vec2(scrollPhase * 0.24, -scrollPhase * 0.13);
  vec2 pointerWorld = vec2((uPointer.x * 2.0 - 1.0) * aspect, 1.0 - uPointer.y * 2.0) * 1.10;

  vec2 gradient = waterGradient(world, uTime, pointerWorld, uPointerActive);
  vec2 refracted = world + gradient * 0.048;

  vec3 board = pcb(refracted);

  float h = waveHeight(world, uTime, pointerWorld, uPointerActive);
  vec3 normal = normalize(vec3(-gradient.x * 1.8, 1.0, -gradient.y * 1.8));
  vec3 lightDir = normalize(vec3(-0.42, 0.78, 0.46));
  float diffuse = max(dot(normal, lightDir), 0.0);
  float specular = pow(max(dot(reflect(-lightDir, normal), vec3(0.0, 1.0, 0.12)), 0.0), 46.0);
  float crest = smoothstep(0.032, 0.105, h);

  float causticA = sin((refracted.x + refracted.y) * 13.0 + uTime * 1.1);
  float causticB = sin((refracted.x * 0.72 - refracted.y) * 17.0 - uTime * 0.82);
  float caustic = pow(max(0.0, causticA * causticB), 3.0);

  vec3 deep = vec3(0.004, 0.017, 0.024);
  vec3 waterTint = vec3(0.015, 0.13, 0.20);
  vec3 color = mix(deep, board, 0.78);
  color = mix(color, waterTint, 0.24 + 0.10 * (1.0 - diffuse));
  color += vec3(0.05, 0.34, 0.48) * diffuse * 0.16;
  color += vec3(0.62, 0.90, 1.0) * specular * 0.48;
  color += vec3(0.24, 0.74, 0.70) * caustic * 0.12;
  color += vec3(0.38, 0.70, 0.82) * crest * 0.07;

  float scan = 0.5 + 0.5 * sin((uv.y + uScroll * 0.00004) * 460.0);
  color += vec3(0.01, 0.055, 0.07) * scan * 0.10;

  float pointerGlow = exp(-length(world - pointerWorld) * 2.4) * uPointerActive;
  color += vec3(0.55, 0.85, 0.18) * pointerGlow * 0.05;

  float vignette = 1.0 - smoothstep(0.50, 1.45, length(p * vec2(0.62, 0.88)));
  color *= 0.62 + vignette * 0.38;

  outColor = vec4(color, 1.0);
}`;

function compileShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("shader allocation failed");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) ?? "shader compilation failed";
    gl.deleteShader(shader);
    throw new Error(message);
  }
  return shader;
}

function createProgram(gl: WebGL2RenderingContext) {
  const vertex = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  const program = gl.createProgram();
  if (!program) throw new Error("program allocation failed");
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program) ?? "shader link failed";
    gl.deleteProgram(program);
    throw new Error(message);
  }
  return program;
}

function uniform(gl: WebGL2RenderingContext, program: WebGLProgram, name: string) {
  const location = gl.getUniformLocation(program, name);
  if (!location) throw new Error(`missing uniform ${name}`);
  return location;
}

export function V14GlobalTechLiquid() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 899px), (pointer: coarse)");
    const finePointer = window.matchMedia("(pointer: fine)");

    if (reducedMotion.matches) {
      root.dataset.renderFallback = "reduced-motion";
      return;
    }

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: compact.matches ? "low-power" : "default",
    });

    if (!gl) {
      root.dataset.renderFallback = "webgl-unavailable";
      return;
    }

    let program: WebGLProgram;
    try {
      program = createProgram(gl);
    } catch {
      root.dataset.renderFallback = "shader-error";
      return;
    }

    const bindProgram = gl.useProgram.bind(gl);
    const position = gl.getAttribLocation(program, "aPosition");
    const resolution = uniform(gl, program, "uResolution");
    const time = uniform(gl, program, "uTime");
    const scroll = uniform(gl, program, "uScroll");
    const pointer = uniform(gl, program, "uPointer");
    const pointerActive = uniform(gl, program, "uPointerActive");
    const buffer = gl.createBuffer();
    if (!buffer) return;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    bindProgram(program);
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    gl.clearColor(0, 0, 0, 1);

    let frame = 0;
    let pageVisible = !document.hidden;
    let lastFrameAt = 0;
    let pointerX = 0.5;
    let pointerY = 0.5;
    let pointerIsActive = 0;
    let scrollY = window.scrollY;

    const resize = () => {
      const width = Math.max(1, window.innerWidth);
      const height = Math.max(1, window.innerHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, compact.matches ? COMPACT_DPR : DESKTOP_DPR);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const render = (now: number) => {
      frame = 0;
      if (!pageVisible) return;
      const interval = compact.matches ? COMPACT_FRAME_INTERVAL : DESKTOP_FRAME_INTERVAL;
      if (now - lastFrameAt < interval) {
        frame = window.requestAnimationFrame(render);
        return;
      }
      lastFrameAt = now;
      bindProgram(program);
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform1f(time, now / 1000);
      gl.uniform1f(scroll, scrollY);
      gl.uniform2f(pointer, pointerX, pointerY);
      gl.uniform1f(pointerActive, pointerIsActive);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      frame = window.requestAnimationFrame(render);
    };

    const start = () => {
      if (frame || !pageVisible) return;
      lastFrameAt = 0;
      frame = window.requestAnimationFrame(render);
    };

    const stop = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const onVisibility = () => {
      pageVisible = !document.hidden;
      if (pageVisible) start();
      else stop();
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer.matches) return;
      pointerX = event.clientX / Math.max(window.innerWidth, 1);
      pointerY = event.clientY / Math.max(window.innerHeight, 1);
      pointerIsActive = 1;
    };

    const onPointerLeave = () => {
      pointerIsActive = 0;
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    root.dataset.renderMode = "webgl2-tech-liquid";
    start();

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <div className="v14-global-tech-liquid" ref={rootRef} aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className="v14-global-tech-liquid__depth" />
      <div className="v14-global-tech-liquid__label">
        <span>SUBMERGED COMPUTE FIELD</span>
        <b>PCB / CPU / GPU / LIQUID</b>
      </div>
    </div>
  );
}
