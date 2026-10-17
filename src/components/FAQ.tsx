import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Que comprend exactement les 120 € ?",
    a: "La conception complète du site, sa mise en ligne, le nom de domaine en .fr ou .com, et deux vagues de modifications après la présentation de la première version.",
  },
  {
    q: "À quoi servent les 40 € par an ?",
    a: "Ils couvrent l'hébergement du site, le support et la maintenance, ainsi que le renouvellement de votre nom de domaine.",
  },
  {
    q: "Combien de temps prend la création ?",
    a: "7 jours à partir du moment où nous avons reçu l'ensemble de vos éléments et où le domaine est choisi.",
  },
  {
    q: "Et si je veux des modifications ?",
    a: "Chaque vague de modifications est retravaillée sous 5 jours. Deux vagues supplémentaires sont incluses après la première présentation.",
  },
  {
    q: "Comment se passe la présentation du site ?",
    a: "Soit par un simple lien que vous consultez à votre rythme, soit en direct lors d'un appel Discord ou Google Meet.",
  },
  {
    q: "Pourquoi devez-vous avoir autant d'informations ?",
    a: "Un site fiable se construit sur du contenu réel : vos textes, vos images, vos prix, un site de référence et une palette de couleurs. Sans cela, le résultat ne sera pas à la hauteur.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="faq-section editorial-section">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <span className="section-label justify-center">FAQ</span>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              <span className="text-gradient">Questions fréquentes</span>
            </h2>
          </div>

          <Accordion type="single" collapsible className="faq-list">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="border-border last:border-b-0"
              >
                <AccordionTrigger className="text-left text-base hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
