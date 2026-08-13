"use client";

import { useEffect, useRef } from "react";

type Ripple = {
  x: number;
  y: number;
  born: number;
  strength: number;
};

const MAX_RIPPLES = 8;
const RIPPLE_LIFE_MS = 3200;
const FRAME_INTERVAL_MS = 1000 / 45;

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
uniform vec2 uPointer;
uniform float uPointerActive;
uniform int uRippleCount;
uniform vec4 uRipples[${MAX_RIPPLES}];

float segmentMask(vec2 p, vec2 a, vec2 b, float width) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float denom = max(dot(ba, ba), 0.0001);
  float h = clamp(dot(pa, ba) / denom, 0.0, 1.0);
  float distanceToSegment = length(pa - ba * h);
  return 1.0 - smoothstep(width, width + 0.0025, distanceToSegment);
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
  return mask * exp(-pow(delta * 18.0, 2.0));
}

vec3 waterField(vec2 uv) {
  float height = 0.0;
  vec2 gradient = vec2(0.0);
  float aspect = uResolution.x / max(uResolution.y, 1.0);

  for (int i = 0; i < ${MAX_RIPPLES}; i++) {
    if (i >= uRippleCount) break;

    vec4 ripple = uRipples[i];
    float age = ripple.z;
    if (age < 0.0 || age > 3.2) continue;

    vec2 delta = uv - ripple.xy;
    delta.x *= aspect;
    float distanceToRipple = max(length(delta), 0.0008);
    float damping = 3.2 + age * 0.42;
    float envelope = exp(-distanceToRipple * damping) * exp(-age * 0.72);
    float phase = distanceToRipple * 76.0 - age * 10.5;
    float crest = sin(phase);
    float impact = exp(-distanceToRipple * 18.0) * exp(-age * 3.8);
    float wave = (crest * envelope + impact * 0.8) * ripple.w;

    float derivative = (
      (76.0 * cos(phase) - damping * crest) * envelope -
      14.4 * impact
    ) * ripple.w;

    vec2 direction = delta / distanceToRipple;
    gradient += direction * derivative;
    height += wave;
  }

  return vec3(height, gradient * 0.0105);
}

float energyNetwork(vec2 uv, out vec3 energyColor) {
  vec3 cyan = vec3(0.12, 0.72, 1.0);
  vec3 green = vec3(0.68, 1.0, 0.16);

  float cyanPulse = 0.0;
  cyanPulse += segmentPulse(uv, vec2(0.04, 0.24), vec2(0.32, 0.24), 0.0015, 0.17, 0.08);
  cyanPulse += segmentPulse(uv, vec2(0.32, 0.24), vec2(0.55, 0.43), 0.0015, 0.15, 0.28);
  cyanPulse += segmentPulse(uv, vec2(0.56, 0.72), vec2(0.88, 0.72), 0.0014, 0.19, 0.48);

  float greenPulse = 0.0;
  greenPulse += segmentPulse(uv, vec2(0.12, 0.82), vec2(0.38, 0.64), 0.0016, 0.14, 0.58);
  greenPulse += segmentPulse(uv, vec2(0.38, 0.64), vec2(0.66, 0.64), 0.0016, 0.16, 0.18);
  greenPulse += segmentPulse(uv, vec2(0.67, 0.17), vec2(0.93, 0.31), 0.0015, 0.13, 0.72);

  energyColor = cyan * cyanPulse + green * greenPulse;
  return max(cyanPulse, greenPulse);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  uv.y = 1.0 - uv.y;

  vec3 field = waterField(uv);
  float height = field.x;
  vec2 gradient = field.yz;

  vec3 normal = normalize(vec3(-gradient * 4.8, 1.0));
  vec3 lightDirection = normalize(vec3(-0.22, -0.34, 0.92));
  float specular = pow(max(dot(normal, lightDirection), 0.0), 42.0);
  float crest = smoothstep(0.075, 0.3, abs(height));
  float slope = clamp(length(gradient) * 4.8, 0.0, 1.0);

  vec3 energyColor;
  float energy = energyNetwork(uv, energyColor);

  vec2 pointerDelta = uv - uPointer;
  pointerDelta.x *= uResolution.x / max(uResolution.y, 1.0);
  float pointerGlow = exp(-length(pointerDelta) * 8.5) * uPointerActive;

  vec3 waterColor = vec3(0.46, 0.82, 1.0) * specular * 0.82;
  waterColor += vec3(0.12, 0.45, 0.62) * crest * 0.34;
  waterColor += vec3(0.1, 0.32, 0.42) * slope * 0.18;
  waterColor += energyColor * 0.92;
  waterColor += mix(vec3(0.12, 0.65, 1.0), vec3(0.68, 1.0, 0.16), 0.48) * pointerGlow * 0.035;

  float alpha = clamp(
    specular * 0.74 + crest * 0.22 + slope * 0.1 + energy * 0.68 + pointerGlow * 0.018,
    0.0,
    0.78
  );

  outColor = vec4(waterColor, alpha);
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
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      powerPreference: "default",
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
    const pointerLocation = uniform(gl, program, "uPointer");
    const pointerActiveLocation = uniform(gl, program, "uPointerActive");
    const rippleCountLocation = uniform(gl, program, "uRippleCount");
    const ripplesLocation = uniform(gl, program, "uRipples[0]");

    const buffer = gl.createBuffer();
    if (!buffer) return;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    bindGpuProgram(program);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

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
    let lastFrameAt = 0;

    const resize = () => {
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      dpr = Math.min(window.devicePixelRatio || 1, width < 900 ? 1 : 1.15);
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
      addRipple(x, y, 0.21, now);
    };

    const stone = (x: number, y: number, now: number) => {
      addRipple(x, y, 1.0, now);
      addRipple(x, y, 0.7, now + 95);
      addRipple(x, y, 0.44, now + 190);
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
      if (now - lastBrushAt > 68 && Math.hypot(dx, dy) > 20) {
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
      if (!reducedMotion.matches && now - lastFrameAt < FRAME_INTERVAL_MS) {
        frame = window.requestAnimationFrame(render);
        return;
      }
      lastFrameAt = now;

      bindGpuProgram(program);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, reducedMotion.matches ? 0 : now / 1000);
      gl.uniform2f(pointerLocation, pointerX, pointerY);
      gl.uniform1f(pointerActiveLocation, pointerActive);
      uploadRipples(now);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (!reducedMotion.matches) frame = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);

    if (reducedMotion.matches) render(0);
    else frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <div className="circuit-water-environment" aria-hidden="true">
      <div className="circuit-water-fallback realistic-board-photo" />
      <canvas ref={canvasRef} className="water-surface circuit-water-canvas" />
      <div className="circuit-water-glass" />
    </div>
  );
}
