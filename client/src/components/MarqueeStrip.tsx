/* ============================================================
   AL NOOR TENTS — Marquee Strip
   Scrolling gold text ticker between hero and content
   ============================================================ */
import { useLanguage } from "@/contexts/LanguageContext";

const items = [
  "ARCH TENTS",
  "DOME TENTS",
  "WEDDING TENTS",
  "RAMADAN MAJLIS",
  "GLAMPING",
  "GOVERNMENT",
  "HOTELS & RESORTS",
  "EVENT STRUCTURES",
];

const itemsAr = [
  "خيام القوس",
  "خيام القبة",
  "خيام الأفراح",
  "مجالس رمضان",
  "تخييم فاخر",
  "حكومي",
  "فنادق ومنتجعات",
  "هياكل الفعاليات",
];

const StarDivider = () => (
  <span
    style={{
      display: "inline-block",
      width: "4px",
      height: "4px",
      background: "oklch(0.72 0.12 75)",
      borderRadius: "50%",
      margin: "0 1.5rem",
      verticalAlign: "middle",
      flexShrink: 0,
    }}
  />
);

export default function MarqueeStrip() {
  const { lang } = useLanguage();
  const list = lang === "ar" ? itemsAr : items;

  // Duplicate for seamless loop
  const doubled = [...list, ...list, ...list];

  return (
    <div
      className="overflow-hidden py-4"
      style={{
        background: "oklch(0.72 0.12 75)",
        borderTop: "1px solid oklch(0.82 0.10 75 / 30%)",
        borderBottom: "1px solid oklch(0.55 0.10 75 / 30%)",
      }}
    >
      <div
        className="flex items-center whitespace-nowrap"
        style={{
          animation: `marquee ${lang === "ar" ? "reverse" : "normal"} 30s linear infinite`,
          width: "max-content",
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span
              style={{
                fontFamily: lang === "ar" ? "'Noto Naskh Arabic', sans-serif" : "'DM Sans', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: lang === "ar" ? "0.05em" : "0.2em",
                textTransform: lang === "ar" ? "none" : "uppercase",
                color: "oklch(0.10 0.012 60)",
              }}
            >
              {item}
            </span>
            <StarDivider />
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}
