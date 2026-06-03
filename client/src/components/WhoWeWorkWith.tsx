import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";

const defaultSectors = [
  { titleEn: "Hotels & Resorts", titleAr: "فنادق ومنتجعات", descEn: "Luxury accommodations and hospitality venues.", descAr: "أماكن إقامة فاخرة ومرافق ضيافة." },
  { titleEn: "Ramadan & Events", titleAr: "رمضان والفعاليات", descEn: "Cultural and seasonal event structures.", descAr: "هياكل الفعاليات الثقافية والموسمية." },
  { titleEn: "Government Sector", titleAr: "القطاع الحكومي", descEn: "Official pavilions and ceremonial structures.", descAr: "أجنحة رسمية وهياكل احتفالية." },
  { titleEn: "Event Management", titleAr: "إدارة الفعاليات", descEn: "Complete event infrastructure solutions.", descAr: "حلول شاملة للبنية التحتية للفعاليات." },
  { titleEn: "Industrial & Logistics", titleAr: "الصناعة واللوجستيات", descEn: "Warehousing and operational shelters.", descAr: "مستودعات ومأوى تشغيلية." },
  { titleEn: "Glamping & Tourism", titleAr: "التخييم الفاخر والسياحة", descEn: "Luxury camping and eco-tourism accommodations.", descAr: "تخييم فاخر وأماكن إقامة سياحية بيئية." },
];

export default function WhoWeWorkWith() {
  const { t, lang } = useLanguage();
  const { data: cms } = trpc.admin.content.get.useQuery({ sectionKey: "clients" });
  const { data: dbSectors = [] } = trpc.admin.sectors.list.useQuery();

  const sectionLabel = lang === "ar" ? (cms?.contentAr || t("who.label")) : (cms?.contentEn || t("who.label"));

  const sectors = dbSectors.length > 0
    ? dbSectors.filter(s => s.isVisible !== false).sort((a, b) => (a.order || 0) - (b.order || 0))
    : defaultSectors;

  return (
    <section id="about" className="py-24 md:py-32" style={{ background: "oklch(0.10 0.012 60)" }}>
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
            }}
          >
            {cms?.title || t("who.title")}
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
            {cms?.description || t("who.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {sectors.map((s, i) => (
            <div
              key={`sector-${i}`}
              className="reveal group p-8 md:p-10 transition-colors duration-300 hover:bg-white/3"
              style={{ background: "oklch(0.10 0.012 60)", transitionDelay: `${i * 80}ms` }}
            >
              <div className="mb-6 transition-colors duration-300 group-hover:text-[oklch(0.72_0.12_75)]" style={{ color: "oklch(0.72 0.12 75 / 70%)" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="mb-4 transition-all duration-300 group-hover:w-12" style={{ width: "2rem", height: "1px", background: "oklch(0.72 0.12 75 / 50%)" }} />
              <h3
                className="text-white mb-3"
                style={{
                  fontFamily: lang === "ar" ? "'Noto Naskh Arabic', sans-serif" : "'DM Sans', sans-serif",
                  fontSize: "0.75rem", fontWeight: 600, letterSpacing: lang === "ar" ? "0" : "0.15em",
                  textTransform: lang === "ar" ? "none" : "uppercase",
                }}
              >
                {lang === "ar" ? (s.titleAr || s.titleEn) : s.titleEn}
              </h3>
              <p className="text-white/45" style={{ fontFamily: lang === "ar" ? "'Noto Naskh Arabic', sans-serif" : "'DM Sans', sans-serif", fontSize: "0.85rem", lineHeight: 1.7, fontWeight: 300 }}>
                {lang === "ar" ? (s.descAr || s.descEn) : s.descEn}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-14 reveal">
          <a href={`https://wa.me/97433555918`} target="_blank" rel="noopener noreferrer" className="btn-gold">
            {t("who.cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
