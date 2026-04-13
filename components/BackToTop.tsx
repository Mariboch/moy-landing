"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const SHOW_AFTER = 420;

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          onClick={handleClick}
          aria-label="Наверх"
          title="Наверх"
          initial={{ opacity: 0, y: 18, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.85 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.94 }}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[60] group"
        >
          <span
            className="relative flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-[var(--color-paper)] text-[var(--color-ink)] border border-[var(--color-ink)] transition-colors duration-300 group-hover:bg-[var(--color-flame)] group-hover:text-[var(--color-paper)] group-hover:border-[var(--color-flame)]"
            style={{
              boxShadow:
                "0 6px 18px -8px rgba(24, 20, 14, 0.35), 0 2px 6px -2px rgba(24, 20, 14, 0.15)",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-y-[2px]"
            >
              <path
                d="M9 15V3M9 3L3 9M9 3L15 9"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {/* Decorative orbit ring */}
            <span
              className="pointer-events-none absolute inset-[-5px] rounded-full border border-dashed border-[var(--color-ink)]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-hidden="true"
            />
          </span>
          <span className="sr-only">Прокрутить наверх страницы</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
