import site from "../data/site.json";

export type Video = { id: string; title: string; published: string };

const decode = (s: string) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const cleanTitle = (t: string) => decode(t).split(" | ")[0].replace(/#\S+/g, "").trim();

let cache: Promise<Video[]> | undefined;

// On-brand videos from the channel's public RSS feed (latest ~15 uploads), fetched once per build.
// The site rebuilds daily (.github/workflows/deploy.yml), so new uploads appear on their own.
export function getVideos(): Promise<Video[]> {
  cache ??= (async () => {
    try {
      const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${site.channelId}`);
      if (!res.ok) return [];
      const xml = await res.text();
      return xml
        .split("<entry>")
        .slice(1)
        .map((e) => ({
          id: /<yt:videoId>([^<]+)/.exec(e)?.[1] ?? "",
          title: cleanTitle(/<title>([^<]*)/.exec(e)?.[1] ?? ""),
          published: /<published>([^<]+)/.exec(e)?.[1] ?? "",
        }))
        .filter((v) => v.id && !site.hideVideos.includes(v.id))
        .filter((v) => v.published >= site.videosSince || site.extraVideos.includes(v.id));
    } catch {
      return [];
    }
  })();
  return cache;
}
