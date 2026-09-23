import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, MapPin, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24 pb-20"
    >
      <div className="hero-glow animate-pulse-glow pointer-events-none absolute left-1/2 top-0 h-[760px] w-[1200px] -translate-x-1/2 blur-[120px]" />
      <div className="animate-float pointer-events-none absolute left-1/4 top-1/3 h-[320px] w-[320px] rounded-full bg-accent/10 blur-[90px]" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-rise mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2">
            <MapPin className="h-4 w-4 text-accent" />
            <span className="text-sm text-muted-foreground">Agence web alsacienne</span>
          </div>

          <h1 className="animate-rise mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-gradient">Votre site web clé en main</span>
            <br />
            <span className="text-foreground">en 7 jours, pour 120 €</span>
          </h1>

          <p className="animate-rise mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Conception, mise en ligne et nom de domaine en .fr ou .com inclus. Ensuite, 40 € par an
            pour l'hébergement, le support, la maintenance et le renouvellement du domaine.
          </p>

          <div className="animate-rise mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="hero" size="xl" asChild>
              <a href="#brief">
                Démarrer mon projet
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <a href="#domaine">Vérifier un nom de domaine</a>
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-sm">Livraison en 7 jours</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span className="text-sm">2 vagues de modifications incluses</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-sm">Domaines .fr et .com</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
