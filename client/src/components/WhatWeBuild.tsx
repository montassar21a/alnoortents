/* ============================================================
   AL NOOR TENTS — What We Build Section
   4 tent type cards with hover image reveal
   ============================================================ */
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight } from "lucide-react";

const DOME_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663716628401/jtD7vMJSJN7HQvsfcDy4th/dome-luxury-3tjemozAA48AZ69g5YjGz9.webp";
const WEDDING_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663716628401/jtD7vMJSJN7HQvsfcDy4th/wedding-luxury-inNzLPNNBCuVMLUPSrXthZ.webp";
const RAMADAN_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663716628401/jtD7vMJSJN7HQvsfcDy4th/ramadan-majlis-MgNdmkbDPGGvPWNjMEEKhF.webp";
const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663716628401/jtD7vMJSJN7HQvsfcDy4th/hero-main-5xCAP7fo2MqgtdUHktAwG6.webp";

export default function WhatWeBuild() {
  const { t, lang } = useLanguage();

  const tents = [
    {
      id: "arch-tents",
      titleKey: "build.arch.title",
      descKey: "build.arch.desc",
      image: HERO_IMAGE,
    },
    {
      id: "dome-tents",
      titleKey: "build.dome.title",
      descKey: "build.dome.desc",
      image: DOME_IMAGE,
    },
    {
      id: "wedding-tents",
      titleKey: "build.wedding.title",
      descKey: "build.wedding.desc",
      image: WEDDING_IMAGE,
    },
    {
      id: "ramadan-tents",
      titleKey: "build.ramadan.title",
      descKey: "build.ramadan.desc",
      image: RAMADAN_IMAGE,
    },
  ];

  return (
    <section
      id="what-we-build"
      className="py-24 md:py-32"
      style={{ background: "oklch(0.10 0.012 60)" }}
    >
      <div className="container">
        {/* Section header */}
        <div className="mb-16 reveal">
          <div className="section-label">{t("build.label")}</div>
          <h2
            className="text-white mb-4"
            style={{
              fontFamily: lang === "ar" ? "'Amiri', serif" : "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              letterSpacing: lang === "ar" ? "0.02em" : "0.08em",
              textTransform: "uppercase",
              lineHeight: 1.1,
            }}
          >
            {t("build.title")}
          </h2>
          <p
            className="text-white/55 max-w-2xl"
            style={{
              fontFamily: lang === "ar" ? "'Noto Naskh Arabic', sans-serif" : "'DM Sans', sans-serif",
              fontSize: "0.95rem",
              lineHeight: 1.8,
              fontWeight: 300,
            }}
          >
            {t("build.subtitle")}
          </p>
        </div>

        {/* Tent cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tents.map((tent, i) => (
            <TentCard
              key={tent.id}
              id={tent.id}
              title={t(tent.titleKey)}
              desc={t(tent.descKey)}
              image={tent.image}
              index={i}
              lang={lang}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TentCard({
  id, title, desc, image, index, lang
}: {
  id: string;
  title: string;
  desc: string;
  image: string;
  index: number;
  lang: string;
}) {
  return (
    <div
      id={id}
      className="reveal group relative overflow-hidden cursor-pointer"
      style={{
        height: "clamp(260px, 35vw, 420px)",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: "linear-gradient(to top, oklch(0.08 0.012 60 / 0.88) 0%, oklch(0.08 0.012 60 / 0.35) 60%, transparent 100%)",
        }}
      />

      {/* Gold top border on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-500"
        style={{
          background: "oklch(0.72 0.12 75)",
          transform: "scaleX(0)",
          transformOrigin: "left",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scaleX(1)")}
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <h3
          className="text-white mb-2 transition-transform duration-300 group-hover:-translate-y-1"
          style={{
            fontFamily: lang === "ar" ? "'Amiri', serif" : "'Cormorant Garamond', serif",
            fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
            fontWeight: 700,
            letterSpacing: lang === "ar" ? "0.02em" : "0.1em",
            textTransform: "uppercase",
          }}
        >
          {title}
        </h3>
        <div className="flex items-center gap-3">
          <p
            className="text-white/60 transition-colors duration-300 group-hover:text-white/80"
            style={{
              fontFamily: lang === "ar" ? "'Noto Naskh Arabic', sans-serif" : "'DM Sans', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 300,
              letterSpacing: "0.03em",
            }}
          >
            {desc}
          </p>
          <ArrowRight
            size={16}
            className="text-[oklch(0.72_0.12_75)] opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 flex-shrink-0"
          />
        </div>
      </div>
    </div>
  );
}
