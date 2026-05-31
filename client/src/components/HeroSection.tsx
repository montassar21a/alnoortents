/* ============================================================
   AL NOOR TENTS — Hero Section
   Full-screen cinematic tent image, dark overlay, 
   large display title, two CTAs
   ============================================================ */
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown } from "lucide-react";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663716628401/jtD7vMJSJN7HQvsfcDy4th/hero-main-5xCAP7fo2MqgtdUHktAwG6.webp";
const PHONE_NUMBER = "+97433555918";
const WHATSAPP_URL = "https://wa.me/97433555918";

export default function HeroSection() {
  const { t, lang } = useLanguage();

  const scrollToTents = () => {
    document.querySelector("#what-we-build")?.scrollIntoView({ behavior: "smooth" });
  };

  const titleLines = t("hero.title").split("\n");

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "oklch(0.08 0.012 60)" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      />

      {/* Dark overlay — gradient from top-dark to bottom-darker */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, oklch(0.08 0.012 60 / 0.55) 0%, oklch(0.08 0.012 60 / 0.70) 60%, oklch(0.08 0.012 60 / 0.92) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container flex flex-col items-center text-center px-4">
        {/* Label */}
        <div
          className="flex items-center gap-3 mb-6"
          style={{
            animation: "fadeInDown 800ms cubic-bezier(0.23,1,0.32,1) 200ms both",
          }}
        >
          <span style={{ width: "2rem", height: "1px", background: "oklch(0.72 0.12 75)", display: "block" }} />
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "oklch(0.72 0.12 75)",
              fontWeight: 500,
            }}
          >
            {t("hero.label")}
          </span>
          <span style={{ width: "2rem", height: "1px", background: "oklch(0.72 0.12 75)", display: "block" }} />
        </div>

        {/* Main title */}
        <h1
          className="text-white mb-6"
          style={{
            fontFamily: lang === "ar" ? "'Amiri', serif" : "'Cormorant Garamond', serif",
            fontSize: "clamp(2.8rem, 8vw, 7rem)",
            fontWeight: 700,
            letterSpacing: lang === "ar" ? "0.02em" : "0.08em",
            textTransform: "uppercase",
            lineHeight: 1.05,
            animation: "fadeInUp 900ms cubic-bezier(0.23,1,0.32,1) 350ms both",
          }}
        >
          {titleLines.map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          className="text-white/70 mb-10 max-w-xl"
          style={{
            fontFamily: lang === "ar" ? "'Noto Naskh Arabic', sans-serif" : "'DM Sans', sans-serif",
            fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
            fontWeight: 300,
            lineHeight: 1.7,
            letterSpacing: lang === "ar" ? "0" : "0.02em",
            animation: "fadeInUp 900ms cubic-bezier(0.23,1,0.32,1) 500ms both",
          }}
        >
          {t("hero.subtitle")}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-wrap gap-4 justify-center"
          style={{ animation: "fadeInUp 900ms cubic-bezier(0.23,1,0.32,1) 650ms both" }}
        >
          <a href={`tel:${PHONE_NUMBER}`} className="btn-gold">
            {t("hero.cta1")}
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-outline-gold">
            {t("hero.cta2")}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToTents}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/40 hover:text-[oklch(0.72_0.12_75)] transition-colors"
        style={{ animation: "bounce 2s infinite 1500ms" }}
        aria-label="Scroll down"
      >
        <ChevronDown size={24} strokeWidth={1.5} />
      </button>

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>
    </section>
  );
}
