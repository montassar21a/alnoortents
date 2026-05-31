/* ============================================================
   AL NOOR TENTS — Contact Section
   Contact form + WhatsApp CTA, dark luxury style
   ============================================================ */
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/971500000000";

export default function ContactSection() {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32"
      style={{ background: "oklch(0.08 0.012 60)" }}
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <div className="reveal">
            <div className="section-label">{t("contact.label")}</div>
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
              {t("contact.title")}
            </h2>
            <p
              className="text-white/55 mb-10"
              style={{
                fontFamily: lang === "ar" ? "'Noto Naskh Arabic', sans-serif" : "'DM Sans', sans-serif",
                fontSize: "0.95rem",
                lineHeight: 1.8,
                fontWeight: 300,
              }}
            >
              {t("contact.subtitle")}
            </p>

            {/* Contact details */}
            <div className="space-y-5">
              {[
                { icon: "📞", value: t("footer.phone") },
                { icon: "✉️", value: t("footer.email") },
                { icon: "📍", value: t("footer.address") },
              ].map((item) => (
                <div key={item.value} className="flex items-center gap-4">
                  <span className="text-lg">{item.icon}</span>
                  <span
                    className="text-white/60"
                    style={{
                      fontFamily: lang === "ar" ? "'Noto Naskh Arabic', sans-serif" : "'DM Sans', sans-serif",
                      fontSize: "0.9rem",
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-10">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 btn-gold"
                style={{ background: "#25d366", color: "white" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t("contact.whatsapp")}
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="reveal" style={{ transitionDelay: "150ms" }}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle size={48} className="mb-4" style={{ color: "oklch(0.72 0.12 75)" }} />
                <p
                  className="text-white"
                  style={{
                    fontFamily: lang === "ar" ? "'Noto Naskh Arabic', sans-serif" : "'DM Sans', sans-serif",
                    fontSize: "1.1rem",
                  }}
                >
                  {t("contact.success")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { name: "name", placeholder: t("contact.name"), type: "text" },
                  { name: "email", placeholder: t("contact.email"), type: "email" },
                  { name: "phone", placeholder: t("contact.phone"), type: "tel" },
                ].map((field) => (
                  <input
                    key={field.name}
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={form[field.name as keyof typeof form]}
                    onChange={handleChange}
                    required={field.name !== "phone"}
                    className="w-full px-5 py-4 text-white placeholder-white/30 outline-none transition-all duration-200 focus:border-[oklch(0.72_0.12_75)]"
                    style={{
                      background: "oklch(0.14 0.012 60)",
                      border: "1px solid oklch(1 0 0 / 10%)",
                      fontFamily: lang === "ar" ? "'Noto Naskh Arabic', sans-serif" : "'DM Sans', sans-serif",
                      fontSize: "0.9rem",
                      direction: lang === "ar" ? "rtl" : "ltr",
                    }}
                  />
                ))}

                <textarea
                  name="message"
                  placeholder={t("contact.message")}
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-5 py-4 text-white placeholder-white/30 outline-none transition-all duration-200 focus:border-[oklch(0.72_0.12_75)] resize-none"
                  style={{
                    background: "oklch(0.14 0.012 60)",
                    border: "1px solid oklch(1 0 0 / 10%)",
                    fontFamily: lang === "ar" ? "'Noto Naskh Arabic', sans-serif" : "'DM Sans', sans-serif",
                    fontSize: "0.9rem",
                    direction: lang === "ar" ? "rtl" : "ltr",
                  }}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                        <path d="M12 2a10 10 0 0110 10" />
                      </svg>
                      {lang === "ar" ? "جاري الإرسال..." : "Sending..."}
                    </span>
                  ) : t("contact.send")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
