/* ============================================================
   AL NOOR TENTS — Navbar
   Dark luxury: transparent → solid on scroll, gold accents,
   hamburger mobile menu, EN/AR language switcher
   ============================================================ */
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";
import { Menu, X, Settings } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/971500000000";
const INSTAGRAM_URL = "https://instagram.com/alnoortents";
const FACEBOOK_URL = "https://facebook.com/alnoortents";

export default function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const [, navigate] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { key: "nav.archTents", href: "#arch-tents" },
    { key: "nav.domeTents", href: "#dome-tents" },
    { key: "nav.weddingTents", href: "#wedding-tents" },
    { key: "nav.ramadanTents", href: "#ramadan-tents" },
    { key: "nav.projects", href: "#projects" },
    { key: "nav.aboutUs", href: "#about" },
  ];

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          background: scrolled
            ? "oklch(0.10 0.012 60 / 0.97)"
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid oklch(1 0 0 / 8%)" : "none",
        }}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="text-white hover:text-[oklch(0.72_0.12_75)] transition-colors p-1"
              aria-label="Open menu"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>

            {/* Logo */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
            >
              <span
                className="font-display text-white tracking-widest uppercase"
                style={{ fontSize: "1.1rem", letterSpacing: "0.25em", fontWeight: 700 }}
              >
                {lang === "ar" ? "خيام النور" : "AL NOOR"}
              </span>
              <span
                className="tracking-widest uppercase"
                style={{
                  fontSize: "0.55rem",
                  letterSpacing: "0.35em",
                  color: "oklch(0.72 0.12 75)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  marginTop: "1px",
                }}
              >
                {lang === "ar" ? "TENTS" : "TENTS"}
              </span>
            </a>

            {/* Right: Social + Lang switcher */}
            <div className="flex items-center gap-3">
              {/* Social icons */}
              <div className="hidden md:flex items-center gap-3">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  className="text-white/60 hover:text-[oklch(0.72_0.12_75)] transition-colors" aria-label="WhatsApp">
                  <WhatsAppIcon />
                </a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
                  className="text-white/60 hover:text-[oklch(0.72_0.12_75)] transition-colors" aria-label="Instagram">
                  <InstagramIcon />
                </a>
                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer"
                  className="text-white/60 hover:text-[oklch(0.72_0.12_75)] transition-colors" aria-label="Facebook">
                  <FacebookIcon />
                </a>
              </div>



              {/* Language switcher */}
              <button
                onClick={() => setLang(lang === "en" ? "ar" : "en")}
                className="text-white/70 hover:text-[oklch(0.72_0.12_75)] transition-colors border border-white/20 hover:border-[oklch(0.72_0.12_75)] px-2.5 py-1 text-xs tracking-widest"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.1em" }}
              >
                {lang === "en" ? "عربي" : "EN"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen overlay menu */}
      <div
        className="fixed inset-0 z-50 transition-all duration-500"
        style={{
          background: "oklch(0.08 0.012 60 / 0.98)",
          backdropFilter: "blur(20px)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
          transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "opacity 400ms cubic-bezier(0.23,1,0.32,1), transform 400ms cubic-bezier(0.23,1,0.32,1)",
        }}
      >
        <div className="container h-full flex flex-col">
          {/* Menu header */}
          <div className="flex items-center justify-between h-16 md:h-20">
            <button
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-[oklch(0.72_0.12_75)] transition-colors p-1"
              aria-label="Close menu"
            >
              <X size={22} strokeWidth={1.5} />
            </button>
            <span
              className="font-display text-white tracking-widest uppercase absolute left-1/2 -translate-x-1/2"
              style={{ fontSize: "1.1rem", letterSpacing: "0.25em", fontWeight: 700 }}
            >
              {lang === "ar" ? "خيام النور" : "AL NOOR TENTS"}
            </span>
            <div className="w-8" />
          </div>

          {/* Nav links */}
          <nav className="flex-1 flex flex-col justify-center gap-1 py-8">
            {navLinks.map((link, i) => (
              <button
                key={link.key}
                onClick={() => handleNavClick(link.href)}
                className="text-left w-full group"
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateX(0)" : "translateX(-20px)",
                  transition: `opacity 400ms cubic-bezier(0.23,1,0.32,1) ${i * 60 + 100}ms, transform 400ms cubic-bezier(0.23,1,0.32,1) ${i * 60 + 100}ms`,
                }}
              >
                <span
                  className="font-display text-white/80 group-hover:text-[oklch(0.72_0.12_75)] transition-colors uppercase block py-3 border-b border-white/5"
                  style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", letterSpacing: "0.1em", fontWeight: 600 }}
                >
                  {t(link.key)}
                </span>
              </button>
            ))}

            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
              className="btn-gold mt-6 self-start"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateX(0)" : "translateX(-20px)",
                transition: `opacity 400ms cubic-bezier(0.23,1,0.32,1) ${navLinks.length * 60 + 100}ms, transform 400ms cubic-bezier(0.23,1,0.32,1) ${navLinks.length * 60 + 100}ms`,
              }}
            >
              {t("nav.sendInquiry")}
            </a>
          </nav>

          {/* Social in menu */}
          <div className="flex items-center gap-5 pb-8">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="text-white/50 hover:text-[oklch(0.72_0.12_75)] transition-colors" aria-label="WhatsApp">
              <WhatsAppIcon size={18} />
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
              className="text-white/50 hover:text-[oklch(0.72_0.12_75)] transition-colors" aria-label="Instagram">
              <InstagramIcon size={18} />
            </a>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer"
              className="text-white/50 hover:text-[oklch(0.72_0.12_75)] transition-colors" aria-label="Facebook">
              <FacebookIcon size={18} />
            </a>
            <span className="text-white/30 text-xs tracking-widest ml-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              alnoortents.com
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}
