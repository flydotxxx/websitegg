import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import heroImage from "@/assets/atelier-hero.jpg";

export default function Hero() {
  return <>
    <section id="top" className="hero-editorial">
      <img src={heroImage} alt="Sculpture de verre bleu et fenêtres web, atelier website.gg" className="hero-art" width={1920} height={1088} fetchPriority="high" />
      <div className="hero-copy">
        <p className="section-label">Website agency · Alsace</p>
        <h1 className="hero-title"><span>Votre site web</span><span>clé en main.</span></h1>
        <p className="hero-description">Votre activité mérite sa place sur le web.<br />Un site sur mesure en <strong>7 jours, pour 120 €.</strong><br />Votre domaine .fr ou .com est inclus.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="hero" size="xl" asChild><a href="#brief">Démarrer mon projet <ArrowUpRight /></a></Button>
          <Button variant="heroOutline" size="xl" asChild><a href="#domaine">Trouver mon domaine <ArrowUpRight /></a></Button>
        </div>
      </div>
      <div className="hero-caption"><span>Du premier brief à la mise en ligne.</span><span className="flex items-center gap-3">Découvrez l’atelier <ArrowDown className="h-4 w-4" /></span></div>
    </section>
    <section className="intro-band container mx-auto">
      <div><p className="section-label mb-4">Simple. Complet. Accessible.</p><h2 className="text-2xl font-medium leading-snug">Vous avez le projet.<br />Nous lui donnons une adresse.</h2></div>
      <div><p className="metric">120 €</p><p className="mt-3 text-sm text-muted-foreground">La création, une seule fois.<br />Deux vagues de retouches incluses.</p></div>
      <div><p className="metric">40 €<span className="text-lg"> / an</span></p><p className="mt-3 text-sm text-muted-foreground">Hébergement, support, maintenance<br />et renouvellement du domaine.</p></div>
    </section>
  </>;
}
