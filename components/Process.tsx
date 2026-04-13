"use client";

import { motion } from "motion/react";
import { content } from "@/lib/content";

export function Process() {
  const p = content.process;

  return (
    <section id="process" className="relative py-24 md:py-36 bg-[var(--color-paper-2)]/60 border-y border-[var(--color-rule)]">
      <div className="edge">
        <div className="flex items-baseline justify-between mb-10">
          <span className="ledger">{p.ledger}</span>
          <span className="ledger hidden md:inline">5 stages · neo-brut</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-20 mb-16">
          <h2 className="kinetic-lg">
            <span className="block">{p.heading.line1}</span>
            <span className="block italic-accent text-[var(--color-flame)]">
              {p.heading.accent}
            </span>
          </h2>
          <p className="max-w-[52ch] text-[17px] leading-[1.55] text-[var(--color-ink-2)] self-end">
            {p.sub}
          </p>
        </div>

        {/* Steps — stacked rows with neo-brutal offset shadows */}
        <div className="space-y-4 md:space-y-5">
          {p.steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="squircle bg-[var(--color-paper)] group relative"
              style={{
                boxShadow: "4px 4px 0 var(--color-ink)",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-[110px_1fr_1fr_1fr_1fr] gap-4 md:gap-6 p-6 md:p-7 items-start">
                <div className="flex items-baseline gap-3">
                  <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-ink-3)] tracking-wider">
                    /{step.number}
                  </span>
                  <span className="font-[family-name:var(--font-display)] text-[28px] md:text-[36px] leading-none">
                    {step.title}
                  </span>
                </div>
                <div>
                  <StepLabel>длительность</StepLabel>
                  <div className="text-[14px] mt-1 text-[var(--color-flame)] font-[family-name:var(--font-mono)]">
                    {step.duration}
                  </div>
                </div>
                <div>
                  <StepLabel>что делаю я</StepLabel>
                  <div className="text-[14px] mt-1 text-[var(--color-ink-2)]">
                    {step.what}
                  </div>
                </div>
                <div>
                  <StepLabel>нужно от вас</StepLabel>
                  <div className="text-[14px] mt-1 text-[var(--color-ink-2)]">
                    {step.need}
                  </div>
                </div>
                <div>
                  <StepLabel>получаете</StepLabel>
                  <div className="text-[14px] mt-1 text-[var(--color-ink-2)]">
                    {step.get}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Principles */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {p.principles.map((pr, i) => (
            <motion.div
              key={pr.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-6 border-t-2 border-[var(--color-ink)]"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="h-[8px] w-[8px] bg-[var(--color-flame)] rounded-full" />
                <h4 className="font-[family-name:var(--font-display)] text-[20px] leading-tight">
                  {pr.label}
                </h4>
              </div>
              <p className="text-[14px] text-[var(--color-ink-2)] leading-[1.55]">
                {pr.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.18em] uppercase text-[var(--color-ink-3)]">
      {children}
    </div>
  );
}
