import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663716628401/jtD7vMJSJN7HQvsfcDy4th/hero-main-5xCAP7fo2MqgtdUHktAwG6.webp";

const defaultProjects: Array<{ titleEn: string; titleAr: string; categoryEn: string; categoryAr: string; imageUrl: string }> = [
  { titleEn: "Government Pavilion — Dubai", titleAr: "جناح حكومي — دبي", categoryEn: "government", categoryAr: "حكومي", imageUrl: HERO_IMAGE },
  { titleEn: "Poolside Lounge — Jumeirah", titleAr: "صالة بجانب المسبح — جميرا", categoryEn: "hotels", categoryAr: "فنادق", imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80" },
  { titleEn: "Ramadan Majlis — Dubai", titleAr: "مجلس رمضان — دبي", categoryEn: "ramadan", categoryAr: "رمضان", imageUrl: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80" },
  { titleEn: "Royal Wedding — Dubai", titleAr: "زفاف ملكي — دبي", categoryEn: "weddings", categoryAr: "أفراح", imageUrl: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&q=80" },
  { titleEn: "Desert Glamping — Dubai", titleAr: "تخييم فاخر — دبي", categoryEn: "glamping", categoryAr: "تخييم فاخر", imageUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80" },
  { titleEn: "Storage Facility — Jebel Ali", titleAr: "منشأة تخزين — جبل علي", categoryEn: "industrial", categoryAr: "صناعي", imageUrl: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80" },
];

const categoryIcons: Record<string, string> = {
  government: "", hotels: "", ramadan: "", weddings: "", glamping: "", industrial: "",
};

const defaultCategories = [
  { key: "government", labelEn: "Government", labelAr: "حكومي" },
  { key: "hotels", labelEn: "Hotels & Resorts", labelAr: "فنادق ومنتجعات" },
  { key: "ramadan", labelEn: "Ramadan", labelAr: "رمضان" },
  { key: "weddings", labelEn: "Weddings", labelAr: "أفراح" },
  { key: "glamping", labelEn: "Glamping", labelAr: "تخييم فاخر" },
  { key: "industrial", labelEn: "Industrial", labelAr: "صناعي" },
];

export default function ProjectsSection() {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState("government");
  const { data: cms } = trpc.admin.content.get.useQuery({ sectionKey: "projects" });
  const { data: dbProjects = [] } = trpc.admin.projects.list.useQuery();

  const sectionLabel = lang === "ar" ? (cms?.contentAr || t("projects.label")) : (cms?.contentEn || t("projects.label"));

  const allProjects = dbProjects.length > 0
    ? dbProjects.filter(p => p.isVisible !== false).sort((a, b) => (a.order || 0) - (b.order || 0))
    : defaultProjects;

  const cats = dbProjects.length > 0
    ? Array.from(new Set(allProjects.map(p => p.categoryEn))).map(key => ({
        key,
        labelEn: allProjects.find(p => p.categoryEn === key)?.categoryEn || key,
        labelAr: allProjects.find(p => p.categoryEn === key)?.categoryAr || key,
      }))
    : defaultCategories;

  const projects = allProjects.filter(p => p.categoryEn === activeTab);

  return (
    <section id="projects" className="py-24 md:py-32" style={{ background: "oklch(0.12 0.012 60)" }}>
      <div className="container">
        <div className="mb-12 reveal">
          <div className="section-label">{sectionLabel}</div>
          <h2
            className="text-white mb-4"
            style={{
              fontFamily: lang === "ar" ? "'Amiri', serif" : "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700,
              letterSpacing: lang === "ar" ? "0.02em" : "0.08em", textTransform: "uppercase",
            }}
          >
            {cms?.title || t("projects.title")}
          </h2>
          <p className="text-white/55" style={{ fontFamily: lang === "ar" ? "'Noto Naskh Arabic', sans-serif" : "'DM Sans', sans-serif", fontSize: "0.95rem", lineHeight: 1.8, fontWeight: 300 }}>
            {cms?.description || t("projects.subtitle")}
          </p>
        </div>

        <div className="flex flex-wrap gap-0 mb-10 border-b border-white/10 reveal overflow-x-auto">
          {cats.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className="relative pb-3 px-4 transition-colors duration-200 whitespace-nowrap"
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", fontWeight: 500,
                letterSpacing: "0.15em", textTransform: "uppercase",
                color: activeTab === cat.key ? "oklch(0.72 0.12 75)" : "oklch(0.60 0.008 60)",
              }}
            >
              {lang === "ar" ? cat.labelAr : cat.labelEn}
              {activeTab === cat.key && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: "oklch(0.72 0.12 75)" }} />
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <div
              key={`proj-${activeTab}-${i}`}
              className="group relative overflow-hidden"
              style={{
                height: "clamp(200px, 28vw, 320px)",
                animation: "fadeInUp 500ms cubic-bezier(0.23,1,0.32,1) both",
                animationDelay: `${i * 80}ms`,
              }}
            >
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${project.imageUrl})` }} />
              <div className="absolute inset-0 transition-opacity duration-300"
                style={{ background: "oklch(0.08 0.012 60 / 0.45)" }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5"
                style={{ background: "oklch(0.08 0.012 60 / 0.75)" }}>
                <p className="text-white/90" style={{ fontFamily: lang === "ar" ? "'Noto Naskh Arabic', sans-serif" : "'DM Sans', sans-serif", fontSize: "0.8rem", letterSpacing: "0.05em" }}>
                  {lang === "ar" ? (project.titleAr || project.titleEn) : project.titleEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </section>
  );
}
