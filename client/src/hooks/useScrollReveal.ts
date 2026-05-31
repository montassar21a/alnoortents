import { useEffect, useRef } from "react";

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    const items = el.querySelectorAll(".reveal");
    items.forEach((item) => observer.observe(item));

    // Also observe the container itself if it has reveal class
    if (el.classList.contains("reveal")) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}

export function useRevealOnMount() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const items = document.querySelectorAll(".reveal");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);
}
