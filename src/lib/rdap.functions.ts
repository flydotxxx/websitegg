import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  domain: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9-]{1,63}\.(fr|com)$/, "Nom de domaine invalide"),
});

export type RdapResult = {
  domain: string;
  status: "available" | "taken" | "unknown";
  registrar?: string | undefined;
  creationDate?: string | undefined;
};


export const checkDomain = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }): Promise<RdapResult> => {
    const { domain } = data;

    const tld = domain.split(".").pop();
    const endpoints =
      tld === "fr"
        ? [`https://rdap.nic.fr/domain/${domain}`, `https://rdap.org/domain/${domain}`]
        : [
            `https://rdap.verisign.com/com/v1/domain/${domain}`,
            `https://rdap.org/domain/${domain}`,
          ];

    try {
      let res: Response | null = null;
      for (const url of endpoints) {
        try {
          const attempt = await fetch(url, {
            redirect: "follow",
            headers: {
              Accept: "application/rdap+json, application/json",
              "User-Agent": "website.gg domain checker",
            },
          });
          if (attempt.status === 404 || attempt.ok) {
            res = attempt;
            break;
          }
        } catch {
          // try next endpoint
        }
      }

      if (!res) {
        return { domain, status: "unknown" };
      }

      if (res.status === 404) {
        return { domain, status: "available" };
      }


      const body = (await res.json()) as {
        entities?: Array<{ roles?: string[]; vcardArray?: unknown }>;
        events?: Array<{ eventAction?: string; eventDate?: string }>;
      };

      const registrarEntity = body.entities?.find((e) => e.roles?.includes("registrar"));
      let registrar: string | undefined;
      const vcard = registrarEntity?.vcardArray as [string, Array<unknown[]>] | undefined;
      if (Array.isArray(vcard) && Array.isArray(vcard[1])) {
        const fn = vcard[1].find((entry) => entry[0] === "fn");
        if (fn && typeof fn[3] === "string") registrar = fn[3];
      }

      const creationDate = body.events?.find(
        (e) => e.eventAction === "registration",
      )?.eventDate;

      return { domain, status: "taken", registrar, creationDate };
    } catch {
      return { domain, status: "unknown" };
    }
  });
