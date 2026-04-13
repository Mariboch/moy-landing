"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { content } from "@/lib/content";

type FormState = "idle" | "submitting" | "success" | "error";

export function FinalCTA() {
  const c = content.cta;
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", contact: "", task: "" });
  const [consent, setConsent] = useState(false);
  const [showConsentError, setShowConsentError] = useState(false);

  const canSubmit =
    form.name.trim().length > 0 &&
    form.contact.trim().length > 2 &&
    form.task.trim().length > 4 &&
    consent;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setShowConsentError(true);
      return;
    }
    if (!form.name || !form.contact || !form.task) return;
    setShowConsentError(false);
    setState("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setState("success");
    } catch {
      setState("error");
    }
  };

  return (
    <section className="relative py-24 md:py-36 bg-[var(--color-ink)] text-[var(--color-paper)] overflow-hidden">
      {/* Decorative gradient blob */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(232, 93, 43, 0.18), transparent 55%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(250, 248, 243, 0.2) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="edge relative z-10">
        <div className="flex items-baseline justify-between mb-10">
          <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.18em] uppercase text-[var(--color-flame)]">
            {c.ledger}
          </span>
          <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.18em] uppercase text-white/40 hidden md:inline">
            time to talk
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-start">
          {/* Left — heading + alt contacts */}
          <div>
            <h2 className="kinetic-xl" style={{ color: "var(--color-paper)", fontSize: "clamp(2.75rem, 8vw, 7rem)" }}>
              <span className="block">{c.heading.line1}</span>
              <span className="block italic-accent text-[var(--color-flame)]">
                {c.heading.line2}
              </span>
            </h2>

            <p className="mt-8 max-w-[48ch] text-[16px] md:text-[18px] leading-[1.6] text-white/70">
              {c.sub}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={c.alternatives.primary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 bg-[var(--color-flame)] text-[var(--color-paper)] rounded-full font-medium text-[15px] hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)] transition-colors"
              >
                ✈ {c.alternatives.primary.label}
              </a>
              {c.alternatives.secondary.map((alt) => (
                <a
                  key={alt.label}
                  href={alt.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 text-[14px] hover:border-[var(--color-flame)] hover:text-[var(--color-flame)] transition-colors"
                >
                  {alt.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div
            className="squircle p-7 md:p-8 bg-[var(--color-grotto-2)]/50"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
          >
            <div className="mb-6 flex items-center gap-2">
              <span className="h-[8px] w-[8px] rounded-full bg-[var(--color-flame)] animate-pulse" />
              <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.18em] uppercase text-white/60">
                короткая форма
              </span>
            </div>

            <AnimatePresence mode="wait">
              {state !== "success" ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  <FormField
                    label={c.form.nameLabel}
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                    required
                  />
                  <FormField
                    label={c.form.contactLabel}
                    value={form.contact}
                    onChange={(v) => setForm({ ...form, contact: v })}
                    required
                  />
                  <FormField
                    label={c.form.taskLabel}
                    placeholder={c.form.taskPlaceholder}
                    value={form.task}
                    onChange={(v) => setForm({ ...form, task: v })}
                    multiline
                    required
                  />

                  <ConsentCheckbox
                    checked={consent}
                    onChange={(v) => {
                      setConsent(v);
                      if (v) setShowConsentError(false);
                    }}
                    error={showConsentError}
                  />

                  <button
                    type="submit"
                    disabled={state === "submitting" || !canSubmit}
                    className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 bg-[var(--color-flame)] text-[var(--color-paper)] rounded-full font-medium text-[15px] hover:bg-[var(--color-flame-2)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {state === "submitting" ? c.form.submitting : c.form.submit}
                    <span>→</span>
                  </button>

                  {state === "error" && (
                    <p className="text-[13px] text-[#ff8a7a]">{c.form.error}</p>
                  )}
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-8 text-center"
                >
                  <div className="text-4xl mb-4">✓</div>
                  <p className="text-[15px] leading-[1.6] text-white/85">
                    {c.form.success}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConsentCheckbox({
  checked,
  onChange,
  error,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  error: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="flex items-start gap-3 cursor-pointer group select-none">
        <span className="relative flex-shrink-0 mt-[2px]">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="peer sr-only"
            required
            aria-describedby="consent-desc"
          />
          <span
            className={`block h-[18px] w-[18px] rounded-[5px] border transition-all duration-200 ${
              error && !checked
                ? "border-[#ff8a7a] bg-[#ff8a7a]/10"
                : "border-white/30 bg-white/5"
            } peer-checked:border-[var(--color-flame)] peer-checked:bg-[var(--color-flame)] peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-flame)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--color-grotto-2)]`}
          />
          <svg
            className={`pointer-events-none absolute left-[3px] top-[3px] h-[12px] w-[12px] transition-all duration-200 ${
              checked ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 6L5 9L10 3"
              stroke="#121110"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span
          id="consent-desc"
          className="text-[12px] leading-[1.55] text-white/60 font-[family-name:var(--font-mono)]"
        >
          Даю согласие на обработку моих персональных данных (имя, контакт,
          текст задачи) для ответа на заявку в соответствии с{" "}
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 decoration-white/30 text-white/85 hover:text-[var(--color-flame)] hover:decoration-[var(--color-flame)]"
          >
            политикой конфиденциальности
          </a>{" "}
          и 152-ФЗ.{" "}
          <span className="text-[var(--color-flame)]">*</span>
        </span>
      </label>
      {error && !checked && (
        <p className="pl-[30px] text-[11px] text-[#ff8a7a] font-[family-name:var(--font-mono)]">
          Без согласия я не могу обработать вашу заявку
        </p>
      )}
    </div>
  );
}

function FormField({
  label,
  value,
  onChange,
  placeholder,
  multiline,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
  required?: boolean;
}) {
  const baseCls =
    "w-full bg-transparent border-0 border-b border-white/20 py-3 text-[15px] text-white/95 outline-none focus:border-[var(--color-flame)] transition-colors placeholder:text-white/25";

  return (
    <label className="block">
      <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] uppercase text-white/50">
        {label}
        {required && <span className="text-[var(--color-flame)] ml-1">*</span>}
      </span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          required={required}
          className={`${baseCls} resize-none`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={baseCls}
        />
      )}
    </label>
  );
}
