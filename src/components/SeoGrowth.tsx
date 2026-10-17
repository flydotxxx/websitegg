import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { seoSteps, visibleStepCount } from "@/lib/seo-chart";

const SeoChartScene = lazy(() => import("./SeoChartScene"));

export default function SeoGrowth() {
  const section = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [count, setCount] = useState(1);
  const [active, setActive] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [palette, setPalette] = useState<{ primary: string; floor: string; light: string; accent: string } | null>(null);
  useEffect(() => {
    const element = section.current;
    if (!element) return;
    const styles = getComputedStyle(document.documentElement);
    // Resolve semantic CSS colors to sRGB for Three.js (which cannot parse OKLCH).
    const resolve = (token: string) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) return "transparent";
      context.fillStyle = styles.getPropertyValue(token).trim();
      context.fillRect(0, 0, 1, 1);
      const pixel = context.getImageData(0, 0, 1, 1).data;
      return `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
    };
    setPalette({ primary: resolve("--primary"), floor: resolve("--background"), light: resolve("--card"), accent: resolve("--accent") });
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { setReduced(preference.matches); paint(); };
    let frame = 0;
    const paint = () => {
      const rect = element.getBoundingClientRect();
      const next = preference.matches ? 1 : Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - window.innerHeight)));
      progress.current = next;
      setCount(visibleStepCount(next));
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const observer = new IntersectionObserver(([entry]) => setActive(entry?.isIntersecting ?? false), { rootMargin: "200px" });
    observer.observe(element);
    update();
    preference.addEventListener("change", update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); preference.removeEventListener("change", update); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  const current = seoSteps[count - 1] ?? seoSteps[0];
  return <section ref={section} id="visibilite" className="seo-growth" aria-labelledby="seo-title" data-visible-steps={count}>
    <div className="seo-sticky">
      <div className="seo-heading container mx-auto">
        <div><p className="section-label">Votre présence sur Google</p><h2 id="seo-title">Une visibilité qui<br /><span className="text-primary">se construit.</span></h2></div>
        <div className="seo-summary"><p className="text-sm leading-6 text-muted-foreground">SEO & Google Business Profile : des fondations solides pour développer le trafic organique, jour après jour.</p><p className="seo-day">J{current?.day ?? 0}<span>{current?.label}</span></p></div>
      </div>
      <div className="seo-scene" role="img" aria-label="Illustration 3D de six paliers croissants, de la conception au jour 70, espacés de 14 jours.">
        {palette && <Suspense fallback={null}><SeoChartScene progress={progress} reduced={reduced} palette={palette} active={active} /></Suspense>}
      </div>
      <div className="seo-footnote container mx-auto"><span>Conception → SEO → Google Business Profile</span><p>Évolution illustrative, pas des statistiques réelles ni une garantie de progression. Les résultats et les délais varient.</p></div>
    </div>
  </section>;
}