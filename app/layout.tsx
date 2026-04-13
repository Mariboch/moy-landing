import type { Metadata } from "next";
import { Unbounded, Inter, JetBrains_Mono } from "next/font/google";
import { BackToTop } from "@/components/BackToTop";
import "./globals.css";

const display = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Цифровой мастер — сайты, приложения и AI-агенты для малого бизнеса",
  description:
    "Делаю сайты, приложения и AI-агентов, которые закрывают рутину малого бизнеса. Лендинг за 10 дней, приложение за 4 недели, AI-агент за 2 недели.",
  openGraph: {
    title: "Цифровой мастер — сайты, приложения и AI-агенты",
    description:
      "От лендинга за 10 дней до автономного AI-агента за месяц. Один человек на связи от брифа до запуска.",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      className={`${display.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body>
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
