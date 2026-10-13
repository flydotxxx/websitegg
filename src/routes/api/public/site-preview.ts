import { createFileRoute } from "@tanstack/react-router";

const allowedSites = new Set([
  "https://nu.mk",
  "https://hou.ee",
  "https://musiq3.com",
  "https://dieltiens.fr",
  "https://dnb.band",
]);

export const Route = createFileRoute("/api/public/site-preview")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const requestedSite = new URL(request.url).searchParams.get("site");
        if (!requestedSite || !allowedSites.has(requestedSite)) {
          return new Response("Unknown website", { status: 400 });
        }

        try {
          const upstream = await fetch(requestedSite, {
            redirect: "follow",
            headers: {
              Accept: "text/html,application/xhtml+xml",
              "User-Agent": "website.gg portfolio preview",
            },
          });
          const contentType = upstream.headers.get("content-type") ?? "";
          if (!upstream.ok || !contentType.includes("text/html")) {
            return new Response("Preview unavailable", { status: 502 });
          }

          const finalUrl = upstream.url || requestedSite;
          const html = await upstream.text();
          const base = `<base href="${finalUrl.replace(/"/g, "&quot;")}">`;
          const withBase = /<head(?:\s[^>]*)?>/i.test(html)
            ? html.replace(/<head(\s[^>]*)?>/i, (match) => `${match}${base}`)
            : `${base}${html}`;

          return new Response(withBase, {
            headers: {
              "Content-Type": "text/html; charset=utf-8",
              "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
              "Content-Security-Policy":
                "default-src * data: blob: 'unsafe-inline' 'unsafe-eval'; frame-ancestors 'self';",
            },
          });
        } catch {
          return new Response("Preview unavailable", { status: 502 });
        }
      },
    },
  },
});