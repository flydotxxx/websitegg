import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  { name: "Processus", to: "/" as const, hash: "processus" },
  { name: "Designs", to: "/design" as const },
  { name: "Domaine", to: "/domain" as const },
  { name: "Tarifs", to: "/" as const, hash: "tarifs" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="site-nav">
      <div className="nav-shell mx-auto max-w-[1440px] px-5">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="group flex items-center gap-2">
            <span className="nav-wordmark">website.gg<span className="text-primary">↗</span></span>
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
              <Link to="/" hash="brief">Démarrer mon site <ArrowUpRight /></Link>
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
