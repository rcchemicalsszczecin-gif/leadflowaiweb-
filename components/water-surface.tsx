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

float boxFill(vec2 p, vec2 halfSize, float feather) {
  return 1.0 - smoothstep(0.0, feather, sdBox(p, halfSize));
}

float boxEdge(vec2 p, vec2 halfSize, float thickness) {
  return 1.0 - smoothstep(thickness, thickness + 1.4, abs(sdBox(p, halfSize)));
}

float circleFill(vec2 p, float radius, float feather) {
  return 1.0 - smoothstep(radius, radius + feather, length(p));
}

float segmentMask(vec2 p, vec2 a, vec2 b, float width) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float denom = max(dot(ba, ba), 0.0001);
  float h = clamp(dot(pa, ba) / denom, 0.0, 1.0);
  float distanceToSegment = length(pa - ba * h);
  return 1.0 - smoothstep(width, width + 1.35, distanceToSegment);
}

float segmentPulse(vec2 p, vec2 a, vec2 b, float width, float speed, float phase) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float denom = max(dot(ba, ba), 0.0001);
  float h = clamp(dot(pa, ba) / denom, 0.0, 1.0);
  float mask = segmentMask(p, a, b, width);
  float head = fract(uTime * speed + phase);
  float delta = abs(h - head);
  delta = min(delta, 1.0 - delta);
  return mask * exp(-pow(delta * 17.0, 2.0));
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

