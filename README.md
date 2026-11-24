# lumolifts.github.io

The LumoLifts website: Urdu quotes, topic pages and the latest Shorts. Built with Astro, deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push and once a day (to pick up new Shorts).

## Where things live

| Path | What |
|---|---|
| `src/data/quotes.json` | Every quote (one per line). Each becomes `/q/<slug>/` |
| `src/data/topics.json` | Topics. Each becomes `/topic/<slug>/` |
| `src/data/site.json` | Social links, which YouTube videos to show (`videosSince`, `extraVideos`, `hideVideos`) |
| `public/q/<slug>.png` | 1080×1080 share image per quote (drawn by `../brand/quote_images.py`) |

Don't edit the JSON by hand if you can avoid it: use `../lumo.py` (see `../README.md`).

## Local preview

```
npm install
npm run dev        # http://localhost:4321
```
