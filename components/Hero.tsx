"use client";

import { motion } from "motion/react";
import { content } from "@/lib/content";

const wordVariants = {
  hidden: { y: "110%", opacity: 0 },
  show: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.1 + i * 0.06,
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export function Hero() {
  const h = content.hero;
  const lines = [h.headline.line1, h.headline.line2, h.headline.line3, h.headline.line4, h.headline.line5];

  return (
    <section id="top" className="relative pt-14 md:pt-20 pb-24 md:pb-32 overflow-hidden">
      <div className="edge relative">
        {/* Ledger */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-between mb-10 md:mb-14"
        >
          <span className="ledger">{h.ledger}</span>
          <span className="ledger hidden md:inline">Available for projects</span>
        </motion.div>

        {/* Headline — kinetic */}
        <h1 className="kinetic-xl max-w-[18ch]">
          {lines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="show"
                className="inline-block will-change-transform"
              >
                {i === 2 ? (
                  <>
                    приложения и{" "}
                    <span className="italic-accent text-[var(--color-flame)]">AI-агентов,</span>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Sub + CTA grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 mt-14 md:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="max-w-[48ch]"
          >
            <p className="text-[17px] md:text-[19px] leading-[1.55] text-[var(--color-ink-2)]">
              {h.sub}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.78, duration: 0.7 }}
            className="flex flex-col gap-4 self-end"
          >
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={content.brand.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-flame"
              >
                {h.ctaPrimary}
                <ArrowIcon />
              </a>
              <a href="#ai-demo" className="btn-ghost">
                {h.ctaSecondary}
                <DownIcon />
              </a>
            </div>
            <p className="ledger max-w-[38ch] leading-[1.7]">
              {h.microCopy}
            </p>
          </motion.div>
        </div>

        {/* Decorative rule with hash markers */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 md:mt-28 origin-left border-t border-[var(--color-rule)] relative"
        >
          <div className="absolute -top-[5px] left-0 w-[10px] h-[10px] bg-[var(--color-ink)] rounded-full" />
          <div className="absolute -top-[5px] left-1/4 w-[10px] h-[10px] bg-[var(--color-paper)] border border-[var(--color-ink)] rounded-full" />
          <div className="absolute -top-[5px] left-1/2 w-[10px] h-[10px] bg-[var(--color-flame)] rounded-full" />
          <div className="absolute -top-[5px] left-3/4 w-[10px] h-[10px] bg-[var(--color-paper)] border border-[var(--color-ink)] rounded-full" />
          <div className="absolute -top-[5px] right-0 w-[10px] h-[10px] bg-[var(--color-ink)] rounded-full" />
        </motion.div>
      </div>

      {/* Aesthetic corner mark */}
      <div className="hidden lg:block absolute top-6 right-6 ledger opacity-60 rotate-90 origin-top-right">
        [ 01 · hero / kinetic-type ]
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 2V12M7 12L2.5 7.5M7 12L11.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
