"use client";

import { useEffect, useRef } from "react";

const FRAME_INTERVAL_MS = 1000 / 45;
const COMPACT_FRAME_INTERVAL_MS = 1000 / 30;
const MAX_DPR = 1.25;
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
uniform vec2 uPointer;
uniform float uPointerActive;

float ring(vec2 p, vec2 center, float radius, float width) {
  float d = abs(length(p - center) - radius);
  return 1.0 - smoothstep(width, width + 0.008, d);
}

void main() {
  vec2 uv = gl_FragCoord.xy / max(uResolution, vec2(1.0));
  uv.y = 1.0 - uv.y;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 p = uv - vec2(0.5, 0.58);
  p.x *= aspect;

  float distanceField = length(p);
  float wave = sin(distanceField * 44.0 - uTime * 2.4) * exp(-distanceField * 4.2);
  float wave2 = sin((p.x * 2.2 + p.y) * 18.0 + uTime * 1.2) * 0.22;
  float liquid = smoothstep(0.05, 0.72, abs(wave + wave2) * 0.58);

  float gridX = 1.0 - smoothstep(0.0, 0.025, abs(fract(uv.x * 14.0) - 0.5));
  float gridY = 1.0 - smoothstep(0.0, 0.025, abs(fract(uv.y * 10.0) - 0.5));
  float grid = (gridX + gridY) * 0.08;

  vec2 pointer = uv - uPointer;
  pointer.x *= aspect;
  float pointerGlow = exp(-length(pointer) * 7.5) * uPointerActive;

  float pulseA = ring(vec2(p.x, p.y * 0.82), vec2(-0.16, 0.05), 0.23 + 0.025 * sin(uTime), 0.012);
  float pulseB = ring(vec2(p.x, p.y * 0.82), vec2(0.23, -0.03), 0.31 + 0.02 * cos(uTime * 0.8), 0.01);

  vec3 cyan = vec3(0.11, 0.66, 1.0);
  vec3 green = vec3(0.78, 1.0, 0.18);
  vec3 color = cyan * (liquid * 0.58 + grid);
  color += green * (pulseA * 0.36 + pulseB * 0.18 + pointerGlow * 0.2);
  color += vec3(0.72, 0.9, 1.0) * max(wave, 0.0) * 0.14;

  float alpha = clamp(liquid * 0.38 + grid * 0.45 + pulseA * 0.28 + pulseB * 0.15 + pointerGlow * 0.08, 0.0, 0.58);
  outColor = vec4(color, alpha);
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

function getUniform(gl: WebGL2RenderingContext, program: WebGLProgram, name: string) {
  const location = gl.getUniformLocation(program, name);
  if (!location) throw new Error(`missing uniform ${name}`);
  return location;
}

export function V14LiquidSurface() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    if (window.location.hash === "#liquid") {
      window.requestAnimationFrame(() => root.closest("#liquid")?.scrollIntoView({ block: "start" }));
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    const compactRender = window.matchMedia("(max-width: 899px), (pointer: coarse)");

    if (reducedMotion.matches) {
      root.dataset.renderFallback = "reduced-motion";
      return;
    }

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      powerPreference: compactRender.matches ? "low-power" : "default",
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
    const resolution = getUniform(gl, program, "uResolution");
    const time = getUniform(gl, program, "uTime");
    const pointer = getUniform(gl, program, "uPointer");
    const pointerActive = getUniform(gl, program, "uPointerActive");
    const buffer = gl.createBuffer();
    if (!buffer) return;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    bindProgram(program);
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    let frame = 0;
    let lastFrameAt = 0;
    let pageVisible = !document.hidden;
    let sceneVisible = false;
    let pointerX = 0.5;
    let pointerY = 0.5;
    let pointerIsActive = 0;

    const resize = () => {
      const bounds = root.getBoundingClientRect();
      const width = Math.max(1, bounds.width);
      const height = Math.max(1, bounds.height);
      const dpr = Math.min(window.devicePixelRatio || 1, compactRender.matches ? COMPACT_DPR : MAX_DPR);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const render = (now: number) => {
      frame = 0;
      if (!pageVisible || !sceneVisible) return;
      const frameInterval = compactRender.matches ? COMPACT_FRAME_INTERVAL_MS : FRAME_INTERVAL_MS;
      if (now - lastFrameAt < frameInterval) {
        frame = window.requestAnimationFrame(render);
        return;
      }
      lastFrameAt = now;
      bindProgram(program);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform1f(time, now / 1000);
      gl.uniform2f(pointer, pointerX, pointerY);
      gl.uniform1f(pointerActive, pointerIsActive);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      frame = window.requestAnimationFrame(render);
    };

    const startRendering = () => {
      if (frame || !pageVisible || !sceneVisible) return;
      lastFrameAt = 0;
      frame = window.requestAnimationFrame(render);
    };

    const stopRendering = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = root.getBoundingClientRect();
      const inside = event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
      if (!inside) {
        pointerIsActive = 0;
        return;
      }
      pointerX = (event.clientX - bounds.left) / Math.max(bounds.width, 1);
      pointerY = (event.clientY - bounds.top) / Math.max(bounds.height, 1);
      pointerIsActive = 1;
    };

    const onVisibilityChange = () => {
      pageVisible = !document.hidden;
      if (pageVisible) startRendering();
      else stopRendering();
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        sceneVisible = entry.isIntersecting && entry.intersectionRatio > 0.02;
        if (sceneVisible) startRendering();
        else stopRendering();
      },
      { threshold: [0, 0.02, 0.2] },
    );

    const resizeObserver = new ResizeObserver(resize);
    resize();
    resizeObserver.observe(root);
    intersectionObserver.observe(root);
    if (finePointer.matches) window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stopRendering();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (finePointer.matches) window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <div ref={rootRef} className="v14-liquid-surface" aria-hidden="true">
      <div className="v14-liquid-surface-fallback" />
      <canvas ref={canvasRef} className="v14-liquid-surface-canvas" />
      <div className="v14-liquid-surface-glass" />
    </div>
  );
}
