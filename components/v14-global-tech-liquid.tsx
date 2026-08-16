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
  h += sin(p.x * 2.05 + t * 0.78) * 0.064;
  h += sin(p.y * 1.66 - t * 0.64) * 0.052;
  h += sin((p.x + p.y) * 3.05 + t * 0.52) * 0.029;
  h += sin((p.x * 0.82 - p.y * 1.37) * 4.0 - t * 0.98) * 0.018;
  float d = length(p - pointerWorld);
  float ripple = sin(d * 18.0 - t * 5.0) * exp(-d * 3.5);
  h += ripple * 0.075 * pointerActive;
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
  float horizontal = lineMask(f.y, 0.5, 0.018) * step(0.26, rnd);
  float vertical = lineMask(f.x, 0.5, 0.018) * step(rnd, 0.73);
  float elbow = horizontal * step(0.42, f.x) + vertical * step(f.y, 0.61);
  float via = 1.0 - smoothstep(0.042, 0.074, length(f - vec2(0.5)));
  via *= step(0.68, hash21(cell + seed * 4.17));
  return max(elbow, via * 0.88);
}

float pinBank(vec2 p, vec2 halfSize, float density) {
  vec2 q = abs(p);
  float horizontalZone = aaMask(abs(q.y - halfSize.y - 0.034), 0.015) * step(q.x, halfSize.x + 0.025);
  float verticalZone = aaMask(abs(q.x - halfSize.x - 0.034), 0.015) * step(q.y, halfSize.y + 0.025);
  float pinX = step(0.43, fract((p.x + 2.0) * density));
  float pinY = step(0.43, fract((p.y + 2.0) * density));
  return max(horizontalZone * pinX, verticalZone * pinY);
}

vec3 chip(vec2 p, vec2 center, vec2 halfSize, float kind) {
  vec2 q = p - center;
  float body = aaMask(sdBox(q, halfSize), 0.014);
  float bevel = aaMask(sdBox(q, halfSize * 0.88), 0.014);
  float core = aaMask(sdBox(q, halfSize * vec2(0.56, 0.52)), 0.017);
  float coreEdge = aaMask(abs(sdBox(q, halfSize * vec2(0.60, 0.56))) - 0.010, 0.012);
  float pins = pinBank(q, halfSize, mix(19.0, 30.0, kind));

  vec3 base = mix(vec3(0.015, 0.025, 0.070), vec3(0.034, 0.064, 0.135), bevel);
  vec3 coreTint = mix(vec3(0.18, 0.065, 0.38), vec3(0.025, 0.18, 0.38), kind);
  vec3 result = base * body;
  result += coreTint * core * 0.95;
  result += vec3(0.35, 0.78, 0.96) * coreEdge * 0.32;
  result += vec3(0.76, 0.84, 0.98) * pins * 0.52;

  float dieGridX = lineMask(fract((q.x + 1.0) * 16.0), 0.5, 0.030);
  float dieGridY = lineMask(fract((q.y + 1.0) * 16.0), 0.5, 0.030);
  result += mix(vec3(0.38, 0.16, 0.72), vec3(0.08, 0.38, 0.72), kind) * core * max(dieGridX, dieGridY) * 0.25;
  return result;
}

vec3 memoryChip(vec2 p, vec2 center, vec2 halfSize) {
  vec2 q = p - center;
  float body = aaMask(sdBox(q, halfSize), 0.012);
  float inner = aaMask(sdBox(q, halfSize * 0.78), 0.012);
  float edge = aaMask(abs(sdBox(q, halfSize)) - 0.008, 0.010);
  vec3 result = vec3(0.014, 0.032, 0.076) * body;
  result += vec3(0.028, 0.105, 0.22) * inner * 0.82;
  result += vec3(0.30, 0.64, 0.88) * edge * 0.30;
  return result;
}

