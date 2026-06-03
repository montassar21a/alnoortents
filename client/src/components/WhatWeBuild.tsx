import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight } from "lucide-react";
import { trpc } from "@/lib/trpc";

const DOME_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663716628401/jtD7vMJSJN7HQvsfcDy4th/dome-luxury-3tjemozAA48AZ69g5YjGz9.webp";
const WEDDING_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663716628401/jtD7vMJSJN7HQvsfcDy4th/wedding-luxury-inNzLPNNBCuVMLUPSrXthZ.webp";
const RAMADAN_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663716628401/jtD7vMJSJN7HQvsfcDy4th/ramadan-majlis-MgNdmkbDPGGvPWNjMEEKhF.webp";
const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663716628401/jtD7vMJSJN7HQvsfcDy4th/hero-main-5xCAP7fo2MqgtdUHktAwG6.webp";

const defaultTents = [
  { id: "arch-tents", titleEn: "ARCH TENTS", titleAr: "خيام القوس", descEn: "Minimal footprint, maximum impact.", descAr: "بصمة بسيطة، تأثير أقصى.", image: HERO_IMAGE },
  { id: "dome-tents", titleEn: "DOME TENTS", titleAr: "خيام القبة", descEn: "Geometric beauty for immersive events.", descAr: "جمال هندسي لفعاليات غامرة.", image: DOME_IMAGE },
  { id: "wedding-tents", titleEn: "WEDDING TENTS", titleAr: "خيام الأفراح", descEn: "Unforgettable venues for your special day.", descAr: "أماكن لا تُنسى ليومك الخاص.", image: WEDDING_IMAGE },
  { id: "ramadan-tents", titleEn: "RAMADAN TENTS", titleAr: "خيام رمضان", descEn: "Authentic majlis spaces for cultural gatherings.", descAr: "مجالس أصيلة للتجمعات الثقافية.", image: RAMADAN_IMAGE },
];

export default function WhatWeBuild() {
  const { t, lang } = useLanguage();
  const { data: cms } = trpc.admin.content.get.useQuery({ sectionKey: "what-we-build" });
  const { data: products = [] } = trpc.admin.products.list.useQuery();

  const sectionLabel = lang === "ar" ? (cms?.contentAr || t("build.label")) : (cms?.contentEn || t("build.label"));

  const tents = products.length > 0
    ? products.filter(p => p.isVisible !== false).sort((a, b) => (a.order || 0) - (b.order || 0))
    : defaultTents;

  return (
    <section
      id="what-we-build"
      className="py-24 md:py-32"
      style={{ background: "oklch(0.10 0.012 60)" }}
    >
      <div className="container">
        <div className="mb-16 reveal">
          <div className="section-label">{sectionLabel}</div>
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
            {cms?.title || t("build.title")}
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
            {cms?.description || t("build.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tents.map((tent: any, i) => (
            <TentCard
              key={tent.id || i}
              id={tent.id || `tent-${i}`}
              title={lang === "ar" ? (tent.titleAr || tent.titleEn) : tent.titleEn}
              desc={lang === "ar" ? (tent.descAr || tent.descEn) : tent.descEn}
              image={tent.imageUrl || tent.image}
              index={i}
              lang={lang}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TentCard({ id, title, desc, image, index, lang }: {
  id: string; title: string; desc: string; image: string; index: number; lang: string;
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
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />

      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: "linear-gradient(to top, oklch(0.08 0.012 60 / 0.88) 0%, oklch(0.08 0.012 60 / 0.35) 60%, transparent 100%)",
        }}
      />

      <div
        className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-500"
        style={{
          background: "oklch(0.72 0.12 75)",
          transform: "scaleX(0)",
          transformOrigin: "left",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scaleX(1)")}
      />

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
