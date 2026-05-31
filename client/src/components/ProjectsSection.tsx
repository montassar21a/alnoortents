/* ============================================================
   AL NOOR TENTS — Projects Section
   Tabbed gallery with project category filter
   ============================================================ */
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663716628401/jtD7vMJSJN7HQvsfcDy4th/hero-main-5xCAP7fo2MqgtdUHktAwG6.webp";
const DOME_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663716628401/jtD7vMJSJN7HQvsfcDy4th/dome-luxury-3tjemozAA48AZ69g5YjGz9.webp";
const WEDDING_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663716628401/jtD7vMJSJN7HQvsfcDy4th/wedding-luxury-inNzLPNNBCuVMLUPSrXthZ.webp";
const RAMADAN_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663716628401/jtD7vMJSJN7HQvsfcDy4th/ramadan-majlis-MgNdmkbDPGGvPWNjMEEKhF.webp";

// Unsplash images for variety
const UNSPLASH_IMAGES = [
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
  "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&q=80",
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
  "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80",
  "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80",
];

const projectData: Record<string, { image: string; label: string }[]> = {
  government: [
    { image: HERO_IMAGE, label: "Government Pavilion — Dubai" },
    { image: UNSPLASH_IMAGES[0], label: "Official Ceremony — Abu Dhabi" },
    { image: UNSPLASH_IMAGES[2], label: "VIP Exhibition — Riyadh" },
  ],
  hotels: [
    { image: DOME_IMAGE, label: "Poolside Lounge — Jumeirah" },
    { image: UNSPLASH_IMAGES[1], label: "Beachfront Resort — Ras Al Khaimah" },
    { image: UNSPLASH_IMAGES[3], label: "Rooftop Event — Burj Al Arab" },
  ],
  ramadan: [
    { image: RAMADAN_IMAGE, label: "Ramadan Majlis — Dubai" },
    { image: UNSPLASH_IMAGES[4], label: "Iftar Gathering — Sharjah" },
    { image: HERO_IMAGE, label: "Cultural Event — Kuwait" },
  ],
  weddings: [
    { image: WEDDING_IMAGE, label: "Royal Wedding — Dubai" },
    { image: UNSPLASH_IMAGES[5], label: "Garden Wedding — Abu Dhabi" },
    { image: DOME_IMAGE, label: "Desert Wedding — Al Ain" },
  ],
  glamping: [
    { image: DOME_IMAGE, label: "Desert Glamping — Dubai" },
    { image: UNSPLASH_IMAGES[0], label: "Eco Resort — Oman" },
    { image: RAMADAN_IMAGE, label: "Luxury Camp — Saudi Arabia" },
  ],
  industrial: [
    { image: HERO_IMAGE, label: "Storage Facility — Jebel Ali" },
    { image: UNSPLASH_IMAGES[2], label: "Operations Hub — Abu Dhabi" },
    { image: UNSPLASH_IMAGES[1], label: "Logistics Center — Dubai" },
  ],
};

export default function ProjectsSection() {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState("government");
  const { data: cms } = trpc.admin.content.get.useQuery({ sectionKey: "projects" });

  const tabs = [
    { key: "government", labelKey: "projects.tab.government" },
    { key: "hotels", labelKey: "projects.tab.hotels" },
    { key: "ramadan", labelKey: "projects.tab.ramadan" },
    { key: "weddings", labelKey: "projects.tab.weddings" },
    { key: "glamping", labelKey: "projects.tab.glamping" },
    { key: "industrial", labelKey: "projects.tab.industrial" },
  ];

  const projects = projectData[activeTab] || [];

  return (
    <section
      id="projects"
      className="py-24 md:py-32"
      style={{ background: "oklch(0.12 0.012 60)" }}
    >
      <div className="container">
        {/* Header */}
        <div className="mb-12 reveal">
          <div className="section-label">{t("projects.label")}</div>
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
            {cms?.title || t("projects.title")}
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
            {cms?.description || t("projects.subtitle")}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-0 mb-10 border-b border-white/10 reveal overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="relative pb-3 px-4 transition-colors duration-200 whitespace-nowrap"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: activeTab === tab.key ? "oklch(0.72 0.12 75)" : "oklch(0.60 0.008 60)",
              }}
            >
              {t(tab.labelKey)}
              {activeTab === tab.key && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: "oklch(0.72 0.12 75)" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <div
              key={`${activeTab}-${i}`}
              className="group relative overflow-hidden"
              style={{
                height: "clamp(200px, 28vw, 320px)",
                animation: "fadeInUp 500ms cubic-bezier(0.23,1,0.32,1) both",
                animationDelay: `${i * 80}ms`,
              }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{ background: "oklch(0.08 0.012 60 / 0.45)", opacity: 1 }}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5"
                style={{ background: "oklch(0.08 0.012 60 / 0.75)" }}
              >
                <p
                  className="text-white/90"
                  style={{
                    fontFamily: lang === "ar" ? "'Noto Naskh Arabic', sans-serif" : "'DM Sans', sans-serif",
                    fontSize: "0.8rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  {project.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
