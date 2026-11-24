import { SITE, quotes, topics, quoteUrl } from "../lib/data";

export function GET() {
  const latest = quotes[0]?.date;
  const urls = [
    { loc: "/", lastmod: latest },
    { loc: "/quotes/", lastmod: latest },
    { loc: "/videos/" },
    { loc: "/about/" },
    ...topics.map((t) => ({ loc: `/topic/${t.slug}/`, lastmod: latest })),
    ...quotes.map((q) => ({ loc: quoteUrl(q), lastmod: q.date })),
  ];
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${SITE}${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}</url>`).join("\n") +
    `\n</urlset>\n`;
  return new Response(body, { headers: { "Content-Type": "application/xml" } });
}
