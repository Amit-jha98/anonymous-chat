const faqs = [
  {
    question: "What is anonymous chat?",
    answer:
      "Anonymous chat lets you talk with another person without creating an account, sharing a profile, or attaching your name to the conversation.",
  },
  {
    question: "Is Ghostline a random stranger chat?",
    answer:
      "Yes. Ghostline matches you with one available stranger for a text-only session, and you can skip or end the chat whenever you want.",
  },
  {
    question: "Does Ghostline store messages?",
    answer:
      "No. Messages are sent through the realtime Socket.IO server and are not saved to a database or browser localStorage.",
  },
  {
    question: "Do I need to sign up?",
    answer:
      "No signup is required. Ghostline does not use usernames, passwords, email accounts, profiles, or authentication systems.",
  },
  {
    question: "Can I use Ghostline for private text chat?",
    answer:
      "Ghostline is built for temporary one-to-one text conversations. It avoids media uploads and keeps the session surface intentionally small.",
  },
  {
    question: "What happens when I leave a chat?",
    answer:
      "The room is broken immediately, the other person is notified, and the temporary session state is cleared from the in-memory queue.",
  },
];

export function FAQSection() {
  return (
    <section className="py-10">
      <h2 className="text-center font-heading text-2xl font-semibold text-white sm:text-3xl">
        Anonymous Chat Q&A
      </h2>
      <div className="mx-auto mt-6 grid max-w-4xl gap-3">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="glass group rounded-lg px-4 py-4 text-left"
          >
            <summary className="cursor-pointer list-none font-heading text-base font-semibold text-zinc-100 marker:hidden">
              <span className="flex items-center justify-between gap-4">
                {faq.question}
                <span className="text-lg leading-none text-teal-200 transition group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export { faqs };
