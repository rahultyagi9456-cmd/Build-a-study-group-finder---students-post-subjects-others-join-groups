import { createReadStream, existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "data");
const storePath = path.join(dataDir, "store.json");
const PORT = Number(process.env.PORT || 3000);

const DEFAULT_STORE = {
  rooms: [
    {
      id: "common-lobby",
      name: "common-lobby",
      membersOnline: 12,
      messages: [
        {
          user: "Riya",
          text: "8 PM se derivation sprint start ho raha hai. Join if you're revising electrostatics.",
          time: "08:04 PM",
        },
        {
          user: "Aarav",
          text: "Kisi ke paas NLM ke tricky rotation questions hain kya?",
          time: "08:07 PM",
        },
      ],
    },
    {
      id: "placements-hub",
      name: "placements-hub",
      membersOnline: 9,
      messages: [
        {
          user: "Sana",
          text: "Aaj stack + monotonic queue revision karte hain. 25 mins me room live.",
          time: "07:42 PM",
        },
      ],
    },
    {
      id: "neet-revision",
      name: "neet-revision",
      membersOnline: 7,
      messages: [
        {
          user: "Krisha",
          text: "Biomolecules ke NCERT line-based questions add kar diye. Check pinned notes.",
          time: "06:58 PM",
        },
      ],
    },
  ],
};

const clients = new Set();

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".ico": "image/x-icon",
};

const sendJson = (res, statusCode, payload) => {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
};

const parseBody = (req) =>
  new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error("Request body too large."));
        req.destroy();
      }
    });
    req.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON body."));
      }
    });
    req.on("error", reject);
  });

const formatTime = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const normalizeRoomId = (name) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const ensureStore = async () => {
  await mkdir(dataDir, { recursive: true });
  if (!existsSync(storePath)) {
    await writeFile(storePath, JSON.stringify(DEFAULT_STORE, null, 2));
  }
};

const readStore = async () => {
  await ensureStore();
  const raw = await readFile(storePath, "utf8");
  return JSON.parse(raw);
};

const writeStore = async (store) => {
  await ensureStore();
  await writeFile(storePath, JSON.stringify(store, null, 2));
};

const broadcast = async () => {
  if (!clients.size) {
    return;
  }
  const store = await readStore();
  const payload = `event: rooms\ndata: ${JSON.stringify(store)}\n\n`;
  for (const res of clients) {
    res.write(payload);
  }
};

const serveStatic = (req, res, pathname) => {
  const requestedPath = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.join(__dirname, requestedPath);
  if (!filePath.startsWith(__dirname)) {
    sendJson(res, 403, { error: "Forbidden." });
    return;
  }

  if (!existsSync(filePath)) {
    sendJson(res, 404, { error: "Not found." });
    return;
  }

  const ext = path.extname(filePath);
  res.writeHead(200, {
    "Content-Type": mimeTypes[ext] || "application/octet-stream",
  });
  createReadStream(filePath).pipe(res);
};

const handleChatState = async (res) => {
  const store = await readStore();
  sendJson(res, 200, store);
};

const handleCreateRoom = async (req, res) => {
  const body = await parseBody(req);
  const name = String(body.name || "").trim();
  if (!name) {
    sendJson(res, 400, { error: "Room name is required." });
    return;
  }

  const roomId = normalizeRoomId(name);
  if (!roomId) {
    sendJson(res, 400, { error: "Room name is invalid." });
    return;
  }

  const store = await readStore();
  if (store.rooms.some((room) => room.id === roomId)) {
    sendJson(res, 409, { error: "Room already exists." });
    return;
  }

  const room = {
    id: roomId,
    name,
    membersOnline: 1,
    messages: [
      {
        user: "StudyVerse",
        text: `Room "${name}" created. Start the conversation and set the tone.`,
        time: formatTime(),
      },
    ],
  };

  store.rooms.unshift(room);
  await writeStore(store);
  await broadcast();
  sendJson(res, 201, room);
};

const handlePostMessage = async (req, res) => {
  const body = await parseBody(req);
  const roomId = String(body.roomId || "").trim();
  const user = String(body.user || "").trim();
  const text = String(body.text || "").trim();

  if (!roomId || !user || !text) {
    sendJson(res, 400, { error: "roomId, user, and text are required." });
    return;
  }

  const store = await readStore();
  const room = store.rooms.find((item) => item.id === roomId);
  if (!room) {
    sendJson(res, 404, { error: "Room not found." });
    return;
  }

  room.messages.push({
    user,
    text,
    time: formatTime(),
  });

  room.messages = room.messages.slice(-50);
  await writeStore(store);
  await broadcast();
  sendJson(res, 201, { ok: true });
};

const handleStream = async (res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "*",
  });

  clients.add(res);
  const store = await readStore();
  res.write(`event: rooms\ndata: ${JSON.stringify(store)}\n\n`);

  const heartbeat = setInterval(() => {
    res.write("event: heartbeat\ndata: ping\n\n");
  }, 15000);

  res.on("close", () => {
    clearInterval(heartbeat);
    clients.delete(res);
  });
};

const handleAi = async (req, res) => {
  if (!process.env.ANTHROPIC_API_KEY) {
    sendJson(res, 503, {
      error: "ANTHROPIC_API_KEY is not set on the server.",
    });
    return;
  }

  const body = await parseBody(req);
  const prompt = String(body.prompt || "").trim();
  const model = String(body.model || "claude-sonnet-4-20250514").trim();

  if (!prompt) {
    sendJson(res, 400, { error: "Prompt is required." });
    return;
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    sendJson(res, response.status, {
        error: errorText || "Anthropic request failed.",
    });
    return;
  }

  const data = await response.json();
  const outputText = (data.content || [])
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n\n");

  sendJson(res, 200, { text: outputText || "" });
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const { pathname } = url;

    if (req.method === "GET" && pathname === "/api/health") {
      sendJson(res, 200, {
        ok: true,
        aiEnabled: Boolean(process.env.ANTHROPIC_API_KEY),
      });
      return;
    }

    if (req.method === "GET" && pathname === "/api/chat/state") {
      await handleChatState(res);
      return;
    }

    if (req.method === "POST" && pathname === "/api/chat/rooms") {
      await handleCreateRoom(req, res);
      return;
    }

    if (req.method === "POST" && pathname === "/api/chat/messages") {
      await handlePostMessage(req, res);
      return;
    }

    if (req.method === "GET" && pathname === "/api/chat/stream") {
      await handleStream(res);
      return;
    }

    if (req.method === "POST" && pathname === "/api/ai") {
      await handleAi(req, res);
      return;
    }

    if (req.method === "GET") {
      serveStatic(req, res, pathname);
      return;
    }

    sendJson(res, 404, { error: "Not found." });
  } catch (error) {
    sendJson(res, 500, {
      error: error instanceof Error ? error.message : "Internal server error.",
    });
  }
});

await ensureStore();

server.listen(PORT, () => {
  console.log(`StudyVerse server running on http://localhost:${PORT}`);
});
