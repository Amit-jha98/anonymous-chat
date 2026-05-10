import express from "express";
import http from "node:http";
import next from "next";
import { Server } from "socket.io";
import { registerChatHandlers } from "./sockets/register-handlers";

const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0";
const port = Number(process.env.PORT || 3000);

async function bootstrap() {
  const app = next({ dev, hostname, port });
  const handle = app.getRequestHandler();

  await app.prepare();

  const expressApp = express();
  expressApp.disable("x-powered-by");
  expressApp.use(express.json({ limit: "32kb" }));

  expressApp.get("/api/health", (_req, res) => {
    res.json({
      ok: true,
      service: "ghostline-chat",
      runtime: "render-single-service",
      transport: "socket.io",
      storage: "memory",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });

  const server = http.createServer(expressApp);
  const corsOrigin = process.env.SOCKET_CORS_ORIGIN || process.env.NEXT_PUBLIC_APP_URL || "*";

  const io = new Server(server, {
    cors: {
      origin: corsOrigin === "*" ? "*" : corsOrigin.split(",").map((origin) => origin.trim()),
      methods: ["GET", "POST"],
    },
  });

  registerChatHandlers(io);

  expressApp.use((req, res) => handle(req, res));

  server.listen(port, hostname, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
}

bootstrap().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
