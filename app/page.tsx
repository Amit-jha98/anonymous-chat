import { FeatureCards } from "@/app/components/feature-cards";
import { FAQSection, faqs } from "@/app/components/faq-section";
import { FloatingBackground } from "@/app/components/floating-background";
import { HeroSection } from "@/app/components/hero-section";
import { HowItWorks } from "@/app/components/how-it-works";
import { Navbar } from "@/app/components/navbar";
import { PrivacySection } from "@/app/components/privacy-section";
import { SearchCopySection } from "@/app/components/search-copy-section";

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Ghostline Chat",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://ghostline-chat.onrender.com",
    applicationCategory: "CommunicationApplication",
    operatingSystem: "Any",
    description:
      "Anonymous random stranger chat with realtime text-only sessions, no signup, no database storage, and temporary in-memory rooms.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
];

export default function Home() {
  return (
    <div className="app-gradient relative min-h-screen overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <FloatingBackground />
      <main className="relative mx-auto flex w-full max-w-6xl flex-col px-4 pb-14 pt-4 sm:px-8">
        <Navbar />
        <HeroSection />
        <SearchCopySection />
        <FeatureCards />
        <PrivacySection />
        <HowItWorks />
        <FAQSection />
        <footer className="mt-14 border-t border-white/10 py-8 text-center text-sm text-zinc-400">
          Ghostline Chat - Anonymous by design - No accounts, no database, no stored messages
        </footer>
      </main>
    </div>
  );
}
