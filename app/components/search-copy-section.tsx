const topics = [
  "anonymous chat online",
  "random stranger chat",
  "no signup chat",
  "temporary text chat",
  "private one-to-one chat",
  "chat without an account",
];

export function SearchCopySection() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-center text-xs font-semibold uppercase text-amber-100/80">
          Fast anonymous text chat for people who want privacy first
        </p>
        <h2 className="mt-3 text-center font-heading text-2xl font-semibold text-white sm:text-3xl">
          Random chat without profiles, uploads, or history
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-zinc-300 sm:text-base">
          Ghostline is a lightweight anonymous chat website for people who want a simple stranger
          chat, quick matching, and temporary conversations. It runs as one Render service with a
          Next.js frontend, Express backend, and Socket.IO realtime server.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {topics.map((topic) => (
            <span
              key={topic}
              className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-medium text-zinc-200"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
