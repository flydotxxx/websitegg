export const showcaseSites = [
  "https://nu.mk",
  "https://hou.ee",
  "https://musiq3.com",
  "https://dieltiens.fr",
  "https://dnb.band",
];

export const previewUrl = (site: string) =>
  `/api/public/site-preview?site=${encodeURIComponent(site)}`;

/** Warm the browser cache with the showcase previews once the page is idle. */
export function prefetchShowcaseSites() {
  const run = () => {
    for (const site of showcaseSites) {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.as = "document";
      link.href = previewUrl(site);
      document.head.appendChild(link);
    }
  };
  const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
  if (w.requestIdleCallback) w.requestIdleCallback(run);
  else setTimeout(run, 1500);
}
