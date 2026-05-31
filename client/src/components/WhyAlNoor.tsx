/* ============================================================
   AL NOOR TENTS — Why Al Noor Section
   Dark overlay over tent background, 6 feature points with star icons
   ============================================================ */
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { ShieldCheck, Zap, Compass, MapPin, Clock, Award, Star as StarIcon } from "lucide-react";

const BG_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663716628401/jtD7vMJSJN7HQvsfcDy4th/hero-main-5xCAP7fo2MqgtdUHktAwG6.webp";
const WHATSAPP_URL = "https://wa.me/971500000000";

export default function WhyAlNoor() {
  const { t, lang } = useLanguage();
  const { data: cms } = trpc.admin.content.get.useQuery({ sectionKey: "why-choose-us" });

  const features = [
    { key: "why.f1", icon: ShieldCheck, delay: 0 },
    { key: "why.f2", icon: Zap, delay: 100 },
    { key: "why.f3", icon: Compass, delay: 200 },
    { key: "why.f4", icon: MapPin, delay: 300 },
    { key: "why.f5", icon: Clock, delay: 400 },
    { key: "why.f6", icon: Award, delay: 500 },
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: "oklch(0.08 0.012 60)" }}>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />

      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 reveal">
          <div className="section-label mx-auto">{t("why.label")}</div>
          <h2
            className="text-white mb-6"
            style={{
              fontFamily: lang === "ar" ? "'Amiri', serif" : "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              letterSpacing: lang === "ar" ? "0.02em" : "0.08em",
              textTransform: "uppercase",
              lineHeight: 1.1,
            }}
          >
            {cms?.title || t("why.title")}
          </h2>
          <p
            className="text-white/60 text-lg"
            style={{
              fontFamily: lang === "ar" ? "'Noto Naskh Arabic', sans-serif" : "'DM Sans', sans-serif",
              lineHeight: 1.8,
              fontWeight: 300,
            }}
          >
            {cms?.description || t("why.subtitle")}
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-14">
          {features.map(({ key, icon: Icon, delay }, i) => (
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
