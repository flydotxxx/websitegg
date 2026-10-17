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
  return <section id="tarifs" className="price-section editorial-section">
    <div className="container mx-auto">
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="section-label">04 / Les tarifs</p><h2 className="editorial-heading mt-5">Un prix clair.<br />Sans surprise.</h2></div><p className="max-w-xs text-sm leading-6 text-muted-foreground">La création pour démarrer.<br />Le suivi annuel pour avancer sereinement.</p></div>
      <div className="grid gap-6 md:grid-cols-2">
        <article className="price-panel"><p className="section-label mb-8">Création</p><div className="mb-8 flex flex-wrap items-end gap-3"><span className="price-value">120 €</span><span className="pb-2 text-sm">une fois</span></div><ul className="space-y-4">{creation.map(f => <li key={f} className="flex items-start gap-3 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{f}</li>)}</ul><Button variant="hero" size="xl" className="mt-10 w-full" asChild><a href="#contact">Lancer mon site <ArrowRight /></a></Button></article>
        <article className="price-panel"><p className="section-label mb-8">Suivi annuel</p><div className="mb-8 flex flex-wrap items-end gap-3"><span className="price-value">40 €</span><span className="pb-2 text-sm">par an</span></div><ul className="space-y-4">{maintenance.map(f => <li key={f} className="flex items-start gap-3 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{f}</li>)}</ul><p className="mt-10 border-t border-border pt-6 text-xs leading-6 text-muted-foreground">Facturé à partir de la première année suivant la mise en ligne. Résiliable à tout moment.</p></article>
      </div>
    </div>
  </section>;
}
