import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function CookieBanner() {
  const { lang } = useLanguage();
  const { data: settings } = trpc.admin.settings.get.useQuery();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("cookieConsent");
    if (!hasAccepted) {
      // Small delay so it slides in smoothly
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!settings || !settings.enableCookieBanner || !isVisible) return null;

  const text = lang === "ar" ? settings.cookieBannerTextAr : settings.cookieBannerTextEn;

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-slate-950/90 backdrop-blur-xl border-t border-slate-800 shadow-2xl transition-transform duration-500 ease-out translate-y-0"
      style={{ animation: "slideUp 500ms ease-out" }}
    >
      <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-slate-300 text-sm md:text-base flex-1 text-center md:text-left" dir={lang === "ar" ? "rtl" : "ltr"}>
          {text}
        </p>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button 
            onClick={handleAccept}
            className="flex-1 md:flex-none bg-amber-600 hover:bg-amber-700 text-white font-medium px-8"
          >
            {lang === "ar" ? "أوافق" : "Accept"}
          </Button>
          <button 
            onClick={() => setIsVisible(false)}
            className="p-2 text-slate-500 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
      </div>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
