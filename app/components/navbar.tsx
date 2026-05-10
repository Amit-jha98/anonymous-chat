import { MessageCircle } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="glass mt-1 flex items-center justify-between rounded-lg px-4 py-3 sm:px-5">
      <div className="flex min-w-0 items-center gap-2">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-300 text-slate-950">
          <MessageCircle size={18} />
        </span>
        <div className="min-w-0">
          <p className="truncate font-heading text-sm font-bold text-zinc-100">Ghostline</p>
          <p className="hidden text-[11px] text-zinc-400 min-[420px]:block">Anonymous random chat</p>
        </div>
      </div>
      <Link
        href="/chat"
        className="shrink-0 rounded-lg border border-teal-200/30 bg-teal-300/10 px-3 py-2 text-xs font-semibold text-teal-100 transition hover:border-teal-200/60 hover:bg-teal-300/15"
      >
        <span className="hidden sm:inline">Open chat</span>
        <span className="sm:hidden">Chat</span>
      </Link>
    </nav>
  );
}
