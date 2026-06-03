import { ArrowUpRight, Facebook, Instagram, Linkedin, MapPin, Phone, Twitter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";

export default function Footer() {
  const { t, lang } = useLanguage();
  const { data: settings } = trpc.admin.settings.get.useQuery();
  const { data: cms } = trpc.admin.content.get.useQuery({ sectionKey: "footer" });

  const quickLinks = [
    { labelKey: "nav.archTents", href: "#arch-tents" },
    { labelKey: "nav.domeTents", href: "#dome-tents" },
    { labelKey: "nav.weddingTents", href: "#wedding-tents" },
    { labelKey: "nav.ramadanTents", href: "#ramadan-tents" },
    { labelKey: "nav.projects", href: "#projects" },
    { labelKey: "nav.aboutUs", href: "#about" },
  ];

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const socialLinks = [
    { icon: Instagram, href: settings?.instagram || "#", label: "Instagram" },
    { icon: Twitter, href: settings?.twitter || "#", label: "Twitter" },
    { icon: Linkedin, href: settings?.linkedin || "#", label: "LinkedIn" },
    { icon: Facebook, href: settings?.facebook || "#", label: "Facebook" },
  ];

  return (
    <footer
      style={{
        background: "oklch(0.07 0.012 60)",
        borderTop: "1px solid oklch(1 0 0 / 8%)",
      }}
    >
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <div
                className="font-display text-white tracking-widest uppercase mb-1"
                style={{
                  fontFamily: lang === "ar" ? "'Amiri', serif" : "'Cormorant Garamond', serif",
                  fontSize: "1.4rem", fontWeight: 700, letterSpacing: "0.2em",
                }}
              >
                {settings?.websiteTitle || (lang === "ar" ? "خيام النور" : "AL NOOR TENTS")}
              </div>
              <div style={{ width: "2.5rem", height: "1px", background: "oklch(0.72 0.12 75)", marginTop: "1rem" }} />
            </div>
            <p
              className="text-white/50 mb-6 max-w-sm"
              style={{
                fontFamily: lang === "ar" ? "'Noto Naskh Arabic', sans-serif" : "'DM Sans', sans-serif",
                fontSize: "0.85rem", lineHeight: 1.8,
              }}
            >
              {cms?.description || t("footer.tagline")}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:border-[oklch(0.72_0.12_75)] hover:text-[oklch(0.72_0.12_75)] transition-colors"
                >
                  <link.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-white mb-6 uppercase"
              style={{
                fontFamily: lang === "ar" ? "'Noto Naskh Arabic', sans-serif" : "'DM Sans', sans-serif",
                fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em",
              }}
            >
              {t("footer.links")}
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
              {quickLinks.map((link) => (
                <li key={link.labelKey}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="group flex items-center text-white/50 hover:text-white transition-colors"
                    style={{
                      fontFamily: lang === "ar" ? "'Noto Naskh Arabic', sans-serif" : "'DM Sans', sans-serif",
                      fontSize: "0.85rem",
                    }}
                  >
                    <ArrowUpRight size={14} className="mr-2 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-[oklch(0.72_0.12_75)]" />
                    {t(link.labelKey)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4
              className="text-white mb-6 uppercase"
              style={{
                fontFamily: lang === "ar" ? "'Noto Naskh Arabic', sans-serif" : "'DM Sans', sans-serif",
                fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em",
              }}
            >
              {t("nav.contact")}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="text-[oklch(0.72_0.12_75)] mr-3 mt-0.5 shrink-0" />
                <span
                  className="text-white/50"
                  style={{
                    fontFamily: lang === "ar" ? "'Noto Naskh Arabic', sans-serif" : "'DM Sans', sans-serif",
                    fontSize: "0.85rem", lineHeight: 1.6,
                  }}
                >
                  {settings?.address || "Dubai Design District, Building 4<br/>Dubai, United Arab Emirates"}
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-[oklch(0.72_0.12_75)] mr-3 shrink-0" />
                <span
                  className="text-white/50"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem" }}
                >
                  {settings?.phone || "+974 3355 5918"}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="py-6 border-t" style={{ borderColor: "oklch(1 0 0 / 6%)" }}>
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem" }}>
            © {new Date().getFullYear()} {settings?.websiteTitle || "Al Noor Tents"}. {t("footer.rights")}
          </p>
          <div className="flex gap-4 text-white/30" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem" }}>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
