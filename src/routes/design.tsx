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
      <main className="pt-28">
        <header className="container mx-auto px-4 pb-12 text-center">
          <p className="text-sm font-semibold uppercase text-accent">Our designs</p>
          <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-bold md:text-6xl">
            Websites made to be <span className="text-gradient">used, heard and explored.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Select a client project and explore the live website without leaving this page.
          </p>
        </header>
        <SiteShowcase />
      </main>
      <Footer />
    </div>
  );
}