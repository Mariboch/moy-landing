"use client";

import { motion } from "motion/react";
import { content } from "@/lib/content";

export function TechStack() {
  const t = content.tech;

  return (
    <section className="relative py-24 md:py-36 border-t border-[var(--color-rule)]">
      <div className="edge">
        <div className="flex items-baseline justify-between mb-10">
          <span className="ledger">{t.ledger}</span>
          <span className="ledger hidden md:inline">24 items · 4 groups</span>
        </div>

        <h2 className="kinetic-lg mb-16 max-w-[16ch]">
          <span>{t.heading.line1} </span>
          <span className="italic-accent text-[var(--color-flame)]">
            {t.heading.accent}
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {t.groups.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative"
            >
              <div className="flex items-center gap-2 mb-5 pb-3 border-b border-[var(--color-rule)]">
                <span className="h-[10px] w-[10px] bg-[var(--color-flame)] rotate-45" />
                <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.18em] uppercase text-[var(--color-ink)]">
                  {group.label}
                </span>
              </div>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="font-[family-name:var(--font-display)] text-[20px] leading-[1.1] text-[var(--color-ink-2)] hover:text-[var(--color-flame)] transition-colors cursor-default"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
