import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const creation = [
  "Site sur mesure, livré en 7 jours",
  "Nom de domaine .fr ou .com inclus",
  "Mise en ligne complète",
  "Design construit à partir de vos références",
  "Optimisé mobile et référencement de base",
  "2 vagues de modifications incluses (sous 5 jours)",
];

const maintenance = [
  "Hébergement du site",
  "Renouvellement du nom de domaine",
  "Support et petites corrections",
  "Mises à jour techniques et sécurité",
  "Sauvegardes régulières",
];

export default function Pricing() {
  return (
    <section id="tarifs" className="relative py-24">
      <div className="hero-glow pointer-events-none absolute left-1/2 top-1/4 h-[500px] w-[900px] -translate-x-1/2 opacity-50 blur-[130px]" />
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">Tarifs</span>
          <h2 className="mt-3 text-3xl font-bold md:text-5xl">
            <span className="text-gradient">Un prix clair, sans surprise</span>
          </h2>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          <div className="glass-card glass-card-hover relative border-primary/40 p-8">
            <div className="absolute -top-3 left-8 rounded-full bg-[image:var(--gradient-primary)] px-3 py-1 text-xs font-semibold text-primary-foreground">
              Création
            </div>
            <div className="mb-6 mt-2 flex items-end gap-2">
              <span className="font-display text-5xl font-bold">120 €</span>
              <span className="pb-2 text-sm text-muted-foreground">une fois</span>
            </div>
            <ul className="space-y-3">
              {creation.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {f}
                </li>
              ))}
            </ul>
            <Button variant="hero" size="lg" className="mt-8 w-full" asChild>
              <a href="#contact">
                Lancer mon site
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="glass-card glass-card-hover p-8">
            <div className="absolute" />
            <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">
              Suivi annuel
            </div>
            <div className="mb-6 mt-2 flex items-end gap-2">
              <span className="font-display text-5xl font-bold">40 €</span>
              <span className="pb-2 text-sm text-muted-foreground">par an</span>
            </div>
            <ul className="space-y-3">
              {maintenance.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
              Facturé à partir de la première année suivant la mise en ligne. Résiliable à tout
              moment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
