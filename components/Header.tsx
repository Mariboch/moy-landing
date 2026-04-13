"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { content } from "@/lib/content";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // On non-home pages, rewrite "#section" → "/#section" so links jump to home and scroll.
  const resolveHref = (href: string) => {
    if (href.startsWith("#") && !isHome) return `/${href}`;
    return href;
  };

  const logoHref = isHome ? "#top" : "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-[var(--color-paper)]/80 border-b border-[var(--color-rule)]"
          : "bg-transparent"
      }`}
    >
      <div className="edge flex items-center justify-between py-5">
        {/* Logo monogram */}
        <a
          href={logoHref}
          className="flex items-center gap-3 group"
          aria-label="Цифровой мастер — главная"
        >
          <span
            className="inline-flex h-10 w-10 items-center justify-center squircle bg-[var(--color-ink)] text-[var(--color-paper)] transition-transform duration-500 group-hover:rotate-[-8deg]"
            style={{ borderColor: "var(--color-ink)" }}
          >
            <span className="font-[family-name:var(--font-display)] text-[15px] font-medium tracking-tight">
              {content.brand.monogram}
            </span>
          </span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="text-[13px] font-medium tracking-tight">
              {content.brand.name}
            </span>
            <span className="ledger text-[10px]">
              digital-master / v1
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {content.nav.map((item) => (
            <a
              key={item.href}
              href={resolveHref(item.href)}
              className="text-[14px] text-[var(--color-ink-2)] hover:text-[var(--color-flame)] transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <a
            href={content.brand.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-flame hidden sm:inline-flex text-[13px] py-2.5 px-5"
          >
            Написать <ArrowIcon />
          </a>

          {/* Mobile menu button */}
          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center squircle border border-[var(--color-rule)]"
            onClick={() => setOpen(!open)}
            aria-label="Меню"
            aria-expanded={open}
          >
            <span className="block w-4">
              <span
                className={`block h-[1.5px] bg-[var(--color-ink)] transition-all duration-400 ${
                  open ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] bg-[var(--color-ink)] mt-[4px] transition-all duration-400 ${
                  open ? "-translate-y-[2.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div className="md:hidden border-t border-[var(--color-rule)] bg-[var(--color-paper)]">
          <div className="edge py-6 flex flex-col gap-5">
            {!isHome && (
              <a
                href="/"
                onClick={() => setOpen(false)}
                className="ledger hover:text-[var(--color-flame)] transition-colors"
              >
                ← на главную
              </a>
            )}
            {content.nav.map((item) => (
              <a
                key={item.href}
                href={resolveHref(item.href)}
                onClick={() => setOpen(false)}
                className="text-2xl font-[family-name:var(--font-display)] tracking-tight"
              >
                {item.label}
              </a>
            ))}
            <a
              href={content.brand.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-flame mt-2 justify-center"
            >
              Написать в Telegram <ArrowIcon />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
