# Portfolio

Two role-targeted portfolios, hosted on GitHub Pages.

`/swe` and `/game-dev` are two separate pages. Each owns its content file, its
project shape, and its layout. `/` is the front door: who you are, plus links to
both. Send the link that matches the posting.

A project that belongs on both pages is **written twice**, once per page, in
that page's content file. Astrodescent and Party Lab are both — on `/swe` they
are a renderer and a sandboxed scripting host, on `/game-dev` they are a game
and a thing you play with friends. The two entries are allowed to disagree about
what mattered; that is why these are separate pages rather than one list
rendered two ways. Keep the shared facts (role, dates, team) in sync by hand.

## Commands

```sh
npm run dev        # dev server
npm run build      # static output to build/
npm run preview    # serve build/ locally
npm run check      # svelte-check + tsc
```

## Layout

```
src/lib/content/
  types.ts           the schemas, documented — one project type per page
  swe.ts             /swe: page meta, experience, education, skills,
                     SystemProject[]                        <- edit these
  games.ts           /game-dev: page meta, GameProject[], alsoShipped[]
  pages.ts           nav order
  profile.ts         name, email, links, canonical origin
src/routes/
  +page.svelte       front door: hero canvas + links to both pages
  swe/               own layout: jobs, then projects, then skills/education
  game-dev/          own layout: the build first, then everything else
src/lib/components/
  PageShell          nav, masthead, footer, accent hue — chrome only
  SiteNav            primary nav, one hue per link
  ShaderCanvas       WebGL host: DPR cap, pauses offscreen, reduced-motion
  SystemsDiagram     /swe data-flow figure
  Playable           /game-dev itch.io embed, click to load
src/lib/shaders/     GLSL for the home page hero canvas, imported with ?raw
src/lib/gl.ts        minimal WebGL2 runner, no three.js
```

`PageShell` is chrome only — it has no branch on which page it is rendering.
Each page's body lives in its own `+page.svelte`. If you find yourself adding a
`{#if page.id === ...}` to a shared component, that is the signal to give the
page its own markup instead.

Adding a page: write `src/lib/content/<page>.ts`, add the route directory, list
it in `pages.ts`, and add a case to `pageHref` in `src/lib/routes.ts`.

### Contribution breakdowns

Every entry in `games.ts` carries a required `contribution: ContributionArea[]`
— what you did, grouped by area — and an optional `collaborators` list for
everyone else. Most of these are team projects, and "what did you actually do"
is the question a studio reads the page to answer. The collaborator list is not
a footnote: naming what someone else owned is what makes the specific claim
above it credible.

Keep the areas concrete (`Rendering`, `Physics`, `VFX`) rather than tidy. If an
area only has one bullet, that is fine — a short honest list beats a padded one.

The whole palette derives from one number, `--accent-hue`, set per page from
that page's meta. See the note at the top of `src/app.css` for why the tokens
are declared on `:root, .theme` rather than nested.

## Deploying to GitHub Pages

1. Push to GitHub. The repo must be **public** on the free plan.
2. Settings → Pages → Source → **GitHub Actions**.
3. Push to `main`. `.github/workflows/deploy.yml` builds and deploys.

### Base path

Everything is prerendered with relative asset paths, so the build is portable —
but `BASE_PATH` still needs to be right for client-side routing and for absolute
OG image URLs.

| Hosting | `BASE_PATH` |
| --- | --- |
| Custom domain | `''` |
| Repo named `<user>.github.io` | `''` |
| Any other repo name | `/<repo-name>` |

Set it in `deploy.yml` (the commented line uses the repo name automatically).

A custom domain is worth the ~$10/yr: `yourname.dev/swe` on a job
application reads better than a `github.io` subpath, and `BASE_PATH` stays empty.
Add a `CNAME` file to `static/` and point DNS at GitHub.

On Windows, don't test `BASE_PATH` from Git Bash — MSYS rewrites `/portfolio`
into a Windows path. Use PowerShell: `$env:BASE_PATH='/portfolio'; npm run build`.

## GitHub Pages constraints that shaped this

**No response headers.** Pages can't send COOP/COEP, so `SharedArrayBuffer` is
unavailable — standard Godot 4 web exports and threaded Unity builds won't run.
It also won't send `Content-Encoding`, so Unity's Brotli output breaks unless you
enable Decompression Fallback.

→ Playables are hosted on **itch.io** and embedded via iframe (`Playable`).
itch sets the right headers, and it's where games people expect to click.

**Repo size and bandwidth.** ~100GB/month soft limit, and committed binaries stay
in git history forever. Git LFS also doesn't resolve on Pages when deploying from
a branch — you get the pointer file.

→ Media is referenced by **absolute URL**, not imported (see `MediaRef` in
`types.ts`). Host video on Cloudflare R2 / Bunny / Vimeo. Budget: hero loop under
~2MB, breakdown captures under ~500KB. Use `webm` with an `mp4` fallback, never
GIFs. Small optimized stills in `static/` are fine.

**Public repo.** Keep marketplace-licensed assets, NDA'd studio work, and
unreleased material out of this repo.

**`static/.nojekyll`** is committed. The Actions deploy path doesn't run Jekyll,
but if you ever switch to deploy-from-branch, Jekyll strips `_app/` without it
and the site goes blank.

## TODO before sending this to anyone

Content is real, not placeholder. What is left (grep for `TODO`):

- [ ] Set `origin` in `profile.ts` once the domain is live — OG previews need it
- [ ] `itchEmbedUrl` for Astrodescent: itch game edit page → enable embedding →
      paste the `https://itch.io/embed-upload/...` URL. Same for Sand of Souls,
      which needs the page owner to enable it.
- [ ] Decide whether the Astrodescent itch link (the earlier Unity prototype)
      belongs next to the Steam page, or should be dropped
- [ ] Confirm the Astrodescent art credit with felixrl before this goes public —
      the name and link come from the itch co-author listing, not from them
- [ ] Add a real `excerpt` to a `/swe` project — the Myelin staleness-hash check
      or the VAD gate would both read well
- [ ] Add hero media (`hero: MediaRef`) — nothing renders it yet, so either wire
      it up or drop the field
- [ ] Add `static/` resume PDFs, then uncomment `resume` in each page's meta
- [ ] Add 1200×630 OG cards, then uncomment `ogImage` in each page's meta
      (this is the link preview a recruiter sees before clicking — worth doing well)
- [ ] Replace the favicon
- [ ] Check it on a phone

Prerendering fails the build on internal links that 404, which is why `resume`
and `ogImage` are commented out rather than pointing at missing files.
