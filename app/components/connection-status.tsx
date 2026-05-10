import type { ChatStatus } from "@/app/types/chat";

interface ConnectionStatusProps {
  connected: boolean;
  status: ChatStatus;
}

const labelByStatus: Record<ChatStatus, string> = {
  idle: "Initializing",
  waiting: "Looking for stranger",
  connected: "Connected",
  disconnected: "Disconnected",
};

export function ConnectionStatus({ connected, status }: ConnectionStatusProps) {
  return (
    <div className="glass flex flex-1 items-center gap-2 rounded-lg px-4 py-2 text-sm">
      <span
        className={`inline-flex h-2.5 w-2.5 rounded-full ${
          connected && status === "connected"
            ? "animate-pulse bg-teal-300"
            : status === "waiting"
              ? "animate-pulse bg-amber-400"
              : "bg-zinc-500"
        }`}
      />
      <p className="font-semibold text-zinc-100">{labelByStatus[status]}</p>
    </div>
  );
}
