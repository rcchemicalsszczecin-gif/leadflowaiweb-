"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

const FRAME_INTERVAL_MS = 1000 / 45;
const COMPACT_FRAME_INTERVAL_MS = 1000 / 30;
const MAX_DPR = 1.25;
const COMPACT_DPR = 1;

type LiquidVariant = "hero" | "constructor";

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
uniform float uHero;

float waveHeight(vec2 p, float t, vec2 pointerWorld, float pointerActive) {
  float h = 0.0;
  h += sin(p.x * 1.48 + t * 1.15) * 0.085;
  h += sin(p.y * 1.72 - t * 0.92) * 0.068;
  h += sin((p.x + p.y) * 2.34 + t * 0.66) * 0.036;
  h += sin((p.x * 0.72 - p.y * 1.36) * 3.1 - t * 1.28) * 0.021;

  float pointerDistance = length(p - pointerWorld);
  float pointerRipple = sin(pointerDistance * 13.0 - t * 4.6) * exp(-pointerDistance * 2.85);
  h += pointerRipple * 0.085 * pointerActive;
  return h;
}

vec3 waterNormal(vec2 p, float t, vec2 pointerWorld, float pointerActive) {
  float e = 0.035;
  float left = waveHeight(p - vec2(e, 0.0), t, pointerWorld, pointerActive);
  float right = waveHeight(p + vec2(e, 0.0), t, pointerWorld, pointerActive);
  float back = waveHeight(p - vec2(0.0, e), t, pointerWorld, pointerActive);
  float front = waveHeight(p + vec2(0.0, e), t, pointerWorld, pointerActive);
  return normalize(vec3(left - right, e * 2.0, back - front));
}

vec3 skyColor(vec3 direction) {
  float horizon = smoothstep(-0.25, 0.62, direction.y);
  vec3 low = vec3(0.015, 0.045, 0.065);
  vec3 high = vec3(0.08, 0.34, 0.48);
  vec3 sky = mix(low, high, horizon);
  float cyanBand = exp(-abs(direction.y - 0.16) * 7.5) * 0.28;
  sky += vec3(0.08, 0.58, 0.78) * cyanBand;
  return sky;
}

float gridLine(float value, float scale) {
  float cell = abs(fract(value * scale) - 0.5);
  return 1.0 - smoothstep(0.465, 0.5, cell);
}

