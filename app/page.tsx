import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { Services } from "@/components/Services";
import { AIAnalyzer } from "@/components/AIAnalyzer";
import { Process } from "@/components/Process";
import { About } from "@/components/About";
import { TechStack } from "@/components/TechStack";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <TrustStrip />
      <Services />
      <AIAnalyzer />
      <Process />
      <About />
      <TechStack />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
