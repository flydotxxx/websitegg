import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe2 } from "lucide-react";

const links = [
  { name: "Processus", href: "#processus" },
  { name: "Ce qu'on attend de vous", href: "#brief" },
  { name: "Domaine", href: "#domaine" },
  { name: "Tarifs", href: "#tarifs" },
  { name: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <a href="#top" className="group flex items-center gap-2">
            <div className="relative">
              <Globe2 className="h-7 w-7 text-primary transition-transform duration-300 group-hover:rotate-12" />
              <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl" />
            </div>
            <span className="text-gradient font-display text-xl font-bold">website.gg</span>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:block">
            <Button variant="hero" size="sm" asChild>
              <a href="#brief">Démarrer mon site</a>
            </Button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="p-2 text-muted-foreground hover:text-foreground lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div className="flex flex-col gap-4 border-t border-border py-4 lg:hidden">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {l.name}
              </a>
            ))}
            <Button variant="hero" size="sm" asChild>
              <a href="#brief" onClick={() => setOpen(false)}>
                Démarrer mon site
              </a>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
