import { MessageCircle } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="glass mt-1 flex items-center justify-between rounded-lg px-4 py-3 sm:px-5">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-teal-300 text-slate-950">
          <MessageCircle size={18} />
        </span>
        <div>
          <p className="font-heading text-sm font-bold text-zinc-100">Ghostline</p>
          <p className="text-[11px] text-zinc-400">Anonymous random chat</p>
        </div>
      </div>
      <Link
        href="/chat"
        className="rounded-lg border border-teal-200/30 bg-teal-300/10 px-3 py-2 text-xs font-semibold text-teal-100 transition hover:border-teal-200/60 hover:bg-teal-300/15"
      >
        Open chat
      </Link>
    </nav>
  );
}
