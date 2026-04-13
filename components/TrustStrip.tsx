import { content } from "@/lib/content";

export function TrustStrip() {
  const items = content.trust.stack;
  const doubled = [...items, ...items];

  return (
    <section className="relative py-10 md:py-14 border-y border-[var(--color-rule)] bg-[var(--color-paper-2)]/70 overflow-hidden">
      <div className="edge mb-6 flex items-baseline justify-between">
        <span className="ledger-flame">{content.trust.ledger}</span>
        <span className="ledger hidden md:inline">scroll / inf</span>
      </div>

      <div className="relative">
        {/* Edge fades */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--color-paper-2)] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--color-paper-2)] to-transparent z-10 pointer-events-none" />

        <div className="marquee no-scrollbar">
          {doubled.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex items-center gap-4 flex-shrink-0"
            >
              <span className="h-[6px] w-[6px] rounded-full bg-[var(--color-ink)] opacity-50" />
              <span
                className="font-[family-name:var(--font-display)] text-[28px] md:text-[44px] tracking-tight text-[var(--color-ink)]"
                style={{ fontWeight: 400 }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