vec3 capacitor(vec2 p, vec2 center, float radius) {
  float d = length(p - center);
  float body = 1.0 - smoothstep(radius, radius + 0.012, d);
  float rim = 1.0 - smoothstep(0.008, 0.020, abs(d - radius * 0.78));
  return vec3(0.025, 0.045, 0.090) * body + vec3(0.58, 0.69, 0.90) * rim * 0.20;
}

vec3 pcb(vec2 p) {
  vec3 board = vec3(0.008, 0.019, 0.058);
  float fine = traceLayer(p + vec2(0.15, -0.08), 3.2, 1.1);
  float coarse = traceLayer(p + vec2(-0.31, 0.19), 1.65, 8.7);
  float micro = traceLayer(p + vec2(0.08, 0.12), 6.6, 17.0);
  board += vec3(0.20, 0.52, 0.92) * fine * 0.38;
  board += vec3(0.10, 0.64, 0.88) * coarse * 0.34;
  board += vec3(0.52, 0.24, 0.92) * micro * 0.16;

  vec2 cpuCenter = vec2(-0.48, 0.18);
  vec2 gpuCenter = vec2(0.48, -0.18);
  board += chip(p, cpuCenter, vec2(0.33, 0.25), 0.0);
  board += chip(p, gpuCenter, vec2(0.44, 0.18), 1.0);

  float cpuSocket = aaMask(abs(sdBox(p - cpuCenter, vec2(0.43, 0.34))) - 0.012, 0.014);
  float cpuLatch = aaMask(sdBox(p - cpuCenter - vec2(0.39, 0.0), vec2(0.018, 0.20)), 0.010);
  board += vec3(0.58, 0.76, 0.98) * cpuSocket * 0.34;
  board += vec3(0.55, 0.46, 0.88) * cpuLatch * 0.26;

  board += memoryChip(p, gpuCenter + vec2(-0.31, 0.31), vec2(0.12, 0.055));
  board += memoryChip(p, gpuCenter + vec2(0.00, 0.31), vec2(0.12, 0.055));
  board += memoryChip(p, gpuCenter + vec2(0.31, 0.31), vec2(0.12, 0.055));
  board += memoryChip(p, gpuCenter + vec2(-0.31, -0.31), vec2(0.12, 0.055));
  board += memoryChip(p, gpuCenter + vec2(0.00, -0.31), vec2(0.12, 0.055));
  board += memoryChip(p, gpuCenter + vec2(0.31, -0.31), vec2(0.12, 0.055));

  board += capacitor(p, vec2(-1.02, -0.42), 0.065);
  board += capacitor(p, vec2(-0.84, -0.46), 0.050);
  board += capacitor(p, vec2(-0.98, 0.64), 0.052);
  board += capacitor(p, vec2(1.05, 0.54), 0.060);
  board += capacitor(p, vec2(1.20, 0.39), 0.044);

  float gpuRail = aaMask(abs(p.y + 0.57) - 0.010, 0.013) * step(abs(p.x - 0.42), 0.82);
  float pciePins = lineMask(fract((p.x + 2.0) * 34.0), 0.5, 0.15) * gpuRail;
  board += vec3(0.08, 0.48, 0.62) * gpuRail * 0.26;
  board += vec3(0.72, 0.84, 1.0) * pciePins * 0.28;

  float groundA = aaMask(sdBox(p - vec2(-1.03, 0.24), vec2(0.18, 0.07)), 0.012);
  float groundB = aaMask(sdBox(p - vec2(1.08, -0.55), vec2(0.16, 0.06)), 0.012);
  board += vec3(0.05, 0.20, 0.22) * (groundA + groundB) * 0.38;
  return board;
}

