import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUpRight, Pause, Play } from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import videoAsset from "@/assets/cinematic-background.mp4.asset.json";
import webmAsset from "@/assets/cinematic-background.webm.asset.json";
import posterAsset from "@/assets/cinematic-poster.jpg.asset.json";

const CinematicCanvas = lazy(() => import("@/components/CinematicCanvas"));

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry?.isIntersecting ?? false));
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { preference.removeEventListener("change", update); observer.disconnect(); };
  }, []);
  const active = !paused && !reducedMotion && visible;
  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;
    if (active) void element.play().catch(() => setPaused(true));
    else element.pause();
  }, [active]);
  return <>
    <section ref={sectionRef} id="top" className="hero-editorial cinematic-hero">
      <video ref={videoRef} poster={posterAsset.url} className="hero-art" muted loop playsInline preload="auto" aria-hidden="true" onLoadedData={() => setVideo(videoRef.current)}><source src={webmAsset.url} type="video/webm" /><source src={videoAsset.url} type="video/mp4" /></video>
      {video && !reducedMotion && <Suspense fallback={null}><CinematicCanvas video={video} active={active} /></Suspense>}
      <div className="cinematic-veil" aria-hidden="true" />
      <div className="hero-copy">
        <p className="section-label">Website agency · Alsace</p>
        <h1 className="hero-title"><span>Votre site web</span><span>clé en main.</span></h1>
        <p className="hero-description">Votre activité mérite sa place sur le web.<br />Un site sur mesure en <strong>7 jours, pour 120 €.</strong><br />Votre domaine .fr ou .com est inclus.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="hero" size="xl" asChild><a href="#brief">Démarrer mon projet <ArrowUpRight /></a></Button>
          <Button variant="heroOutline" size="xl" asChild><a href="#domaine">Trouver mon domaine <ArrowUpRight /></a></Button>
        </div>
      </div>
      <div className="hero-caption"><span>Du premier brief à la mise en ligne.</span><div className="flex items-center gap-5"><a href="#processus" className="flex items-center gap-3">Découvrez l’atelier <ArrowDown className="cinematic-arrow h-4 w-4" /></a><Button variant="ghost" size="icon" onClick={() => setPaused(value => !value)} aria-label={paused || reducedMotion ? "Lire la vidéo" : "Mettre la vidéo en pause"} title={paused || reducedMotion ? "Lire la vidéo" : "Mettre la vidéo en pause"} disabled={reducedMotion}>{paused || reducedMotion ? <Play /> : <Pause />}</Button></div></div>
    </section>
    <section className="intro-band container mx-auto">
      <div><p className="section-label mb-4">Simple. Complet. Accessible.</p><h2 className="text-2xl font-medium leading-snug">Vous avez le projet.<br />Nous lui donnons une adresse.</h2></div>
      <div><p className="metric">120 €</p><p className="mt-3 text-sm text-muted-foreground">La création, une seule fois.<br />Deux vagues de retouches incluses.</p></div>
      <div><p className="metric">40 €<span className="text-lg"> / an</span></p><p className="mt-3 text-sm text-muted-foreground">Hébergement, support, maintenance<br />et renouvellement du domaine.</p></div>
    </section>
  </>;
}