void main() {
  vec2 uv = gl_FragCoord.xy / max(uResolution, vec2(1.0));
  uv.y = 1.0 - uv.y;
  vec2 screen = uv * 2.0 - 1.0;
  screen.x *= uResolution.x / max(uResolution.y, 1.0);

  float hero = clamp(uHero, 0.0, 1.0);
  float pointerInfluence = uPointerActive * (1.0 - smoothstep(0.0, 1.25, length(screen)) * 0.2);
  vec2 pointerWorld = vec2(
    (uPointer.x - 0.5) * mix(3.2, 4.6, hero),
    mix(-3.0, 0.55, uPointer.y)
  );

  vec3 camera = mix(vec3(0.0, 1.18, 2.45), vec3(0.18, 1.48, 2.86), hero);
  vec3 target = mix(vec3(0.0, -0.05, -1.15), vec3(0.36, -0.12, -1.62), hero);
  target.x += (uPointer.x - 0.5) * 0.12 * pointerInfluence;
  target.y += (0.5 - uPointer.y) * 0.07 * pointerInfluence;

  vec3 forward = normalize(target - camera);
  vec3 right = normalize(cross(forward, vec3(0.0, 1.0, 0.0)));
  vec3 up = cross(right, forward);
  float lens = mix(1.62, 1.48, hero);
  vec3 ray = normalize(forward * lens + right * screen.x + up * screen.y);

  vec3 background = skyColor(ray);
  float atmosphere = exp(-length(screen - vec2(0.38 * hero, -0.08)) * 1.35);
  background += vec3(0.10, 0.55, 0.72) * atmosphere * 0.045;

  if (ray.y > -0.025) {
    float horizonGlow = exp(-abs(ray.y + 0.01) * 32.0);
    background += vec3(0.74, 1.0, 0.18) * horizonGlow * 0.045;
    outColor = vec4(background, mix(0.48, 0.72, hero));
    return;
  }

  float travel = max(0.01, camera.y / max(-ray.y, 0.025));
  vec3 point = camera + ray * travel;

  for (int i = 0; i < 4; i++) {
    float surfaceHeight = waveHeight(point.xz, uTime, pointerWorld, pointerInfluence);
    float error = point.y - surfaceHeight;
    travel -= error / min(ray.y, -0.025);
    point = camera + ray * travel;
  }

  vec3 normal = waterNormal(point.xz, uTime, pointerWorld, pointerInfluence);
  vec3 viewDirection = normalize(-ray);
  vec3 reflectedDirection = reflect(ray, normal);
  float fresnel = pow(1.0 - max(dot(normal, viewDirection), 0.0), 3.2);

  vec3 reflected = skyColor(reflectedDirection);
  float depthFade = 1.0 - exp(-max(travel, 0.0) * 0.18);
  vec3 deepWater = mix(vec3(0.008, 0.055, 0.075), vec3(0.015, 0.14, 0.17), 1.0 - depthFade);
  vec3 color = mix(deepWater, reflected, 0.28 + fresnel * 0.58);

  float gridX = gridLine(point.x, 0.58);
  float gridZ = gridLine(point.z, 0.58);
  float grid = max(gridX, gridZ);
  float gridFade = exp(-max(travel - 1.2, 0.0) * 0.16);
  color += vec3(0.08, 0.46, 0.58) * grid * gridFade * mix(0.09, 0.16, hero);

  vec3 keyLight = normalize(vec3(-0.35, 0.88, 0.28));
  vec3 rimLight = normalize(vec3(0.65, 0.58, -0.48));
  float specular = pow(max(dot(reflect(-keyLight, normal), viewDirection), 0.0), 82.0);
  float rim = pow(max(dot(reflect(-rimLight, normal), viewDirection), 0.0), 42.0);
  color += vec3(0.88, 1.0, 0.72) * specular * 1.2;
  color += vec3(0.12, 0.68, 0.9) * rim * 0.46;

  float causticA = sin(point.x * 7.4 + point.z * 5.9 + uTime * 1.7);
  float causticB = sin(point.x * 5.1 - point.z * 8.2 - uTime * 1.25);
  float caustic = pow(max(0.0, causticA * causticB), 3.0);
  color += vec3(0.20, 0.82, 0.88) * caustic * 0.11 * gridFade;

  float pointerDistance = length(point.xz - pointerWorld);
  float pointerGlow = exp(-pointerDistance * 2.9) * pointerInfluence;
  color += vec3(0.78, 1.0, 0.18) * pointerGlow * 0.24;

  float crest = smoothstep(0.055, 0.15, waveHeight(point.xz, uTime, pointerWorld, pointerInfluence));
  color += vec3(0.58, 0.88, 1.0) * crest * 0.07;

  float edgeVignette = 1.0 - smoothstep(0.68, 1.65, length(screen * vec2(0.76, 1.0)));
  color *= 0.72 + edgeVignette * 0.28;

  float alpha = mix(0.76, 0.94, hero);
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

export function V14LiquidSurface({ variant = "constructor" }: { variant?: LiquidVariant }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || window.location.hash !== "#liquid") return;
    const section = root.closest("#liquid");
    if (!section) return;

    const align = () => section.scrollIntoView({ block: "start" });
    align();
    const animationFrame = window.requestAnimationFrame(align);
    const timer = window.setTimeout(align, 250);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

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

    const position = gl.getAttribLocation(program, "aPosition");
    const resolution = getUniform(gl, program, "uResolution");
    const time = getUniform(gl, program, "uTime");
    const pointer = getUniform(gl, program, "uPointer");
    const pointerActive = getUniform(gl, program, "uPointerActive");
    const hero = getUniform(gl, program, "uHero");
    const buffer = gl.createBuffer();
    if (!buffer) return;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.useProgram(program);
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
      gl.useProgram(program);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform1f(time, now / 1000);
      gl.uniform2f(pointer, pointerX, pointerY);
      gl.uniform1f(pointerActive, pointerIsActive);
      gl.uniform1f(hero, variant === "hero" ? 1 : 0);
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
      const inside =
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom;
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
  }, [variant]);

  return (
    <div ref={rootRef} className="v14-liquid-surface" data-variant={variant} aria-hidden="true">
      <div className="v14-liquid-surface-fallback" />
      <canvas ref={canvasRef} className="v14-liquid-surface-canvas" />
      <div className="v14-liquid-surface-glass" />
    </div>
  );
}
