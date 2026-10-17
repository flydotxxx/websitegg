import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";

export default function CTA() {
  return (
    <section id="contact" className="cta-section">
      <div className="container mx-auto px-4">
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="hero-glow animate-pulse-glow pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 blur-[100px]" />
          <div className="relative z-10">
            <h2 className="editorial-heading">
              <span className="text-gradient">Prêt à lancer votre site ?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Envoyez-nous votre brief avec vos éléments, votre site de référence et votre palette
              de couleurs. Nous revenons vers vous rapidement.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button variant="hero" size="xl" asChild>
                <a href="mailto:contact@website.gg">
                  <Mail className="h-5 w-5" />
                  contact@website.gg
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <a href="#domaine">
                  <MessageCircle className="h-5 w-5" />
                  Vérifier mon domaine
                </a>
              </Button>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              Paiement par carte bancaire bientôt disponible directement en ligne.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
