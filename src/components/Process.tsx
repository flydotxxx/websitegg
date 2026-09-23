import { FileText, Globe, CreditCard, Presentation, Wrench } from "lucide-react";

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
    <section id="processus" className="relative py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Le déroulé
          </span>
          <h2 className="mt-3 text-3xl font-bold md:text-5xl">
            <span className="text-gradient">Cinq étapes, sept jours</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Un parcours simple et cadré, de votre brief à la mise en ligne.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          {steps.map((s, i) => (
            <div key={s.title} className="relative flex gap-6 pb-10 last:pb-0">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-[image:var(--gradient-primary)] shadow-[var(--shadow-glow)]">
                  <s.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                {i < steps.length - 1 && <div className="mt-2 w-px flex-1 bg-border" />}
              </div>
              <div className="glass-card glass-card-hover flex-1 p-6">
                <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
                  Étape {i + 1}
                </div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
