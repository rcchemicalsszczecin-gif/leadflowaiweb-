"use client";

import { useEffect, useRef } from "react";

type Ripple = {
  x: number;
  y: number;
  born: number;
  strength: number;
};

const MAX_RIPPLES = 12;
const RIPPLE_LIFE_MS = 3200;

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
uniform int uRippleCount;
uniform vec4 uRipples[${MAX_RIPPLES}];

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float sdBox(vec2 p, vec2 b) {
  vec2 d = abs(p) - b;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

float waterHeight(vec2 uv) {
  float h = 0.0;
  float aspect = uResolution.x / max(uResolution.y, 1.0);

  for (int i = 0; i < ${MAX_RIPPLES}; i++) {
    if (i >= uRippleCount) break;
    vec4 ripple = uRipples[i];
    float age = ripple.z;
    if (age < 0.0 || age > 3.2) continue;

    vec2 delta = uv - ripple.xy;
    delta.x *= aspect;
    float d = length(delta);
    float envelope = exp(-d * (3.2 + age * 0.42)) * exp(-age * 0.72);
    float crest = sin(d * 76.0 - age * 10.5);
    float impact = exp(-d * 18.0) * exp(-age * 3.8);
    h += (crest * envelope + impact * 0.8) * ripple.w;
  }

  return h;
}

vec3 circuitBoard(vec2 uv, vec2 waterNormal) {
  vec2 distortedUv = uv + waterNormal * 0.021;
  vec2 world = distortedUv * uResolution;
  world.y += uScroll * 0.34;

  vec2 p = world / 72.0;
  vec2 cell = floor(p);
  vec2 fp = fract(p);

  vec3 board = vec3(0.012, 0.028, 0.044);

  float microGridX = 1.0 - smoothstep(0.008, 0.024, abs(fp.x - 0.5));
  float microGridY = 1.0 - smoothstep(0.008, 0.024, abs(fp.y - 0.5));
  board += vec3(0.015, 0.055, 0.076) * (microGridX + microGridY) * 0.42;

  float rowSeed = hash11(cell.y * 2.71 + 1.3);
  float colSeed = hash11(cell.x * 3.17 + 4.9);
  float laneY = mix(0.16, 0.84, hash11(cell.y * 6.13));
  float laneX = mix(0.16, 0.84, hash11(cell.x * 7.91));

  float hTrace = (1.0 - smoothstep(0.018, 0.052, abs(fp.y - laneY))) * step(0.27, rowSeed);
  float vTrace = (1.0 - smoothstep(0.018, 0.052, abs(fp.x - laneX))) * step(0.29, colSeed);

  float diagonalCoord = fract((p.x + p.y) * 0.5);
  float diagonalGate = step(0.72, hash21(floor(p * 0.5)));
  float dTrace = (1.0 - smoothstep(0.012, 0.038, abs(diagonalCoord - 0.5))) * diagonalGate * 0.42;

  float baseTrace = clamp(hTrace + vTrace + dTrace, 0.0, 1.0);
  vec3 traceColor = mix(vec3(0.03, 0.16, 0.21), vec3(0.05, 0.25, 0.31), hash21(cell));
  board += traceColor * baseTrace;

  float horizontalPhase = fract(p.x * 0.115 - uTime * (0.19 + rowSeed * 0.18) + rowSeed);
  float verticalPhase = fract(p.y * 0.12 + uTime * (0.15 + colSeed * 0.16) + colSeed);
  float hPulse = exp(-pow((horizontalPhase - 0.5) * 8.5, 2.0)) * hTrace;
  float vPulse = exp(-pow((verticalPhase - 0.5) * 8.5, 2.0)) * vTrace;
  float signalPulse = max(hPulse, vPulse);

  vec3 cyanEnergy = vec3(0.16, 0.72, 1.0);
  vec3 greenEnergy = vec3(0.68, 1.0, 0.18);
  vec3 energyColor = mix(cyanEnergy, greenEnergy, smoothstep(0.25, 0.8, hash21(cell + 11.0)));
  board += energyColor * signalPulse * 1.65;
  board += energyColor * signalPulse * signalPulse * 1.2;

  vec2 nodePos = vec2(laneX, laneY);
  float nodeDistance = length(fp - nodePos);
  float nodeGate = step(0.56, hash21(cell + 3.4));
  float node = (1.0 - smoothstep(0.035, 0.085, nodeDistance)) * nodeGate;
  float nodeGlow = exp(-nodeDistance * 18.0) * nodeGate;
  float nodeBeat = 0.48 + 0.52 * sin(uTime * (1.7 + hash21(cell) * 2.0) + hash21(cell) * 8.0);
  board += energyColor * (node * 1.7 + nodeGlow * 0.22 * nodeBeat);

  vec2 macroSize = vec2(350.0, 250.0);
  vec2 macroCell = floor(world / macroSize);
  vec2 macroLocal = fract(world / macroSize) - 0.5;
  float chipSeed = hash21(macroCell * 1.37 + 9.2);
  float chipGate = step(0.38, chipSeed);
  vec2 chipHalf = vec2(0.205 + hash11(chipSeed * 8.0) * 0.055, 0.135 + hash11(chipSeed * 13.0) * 0.045);
  float chipSdf = sdBox(macroLocal, chipHalf);
  float chipFill = (1.0 - smoothstep(-0.012, 0.015, chipSdf)) * chipGate;
  float chipEdge = (1.0 - smoothstep(0.003, 0.012, abs(chipSdf))) * chipGate;

  vec3 chipColor = vec3(0.018, 0.037, 0.054);
  board = mix(board, chipColor, chipFill * 0.93);
  board += vec3(0.09, 0.34, 0.42) * chipEdge * 0.7;

  float pinBandsY = 1.0 - smoothstep(0.06, 0.16, abs(fract((macroLocal.y + 0.5) * 12.0) - 0.5));
  float pinBandsX = 1.0 - smoothstep(0.06, 0.16, abs(fract((macroLocal.x + 0.5) * 14.0) - 0.5));
  float sidePins = (1.0 - smoothstep(0.012, 0.035, abs(abs(macroLocal.x) - chipHalf.x - 0.025))) * pinBandsY;
  float topPins = (1.0 - smoothstep(0.012, 0.035, abs(abs(macroLocal.y) - chipHalf.y - 0.025))) * pinBandsX;
  float pins = clamp(sidePins + topPins, 0.0, 1.0) * chipGate;
  board += vec3(0.11, 0.42, 0.5) * pins * 0.78;

  float innerMark = 1.0 - smoothstep(0.008, 0.025, abs(length(macroLocal * vec2(1.0, 1.35)) - 0.075));
  board += energyColor * innerMark * chipFill * (0.08 + signalPulse * 0.18);

  vec2 pointerDelta = uv - uPointer;
  pointerDelta.x *= uResolution.x / max(uResolution.y, 1.0);
  float pointerGlow = exp(-length(pointerDelta) * 7.0) * uPointerActive;
  board += mix(cyanEnergy, greenEnergy, 0.55) * pointerGlow * 0.055;

  return board;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  uv.y = 1.0 - uv.y;

  vec2 px = 1.0 / uResolution;
  float hL = waterHeight(uv - vec2(px.x * 2.0, 0.0));
  float hR = waterHeight(uv + vec2(px.x * 2.0, 0.0));
  float hD = waterHeight(uv - vec2(0.0, px.y * 2.0));
  float hU = waterHeight(uv + vec2(0.0, px.y * 2.0));
  float height = waterHeight(uv);
  vec2 gradient = vec2(hR - hL, hU - hD) * 1.35;

  vec3 color = circuitBoard(uv, gradient);

  vec3 normal = normalize(vec3(-gradient * 30.0, 1.0));
  vec3 lightDirection = normalize(vec3(-0.28, -0.38, 0.88));
  float specular = pow(max(dot(normal, lightDirection), 0.0), 34.0);
  float crest = smoothstep(0.08, 0.34, abs(height));
  float waterShade = clamp(length(gradient) * 8.0, 0.0, 1.0);

  color += vec3(0.58, 0.86, 1.0) * specular * 0.54;
  color += vec3(0.14, 0.46, 0.62) * crest * 0.24;
  color += vec3(0.07, 0.18, 0.23) * waterShade * 0.18;

  float vignette = smoothstep(0.92, 0.28, length((uv - 0.5) * vec2(0.82, 1.0)));
  color *= 0.7 + vignette * 0.48;

  float scan = 0.008 * sin((uv.y * uResolution.y + uTime * 34.0) * 0.075);
  color += vec3(scan * 0.35, scan * 0.72, scan);

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

export function WaterSurface() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
    });

    if (!gl) {
      canvas.dataset.renderFallback = "true";
      return;
    }

    let program: WebGLProgram;
    try {
      program = createProgram(gl);
    } catch {
      canvas.dataset.renderFallback = "true";
      return;
    }

    const bindGpuProgram = gl.useProgram.bind(gl);
    const positionLocation = gl.getAttribLocation(program, "aPosition");
    const resolutionLocation = uniform(gl, program, "uResolution");
    const timeLocation = uniform(gl, program, "uTime");
    const scrollLocation = uniform(gl, program, "uScroll");
    const pointerLocation = uniform(gl, program, "uPointer");
    const pointerActiveLocation = uniform(gl, program, "uPointerActive");
    const rippleCountLocation = uniform(gl, program, "uRippleCount");
    const ripplesLocation = uniform(gl, program, "uRipples[0]");

    const buffer = gl.createBuffer();
    if (!buffer) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );

    bindGpuProgram(program);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const ripples: Ripple[] = [];
    const packedRipples = new Float32Array(MAX_RIPPLES * 4);
    let frame = 0;
    let width = 1;
    let height = 1;
    let dpr = 1;
    let pointerX = 0.5;
    let pointerY = 0.5;
    let pointerActive = 0;
    let lastBrushAt = 0;
    let lastBrushX = -1000;
    let lastBrushY = -1000;
    let scrollY = window.scrollY;

    const resize = () => {
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      dpr = Math.min(window.devicePixelRatio || 1, width < 760 ? 1.05 : 1.35);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const addRipple = (x: number, y: number, strength: number, born = performance.now()) => {
      ripples.push({ x, y, born, strength });
      while (ripples.length > MAX_RIPPLES) ripples.shift();
    };

    const brush = (x: number, y: number, now: number) => {
      addRipple(x, y, 0.2, now);
    };

    const stone = (x: number, y: number, now: number) => {
      addRipple(x, y, 0.98, now);
      addRipple(x, y, 0.68, now + 95);
      addRipple(x, y, 0.42, now + 190);
    };

    const normalizePointer = (event: PointerEvent) => {
      pointerX = event.clientX / Math.max(window.innerWidth, 1);
      pointerY = event.clientY / Math.max(window.innerHeight, 1);
      pointerActive = 1;
    };

    const onPointerMove = (event: PointerEvent) => {
      normalizePointer(event);
      if (reducedMotion.matches || event.pointerType === "touch") return;

      const now = performance.now();
      const dx = event.clientX - lastBrushX;
      const dy = event.clientY - lastBrushY;
      if (now - lastBrushAt > 62 && Math.hypot(dx, dy) > 18) {
        brush(pointerX, pointerY, now);
        lastBrushAt = now;
        lastBrushX = event.clientX;
        lastBrushY = event.clientY;
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      normalizePointer(event);
      if (!reducedMotion.matches) stone(pointerX, pointerY, performance.now());
    };

    const onPointerLeave = () => {
      pointerActive = 0;
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const uploadRipples = (now: number) => {
      for (let index = ripples.length - 1; index >= 0; index -= 1) {
        if (now - ripples[index].born > RIPPLE_LIFE_MS) ripples.splice(index, 1);
      }

      packedRipples.fill(0);
      ripples.forEach((ripple, index) => {
        const offset = index * 4;
        packedRipples[offset] = ripple.x;
        packedRipples[offset + 1] = ripple.y;
        packedRipples[offset + 2] = (now - ripple.born) / 1000;
        packedRipples[offset + 3] = ripple.strength;
      });

      gl.uniform1i(rippleCountLocation, ripples.length);
      gl.uniform4fv(ripplesLocation, packedRipples);
    };

    const render = (now: number) => {
      bindGpuProgram(program);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, reducedMotion.matches ? 0 : now / 1000);
      gl.uniform1f(scrollLocation, scrollY * dpr);
      gl.uniform2f(pointerLocation, pointerX, pointerY);
      gl.uniform1f(pointerActiveLocation, pointerActive);
      uploadRipples(now);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (!reducedMotion.matches) frame = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);

    if (reducedMotion.matches) render(0);
    else frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <div className="circuit-water-environment" aria-hidden="true">
      <div className="circuit-water-fallback" />
      <canvas ref={canvasRef} className="water-surface circuit-water-canvas" />
      <div className="circuit-water-glass" />
    </div>
  );
}
