"use client";

import { motion } from "motion/react";
import { content } from "@/lib/content";

export function Services() {
  const s = content.services;

  return (
    <section id="services" className="relative py-24 md:py-36">
      <div className="edge">
        {/* Ledger */}
        <div className="flex items-baseline justify-between mb-10">
          <span className="ledger">{s.ledger}</span>
          <span className="ledger hidden md:inline">03 items · bento</span>
        </div>

        {/* Heading */}
        <h2 className="kinetic-lg max-w-[22ch]">
          <span className="block">{s.heading.line1}</span>
          <span className="block">{s.heading.line2}</span>
          <span className="block">
            <span className="italic-accent text-[var(--color-flame)]">{s.heading.accent}</span>
            {s.heading.tail}
          </span>
        </h2>

        {/* Bento grid */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {s.items.map((item, i) => (
            <ServiceCard key={item.number} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  item,
  index,
}: {
  item: (typeof content.services.items)[number];
  index: number;
}) {
  const featured = item.featured;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group squircle paper-inset p-7 md:p-8 flex flex-col transition-all duration-500 ${
        featured
          ? "bg-[var(--color-ink)] text-[var(--color-paper)] md:translate-y-6 lg:col-span-1 md:col-span-2"
          : "bg-[var(--color-paper-2)]"
      }`}
      style={featured ? { borderColor: "var(--color-ink)" } : undefined}
    >
      {/* Header row */}
      <div className="flex items-start justify-between mb-8">
        <span
          className={`font-[family-name:var(--font-mono)] text-[11px] tracking-[0.15em] uppercase ${
            featured ? "text-[var(--color-electric)]" : "text-[var(--color-ink-3)]"
          }`}
        >
          /{item.number}
        </span>
        <span
          className={`text-3xl leading-none ${
            featured ? "text-[var(--color-electric)]" : "text-[var(--color-flame)]"
          }`}
          aria-hidden="true"
        >
          {item.glyph}
        </span>
      </div>

      {/* Kind + tagline */}
      <div className="mb-7">
        <h3
          className={`font-[family-name:var(--font-display)] text-[42px] md:text-[46px] leading-[0.9] tracking-tight ${
            featured ? "text-[var(--color-paper)]" : ""
          }`}
        >
          {item.kind}
        </h3>
        <p
          className={`mt-2 text-[13px] ${
            featured ? "text-[var(--color-paper)]/60" : "text-[var(--color-ink-3)]"
          }`}
        >
          {item.tagline}
        </p>
      </div>

      {/* Meta grid */}
      <dl className="space-y-3 mb-7 text-[13px]">
        <MetaRow
          featured={featured}
          label="Для кого"
          value={item.audience}
        />
        <MetaRow
          featured={featured}
          label="Результат"
          value={item.result}
        />
        <MetaRow
          featured={featured}
          label="Срок"
          value={item.duration}
        />
      </dl>

      {/* Price */}
      <div
        className={`py-4 mb-6 border-y ${
          featured
            ? "border-white/10"
            : "border-[var(--color-rule)]"
        }`}
      >
        <div
          className={`font-[family-name:var(--font-display)] text-[26px] leading-none ${
            featured ? "" : "text-[var(--color-ink)]"
          }`}
        >
          {item.price}
        </div>
        <div
          className={`text-[11px] mt-1 font-[family-name:var(--font-mono)] tracking-wider ${
            featured ? "text-[var(--color-paper)]/50" : "text-[var(--color-ink-3)]"
          }`}
        >
          {item.priceDollar}
        </div>
      </div>

      {/* Bullets */}
      <ul className="space-y-2 mb-8 text-[13px] flex-1">
        {item.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2.5">
            <span
              className={`mt-[8px] h-[3px] w-[10px] flex-shrink-0 ${
                featured ? "bg-[var(--color-electric)]" : "bg-[var(--color-flame)]"
              }`}
            />
            <span
              className={
                featured ? "text-[var(--color-paper)]/85" : "text-[var(--color-ink-2)]"
              }
            >
              {b}
            </span>
          </li>
        ))}
      </ul>

      {/* Stack + CTA */}
      <div className="mt-auto">
        <div className="flex flex-wrap gap-1.5 mb-5">
          {item.stack.map((tech) => (
            <span
              key={tech}
              className={`text-[10px] font-[family-name:var(--font-mono)] tracking-wider uppercase px-2.5 py-1 border ${
                featured
                  ? "border-white/20 text-[var(--color-paper)]/70"
                  : "border-[var(--color-rule)] text-[var(--color-ink-3)]"
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
        <a
          href={item.featured ? "#ai-demo" : content.brand.telegram}
          target={item.featured ? undefined : "_blank"}
          rel={item.featured ? undefined : "noopener noreferrer"}
          className={`inline-flex items-center gap-2 text-[14px] font-medium group/cta ${
            featured
              ? "text-[var(--color-electric)]"
              : "text-[var(--color-ink)]"
          }`}
        >
          {item.cta}
          <span className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1">
            →
          </span>
        </a>
      </div>
    </motion.article>
  );
}

function MetaRow({
  label,
  value,
  featured,
}: {
  label: string;
  value: string;
  featured?: boolean;
}) {
  return (
    <div className="grid grid-cols-[80px_1fr] gap-4 items-baseline">
      <dt
        className={`font-[family-name:var(--font-mono)] text-[10px] tracking-wider uppercase ${
          featured ? "text-[var(--color-paper)]/50" : "text-[var(--color-ink-3)]"
        }`}
      >
        {label}
      </dt>
      <dd
        className={
          featured ? "text-[var(--color-paper)]/90" : "text-[var(--color-ink-2)]"
        }
      >
        {value}
      </dd>
    </div>
  );
}
