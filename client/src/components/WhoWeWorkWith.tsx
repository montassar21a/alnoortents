/* ============================================================
   AL NOOR TENTS — Who We Work With Section
   6 sector cards with icons and descriptions
   ============================================================ */
import { useLanguage } from "@/contexts/LanguageContext";

const WHATSAPP_URL = "https://wa.me/971500000000";

const sectors = [
  {
    titleKey: "who.hotels.title",
    descKey: "who.hotels.desc",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    titleKey: "who.ramadan.title",
    descKey: "who.ramadan.desc",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      </svg>
    ),
  },
  {
    titleKey: "who.gov.title",
    descKey: "who.gov.desc",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M12 10v11M16 10v11" />
      </svg>
    ),
  },
  {
    titleKey: "who.events.title",
    descKey: "who.events.desc",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    titleKey: "who.industrial.title",
    descKey: "who.industrial.desc",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </svg>
    ),
  },
  {
    titleKey: "who.glamping.title",
    descKey: "who.glamping.desc",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 000 20 14.5 14.5 0 000-20" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
];

export default function WhoWeWorkWith() {
  const { t, lang } = useLanguage();

  return (
    <section
      id="about"
      className="py-24 md:py-32"
      style={{ background: "oklch(0.10 0.012 60)" }}
    >
      <div className="container">
        {/* Header */}
        <div className="mb-16 reveal">
          <div className="section-label">{t("who.label")}</div>
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
            {t("who.title")}
          </h2>
          <p
            className="text-white/55"
            style={{
              fontFamily: lang === "ar" ? "'Noto Naskh Arabic', sans-serif" : "'DM Sans', sans-serif",
              fontSize: "0.95rem",
              lineHeight: 1.8,
              fontWeight: 300,
            }}
          >
            {t("who.subtitle")}
          </p>
        </div>

        {/* Sectors grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {sectors.map((sector, i) => (
            <div
              key={sector.titleKey}
              className="reveal group p-8 md:p-10 transition-colors duration-300 hover:bg-white/3"
              style={{
                background: "oklch(0.10 0.012 60)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              {/* Icon */}
              <div
                className="mb-6 transition-colors duration-300 group-hover:text-[oklch(0.72_0.12_75)]"
                style={{ color: "oklch(0.72 0.12 75 / 70%)" }}
              >
                {sector.icon}
              </div>

              {/* Gold line */}
              <div
                className="mb-4 transition-all duration-300 group-hover:w-12"
                style={{ width: "2rem", height: "1px", background: "oklch(0.72 0.12 75 / 50%)" }}
              />

              <h3
                className="text-white mb-3"
                style={{
                  fontFamily: lang === "ar" ? "'Noto Naskh Arabic', sans-serif" : "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: lang === "ar" ? "0" : "0.15em",
                  textTransform: lang === "ar" ? "none" : "uppercase",
                }}
              >
                {t(sector.titleKey)}
              </h3>
              <p
                className="text-white/45"
                style={{
                  fontFamily: lang === "ar" ? "'Noto Naskh Arabic', sans-serif" : "'DM Sans', sans-serif",
                  fontSize: "0.85rem",
                  lineHeight: 1.7,
                  fontWeight: 300,
                }}
              >
                {t(sector.descKey)}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-14 reveal">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-gold">
            {t("who.cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
