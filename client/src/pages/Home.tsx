/* ============================================================
   AL NOOR TENTS — Home Page
   Assembles all sections in order
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

export default function Home() {

  // Initialize scroll reveal observer
  useEffect(() => {
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

    // Re-observe after a short delay to catch dynamically added elements
    const timer = setTimeout(observe, 500);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.10 0.012 60)" }}>
      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <WhatWeBuild />
      <WhyAlNoor />
      <StatsSection />
      <ProjectsSection />
      <WhoWeWorkWith />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
