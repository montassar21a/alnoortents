import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatItem({ value, suffix, label, start }: { value: number; suffix: string; label: string; start: boolean }) {
  const count = useCountUp(value, 1800, start);

  return (
    <div className="flex flex-col items-center text-center py-8 px-4">
      <div
        className="mb-2"
        style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 4rem)",
          fontWeight: 700, color: "oklch(0.72 0.12 75)", letterSpacing: "0.02em", lineHeight: 1,
        }}
      >
        {count}{suffix}
      </div>
      <div className="text-white/50" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase" }}>
        {label}
      </div>
    </div>
  );
}

const defaultStats = [
  { value: 200, suffix: "+", labelKey: "stats.projects" },
  { value: 10, suffix: "+", labelKey: "stats.years" },
  { value: 500, suffix: "+", labelKey: "stats.clients" },
  { value: 8, suffix: "", labelKey: "stats.countries" },
];

export default function StatsSection() {
  const { t, lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  const { data: cms } = trpc.admin.content.get.useQuery({ sectionKey: "stats" });
  const { data: dbStats } = trpc.admin.statistics.get.useQuery();

  const sectionLabel = lang === "ar" ? (cms?.contentAr || t("stats.label")) : (cms?.contentEn || t("stats.label"));
  const heading = cms?.title || t("stats.title");

  const statItems = [
    { value: dbStats?.projectsCompleted || 200, suffix: "+", labelKey: "stats.projects" },
    { value: dbStats?.yearsOfExperience || 10, suffix: "+", labelKey: "stats.years" },
    { value: dbStats?.happyClients || 500, suffix: "+", labelKey: "stats.clients" },
    { value: dbStats?.countriesServed || 8, suffix: "", labelKey: "stats.countries" },
  ];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-16 md:py-20"
      style={{ background: "oklch(0.08 0.012 60)", borderTop: "1px solid oklch(1 0 0 / 6%)", borderBottom: "1px solid oklch(1 0 0 / 6%)" }}
    >
      <div className="container">
        <div className="text-center mb-10 reveal">
          <div className="section-label justify-center">{sectionLabel}</div>
          <h2
            className="text-white"
            style={{
              fontFamily: lang === "ar" ? "'Amiri', serif" : "'Cormorant Garamond', serif",
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 700,
              letterSpacing: lang === "ar" ? "0.02em" : "0.08em", textTransform: "uppercase",
            }}
          >
            {heading}
          </h2>
          {cms?.description && (
            <p className="text-white/50 mt-4 text-sm" style={{ fontFamily: lang === "ar" ? "'Noto Naskh Arabic', sans-serif" : "'DM Sans', sans-serif" }}>
              {cms.description}
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/8">
          {statItems.map((stat) => (
            <StatItem key={stat.labelKey} value={stat.value} suffix={stat.suffix} label={t(stat.labelKey)} start={started} />
          ))}
        </div>
      </div>
    </section>
  );
}
