import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";

export default function CinematicEffects() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;
    const elements = document.querySelectorAll<HTMLElement>(".intro-band > div, .editorial-heading, .process-row, .brief-list li, .price-panel, .faq-list, .cta-section > div, .page-cover h1, .footer-wordmark");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach((el, index) => {
      el.classList.add("cinematic-reveal");
      el.style.setProperty("--reveal-delay", `${(index % 3) * 65}ms`);
      observer.observe(el);
    });
    let frame = 0;
    const paint = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current?.style.setProperty("--read-progress", String(max > 0 ? window.scrollY / max : 0));
      frame = 0;
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(paint); };
    paint();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
      elements.forEach(el => el.classList.remove("cinematic-reveal", "is-revealed"));
    };
  }, [pathname]);
  return <div ref={progress} className="cinematic-progress" aria-hidden="true" />;
}