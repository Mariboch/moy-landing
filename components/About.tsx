"use client";

import { motion } from "motion/react";
import { content } from "@/lib/content";

export function About() {
  const a = content.about;

  return (
    <section id="about" className="relative py-24 md:py-36">
      <div className="edge">
        <div className="flex items-baseline justify-between mb-10">
          <span className="ledger">{a.ledger}</span>
          <span className="ledger hidden md:inline">first-person · warm</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20">
          {/* Visual block — stylized avatar card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              className="squircle aspect-[4/5] relative overflow-hidden"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 20%, #2a1f16, #121110 70%)",
              }}
            >
              {/* Decorative monogram */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="font-[family-name:var(--font-display)] text-[clamp(180px,30vw,320px)] leading-none text-[var(--color-paper)]/10"
                  style={{ fontWeight: 300 }}
                >
                  ЦМ
                </span>
              </div>

              {/* Animated diagonal lines */}
              <svg
                className="absolute inset-0 w-full h-full opacity-20"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                viewBox="0 0 400 500"
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <line
                    key={i}
                    x1={-100 + i * 60}
                    y1={-50}
                    x2={50 + i * 60}
                    y2={550}
                    stroke="var(--color-flame)"
                    strokeWidth="0.5"
                  />
                ))}
              </svg>

              {/* Bottom ledger */}
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                <div>
                  <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] uppercase text-[var(--color-electric)] mb-1">
                    operator
                  </div>
                  <div className="font-[family-name:var(--font-display)] text-[22px] text-[var(--color-paper)] leading-none">
                    Марина
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] uppercase text-white/50">
                    est.
                  </div>
                  <div className="font-[family-name:var(--font-mono)] text-[12px] text-white/80">
                    2021
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div
              className="absolute -top-4 -right-4 md:-right-6 squircle bg-[var(--color-flame)] text-[var(--color-paper)] px-4 py-2 rotate-[4deg]"
              style={{ boxShadow: "3px 3px 0 var(--color-ink)" }}
            >
              <div className="font-[family-name:var(--font-mono)] text-[10px] tracking-widest uppercase">
                available
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <div className="flex flex-col gap-8">
            <h2 className="kinetic-lg">
              <span>{a.heading.line1} </span>
              <span className="italic-accent text-[var(--color-flame)]">
                {a.heading.accent}
              </span>
            </h2>

            <div className="space-y-5 max-w-[58ch]">
              {a.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                  className="text-[16px] md:text-[17px] leading-[1.65] text-[var(--color-ink-2)]"
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* Principles */}
            <div className="border-t border-[var(--color-rule)] pt-6 mt-2">
              <div className="ledger mb-4">Принципы</div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {a.principles.map((pr, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14px] text-[var(--color-ink-2)]">
                    <span className="mt-[7px] h-[4px] w-[10px] bg-[var(--color-flame)] flex-shrink-0" />
                    <span>{pr}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3 mt-2">
              {a.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-rule)] text-[13px] hover:border-[var(--color-flame)] hover:text-[var(--color-flame)] transition-all"
                >
                  {l.label}
                  <span className="text-[var(--color-ink-3)]">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