void main() {
  vec2 uv = gl_FragCoord.xy / max(uResolution, vec2(1.0));
  vec2 p = uv * 2.0 - 1.0;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  p.x *= aspect;

  float scrollPhase = mod(uScroll * 0.00022, 2.0);
  vec2 world = p * 1.10 + vec2(scrollPhase * 0.24, -scrollPhase * 0.13);
  vec2 pointerWorld = vec2((uPointer.x * 2.0 - 1.0) * aspect, 1.0 - uPointer.y * 2.0) * 1.10;

  vec2 gradient = waterGradient(world, uTime, pointerWorld, uPointerActive);
  vec2 refracted = world + gradient * 0.086;
  vec3 board = pcb(refracted);

  float h = waveHeight(world, uTime, pointerWorld, uPointerActive);
  vec3 normal = normalize(vec3(-gradient.x * 2.15, 1.0, -gradient.y * 2.15));
  vec3 lightDir = normalize(vec3(-0.42, 0.78, 0.46));
  float diffuse = max(dot(normal, lightDir), 0.0);
  float specular = pow(max(dot(reflect(-lightDir, normal), vec3(0.0, 1.0, 0.12)), 0.0), 38.0);
  float crest = smoothstep(0.035, 0.118, h);
  float slope = clamp(length(gradient) * 0.42, 0.0, 1.0);

  float causticA = sin((refracted.x + refracted.y) * 13.0 + uTime * 1.18);
  float causticB = sin((refracted.x * 0.72 - refracted.y) * 17.0 - uTime * 0.88);
  float caustic = pow(max(0.0, causticA * causticB), 2.7);
  float bandA = pow(0.5 + 0.5 * sin(world.x * 2.9 + world.y * 1.2 + uTime * 0.92 + gradient.x * 2.2), 10.0);
  float bandB = pow(0.5 + 0.5 * sin(world.x * 1.6 - world.y * 2.4 - uTime * 0.66 + gradient.y * 1.8), 12.0);

  vec3 deep = vec3(0.004, 0.010, 0.038);
  vec3 waterTint = vec3(0.025, 0.105, 0.285);
  vec3 color = mix(deep, board, 0.84);
  color = mix(color, waterTint, 0.22 + 0.13 * (1.0 - diffuse));
  color += vec3(0.05, 0.38, 0.58) * diffuse * 0.18;
  color += vec3(0.68, 0.92, 1.0) * specular * 0.66;
  color += vec3(0.20, 0.80, 0.82) * caustic * 0.17;
  color += vec3(0.34, 0.76, 0.94) * crest * 0.10;
  color += vec3(0.08, 0.48, 0.72) * (bandA * 0.13 + bandB * 0.08);
  color += vec3(0.10, 0.36, 0.52) * slope * 0.10;

  vec2 bubbleCell = fract(world * vec2(4.2, 3.7)) - 0.5;
  vec2 bubbleId = floor(world * vec2(4.2, 3.7));
  float bubbleGate = step(0.86, hash21(bubbleId + 31.0));
  float bubble = 1.0 - smoothstep(0.055, 0.085, abs(length(bubbleCell) - 0.11));
  color += vec3(0.34, 0.68, 0.78) * bubble * bubbleGate * 0.05;

  float scan = 0.5 + 0.5 * sin((uv.y + uScroll * 0.00004) * 460.0);
  color += vec3(0.01, 0.055, 0.07) * scan * 0.08;
  float pointerGlow = exp(-length(world - pointerWorld) * 2.4) * uPointerActive;
  color += vec3(0.30, 0.78, 1.0) * pointerGlow * 0.06;

  float vignette = 1.0 - smoothstep(0.52, 1.48, length(p * vec2(0.62, 0.88)));
  color *= 0.68 + vignette * 0.32;
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
      const frameInterval = compact.matches ? COMPACT_FRAME_INTERVAL : DESKTOP_FRAME_INTERVAL;
      if (now - lastFrameAt < frameInterval) {
        frame = window.requestAnimationFrame(render);
        return;
      }
      lastFrameAt = now;
      if (root.dataset.heroCovered === "true") {
        frame = window.requestAnimationFrame(render);
        return;
      }
      bindProgram(program);
      gl.clear(gl.COLOR_BUFFER_BIT);
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
