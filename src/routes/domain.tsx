import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, CircleDot, Globe2, RefreshCw, SearchCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import DomainSearch from "@/components/DomainSearch";
import Footer from "@/components/Footer";

const title = "Nom de domaine .fr ou .com — Recherche RDAP | website.gg";
const description =
  "Vérifiez gratuitement la disponibilité d’un nom de domaine .fr ou .com avec RDAP et découvrez comment choisir, enregistrer et renouveler votre adresse web.";

export const Route = createFileRoute("/domain")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://websitegg.lovable.app/domain" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://websitegg.lovable.app/domain" }],
  }),
  component: DomainPage,
});

const guidance = [
  {
    icon: SearchCheck,
    title: "Court et mémorable",
    text: "Choisissez un nom facile à prononcer, à écrire et à retenir. Évitez les tirets et les chiffres lorsque ce n’est pas indispensable.",
  },
  {
    icon: CircleDot,
    title: ".fr ou .com ?",
    text: "Le .fr affirme un ancrage français. Le .com est universel et adapté à une activité qui vise plusieurs pays.",
  },
  {
    icon: BadgeCheck,
    title: "Vérification RDAP",
    text: "RDAP interroge les registres officiels pour connaître la disponibilité et les informations techniques publiques d’un domaine.",
  },
  {
    icon: RefreshCw,
    title: "Renouvellement inclus",
    text: "Avec website.gg, l’enregistrement initial est inclus dans la création et son renouvellement dans le forfait annuel de 40 €.",
  },
];

function DomainPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <header className="page-cover text-center">
          <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-[520px] blur-[100px]" />
          <div className="relative mx-auto max-w-4xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md border border-border bg-secondary">
              <Globe2 className="h-6 w-6 text-primary" />
            </div>
            <h1 className="mt-6">
              Trouvez votre <span className="text-gradient">nom de domaine</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Votre domaine est l’adresse de votre entreprise sur internet. Vérifiez un .fr ou un
              .com en temps réel grâce aux données des registres officiels.
            </p>
          </div>
        </header>

        <DomainSearch headingLevel="h2" showStep={false} />

        <section className="border-y border-border bg-secondary/20 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <p className="section-label justify-center">Bien choisir son adresse</p>
              <h2 className="mt-3 text-3xl font-bold md:text-5xl">Un nom simple inspire confiance</h2>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
              {guidance.map((item) => (
                <article key={item.title} className="bg-background p-7">
                  <item.icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
            <div>
              <p className="section-label">De la recherche à la mise en ligne</p>
              <h2 className="mt-3 text-3xl font-bold">Votre domaine, sans démarches compliquées</h2>
            </div>
            <div className="space-y-5 leading-7 text-muted-foreground">
              <p>
                Un nom disponible peut être enregistré auprès d’un bureau d’enregistrement. Il doit
                ensuite être relié à l’hébergement du site grâce aux paramètres DNS.
              </p>
              <p>
                website.gg s’occupe de la réservation, de la configuration et du renouvellement de
                votre .fr ou .com. Vous gardez une adresse stable pendant que nous prenons en charge
                les aspects techniques.
              </p>
              <p>
                La disponibilité affichée reste indicative jusqu’à l’enregistrement définitif : un
                domaine libre peut être réservé par quelqu’un d’autre à tout moment.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}