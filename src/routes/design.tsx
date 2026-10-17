import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import SiteShowcase from "@/components/SiteShowcase";
import Footer from "@/components/Footer";

const title = "Créations de sites web — Portfolio website.gg";
const description =
  "Découvrez les sites conçus par website.gg pour la musique, la radio, la culture et les services numériques.";

export const Route = createFileRoute("/design")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://websitegg.lovable.app/design" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://websitegg.lovable.app/design" }],
  }),
  component: DesignPage,
});

function DesignPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pb-8">
        <header className="page-cover"><div className="container mx-auto"><p className="section-label">L’atelier / Réalisations</p><h1 className="mt-6">Des sites à vivre.<br /><span className="text-primary">Pas juste à regarder.</span></h1><p className="mt-6 max-w-lg text-lg leading-7 text-muted-foreground">Musique, culture et services numériques : les projets conçus pour nos clients.</p></div></header>
        <SiteShowcase />
      </main>
      <Footer />
    </div>
  );
}