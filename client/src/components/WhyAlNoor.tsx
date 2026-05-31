/* ============================================================
   AL NOOR TENTS — Why Al Noor Section
   Dark overlay over tent background, 6 feature points with star icons
   ============================================================ */
import { useLanguage } from "@/contexts/LanguageContext";

const BG_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663716628401/jtD7vMJSJN7HQvsfcDy4th/hero-main-5xCAP7fo2MqgtdUHktAwG6.webp";
const WHATSAPP_URL = "https://wa.me/971500000000";

const StarIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function WhyAlNoor() {
  const { t, lang } = useLanguage();

  const features = [
    "why.f1", "why.f2", "why.f3",
    "why.f4", "why.f5", "why.f6",
  ];

  return (
    <section
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ background: "oklch(0.08 0.012 60)" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BG_IMAGE})` }}
      />
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "oklch(0.08 0.012 60 / 0.82)" }}
      />

      <div className="relative z-10 container">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="section-label justify-center">{t("why.label")}</div>
          <h2
            className="text-white mb-4"
            style={{
              fontFamily: lang === "ar" ? "'Amiri', serif" : "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              letterSpacing: lang === "ar" ? "0.02em" : "0.08em",
              textTransform: "uppercase",
            }}
          >
            {t("why.title")}
          </h2>
          <p
            className="text-white/55 max-w-xl mx-auto"
            style={{
              fontFamily: lang === "ar" ? "'Noto Naskh Arabic', sans-serif" : "'DM Sans', sans-serif",
              fontSize: "0.95rem",
              lineHeight: 1.8,
              fontWeight: 300,
            }}
          >
            {t("why.subtitle")}
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-14">
          {features.map((key, i) => (
            <div
              key={key}
              className="reveal flex flex-col items-center text-center gap-4"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div style={{ color: "oklch(0.72 0.12 75)" }}>
                <StarIcon />
              </div>
              <p
                className="text-white/85"
                style={{
                  fontFamily: lang === "ar" ? "'Noto Naskh Arabic', sans-serif" : "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: lang === "ar" ? "0" : "0.12em",
                  textTransform: lang === "ar" ? "none" : "uppercase",
                  lineHeight: 1.5,
                }}
              >
                {t(key)}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center reveal">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-gold">
            {t("why.cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
