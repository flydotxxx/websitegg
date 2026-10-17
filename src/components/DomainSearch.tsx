import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, CheckCircle2, XCircle, HelpCircle, Loader2 } from "lucide-react";
import { checkDomain, type RdapResult } from "@/lib/rdap.functions";

const TLDS = ["fr", "com"] as const;

type DomainSearchProps = {
  headingLevel?: "h1" | "h2";
  showStep?: boolean;
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function DomainSearch({
  headingLevel = "h2",
  showStep = true,
}: DomainSearchProps) {
  const [name, setName] = useState("");
  const [tld, setTld] = useState<(typeof TLDS)[number]>("fr");
  const [error, setError] = useState<string | null>(null);
  const check = useServerFn(checkDomain);

  const mutation = useMutation<RdapResult, Error, string>({
    mutationFn: (domain) => check({ data: { domain } }),
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = name
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/\..*$/, "")
      .replace(/[^a-z0-9-]/g, "");
    if (!clean) {
      setError("Saisissez un nom de domaine.");
      return;
    }
    setError(null);
    mutation.mutate(`${clean}.${tld}`);
  };

  const result = mutation.data;
  const Heading = headingLevel;

  return (
    <section id="domaine" className="domain-band editorial-section">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          {showStep && (
            <span className="section-label justify-center">03 / Votre adresse</span>
          )}
          <Heading className={`${showStep ? "mt-3" : ""} text-3xl font-bold md:text-5xl`}>
            <span className="text-gradient">Votre nom de domaine</span>
          </Heading>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Vérifiez immédiatement si le nom que vous voulez est libre. La recherche RDAP interroge
            les registres officiels et affiche les informations techniques publiques disponibles.
          </p>
        </div>

        <form onSubmit={onSubmit} className="glass-card mx-auto mt-10 max-w-2xl p-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="monentreprise"
              aria-label="Nom de domaine"
              className="h-12 flex-1 bg-background/60 text-base"
            />
            <div className="flex gap-2">
              {TLDS.map((t) => (
                <Button
                  key={t}
                  type="button"
                  variant={tld === t ? "hero" : "heroOutline"}
                  size="xl"
                  onClick={() => setTld(t)}
                >
                  .{t}
                </Button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            variant="hero"
            size="xl"
            className="mt-4 w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Search className="h-5 w-5" />
            )}
            Vérifier la disponibilité
          </Button>

          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
          {mutation.isError && (
            <p className="mt-3 text-sm text-destructive">
              La vérification a échoué. Réessayez dans un instant.
            </p>
          )}

          {result && (
            <div className="mt-6 rounded-lg border border-border bg-background/50 p-5">
              {result.status === "available" && (
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <div>
                    <p className="font-semibold">
                      <span className="text-success">{result.domain}</span> est disponible
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Nous pouvons le réserver pour vous : il est inclus dans les 120 € de création.
                    </p>
                  </div>
                </div>
              )}
              {result.status === "taken" && (
                <div className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                  <div>
                    <p className="font-semibold">{result.domain} est déjà pris</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {result.registrar ? `Enregistré chez ${result.registrar}. ` : ""}
                      {result.creationDate ? `Depuis le ${formatDate(result.creationDate)}. ` : ""}
                      Essayez une autre variante ou l'autre extension.
                    </p>
                    {(result.expirationDate ||
                      result.updatedDate ||
                      result.nameservers?.length ||
                      result.statuses?.length) && (
                      <dl className="mt-5 grid gap-4 border-t border-border pt-5 text-sm sm:grid-cols-2">
                        {result.expirationDate && (
                          <div>
                            <dt className="text-muted-foreground">Expiration du registre</dt>
                            <dd className="mt-1 font-medium text-foreground">
                              {formatDate(result.expirationDate)}
                            </dd>
                          </div>
                        )}
                        {result.updatedDate && (
                          <div>
                            <dt className="text-muted-foreground">Dernière mise à jour</dt>
                            <dd className="mt-1 font-medium text-foreground">
                              {formatDate(result.updatedDate)}
                            </dd>
                          </div>
                        )}
                        {result.nameservers && result.nameservers.length > 0 && (
                          <div className="sm:col-span-2">
                            <dt className="text-muted-foreground">Serveurs DNS</dt>
                            <dd className="mt-1 break-all font-medium text-foreground">
                              {result.nameservers.join(" · ")}
                            </dd>
                          </div>
                        )}
                        {result.statuses && result.statuses.length > 0 && (
                          <div className="sm:col-span-2">
                            <dt className="text-muted-foreground">Statuts RDAP</dt>
                            <dd className="mt-2 flex flex-wrap gap-2">
                              {result.statuses.map((status) => (
                                <span
                                  key={status}
                                  className="rounded-md border border-border bg-secondary px-2 py-1 text-xs text-foreground"
                                >
                                  {status}
                                </span>
                              ))}
                            </dd>
                          </div>
                        )}
                      </dl>
                    )}
                  </div>
                </div>
              )}
              {result.status === "unknown" && (
                <div className="flex items-start gap-3">
                  <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="font-semibold">Statut indéterminé pour {result.domain}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Le registre n'a pas répondu clairement. Nous vérifierons manuellement avec
                      vous.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
