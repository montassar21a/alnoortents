/* ============================================================
   AL NOOR TENTS — Testimonials Section
   Auto-rotating testimonials carousel with navigation dots
   ============================================================ */
import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Al Mansoori",
    role: "Event Director, Dubai",
    text: "Al Noor Tents transformed our corporate gala into an unforgettable experience. The arch structure was breathtaking, and the setup team was incredibly professional. We've used them three times now and will continue to do so.",
    textAr: "حوّلت خيام النور حفل شركتنا إلى تجربة لا تُنسى. كان هيكل القوس رائعاً، وكان فريق التركيب محترفاً للغاية. استخدمناهم ثلاث مرات وسنستمر في ذلك.",
  },
  {
    name: "Sarah Thompson",
    role: "Wedding Planner, Abu Dhabi",
    text: "The wedding tent from Al Noor was absolutely stunning. Our clients were amazed by the quality and elegance. The team delivered on time and exceeded all expectations. Highly recommended for luxury events.",
    textAr: "كانت خيمة الزفاف من خيام النور رائعة للغاية. أُعجب عملاؤنا بالجودة والأناقة. سلّم الفريق في الوقت المحدد وتجاوز جميع التوقعات. موصى به بشدة للفعاليات الفاخرة.",
  },
  {
    name: "Mohammed Al Rashidi",
    role: "Hotel Manager, Jumeirah",
    text: "We partnered with Al Noor Tents for our poolside expansion and the result was exceptional. The dome structure blended perfectly with our resort's aesthetic. Our guests love it and it has become a signature feature.",
    textAr: "تعاونّا مع خيام النور لتوسعة منطقة حمام السباحة لدينا وكانت النتيجة استثنائية. تمازج هيكل القبة بشكل مثالي مع جماليات منتجعنا. يحبه ضيوفنا وأصبح ميزة مميزة.",
  },
  {
    name: "Fatima Al Zaabi",
    role: "Government Events Coordinator",
    text: "For our national day celebrations, we needed a structure that conveyed prestige and scale. Al Noor delivered exactly that — a magnificent arch tent that became the centerpiece of the entire event.",
    textAr: "لاحتفالات يومنا الوطني، كنا بحاجة إلى هيكل يعكس المكانة والحجم. قدّمت خيام النور بالضبط ذلك — خيمة قوس رائعة أصبحت محور الحدث بأكمله.",
  },
  {
    name: "Lucas Fernandez",
    role: "Festival Organizer, Riyadh",
    text: "The industrial-grade quality combined with the luxury finish is what sets Al Noor apart. We've used their tents for outdoor festivals in extreme heat and they performed flawlessly every single time.",
    textAr: "الجودة الصناعية مع اللمسة الفاخرة هو ما يميز خيام النور. استخدمنا خيامهم في مهرجانات خارجية في حر شديد وأدّت أداءً مثالياً في كل مرة.",
  },
];

export default function TestimonialsSection() {
  const { t, lang } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const prev = () => goTo((current - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((current + 1) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const testimonial = testimonials[current];

  return (
    <section
      className="py-24 md:py-32"
      style={{ background: "oklch(0.12 0.012 60)" }}
    >
      <div className="container">
        {/* Header */}
        <div className="mb-16 reveal text-center">
          <div className="section-label justify-center">{t("testimonials.label")}</div>
          <h2
            className="text-white"
            style={{
              fontFamily: lang === "ar" ? "'Amiri', serif" : "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              letterSpacing: lang === "ar" ? "0.02em" : "0.08em",
              textTransform: "uppercase",
            }}
          >
            {t("testimonials.title")}
          </h2>
        </div>

        {/* Testimonial card */}
        <div className="max-w-3xl mx-auto">
          <div
            key={current}
            className="text-center"
            style={{ animation: "fadeIn 500ms cubic-bezier(0.23,1,0.32,1) both" }}
          >
            {/* Quote mark */}
            <div
              className="mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "5rem",
                color: "oklch(0.72 0.12 75 / 30%)",
                lineHeight: 0.5,
                userSelect: "none",
              }}
            >
              "
            </div>

            {/* Quote text */}
            <p
              className="text-white/75 mb-8"
              style={{
                fontFamily: lang === "ar" ? "'Noto Naskh Arabic', sans-serif" : "'DM Sans', sans-serif",
                fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
                lineHeight: 1.9,
                fontWeight: 300,
                fontStyle: lang === "en" ? "italic" : "normal",
              }}
            >
              {lang === "ar" ? testimonial.textAr : testimonial.text}
            </p>

            {/* Gold divider */}
            <div className="flex justify-center mb-6">
              <div style={{ width: "2.5rem", height: "1px", background: "oklch(0.72 0.12 75)" }} />
            </div>

            {/* Author */}
            <p
              className="text-white mb-1"
              style={{
                fontFamily: lang === "ar" ? "'Noto Naskh Arabic', sans-serif" : "'DM Sans', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              {testimonial.name}
            </p>
            <p
              className="text-white/40"
              style={{
                fontFamily: lang === "ar" ? "'Noto Naskh Arabic', sans-serif" : "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                letterSpacing: "0.08em",
              }}
            >
              {testimonial.role}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prev}
              className="text-white/40 hover:text-[oklch(0.72_0.12_75)] transition-colors p-2"
              aria-label="Previous"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="transition-all duration-300"
                  style={{
                    width: i === current ? "1.5rem" : "0.4rem",
                    height: "0.4rem",
                    borderRadius: "2px",
                    background: i === current ? "oklch(0.72 0.12 75)" : "oklch(1 0 0 / 20%)",
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="text-white/40 hover:text-[oklch(0.72_0.12_75)] transition-colors p-2"
              aria-label="Next"
            >
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
