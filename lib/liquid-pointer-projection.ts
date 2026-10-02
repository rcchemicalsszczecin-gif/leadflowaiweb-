export type RectLike = Pick<DOMRectReadOnly, "left" | "top" | "width" | "height">;

export type NormalizedPointer = {
  x: number;
  y: number;
  inside: boolean;
};

export type PerspectiveWaterProjection = {
  camera: Float32Array;
  forward: Float32Array;
  right: Float32Array;
  up: Float32Array;
  pointerWorld: Float32Array;
  surfacePoint: Float32Array;
  lens: number;
  valid: boolean;
};

const GLOBAL_WORLD_SCALE = 1.1;
const GLOBAL_SCROLL_RATE = 0.00022;
const GLOBAL_SCROLL_PERIOD = 2;
const GLOBAL_SCROLL_X = 0.24;
const GLOBAL_SCROLL_Y = -0.13;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const mix = (from: number, to: number, amount: number) => from + (to - from) * amount;

export function normalizePointerToRect(clientX: number, clientY: number, rect: RectLike): NormalizedPointer {
  const width = Math.max(1, rect.width);
  const height = Math.max(1, rect.height);
  const x = (clientX - rect.left) / width;
  const y = (clientY - rect.top) / height;
  return {
    x: clamp01(x),
    y: clamp01(y),
    inside: x >= 0 && x <= 1 && y >= 0 && y <= 1,
  };
}

export function writeGlobalPointerWorld(
  output: Float32Array,
  normalizedX: number,
  normalizedY: number,
  aspect: number,
  scrollY: number,
) {
  const scrollPhase = ((scrollY * GLOBAL_SCROLL_RATE) % GLOBAL_SCROLL_PERIOD + GLOBAL_SCROLL_PERIOD) % GLOBAL_SCROLL_PERIOD;
  output[0] = (normalizedX * 2 - 1) * aspect * GLOBAL_WORLD_SCALE + scrollPhase * GLOBAL_SCROLL_X;
  output[1] = (1 - normalizedY * 2) * GLOBAL_WORLD_SCALE + scrollPhase * GLOBAL_SCROLL_Y;
  return output;
}

export function createPerspectiveWaterProjection(): PerspectiveWaterProjection {
  return {
    camera: new Float32Array(3),
    forward: new Float32Array(3),
    right: new Float32Array(3),
    up: new Float32Array(3),
    pointerWorld: new Float32Array(2),
    surfacePoint: new Float32Array(3),
    lens: 1,
    valid: false,
  };
}

function normalize3(output: Float32Array, x: number, y: number, z: number) {
  const length = Math.hypot(x, y, z) || 1;
  output[0] = x / length;
  output[1] = y / length;
  output[2] = z / length;
}

function waterHeight(x: number, z: number, time: number) {
  let height = 0;
  height += Math.sin(x * 1.48 + time * 1.15) * 0.085;
  height += Math.sin(z * 1.72 - time * 0.92) * 0.068;
  height += Math.sin((x + z) * 2.34 + time * 0.66) * 0.036;
  height += Math.sin((x * 0.72 - z * 1.36) * 3.1 - time * 1.28) * 0.021;
  height += Math.sin(-time * 4.6) * 0.085;
  return height;
}

export function updatePerspectiveWaterProjection(
  output: PerspectiveWaterProjection,
  normalizedX: number,
  normalizedY: number,
  aspect: number,
  heroAmount: number,
  time: number,
  pointerActive: number,
) {
  const hero = clamp01(heroAmount);
  const cameraX = mix(0, 0.18, hero);
  const cameraY = mix(1.18, 1.48, hero);
  const cameraZ = mix(2.45, 2.86, hero);
  const targetX = mix(0, 0.36, hero) + (normalizedX - 0.5) * 0.12 * pointerActive;
  const targetY = mix(-0.05, -0.12, hero) + (0.5 - normalizedY) * 0.07 * pointerActive;
  const targetZ = mix(-1.15, -1.62, hero);

  output.camera[0] = cameraX;
  output.camera[1] = cameraY;
  output.camera[2] = cameraZ;
  normalize3(output.forward, targetX - cameraX, targetY - cameraY, targetZ - cameraZ);

  normalize3(output.right, -output.forward[2], 0, output.forward[0]);
  output.up[0] = -output.right[2] * output.forward[1];
  output.up[1] = output.right[2] * output.forward[0] - output.right[0] * output.forward[2];
  output.up[2] = output.right[0] * output.forward[1];
  output.lens = mix(1.62, 1.48, hero);

  const screenX = (normalizedX * 2 - 1) * aspect;
  const screenY = 1 - normalizedY * 2;
  const rayX = output.forward[0] * output.lens + output.right[0] * screenX + output.up[0] * screenY;
  const rayY = output.forward[1] * output.lens + output.right[1] * screenX + output.up[1] * screenY;
  const rayZ = output.forward[2] * output.lens + output.right[2] * screenX + output.up[2] * screenY;
  const rayLength = Math.hypot(rayX, rayY, rayZ) || 1;
  const dx = rayX / rayLength;
  const dy = rayY / rayLength;
  const dz = rayZ / rayLength;

  if (pointerActive <= 0 || dy > -0.025) {
    output.valid = false;
    output.pointerWorld[0] = 0;
    output.pointerWorld[1] = 0;
    output.surfacePoint[0] = 0;
    output.surfacePoint[1] = 0;
    output.surfacePoint[2] = 0;
    return output;
  }

  let travel = Math.max(0.01, cameraY / Math.max(-dy, 0.025));
  let pointX = cameraX + dx * travel;
  let pointY = cameraY + dy * travel;
  let pointZ = cameraZ + dz * travel;
  for (let index = 0; index < 4; index += 1) {
    const height = waterHeight(pointX, pointZ, time);
    travel -= (pointY - height) / Math.min(dy, -0.025);
    pointX = cameraX + dx * travel;
    pointY = cameraY + dy * travel;
    pointZ = cameraZ + dz * travel;
  }

  output.pointerWorld[0] = pointX;
  output.pointerWorld[1] = pointZ;
  output.surfacePoint[0] = pointX;
  output.surfacePoint[1] = pointY;
  output.surfacePoint[2] = pointZ;
  output.valid = true;
  return output;
}

export function reprojectPerspectivePointToCss(
  projection: PerspectiveWaterProjection,
  rect: RectLike,
  aspect: number,
) {
  const dx = projection.surfacePoint[0] - projection.camera[0];
  const dy = projection.surfacePoint[1] - projection.camera[1];
  const dz = projection.surfacePoint[2] - projection.camera[2];
  const forward = dx * projection.forward[0] + dy * projection.forward[1] + dz * projection.forward[2];
  const right = dx * projection.right[0] + dy * projection.right[1] + dz * projection.right[2];
  const up = dx * projection.up[0] + dy * projection.up[1] + dz * projection.up[2];
  const screenX = (right * projection.lens) / Math.max(forward, 0.00001);
  const screenY = (up * projection.lens) / Math.max(forward, 0.00001);
  const normalizedX = (screenX / Math.max(aspect, 0.00001) + 1) * 0.5;
  const normalizedY = (1 - screenY) * 0.5;
  return {
    x: rect.left + normalizedX * rect.width,
    y: rect.top + normalizedY * rect.height,
  };
}
