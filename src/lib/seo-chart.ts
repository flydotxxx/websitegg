// Heights are illustrative, not traffic measurements or a growth forecast.
export const seoSteps = [
  { day: 0, height: 0.6, label: "Début de la conception" },
  { day: 14, height: 1.15, label: "Fondations SEO" },
  { day: 28, height: 1.9, label: "Visibilité locale" },
  { day: 42, height: 2.65, label: "Contenus & référencement" },
  { day: 56, height: 3.55, label: "Présence sur Google" },
  { day: 70, height: 4.7, label: "Trafic organique" },
];

export function visibleStepCount(progress: number) {
  return Math.min(seoSteps.length, Math.max(1, 1 + Math.floor(Math.max(0, Math.min(1, progress)) * (seoSteps.length - 1))));
}