vec3 hardwareBoard(vec2 uv, vec2 waterNormal) {
  vec2 distortedUv = uv + waterNormal * 0.027;
  vec2 world = distortedUv * uResolution;
  world.y += uScroll * 0.36;

  vec2 tileSize = vec2(760.0, 520.0);
  vec2 tileId = floor((world + tileSize * 0.5) / tileSize);
  vec2 q = mod(world + tileSize * 0.5, tileSize) - tileSize * 0.5;
  q.x += (mod(tileId.y, 2.0) - 0.5) * 54.0;

  float seed = hash21(tileId + 4.7);
  vec3 board = mix(vec3(0.006, 0.023, 0.036), vec3(0.008, 0.033, 0.047), seed);

  vec2 fineCell = fract(world / 34.0);
  float fineX = 1.0 - smoothstep(0.015, 0.045, abs(fineCell.x - 0.5));
  float fineY = 1.0 - smoothstep(0.015, 0.045, abs(fineCell.y - 0.5));
  board += vec3(0.018, 0.075, 0.095) * (fineX + fineY) * 0.16;

  vec3 copper = vec3(0.035, 0.22, 0.28);
  vec3 copperHot = vec3(0.08, 0.43, 0.5);
  vec3 cyanEnergy = vec3(0.12, 0.72, 1.0);
  vec3 greenEnergy = vec3(0.7, 1.0, 0.17);
  vec3 metal = vec3(0.17, 0.27, 0.31);

  vec2 cpu = vec2(-42.0, -12.0);
  float cpuPackage = boxFill(q - cpu, vec2(104.0, 92.0), 3.0);
  float cpuPackageEdge = boxEdge(q - cpu, vec2(104.0, 92.0), 2.2);
  float cpuSubstrate = boxFill(q - cpu, vec2(87.0, 75.0), 2.4);
  float cpuDie = boxFill(q - cpu, vec2(45.0, 38.0), 2.0);
  float cpuDieEdge = boxEdge(q - cpu, vec2(45.0, 38.0), 1.8);

  board = mix(board, vec3(0.018, 0.055, 0.062), cpuPackage * 0.94);
  board = mix(board, vec3(0.028, 0.075, 0.072), cpuSubstrate * 0.92);
  board = mix(board, vec3(0.055, 0.105, 0.12), cpuDie * 0.96);
  board += metal * cpuPackageEdge * 0.58;
  board += vec3(0.12, 0.5, 0.52) * cpuDieEdge * 0.72;

  float cpuBeat = 0.58 + 0.42 * sin(uTime * 1.4 + seed * 6.2831);
  float cpuCoreGlow = exp(-length(q - cpu) * 0.026) * cpuDie;
  board += mix(cyanEnergy, greenEnergy, 0.42) * cpuCoreGlow * (0.12 + cpuBeat * 0.12);

  float cpuContactGrid = 0.0;
  vec2 packageUv = (q - cpu + vec2(104.0, 92.0)) / vec2(208.0, 184.0);
  vec2 contacts = fract(packageUv * vec2(18.0, 15.0));
  float dotContact = circleFill(contacts - 0.5, 0.1, 0.055);
  cpuContactGrid = dotContact * cpuPackage * (1.0 - cpuSubstrate);
  board += vec3(0.15, 0.34, 0.31) * cpuContactGrid * 0.35;

  float vrmMask = 0.0;
  float vrmPulse = 0.0;
  for (int i = 0; i < 7; i++) {
    float fi = float(i);
    vec2 vrmPos = vec2(-285.0 + fi * 42.0, -174.0);
    float block = boxFill(q - vrmPos, vec2(15.0, 28.0), 2.0);
    float blockEdge = boxEdge(q - vrmPos, vec2(15.0, 28.0), 1.3);
    vrmMask += block;
    board = mix(board, vec3(0.035, 0.058, 0.066), block * 0.94);
    board += metal * blockEdge * 0.42;
    float phase = fract(uTime * 0.7 + fi * 0.13 + seed);
    vrmPulse += block * exp(-pow((phase - 0.5) * 4.2, 2.0));
  }

  for (int i = 0; i < 5; i++) {
    float fi = float(i);
    vec2 vrmPos = vec2(-286.0, -112.0 + fi * 45.0);
    float block = boxFill(q - vrmPos, vec2(28.0, 15.0), 2.0);
    float blockEdge = boxEdge(q - vrmPos, vec2(28.0, 15.0), 1.3);
    vrmMask += block;
    board = mix(board, vec3(0.035, 0.058, 0.066), block * 0.94);
    board += metal * blockEdge * 0.42;
    float phase = fract(uTime * 0.65 + fi * 0.17 + seed * 0.7);
    vrmPulse += block * exp(-pow((phase - 0.5) * 4.2, 2.0));
  }
  board += greenEnergy * vrmPulse * 0.22;

  for (int i = 0; i < 12; i++) {
    float fi = float(i);
    float angle = fi * 0.5235987 + seed * 0.35;
    vec2 capPos = cpu + vec2(cos(angle) * 142.0, sin(angle) * 120.0);
    float cap = circleFill(q - capPos, 7.2, 1.7);
    float capCore = circleFill(q - capPos, 3.1, 1.1);
    board = mix(board, vec3(0.06, 0.095, 0.105), cap * 0.88);
    board += vec3(0.22, 0.34, 0.34) * capCore * 0.34;
  }

  float ramTrace = 0.0;
  float ramEnergy = 0.0;
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    float slotX = 188.0 + fi * 31.0;
    vec2 slotPos = vec2(slotX, -12.0);
    float slot = boxFill(q - slotPos, vec2(7.0, 145.0), 1.6);
    float slotEdge = boxEdge(q - slotPos, vec2(7.0, 145.0), 1.0);
    float latchTop = boxFill(q - (slotPos + vec2(0.0, -158.0)), vec2(10.0, 6.0), 1.0);
    float latchBottom = boxFill(q - (slotPos + vec2(0.0, 158.0)), vec2(10.0, 6.0), 1.0);
    board = mix(board, vec3(0.022, 0.045, 0.054), slot * 0.96);
    board += metal * slotEdge * 0.42;
    board += vec3(0.17, 0.26, 0.27) * (latchTop + latchBottom) * 0.7;

    float contactBands = 1.0 - smoothstep(0.18, 0.38, abs(fract((q.y + 165.0) / 10.0) - 0.5));
    float contactsMask = slot * contactBands;
    board += vec3(0.16, 0.3, 0.21) * contactsMask * 0.24;

    float busOffset = (fi - 1.5) * 8.0;
    vec2 a = cpu + vec2(104.0, busOffset);
    vec2 b = vec2(128.0, cpu.y + busOffset);
    vec2 c = vec2(128.0, -112.0 + fi * 34.0);
    vec2 d = vec2(slotX - 14.0, -112.0 + fi * 34.0);
    ramTrace += segmentMask(q, a, b, 1.2);
    ramTrace += segmentMask(q, b, c, 1.2);
    ramTrace += segmentMask(q, c, d, 1.2);
    ramEnergy += segmentPulse(q, a, b, 2.4, 0.22, fi * 0.21 + seed);
    ramEnergy += segmentPulse(q, b, c, 2.4, 0.18, fi * 0.19 + seed * 0.6);
    ramEnergy += segmentPulse(q, c, d, 2.4, 0.24, fi * 0.17 + seed * 0.4);
  }
  board += copperHot * clamp(ramTrace, 0.0, 1.0) * 0.9;
  board += cyanEnergy * ramEnergy * 1.5;

  float powerTrace = 0.0;
  float powerEnergy = 0.0;
  for (int i = 0; i < 7; i++) {
    float fi = float(i);
    float offset = (fi - 3.0) * 6.2;
    vec2 a = vec2(-255.0, -130.0 + fi * 18.0);
    vec2 b = vec2(-194.0, -130.0 + fi * 18.0);
    vec2 c = cpu + vec2(-104.0, offset);
    powerTrace += segmentMask(q, a, b, 1.4);
    powerTrace += segmentMask(q, b, c, 1.4);
    powerEnergy += segmentPulse(q, a, b, 2.8, 0.2, fi * 0.11 + seed);
    powerEnergy += segmentPulse(q, b, c, 2.8, 0.16, fi * 0.09 + seed * 0.8);
  }
  board += copper * clamp(powerTrace, 0.0, 1.0) * 1.15;
  board += greenEnergy * powerEnergy * 1.8;

  float pcieTrace = 0.0;
  float pcieEnergy = 0.0;
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    float slotY = 128.0 + fi * 48.0;
    vec2 slotPos = vec2(28.0, slotY);
    float slot = boxFill(q - slotPos, vec2(205.0, 6.5), 1.2);
    float slotEdge = boxEdge(q - slotPos, vec2(205.0, 6.5), 0.9);
    board = mix(board, vec3(0.022, 0.04, 0.05), slot * 0.95);
    board += metal * slotEdge * 0.36;

    for (int lane = 0; lane < 5; lane++) {
      float fl = float(lane);
      float xOffset = (fl - 2.0) * 7.0;
      vec2 a = cpu + vec2(xOffset, 92.0);
      vec2 b = vec2(cpu.x + xOffset, 102.0 + fi * 17.0);
      vec2 c = vec2(-136.0 + fl * 16.0, 102.0 + fi * 17.0);
      vec2 d = vec2(-136.0 + fl * 16.0, slotY - 12.0);
      pcieTrace += segmentMask(q, a, b, 0.9);
      pcieTrace += segmentMask(q, b, c, 0.9);
      pcieTrace += segmentMask(q, c, d, 0.9);
      pcieEnergy += segmentPulse(q, b, c, 2.0, 0.25, fi * 0.23 + fl * 0.07 + seed);
    }
  }
  board += copper * clamp(pcieTrace, 0.0, 1.0) * 0.82;
  board += cyanEnergy * pcieEnergy * 1.25;

  vec2 m2Pos = vec2(-205.0, 112.0);
  float m2 = boxFill(q - m2Pos, vec2(68.0, 9.0), 1.4);
  float m2Edge = boxEdge(q - m2Pos, vec2(68.0, 9.0), 1.0);
  float m2Screw = circleFill(q - (m2Pos + vec2(-78.0, 0.0)), 5.0, 1.2);
  board = mix(board, vec3(0.026, 0.052, 0.058), m2 * 0.9);
  board += metal * m2Edge * 0.42;
  board += vec3(0.19, 0.28, 0.3) * m2Screw * 0.6;

  vec2 chipsetPos = vec2(250.0, 174.0);
  float chipset = boxFill(q - chipsetPos, vec2(45.0, 45.0), 2.0);
  float chipsetEdge = boxEdge(q - chipsetPos, vec2(45.0, 45.0), 1.4);
  float chipsetCore = boxFill(q - chipsetPos, vec2(25.0, 25.0), 1.4);
  board = mix(board, vec3(0.022, 0.048, 0.055), chipset * 0.94);
  board += copperHot * chipsetEdge * 0.42;
  board += cyanEnergy * chipsetCore * (0.035 + 0.025 * sin(uTime * 1.8 + seed * 7.0));

  float edgeTrace = 0.0;
  float edgeEnergy = 0.0;
  for (int i = 0; i < 9; i++) {
    float fi = float(i);
    float y = -220.0 + fi * 55.0;
    vec2 a = vec2(315.0, y);
    vec2 b = vec2(370.0, y);
    edgeTrace += segmentMask(q, a, b, 1.0);
    edgeEnergy += segmentPulse(q, a, b, 2.0, 0.18 + hash11(fi + seed) * 0.08, fi * 0.13 + seed);
  }
  board += copper * edgeTrace * 0.75;
  board += mix(cyanEnergy, greenEnergy, 0.35) * edgeEnergy * 1.1;

  float tileBoundaryX = 1.0 - smoothstep(1.0, 2.2, abs(abs(q.x) - tileSize.x * 0.5 + 8.0));
  float tileBoundaryY = 1.0 - smoothstep(1.0, 2.2, abs(abs(q.y) - tileSize.y * 0.5 + 8.0));
  board += vec3(0.05, 0.14, 0.17) * (tileBoundaryX + tileBoundaryY) * 0.18;

  vec2 pointerDelta = uv - uPointer;
  pointerDelta.x *= uResolution.x / max(uResolution.y, 1.0);
  float pointerGlow = exp(-length(pointerDelta) * 7.5) * uPointerActive;
  board += mix(cyanEnergy, greenEnergy, 0.48) * pointerGlow * 0.065;

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

  vec3 color = hardwareBoard(uv, gradient);

  vec3 normal = normalize(vec3(-gradient * 30.0, 1.0));
  vec3 lightDirection = normalize(vec3(-0.28, -0.38, 0.88));
  float specular = pow(max(dot(normal, lightDirection), 0.0), 34.0);
  float crest = smoothstep(0.08, 0.34, abs(height));
  float waterShade = clamp(length(gradient) * 8.0, 0.0, 1.0);

  color += vec3(0.58, 0.86, 1.0) * specular * 0.54;
  color += vec3(0.14, 0.46, 0.62) * crest * 0.24;
  color += vec3(0.07, 0.18, 0.23) * waterShade * 0.18;

  float vignette = smoothstep(0.98, 0.22, length((uv - 0.5) * vec2(0.78, 0.96)));
  color *= 0.78 + vignette * 0.38;

  float scan = 0.006 * sin((uv.y * uResolution.y + uTime * 34.0) * 0.075);
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
      dpr = Math.min(window.devicePixelRatio || 1, width < 760 ? 1.0 : 1.25);
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
