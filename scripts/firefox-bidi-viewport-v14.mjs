const [webSocketUrl, widthArg, heightArg] = process.argv.slice(2);

const fail = (message) => {
  console.error(`FIREFOX_BIDI_VIEWPORT_FAIL: ${message}`);
  process.exit(1);
};

if (!webSocketUrl || !widthArg || !heightArg) {
  fail("usage: node scripts/firefox-bidi-viewport-v14.mjs <webSocketUrl> <width> <height>");
}

const width = Number(widthArg);
const height = Number(heightArg);
if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1) {
  fail(`invalid viewport ${widthArg}x${heightArg}`);
}

if (typeof WebSocket !== "function") {
  fail("global WebSocket is unavailable in this Node runtime");
}

const socket = new WebSocket(webSocketUrl);
let nextId = 1;
const pending = new Map();

const timeout = setTimeout(() => {
  fail("BiDi command timeout");
}, 8000);

socket.addEventListener("message", (event) => {
  let message;
  try {
    message = JSON.parse(String(event.data));
  } catch {
    return;
  }

  if (!message.id || !pending.has(message.id)) return;
  const { resolve, reject } = pending.get(message.id);
  pending.delete(message.id);

  if (message.type === "error" || message.error) {
    reject(new Error(`${message.error ?? "unknown"}: ${message.message ?? "BiDi command failed"}`));
    return;
  }

  resolve(message.result ?? {});
});

const command = (method, params) => {
  const id = nextId++;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
};

await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", () => reject(new Error("WebSocket connection failed")), { once: true });
});

try {
  const tree = await command("browsingContext.getTree", {});
  const context = tree.contexts?.[0]?.context;
  if (!context) fail("top-level browsing context not found");

  await command("browsingContext.setViewport", {
    context,
    viewport: { width, height },
    devicePixelRatio: 1,
  });

  console.log(`FIREFOX_BIDI_VIEWPORT_PASS context=${context} viewport=${width}x${height}`);
} catch (error) {
  fail(error instanceof Error ? error.message : String(error));
} finally {
  clearTimeout(timeout);
  socket.close();
}
