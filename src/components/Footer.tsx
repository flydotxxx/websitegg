import { Globe2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <Globe2 className="h-6 w-6 text-primary" />
            <span className="text-gradient font-display text-lg font-bold">website.gg</span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <Link to="/" hash="processus" className="hover:text-foreground">
              Processus
            </Link>
            <Link to="/design" className="hover:text-foreground">
              Designs
            </Link>
            <Link to="/domain" className="hover:text-foreground">
              Domaine
            </Link>
            <Link to="/" hash="tarifs" className="hover:text-foreground">
              Tarifs
            </Link>
            <Link to="/" hash="faq" className="hover:text-foreground">
              FAQ
            </Link>
            <a href="mailto:contact@website.gg" className="hover:text-foreground">
              Contact
            </a>
          </nav>
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} website.gg — Agence web alsacienne. Sites clé en main en 7
          jours.
        </p>
      </div>
    </footer>
  );
}
