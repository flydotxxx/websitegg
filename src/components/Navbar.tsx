import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe2 } from "lucide-react";

const links = [
  { name: "Processus", to: "/" as const, hash: "processus" },
  { name: "Designs", to: "/design" as const },
  { name: "Domaine", to: "/domain" as const },
  { name: "Tarifs", to: "/" as const, hash: "tarifs" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="group flex items-center gap-2">
            <div className="relative">
              <Globe2 className="h-7 w-7 text-primary transition-transform duration-300 group-hover:rotate-12" />
              <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl" />
            </div>
            <span className="text-gradient font-display text-xl font-bold">website.gg</span>
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <Link
                key={`${l.to}-${l.hash ?? ""}`}
                to={l.to}
                {...(l.hash ? { hash: l.hash } : {})}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <Button variant="hero" size="sm" asChild>
              <Link to="/" hash="brief">Démarrer mon site</Link>
            </Button>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="text-muted-foreground hover:text-foreground lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {open && (
          <div className="flex flex-col gap-4 border-t border-border py-4 lg:hidden">
            {links.map((l) => (
              <Link
                key={`${l.to}-${l.hash ?? ""}`}
                to={l.to}
                {...(l.hash ? { hash: l.hash } : {})}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {l.name}
              </Link>
            ))}
            <Button variant="hero" size="sm" asChild>
              <Link to="/" hash="brief" onClick={() => setOpen(false)}>
                Démarrer mon site
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
