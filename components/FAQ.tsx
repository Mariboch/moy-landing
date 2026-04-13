"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { content } from "@/lib/content";

export function FAQ() {
  const f = content.faq;
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="faq" className="relative py-24 md:py-36">
      <div className="edge">
        <div className="flex items-baseline justify-between mb-10">
          <span className="ledger">{f.ledger}</span>
          <span className="ledger hidden md:inline">{f.items.length} questions</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16">
          <div className="lg:sticky lg:top-28 self-start">
            <h2 className="kinetic-lg">
              <span className="block">{f.heading.line1}</span>
              <span className="block italic-accent text-[var(--color-flame)]">
                {f.heading.accent}
              </span>
            </h2>
            <p className="mt-6 text-[15px] text-[var(--color-ink-3)] max-w-[36ch]">
              Нажмите на вопрос, чтобы раскрыть ответ. Если не нашли свой — напишите в Telegram, отвечу лично.
            </p>
          </div>

          <div>
            {f.items.map((item, i) => (
              <FAQItem
                key={i}
                index={i}
                question={item.q}
                answer={item.a}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQItem({
  index,
  question,
  answer,
  isOpen,
  onToggle,
}: {
  index: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-t border-[var(--color-rule)] last:border-b">
      <button
        onClick={onToggle}
        className="w-full py-6 md:py-7 flex items-start gap-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-ink-3)] tracking-wider pt-2 flex-shrink-0 w-8">
          /{String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 font-[family-name:var(--font-display)] text-[22px] md:text-[28px] leading-[1.15] tracking-tight group-hover:text-[var(--color-flame)] transition-colors">
          {question}
        </span>
        <span
          className={`flex-shrink-0 h-8 w-8 flex items-center justify-center border border-[var(--color-rule)] rounded-full transition-all duration-500 ${
            isOpen ? "rotate-45 bg-[var(--color-flame)] text-[var(--color-paper)] border-[var(--color-flame)]" : ""
          }`}
          aria-hidden="true"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2V12M2 7H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-7 pl-[52px] pr-4 text-[15px] leading-[1.65] text-[var(--color-ink-2)] max-w-[62ch]">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
