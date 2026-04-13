"use client";

import { motion } from "motion/react";
import { content } from "@/lib/content";

export function Pricing() {
  const p = content.pricing;

  return (
    <section className="relative py-24 md:py-36 bg-[var(--color-paper-2)]/60 border-y border-[var(--color-rule)]">
      <div className="edge">
        <div className="flex items-baseline justify-between mb-10">
          <span className="ledger">{p.ledger}</span>
          <span className="ledger hidden md:inline">"от" prices</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 mb-16">
          <h2 className="kinetic-lg">
            <span>{p.heading.line1} </span>
            <span className="italic-accent text-[var(--color-flame)]">
              {p.heading.accent}
            </span>
          </h2>
          <p className="text-[17px] leading-[1.55] text-[var(--color-ink-2)] max-w-[52ch] self-end">
            {p.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {p.items.map((item, i) => (
            <motion.div
              key={item.kind}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="squircle bg-[var(--color-paper)] p-7 md:p-8 paper-inset flex flex-col"
            >
              <div className="flex items-baseline justify-between mb-6">
                <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-wider uppercase text-[var(--color-ink-3)]">
                  /0{i + 1}
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-ink-3)]">
                  {item.duration}
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-[32px] leading-tight mb-1">
                {item.kind}
              </h3>
              <p className="text-[13px] text-[var(--color-ink-3)] mb-6">
                {item.range}
              </p>
              <div className="mt-auto pt-6 border-t border-[var(--color-rule)]">
                <div className="font-[family-name:var(--font-display)] text-[34px] leading-none text-[var(--color-flame)]">
                  {item.price}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 p-6 md:p-7 squircle bg-[var(--color-ink)] text-[var(--color-paper)] flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-8"
          style={{ borderColor: "var(--color-ink)" }}
        >
          <span className="text-3xl">💡</span>
          <p className="flex-1 text-[14px] md:text-[15px] leading-[1.6] text-[var(--color-paper)]/90">
            {p.badge}
          </p>
          <a
            href={content.brand.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-flame)] text-[var(--color-paper)] rounded-full text-[13px] font-medium whitespace-nowrap hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)] transition-colors"
          >
            30-мин бриф →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
