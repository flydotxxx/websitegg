import { useState } from "react";
import { ExternalLink, Globe2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import houeePreview from "@/assets/hou-ee-preview.jpg";

const snapshots: Partial<Record<string, string>> = { "https://hou.ee": houeePreview };

const sites = [
  {
    name: "NU.MK",
    label: "Numerik",
    url: "https://nu.mk",
    description:
      "Drop a file. Pick the link. Temporary hosting with nothing to sign up for. Your file lives at a link you choose and melts away a week later.",
  },
  {
    name: "Hou.ee",
    label: "Electronic radio",
    url: "https://hou.ee",
    description:
      "A music platform dedicated to house and drum & bass, designed around direct listening and discovery.",
  },
  {
    name: "Musiq3.com",
    label: "Public radio",
    url: "https://musiq3.com",
    description:
      "The Belgian RTBF public radio experience for classical and baroque music, presented through an editorial interface.",
  },
  {
    name: "dieltiens.fr",
    label: "Author portfolio",
    url: "https://dieltiens.fr",
    description:
      "Dominique Dieltiens presents passionate historical work on the Cathars and the ruins of Provence.",
  },
  {
    name: "dnb.band",
    label: "Webradio",
    url: "https://dnb.band",
    description:
      "The world’s largest jungle and drum & bass web radio, with more than 2,200 tracks in its broadcast library.",
  },
] as const;

export default function SiteShowcase() {
  const [selected, setSelected] = useState(0);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const site = sites[selected] ?? sites[0];

  return (
    <section className="container mx-auto px-4 pb-20">
      <div className="grid min-h-[680px] overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-card)] lg:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="border-b border-border bg-secondary/30 p-4 lg:border-r lg:border-b-0 lg:p-6">
          <div className="mb-5 flex items-center gap-2 px-2">
            <Globe2 className="h-5 w-5 text-primary" />
            <p className="text-sm font-semibold uppercase text-muted-foreground">Selected work</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {sites.map((item, index) => (
              <Button
                key={item.url}
                type="button"
                variant="ghost"
                onClick={() => {
                  setSelected(index);
                }}
                className={`h-auto min-h-24 w-full items-start justify-start whitespace-normal border p-4 text-left ${
                  selected === index
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-transparent text-muted-foreground hover:border-border hover:bg-secondary"
                }`}
              >
                <span className="min-w-0">
                  <span className="block font-display text-base font-bold text-foreground">
                    {item.name}
                  </span>
                  <span className="mt-1 block text-xs font-normal leading-relaxed">{item.label}</span>
                </span>
              </Button>
            ))}
          </div>

          <div className="mt-6 border-t border-border px-2 pt-6">
            <h2 className="font-display text-2xl font-bold">{site.name}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{site.description}</p>
            <Button variant="heroOutline" size="sm" className="mt-5" asChild>
              <a href={site.url} target="_blank" rel="noreferrer">
                Visit website <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </aside>

        <div className="relative min-h-[520px] bg-muted/40 lg:min-h-[680px]">
          <div className="flex h-11 items-center gap-3 border-b border-border bg-background/80 px-4">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive" />
            <span className="h-2.5 w-2.5 rounded-full bg-chart-4" />
            <span className="h-2.5 w-2.5 rounded-full bg-success" />
            <div className="min-w-0 flex-1 rounded-md bg-secondary px-3 py-1 text-center text-xs text-muted-foreground">
              <span className="block truncate">{site.url}</span>
            </div>
          </div>
          {!loaded[selected] && snapshots[site.url] && (
            <div className="absolute inset-x-0 top-11 bottom-0 z-10 overflow-hidden bg-background">
              <img src={snapshots[site.url]} alt={`${site.name} homepage`} className="h-full w-full object-cover object-top" />
              <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 text-xs text-muted-foreground">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" /> Loading live site…
              </div>
            </div>
          )}
          {!loaded[selected] && !snapshots[site.url] && (
            <div className="absolute inset-x-0 top-11 bottom-0 z-10 flex items-center justify-center bg-background">
              <Loader2 className="h-7 w-7 animate-spin text-primary" />
            </div>
          )}
          {sites.map((item, index) => (
            <iframe
              key={item.url}
              src={`/api/public/site-preview?site=${encodeURIComponent(item.url)}`}
              title={`Live preview of ${item.name}`}
              className={`absolute inset-x-0 top-11 bottom-0 h-[calc(100%-2.75rem)] w-full border-0 bg-background ${
                index === selected ? "visible" : "invisible"
              }`}
              onLoad={() => setLoaded((prev) => ({ ...prev, [index]: true }))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}