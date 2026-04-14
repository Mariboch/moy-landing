"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { content } from "@/lib/content";

type Idea = {
  title: string;
  description: string;
  budget: string;
  timeline: string;
};

type AnalyzeState = "idle" | "loading" | "streaming" | "complete" | "error";

export function AIAnalyzer() {
  const d = content.aiDemo;
  const [input, setInput] = useState("");
  const [state, setState] = useState<AnalyzeState>("idle");
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [streamBuffer, setStreamBuffer] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const charCount = input.length;
  const maxChars = 500;
  const isValid = charCount >= 15 && charCount <= maxChars;

  const handleExampleClick = (text: string) => {
    setInput(text);
    textareaRef.current?.focus();
  };

  const handleAnalyze = async () => {
    if (!isValid || state === "loading" || state === "streaming") return;

    setState("loading");
    setIdeas([]);
    setStreamBuffer("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessDescription: input }),
      });

      if (!res.ok || !res.body) {
        throw new Error("Ошибка ответа");
      }

      setState("streaming");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setStreamBuffer(acc);
      }

      // Parse final JSON
      try {
        const parsed: { ideas: Idea[] } = JSON.parse(acc);
        setIdeas(parsed.ideas);
        setState("complete");
      } catch {
        setState("error");
        setErrorMsg(d.fallbackError);
      }
    } catch {
      setState("error");
      setErrorMsg(d.fallbackError);
    }
  };

  const handleReset = () => {
    setState("idle");
    setIdeas([]);
    setStreamBuffer("");
    setErrorMsg("");
  };

  // Build telegram deep-link with context
  const tgLink = ideas.length
    ? `${content.brand.telegram}?text=${encodeURIComponent(
        `Привет! Я попробовал AI-анализатор на сайте.\n\nМой бизнес:\n${input}\n\nИнтересует идея: ${ideas[0].title}`
      )}`
    : content.brand.telegram;

  return (
    <section
      id="ai-demo"
      className="relative py-24 md:py-36 bg-[var(--color-grotto)] text-[var(--color-paper)] grotto-noise overflow-hidden"
    >
      {/* Dot grid background */}
      <div className="absolute inset-0 dotgrid opacity-60" />
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(158, 255, 79, 0.08), transparent 60%)",
        }}
      />

      <div className="edge relative z-10">
        {/* Ledger */}
        <div className="flex items-baseline justify-between mb-10">
          <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.18em] uppercase text-[var(--color-electric)]">
            {d.ledger}
          </span>
          <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.18em] uppercase text-white/40 hidden md:inline">
            powered by Claude + RAG
          </span>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <h2
            className="kinetic-xl text-[var(--color-paper)]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          >
            <span className="block whitespace-nowrap">{d.heading.line1}</span>
            <span className="block whitespace-nowrap">
              <span className="italic-accent text-[var(--color-electric)]">
                {d.heading.line2}
              </span>
            </span>
          </h2>
        </div>

        <p className="max-w-[56ch] text-[15px] md:text-[17px] leading-[1.6] text-white/70 mb-12">
          {d.sub}
        </p>

        {/* Terminal-style input box */}
        <div className="max-w-[760px]">
          <div
            className="squircle p-1 relative"
            style={{
              background: "linear-gradient(180deg, #1a1e2c 0%, #10131c 100%)",
              borderColor: "var(--color-grotto-rule)",
            }}
          >
            {/* Terminal chrome */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="h-[9px] w-[9px] rounded-full bg-[#ff5f56]" />
                <span className="h-[9px] w-[9px] rounded-full bg-[#ffbd2e]" />
                <span className="h-[9px] w-[9px] rounded-full bg-[var(--color-electric)]" />
                <span className="ml-3 font-[family-name:var(--font-mono)] text-[11px] text-white/50">
                  business-analyzer.agent
                </span>
              </div>
              <span
                id="char-count"
                className="font-[family-name:var(--font-mono)] text-[10px] text-white/40"
              >
                {charCount}/{maxChars}
              </span>
            </div>

            {/* Input area */}
            <div className="p-5">
              <label htmlFor="biz-desc" className="sr-only">
                Опишите свой бизнес
              </label>
              <div className="flex gap-3">
                <span className="font-[family-name:var(--font-mono)] text-[var(--color-electric)] text-[15px] pt-[2px] select-none">
                  &gt;
                </span>
                <textarea
                  ref={textareaRef}
                  id="biz-desc"
                  value={input}
                  onChange={(e) => setInput(e.target.value.slice(0, maxChars))}
                  placeholder={d.placeholder}
                  rows={5}
                  disabled={state === "loading" || state === "streaming"}
                  className="flex-1 bg-transparent outline-none font-[family-name:var(--font-mono)] text-[14px] text-white/90 placeholder:text-white/30 resize-none leading-[1.6] disabled:opacity-60"
                  aria-describedby="char-count"
                />
              </div>
            </div>

            {/* Examples + CTA */}
            <div className="px-5 pb-5">
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] uppercase text-white/40 mr-2">
                  примеры:
                </span>
                {d.examples.map((ex) => (
                  <button
                    key={ex.label}
                    onClick={() => handleExampleClick(ex.text)}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-white/15 rounded-full text-[12px] text-white/70 hover:text-[var(--color-electric)] hover:border-[var(--color-electric)]/50 transition-all duration-300"
                  >
                    <span aria-hidden="true">{ex.glyph}</span>
                    {ex.label}
                  </button>
                ))}
              </div>

              <button
                onClick={handleAnalyze}
                disabled={!isValid || state === "loading" || state === "streaming"}
                className="btn-grotto-flame w-full justify-center"
              >
                {state === "loading" || state === "streaming"
                  ? d.analyzingLabel
                  : d.analyzeLabel}
                {state === "idle" || state === "complete" || state === "error" ? (
                  <span className="ml-1">→</span>
                ) : (
                  <span className="cursor-blink ml-1" />
                )}
              </button>
            </div>
          </div>

          {/* Response area */}
          <AnimatePresence mode="wait">
            {state === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 font-[family-name:var(--font-mono)] text-[13px] text-[var(--color-electric)]"
              >
                <span className="cursor-blink mr-2" /> инициализация агента…
              </motion.div>
            )}

            {state === "streaming" && (
              <motion.div
                key="streaming"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6"
              >
                <div className="font-[family-name:var(--font-mono)] text-[12px] text-white/50 mb-2">
                  // стриминг ответа
                </div>
                <pre className="font-[family-name:var(--font-mono)] text-[12px] text-white/70 whitespace-pre-wrap break-words max-h-[200px] overflow-hidden">
                  {streamBuffer.slice(-400)}
                  <span className="cursor-blink" />
                </pre>
              </motion.div>
            )}

            {state === "complete" && ideas.length > 0 && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-8 space-y-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.15em] uppercase text-[var(--color-electric)]">
                    ▸ ответ агента · {ideas.length} идей
                  </span>
                  <button
                    onClick={handleReset}
                    className="font-[family-name:var(--font-mono)] text-[11px] text-white/50 hover:text-white"
                  >
                    ↻ сброс
                  </button>
                </div>

                {ideas.map((idea, i) => (
                  <motion.article
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2, duration: 0.6 }}
                    className="squircle p-6 border border-[var(--color-grotto-rule)] bg-[var(--color-grotto-2)]/80"
                  >
                    <div className="flex items-baseline gap-3 mb-3">
                      <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-electric)]">
                        #{String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-[family-name:var(--font-display)] text-[22px] leading-tight text-[var(--color-paper)]">
                        {idea.title}
                      </h3>
                    </div>
                    <p className="text-[14px] text-white/75 leading-[1.6] mb-4">
                      {idea.description}
                    </p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] pt-4 border-t border-white/10">
                      <div>
                        <span className="text-white/40 mr-2">💰 бюджет:</span>
                        <span className="text-[var(--color-electric)] font-[family-name:var(--font-mono)]">
                          {idea.budget}
                        </span>
                      </div>
                      <div>
                        <span className="text-white/40 mr-2">⏱ срок:</span>
                        <span className="text-white/90 font-[family-name:var(--font-mono)]">
                          {idea.timeline}
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))}

                {/* Post CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: ideas.length * 0.2 + 0.3 }}
                  className="squircle p-7 mt-6 text-center bg-[var(--color-electric)] text-[var(--color-grotto)]"
                  style={{ borderColor: "var(--color-electric)" }}
                >
                  <h3 className="font-[family-name:var(--font-display)] text-[26px] leading-tight mb-2">
                    {d.postCtaHeading}
                  </h3>
                  <p className="text-[14px] text-[var(--color-grotto)]/80 mb-5 max-w-[40ch] mx-auto">
                    {d.postCtaSub}
                  </p>
                  <a
                    href={tgLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-grotto)] text-[var(--color-electric)] rounded-full font-medium text-[14px] hover:bg-[var(--color-ink)] transition-colors"
                  >
                    {d.postCtaButton} →
                  </a>
                </motion.div>
              </motion.div>
            )}

            {state === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 squircle p-5 border border-[#ff5f56]/40 bg-[#ff5f56]/5"
              >
                <p className="text-[13px] text-white/80 mb-3">{errorMsg}</p>
                <a
                  href={content.brand.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[13px] text-[var(--color-electric)]"
                >
                  → Написать в Telegram
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
