import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { ShieldCheck, Zap, Compass, MapPin, Clock, Award, Star as StarIcon } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldCheck, Zap, Compass, MapPin, Clock, Award, Star: StarIcon,
};

const defaultFeatures = [
  { titleEn: "Premium Quality Materials", titleAr: "مواد عالية الجودة", descEn: "", descAr: "", icon: "ShieldCheck" },
  { titleEn: "Fast Installation", titleAr: "تركيب سريع", descEn: "", descAr: "", icon: "Zap" },
  { titleEn: "Expert Engineering", titleAr: "هندسة خبراء", descEn: "", descAr: "", icon: "Compass" },
  { titleEn: "Middle East Coverage", titleAr: "تغطية الشرق الأوسط", descEn: "", descAr: "", icon: "MapPin" },
  { titleEn: "On-Time Delivery", titleAr: "تسليم في الوقت المحدد", descEn: "", descAr: "", icon: "Clock" },
  { titleEn: "Award-Winning Service", titleAr: "خدمة حائزة على جوائز", descEn: "", descAr: "", icon: "Award" },
];

export default function WhyAlNoor() {
  const { t, lang } = useLanguage();
  const { data: cms } = trpc.admin.content.get.useQuery({ sectionKey: "why-choose-us" });
  const { data: dbFeatures = [] } = trpc.admin.features.list.useQuery();

  const sectionLabel = lang === "ar" ? (cms?.contentAr || t("why.label")) : (cms?.contentEn || t("why.label"));

  const features = dbFeatures.length > 0
    ? dbFeatures.filter(f => f.isVisible !== false).sort((a, b) => (a.order || 0) - (b.order || 0))
    : defaultFeatures;

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: "oklch(0.08 0.012 60)" }}>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />

      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 reveal">
          <div className="section-label mx-auto">{sectionLabel}</div>
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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-14">
          {features.map((f, i) => {
            const IconComp = (f.icon && iconMap[f.icon]) || StarIcon;
            return (
              <div
                key={`feature-${i}`}
                className="reveal flex flex-col items-center text-center gap-4"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div style={{ color: "oklch(0.72 0.12 75)" }}>
                  <IconComp />
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
                  {lang === "ar" ? (f.titleAr || f.titleEn) : f.titleEn}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center reveal">
          <a href={`https://wa.me/${t("footer.phone").replace(/[^0-9]/g, "") || "97433555918"}`} target="_blank" rel="noopener noreferrer" className="btn-gold">
            {t("why.cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
