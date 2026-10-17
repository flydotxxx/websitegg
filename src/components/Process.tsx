import { FileText, Globe, CreditCard, Presentation, Wrench, ArrowUpRight } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Vous nous transmettez tout",
    text: "Logo, textes, images, articles, liens, prix, contexte de l'activité, un site dont le design vous plaît et une palette de couleurs. Plus le brief est complet, meilleur sera le résultat.",
  },
  {
    icon: Globe,
    title: "Vous choisissez votre nom de domaine",
    text: "Vérifiez en direct la disponibilité d'un .fr ou d'un .com grâce à notre recherche RDAP officielle, puis nous le réservons pour vous.",
  },
  {
    icon: CreditCard,
    title: "Vous réglez la création",
    text: "Paiement sécurisé par carte bancaire. Le paiement en ligne arrive très prochainement ; en attendant nous vous envoyons un lien de règlement.",
  },
  {
    icon: Presentation,
    title: "Présentation de la première version",
    text: "Nous vous présentons le site par simple lien, ou en direct lors d'un appel Discord ou Google Meet.",
  },
  {
    icon: Wrench,
    title: "Retouches éventuelles",
    text: "Vous demandez des modifications ? Nous les retravaillons sous 5 jours. Deux vagues de modifications supplémentaires sont incluses.",
  },
];

export default function Process() {
  return (
    <section id="processus" className="editorial-section container mx-auto">
      <div className="process-grid">
        <div><p className="section-label">01 / Le déroulé</p><h2 className="editorial-heading mt-6">Cinq étapes.<br />Sept jours.<br /><span className="text-primary">Votre site est là.</span></h2><p className="mt-6 max-w-sm leading-relaxed text-muted-foreground">Un parcours simple et cadré, de votre brief à la mise en ligne.</p></div>
        <div>{steps.map((step, i) => <article key={step.title} className="process-row"><span className="pt-1 text-xs text-muted-foreground">0{i + 1}</span><div><h3 className="text-xl font-medium">{step.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{step.text}</p></div><ArrowUpRight className="h-5 w-5 text-primary" /></article>)}</div>
      </div>
    </section>
  );
}
