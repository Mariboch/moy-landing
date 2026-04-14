"use client";

import { usePathname } from "next/navigation";
import { content } from "@/lib/content";

export function Footer() {
  const f = content.footer;
  const pathname = usePathname();
  const isHome = pathname === "/";

  const resolveHref = (href: string) => {
    if (href.startsWith("#") && !isHome) return `/${href}`;
    return href;
  };

  const isExternal = (href: string) =>
    href.startsWith("http") || href.startsWith("mailto:");

  return (
    <footer className="relative pt-16 pb-10 border-t border-[var(--color-rule)] bg-[var(--color-paper)]">
      <div className="edge">
        {/* Big monogram line */}
        <div className="flex items-start justify-between gap-10 mb-14 pb-10 border-b border-[var(--color-rule)]">
          <div className="flex-1 min-w-0">
            <div
              className="font-[family-name:var(--font-display)] leading-[0.85] tracking-[-0.03em] text-[var(--color-ink)] whitespace-nowrap overflow-hidden"
              style={{ fontSize: "clamp(3rem, 14vw, 14rem)", fontWeight: 400 }}
            >
              digital · master
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-8 md:gap-12 mb-12">
          <div>
            <div className="ledger mb-4">Контакт</div>
            <a
              href={content.brand.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-display)] text-[24px] leading-tight hover:text-[var(--color-flame)] transition-colors block mb-2"
            >
              → Написать в Telegram
            </a>
            <a
              href={`mailto:${content.brand.email}`}
              className="font-[family-name:var(--font-mono)] text-[13px] text-[var(--color-ink-3)] hover:text-[var(--color-ink)] transition-colors"
            >
              {content.brand.email}
            </a>
          </div>

          <div>
            <div className="ledger mb-4">Навигация</div>
            <ul className="space-y-2 text-[14px]">
              {f.links.map((l) => {
                const external = isExternal(l.href);
                return (
                  <li key={l.label}>
                    <a
                      href={resolveHref(l.href)}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="text-[var(--color-ink-2)] hover:text-[var(--color-flame)] transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <div className="ledger mb-4">Соц. сети</div>
            <ul className="space-y-2 text-[14px]">
              <li>
                <a href={content.brand.github} target="_blank" rel="noopener noreferrer" className="text-[var(--color-ink-2)] hover:text-[var(--color-flame)] transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href={content.brand.telegram} target="_blank" rel="noopener noreferrer" className="text-[var(--color-ink-2)] hover:text-[var(--color-flame)] transition-colors">
                  Telegram
                </a>
              </li>
              <li>
                <a href={`mailto:${content.brand.email}`} className="text-[var(--color-ink-2)] hover:text-[var(--color-flame)] transition-colors">
                  Email
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="ledger mb-4">Статус</div>
            <div className="flex items-center gap-2 text-[13px] text-[var(--color-ink-2)] mb-2">
              <span className="h-[8px] w-[8px] rounded-full bg-[var(--color-flame)] animate-pulse" />
              Принимаю проекты
            </div>
            <div className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-ink-3)]">
              {f.updated}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-[var(--color-rule)]">
          <div className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-ink-3)] tracking-wider">
            © {f.year} · {f.byline}
          </div>
          <div className="flex items-center gap-5 font-[family-name:var(--font-mono)] text-[11px] tracking-wider">
            <a
              href="/privacy"
              className="text-[var(--color-ink-2)] hover:text-[var(--color-flame)] transition-colors"
            >
              Политика конфиденциальности
            </a>
            <span className="text-[var(--color-ink-3)]">
              [ next · motion · tailwind ]
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
