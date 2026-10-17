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
  return <section id="brief" className="brief-section editorial-section">
    <div className="container mx-auto grid gap-12 lg:grid-cols-2 lg:gap-24">
      <div><p className="section-label">02 / Votre point de départ</p><h2 className="editorial-heading mt-6">Un beau site<br />commence par vous.</h2><p className="mt-6 max-w-md leading-7 text-muted-foreground">Tout part de vous. Nous construisons le site autour de votre matière : votre identité, vos mots, vos images, vos prix.</p><div className="mt-9 flex max-w-md gap-3 border-t border-foreground/20 pt-6"><AlertTriangle className="mt-1 h-5 w-5 shrink-0" /><p className="text-sm leading-6">Sans ces informations, nous ne pourrons pas livrer un site fiable. Donnez-nous un maximum de détails : c'est la condition d'un résultat de qualité.</p></div></div>
      <div><h3 className="mb-5 text-xl font-medium">Les éléments à nous transmettre</h3><ul className="brief-list">{items.map(item => <li key={item} className="flex items-start gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" /><span className="text-sm leading-6">{item}</span></li>)}</ul></div>
    </div>
  </section>;
}
