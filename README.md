# Ghostline Chat

Anonymous one-to-one text chat built as one deployable Render service:

- Next.js frontend
- Express backend
- Socket.IO realtime server
- Temporary in-memory matchmaking only

## Product Principles

- No login or signup
- No profiles or usernames
- No media uploads
- No database storage
- No browser localStorage for messages
- Text-only realtime chat
- Session state disappears when users leave or the service restarts

## Stack

- Frontend: Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, Three.js, Sonner, Lucide
- Backend: Express served from `server/server.ts`
- Realtime: Socket.IO served from the same Node process
- State: process memory inside `server/matchmaking/matchmaker.ts`

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

`npm run dev` starts the custom Express server, prepares Next.js, and attaches Socket.IO in the same process.

## Render Deployment

Use one Render Web Service.

```bash
Build Command: npm run render-build
Start Command: npm start
```

Recommended environment variables:

```bash
NODE_ENV=production
PORT=10000
NEXT_PUBLIC_APP_URL=https://your-render-service.onrender.com
SOCKET_CORS_ORIGIN=https://your-render-service.onrender.com
```

`PORT` is provided automatically by Render, so only set it manually if your service needs an explicit value.

The included `render.yaml` defines one web service and does not create a database.

## Realtime Events

Client to server:

- `find-partner`
- `send-message`
- `typing`
- `stop-typing`
- `skip-chat`
- `disconnect-chat`

Server to client:

- `waiting`
- `matched`
- `receive-message`
- `stranger-typing`
- `stranger-stop-typing`
- `stranger-disconnected`
- `system-message`

## Health Check

```bash
GET /api/health
```

Returns the service runtime, transport, storage mode, uptime, and timestamp.

## Scaling Note

This app is intentionally memory-only for privacy. Run a single Render instance so active queues and pairs stay in one Node process. Restarting the service clears active sessions by design.
