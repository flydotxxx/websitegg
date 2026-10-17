// Heights are illustrative, not traffic measurements or a growth forecast.
export const seoSteps = [
  { day: 0, height: 0.6, label: "Conception", client: "Votre brief guide le design.", seo: "Vos besoins et mots-clés posent les bases." },
  { day: 1, height: 0.85, label: "Contact website.gg", client: "Un premier échange autour de votre projet.", seo: "Votre activité et vos objectifs guident la conception." },
  { day: 14, height: 1.15, label: "Premiers retours", client: "Vos retours affinent le site.", seo: "Structure, titres et indexation : les fondations SEO." },
  { day: 28, height: 1.9, label: "Ancrage local", client: "Vos visiteurs trouvent les informations utiles.", seo: "Google Business Profile renforce la présence locale." },
  { day: 42, height: 2.65, label: "Contenus utiles", client: "Des réponses claires pour vos futurs clients.", seo: "Des contenus pertinents pour les recherches ciblées." },
  { day: 56, height: 3.55, label: "Confiance", client: "Une expérience cohérente inspire confiance.", seo: "La présence sur Google se consolide dans la durée." },
  { day: 70, height: 4.7, label: "Suivi & évolution", client: "Les retours clients orientent la suite.", seo: "Le trafic organique s'observe pour guider les améliorations." },
];

export function visibleStepCount(progress: number) {
  return Math.min(seoSteps.length, Math.max(1, 1 + Math.floor(Math.max(0, Math.min(1, progress)) * (seoSteps.length - 1))));
}