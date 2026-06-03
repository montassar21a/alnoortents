/* ============================================================
   AL NOOR TENTS — Home Page (Dynamic)
   Assembles all sections in order from DB
   ============================================================ */
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import WhatWeBuild from "@/components/WhatWeBuild";
import WhyAlNoor from "@/components/WhyAlNoor";
import StatsSection from "@/components/StatsSection";
import ProjectsSection from "@/components/ProjectsSection";
import WhoWeWorkWith from "@/components/WhoWeWorkWith";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

const sectionComponents: Record<string, React.ComponentType<any>> = {
  navbar: Navbar,
  hero: HeroSection,
  marquee: MarqueeStrip,
  services: WhatWeBuild,
  about: WhyAlNoor,
  stats: StatsSection,
  projects: ProjectsSection,
  sectors: WhoWeWorkWith,
  testimonials: TestimonialsSection,
  contact: ContactSection,
  footer: Footer,
};

export default function Home() {
  const { data: sections, isLoading } = trpc.homepage.getSections.useQuery({
    pageName: "home",
    activeOnly: true,
  });

  // Initialize scroll reveal observer
  useEffect(() => {
    if (isLoading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const observe = () => {
      const items = document.querySelectorAll(".reveal:not(.visible)");
      items.forEach((item) => observer.observe(item));
    };

    observe();

    const timer = setTimeout(observe, 500);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [isLoading, sections]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a]">
        <Loader2 className="h-8 w-8 animate-spin text-[#c9a84c]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.10 0.012 60)" }}>
      {/* If no sections exist yet, we can optionally render a fallback or just empty. 
          For now, just render whatever is in the DB. */}
      {sections?.length === 0 && (
        <div className="p-8 text-center text-white">
          <p>No homepage sections configured. Please configure them in the Admin Panel.</p>
        </div>
      )}

      {sections?.map((section) => {
        const Component = sectionComponents[section.sectionType];
        if (!Component) return null;

        let parsedData = {};
        try {
          parsedData = JSON.parse(section.content);
        } catch (e) {
          console.error("Failed to parse section content", section);
        }

        return <Component key={section.id} data={parsedData} />;
      })}
      
      <WhatsAppFloat />
    </div>
  );
}
