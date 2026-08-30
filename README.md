# michaelcastelein.com

Personal site. Astro, no CMS, deployed to GitHub Pages from the `gh-pages`
branch by `.github/workflows/deploy.yml` on every push to `main`.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # writes dist/
npm run preview  # serve dist/
```

## Where things live

```
src/
  data/site.ts        ALL copy and all project entries. Nothing else holds text.
  layouts/Base.astro  head, masthead, footer. Every page uses it.
  styles/site.css     the whole design, global so pages cannot drift apart.
  styles/base.css     reset only.
  pages/
    index.astro       /
    projects.astro    /projects
    transcribe.astro  /transcribe
  components/
    ProjectCard.astro one project card, shared by / and /projects
    Globe.astro       the WebGL globe, hand-rolled Three.js
    Photo.astro       one photo slot, falls back to a labelled placeholder
    Analytics.astro   PostHog, EU host, no cookies
  assets/photos/      drop photos in, the filename becomes the caption
  assets/projects/    screenshots used by project pages
public/
  caffeine/index.html the Caffeine Lab tool, served at /caffeine
```

## Adding a project

`/projects` is one grid of blocks. Each block roughly describes a project and
links straight out to its real website. To add one, add an entry to `projects`
in `src/data/site.ts`. Nothing else.

```ts
{
  slug: 'thing',
  name: 'Thing',
  tagline: 'One line someone would repeat to a friend.',
  body: 'A paragraph. What it is, who it is for, what it is built on.',
  state: 'live',            // live | writeup | building, drives the badge colour
  stateLabel: 'Live product',
  site: 'https://thing.com',
  tags: ['Tag', 'Tag', 'Tag'],
}
```

A block points at, in order: `href` (a page on this site), `site` (the real
website), then `repo`. With none of them it renders as plain text, so nothing
dead is clickable. When the link leaves the site, the block prints the
destination host under it so a visitor knows where they are going.

`repo` must be a PUBLIC repo. A private one 404s for every visitor. Check with:

```bash
curl -s -o /dev/null -w "%{http_code}" https://api.github.com/repos/<owner>/<name>
```

The home page shows the first three entries, so keep something clickable at the
top of the array. Both pages read from that one array, so a project is never
described in two places.

A project that has no website of its own can get a page here instead, the way
`/transcribe` does: write `src/pages/<slug>.astro` using `<Base>` with the
`.page.page--article` and `.prose` classes, then set `href: '/<slug>/'`.

## Self-contained tools

A tool that is one HTML file goes in `public/<name>/index.html` and is served
verbatim at `/<name>`. That is how `/caffeine` works. Two things to keep:

- `<meta charset="utf-8">` near the top, or every curly quote turns to mojibake.
- The `#mc-back` strip injected after `<body>`, so the tool is not a dead end.

The source of `/caffeine` also lives outside this repo. Edits made here do not
flow back, so change it in one place and copy.

## House style for copy

All of it lives in `src/data/site.ts`, with the rules written at the top of that
file. The short version:

- No em dashes and no en dashes. Use a comma, a period, a colon or brackets.
- Avoid the "X, not Y" and "not just X but Y" contrast pattern.
- Avoid "actually", "genuinely", "truly", "simply", "seamlessly".
- Short sentences beat clever ones.

Check before committing:

```bash
grep -rn "—\|–" src/ public/caffeine/    # must return nothing
```

## Photos

Drop files into `src/assets/photos/<category>/`. They appear on their own, and
the filename becomes the caption, so name them in words:
`night-market-in-chaozhou.jpg` becomes "Night market in Chaozhou". Prefix with
`01-` to control the order. Categories in use: `me`, `chaozhou`, `kunming`,
`netherlands`, `usa`, `play`.

`me/` slot 0 is the hero portrait. Everything else is optional. An empty slot
renders nothing in production and a labelled placeholder in `npm run dev`.

## Before you call a change done

Serve `dist/` and look at it in a browser, at 1440px and at 390px. Check for
mojibake, horizontal overflow on `<html>`, and `<pre>` blocks bleeding out of
their container instead of scrolling.

## Deployment

`main` is the source. The workflow builds and pushes `dist/` to `gh-pages`,
which is what the custom domain serves. `public/CNAME` is copied into `dist/` on
every build and the workflow fails loudly if it goes missing, because a
`gh-pages` push without it silently unbinds the domain.
