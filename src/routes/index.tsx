import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Process from "@/components/Process";
import Brief from "@/components/Brief";
import DomainSearch from "@/components/DomainSearch";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const title = "website.gg — Sites web clé en main en 7 jours, 120 €";
const description =
  "Agence web alsacienne : votre site clé en main livré en 7 jours pour 120 €, nom de domaine .fr ou .com inclus, puis 40 € par an pour l'hébergement, le support et le renouvellement.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Process />
        <Brief />
        <DomainSearch />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
