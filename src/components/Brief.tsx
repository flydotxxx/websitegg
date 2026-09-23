import { AlertTriangle, Check } from "lucide-react";

const items = [
  "Votre logo (et vos éventuelles déclinaisons)",
  "Les textes à intégrer, page par page",
  "Vos images, photos et visuels produits",
  "Vos articles ou actualités à publier",
  "Vos liens : réseaux sociaux, avis, réservation, boutique",
  "Vos prix, offres et conditions",
  "Le contexte de votre activité et votre clientèle",
  "Un site existant dont le design vous plaît",
  "Une palette de couleurs souhaitée",
  "Vos coordonnées de contact et horaires",
];

export default function Brief() {
  return (
    <section id="brief" className="relative py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              Étape 1
            </span>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              <span className="text-gradient">Ce que vous nous fournissez</span>
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Tout part de vous. Nous construisons le site autour de votre matière : votre identité,
              vos mots, vos images, vos prix.
            </p>

            <div className="glass-card mt-6 flex gap-3 border-destructive/40 p-5">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
              <p className="text-sm leading-relaxed text-muted-foreground">
                Sans ces informations, nous ne pourrons pas livrer un site fiable. Donnez-nous un
                maximum de détails : c'est la condition d'un résultat de qualité.
              </p>
            </div>
          </div>

          <div className="glass-card p-7">
            <h3 className="mb-5 text-lg font-semibold">Votre checklist</h3>
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
                    <Check className="h-3 w-3 text-accent" />
                  </span>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
