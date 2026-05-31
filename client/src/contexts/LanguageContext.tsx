import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "ar";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
  dir: "ltr",
});

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    "nav.archTents": "ARCH TENTS",
    "nav.domeTents": "DOME TENTS",
    "nav.weddingTents": "WEDDING TENTS",
    "nav.ramadanTents": "RAMADAN TENTS",
    "nav.projects": "PROJECTS",
    "nav.aboutUs": "ABOUT US",
    "nav.contact": "CONTACT",
    "nav.sendInquiry": "SEND INQUIRY",

    // Hero
    "hero.label": "Premium Tent Architecture",
    "hero.title": "ICONIC TENT\nSTRUCTURES",
    "hero.subtitle": "Designing & building luxury tensile structures across the Middle East",
    "hero.cta1": "CALL NOW +97433555918",
    "hero.cta2": "CONTACT US ON WHATSAPP",

    // What We Build
    "build.label": "Our Products",
    "build.title": "WHAT WE BUILD",
    "build.subtitle": "From arched elegance to geodesic innovation — our tents are designed and built to elevate experiences, reduce logistics, and impress at first sight.",
    "build.arch.title": "ARCH TENTS",
    "build.arch.desc": "Minimal footprint, maximum impact.",
    "build.dome.title": "DOME TENTS",
    "build.dome.desc": "Geometric beauty for immersive events.",
    "build.wedding.title": "WEDDING TENTS",
    "build.wedding.desc": "Unforgettable venues for your special day.",
    "build.ramadan.title": "RAMADAN TENTS",
    "build.ramadan.desc": "Authentic majlis spaces for cultural gatherings.",

    // Why Al Noor
    "why.label": "Why Choose Us",
    "why.title": "WHY AL NOOR TENTS?",
    "why.subtitle": "Your Vision, Engineered. From fast installation to high-end aesthetics.",
    "why.f1": "FAST SETUP, NO CRANES REQUIRED",
    "why.f2": "ICONIC ARCHED DESIGNS",
    "why.f3": "MODULAR, SCALABLE SOLUTIONS",
    "why.f4": "ENGINEERED IN THE UAE",
    "why.f5": "LUXURY LOOK, INDUSTRIAL STRENGTH",
    "why.f6": "TRUSTED ACROSS THE GCC",
    "why.cta": "CONTACT US ON WHATSAPP",

    // Projects
    "projects.label": "Our Work",
    "projects.title": "OUR WORK IN ACTION",
    "projects.subtitle": "From Dubai to Riyadh — discover our work across the Gulf.",
    "projects.tab.government": "GOVERNMENT",
    "projects.tab.hotels": "HOTELS",
    "projects.tab.ramadan": "RAMADAN",
    "projects.tab.weddings": "WEDDINGS",
    "projects.tab.glamping": "GLAMPING",
    "projects.tab.industrial": "INDUSTRIAL",

    // Who We Work With
    "who.label": "Our Clients",
    "who.title": "WHO WE WORK WITH",
    "who.subtitle": "Custom-built solutions for every sector we serve.",
    "who.hotels.title": "HOTELS & RESORTS",
    "who.hotels.desc": "Elegant structures for receptions, poolside lounges, and beachfront experiences.",
    "who.ramadan.title": "RAMADAN & MAJLIS",
    "who.ramadan.desc": "Authentic, climate-ready spaces for cultural gatherings and seasonal events.",
    "who.gov.title": "GOVERNMENTS",
    "who.gov.desc": "Secure, efficient solutions for VIP pavilions, exhibitions, and official use.",
    "who.events.title": "EVENT PLANNERS",
    "who.events.desc": "Flexible tents for weddings, brand launches, festivals, and all creative visions.",
    "who.industrial.title": "INDUSTRIAL & LOGISTICS",
    "who.industrial.desc": "Heavy-duty shelters for operations, storage, and rapid deployment zones.",
    "who.glamping.title": "GLAMPING PROJECTS",
    "who.glamping.desc": "Stylish, modular domes and arches for immersive eco-resorts and remote getaways.",
    "who.cta": "CONTACT US ON WHATSAPP",

    // Testimonials
    "testimonials.label": "Client Reviews",
    "testimonials.title": "WHAT OUR CLIENTS SAY",

    // Stats
    "stats.label": "Our Numbers",
    "stats.title": "TRUSTED BY HUNDREDS",
    "stats.projects": "Projects Completed",
    "stats.years": "Years of Experience",
    "stats.clients": "Happy Clients",
    "stats.countries": "Countries Served",

    // Contact
    "contact.label": "Get In Touch",
    "contact.title": "HAVE A TENT IN MIND?",
    "contact.subtitle": "Tell us about your project and we'll get back to you within 24 hours.",
    "contact.name": "Your Full Name",
    "contact.email": "Your Email",
    "contact.phone": "Phone Number",
    "contact.message": "Tell us about your project...",
    "contact.send": "SEND REQUEST",
    "contact.whatsapp": "CONTACT US ON WHATSAPP",
    "contact.success": "Thank you! We'll be in touch soon.",

    // Footer
    "footer.tagline": "Premium tent architecture across the Middle East.",
    "footer.links": "Quick Links",
    "footer.contact": "Contact",
    "footer.follow": "Follow Us",
    "footer.rights": "© 2024 Al Noor Tents. All rights reserved.",
    "footer.phone": "+974 33 555 918",
    "footer.email": "info@alnoortents.com",
    "footer.address": "Dubai, United Arab Emirates",
  },
  ar: {
    // Nav
    "nav.archTents": "خيام القوس",
    "nav.domeTents": "خيام القبة",
    "nav.weddingTents": "خيام الأفراح",
    "nav.ramadanTents": "خيام رمضان",
    "nav.projects": "المشاريع",
    "nav.aboutUs": "من نحن",
    "nav.contact": "اتصل بنا",
    "nav.sendInquiry": "أرسل استفساراً",

    // Hero
    "hero.label": "هندسة الخيام الفاخرة",
    "hero.title": "هياكل خيام\nأيقونية",
    "hero.subtitle": "تصميم وبناء هياكل شدّ فاخرة في جميع أنحاء الشرق الأوسط",
    "hero.cta1": "اتصل الآن +97433555918",
    "hero.cta2": "تواصل معنا على واتساب",

    // What We Build
    "build.label": "منتجاتنا",
    "build.title": "ما نبنيه",
    "build.subtitle": "من أناقة القوس إلى ابتكار الجيوديسيك — خيامنا مصممة ومبنية للارتقاء بالتجارب وتقليل اللوجستيات والإبهار من النظرة الأولى.",
    "build.arch.title": "خيام القوس",
    "build.arch.desc": "بصمة صغيرة، تأثير كبير.",
    "build.dome.title": "خيام القبة",
    "build.dome.desc": "جمال هندسي لفعاليات غامرة.",
    "build.wedding.title": "خيام الأفراح",
    "build.wedding.desc": "أماكن لا تُنسى ليومك الخاص.",
    "build.ramadan.title": "خيام رمضان",
    "build.ramadan.desc": "مجالس أصيلة للتجمعات الثقافية.",

    // Why Al Noor
    "why.label": "لماذا تختارنا",
    "why.title": "لماذا خيام النور؟",
    "why.subtitle": "رؤيتك، مُهندَسة. من التركيب السريع إلى الجماليات الراقية.",
    "why.f1": "تركيب سريع دون رافعات",
    "why.f2": "تصاميم قوسية أيقونية",
    "why.f3": "حلول معيارية وقابلة للتوسع",
    "why.f4": "مُصنَّع في الإمارات",
    "why.f5": "مظهر فاخر وقوة صناعية",
    "why.f6": "موثوق به في جميع أنحاء الخليج",
    "why.cta": "تواصل معنا على واتساب",

    // Projects
    "projects.label": "أعمالنا",
    "projects.title": "أعمالنا في العمل",
    "projects.subtitle": "من دبي إلى الرياض — اكتشف أعمالنا في جميع أنحاء الخليج.",
    "projects.tab.government": "حكومي",
    "projects.tab.hotels": "فنادق",
    "projects.tab.ramadan": "رمضان",
    "projects.tab.weddings": "أفراح",
    "projects.tab.glamping": "تخييم فاخر",
    "projects.tab.industrial": "صناعي",

    // Who We Work With
    "who.label": "عملاؤنا",
    "who.title": "من نعمل معهم",
    "who.subtitle": "حلول مخصصة لكل قطاع نخدمه.",
    "who.hotels.title": "الفنادق والمنتجعات",
    "who.hotels.desc": "هياكل أنيقة للاستقبالات وصالات حمامات السباحة وتجارب الشاطئ.",
    "who.ramadan.title": "رمضان والمجالس",
    "who.ramadan.desc": "مساحات أصيلة جاهزة للمناخ للتجمعات الثقافية والفعاليات الموسمية.",
    "who.gov.title": "الحكومات",
    "who.gov.desc": "حلول آمنة وفعّالة لأجنحة كبار الشخصيات والمعارض والاستخدام الرسمي.",
    "who.events.title": "منظمو الفعاليات",
    "who.events.desc": "خيام مرنة للأفراح وإطلاق العلامات التجارية والمهرجانات وجميع الرؤى الإبداعية.",
    "who.industrial.title": "الصناعة والخدمات اللوجستية",
    "who.industrial.desc": "ملاجئ متينة للعمليات والتخزين ومناطق النشر السريع.",
    "who.glamping.title": "مشاريع التخييم الفاخر",
    "who.glamping.desc": "قباب وأقواس أنيقة وعصرية للمنتجعات البيئية والرحلات البعيدة.",
    "who.cta": "تواصل معنا على واتساب",

    // Testimonials
    "testimonials.label": "آراء العملاء",
    "testimonials.title": "ماذا يقول عملاؤنا",

    // Stats
    "stats.label": "أرقامنا",
    "stats.title": "موثوق به من المئات",
    "stats.projects": "مشروع مكتمل",
    "stats.years": "سنوات من الخبرة",
    "stats.clients": "عميل سعيد",
    "stats.countries": "دول نخدمها",

    // Contact
    "contact.label": "تواصل معنا",
    "contact.title": "هل لديك خيمة في ذهنك؟",
    "contact.subtitle": "أخبرنا عن مشروعك وسنرد عليك خلال 24 ساعة.",
    "contact.name": "الاسم الكامل",
    "contact.email": "البريد الإلكتروني",
    "contact.phone": "رقم الهاتف",
    "contact.message": "أخبرنا عن مشروعك...",
    "contact.send": "إرسال الطلب",
    "contact.whatsapp": "تواصل معنا على واتساب",
    "contact.success": "شكراً! سنتواصل معك قريباً.",

    // Footer
    "footer.tagline": "هندسة خيام فاخرة في جميع أنحاء الشرق الأوسط.",
    "footer.links": "روابط سريعة",
    "footer.contact": "اتصل بنا",
    "footer.follow": "تابعنا",
    "footer.rights": "© 2024 خيام النور. جميع الحقوق محفوظة.",
    "footer.phone": "+974 33 555 918",
    "footer.email": "info@alnoortents.com",
    "footer.address": "دبي، الإمارات العربية المتحدة",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem("lang") as Language;
    return saved === "ar" ? "ar" : "en";
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);
  };

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
    document.body.setAttribute("dir", dir);
  }, [lang]);

  const t = (key: string): string => {
    return translations[lang][key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir: lang === "ar" ? "rtl" : "ltr" }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
