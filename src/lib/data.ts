import quotesJson from "../data/quotes.json";
import topicsJson from "../data/topics.json";
import site from "../data/site.json";

export type Quote = (typeof quotesJson)[number];
export type Topic = (typeof topicsJson)[number];

export const SITE = "https://lumolifts.github.io";
export const site_ = site;
// newest first
export const quotes: Quote[] = [...quotesJson].sort((a, b) => b.date.localeCompare(a.date));
export const topics: Topic[] = topicsJson;

export const topicBySlug = (s: string) => topics.find((t) => t.slug === s);
export const quotesIn = (slug: string) => quotes.filter((q) => q.topics.includes(slug));
export const quoteUrl = (q: Quote) => `/q/${q.slug}/`;
export const imageUrl = (q: Quote) => `/q/${q.slug}.png`;
export const shareText = (q: Quote) => `${q.ur}\n\n${SITE}${quoteUrl(q)}`;
export const waLink = (q: Quote) => "https://wa.me/?text=" + encodeURIComponent(shareText(q));

export function related(q: Quote, n = 4): Quote[] {
  const score = (o: Quote) => o.topics.filter((t) => q.topics.includes(t)).length;
  return quotes
    .filter((o) => o.slug !== q.slug)
    .map((o) => ({ o, s: score(o) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, n)
    .map((x) => x.o);
}
