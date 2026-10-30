# Deploy — GitHub Pages

This app is a TanStack Start app prerendered to static HTML at build time
(`tanstackStart({ prerender })` in `vite.config.ts`). `pnpm build` writes the
site to `dist/client/`, and GitHub Pages serves it as plain files.

## One-time setup

1. In the GitHub repo: **Settings → Pages → Build and deployment → Source:
   GitHub Actions**.
2. (Optional) **Settings → Secrets and variables → Actions → Variables**: add
   `VITE_DISCORD_ID` for the Lanyard live-status pill.
3. Push to `main`. The `Deploy to GitHub Pages` workflow builds and publishes
   the site to `https://<owner>.github.io/<repo>/`.

## Base path

Project sites live under `/<repo>/`, not the domain root. The workflow sets
`BASE_PATH=/<repo>/` for the build; Vite uses it as `base`, and the router's
basepath follows it. Anything in `/public` (`/images/…`, `/pdfs/…`) must go
through `assetUrl()` from `src/lib/assetUrl.ts`, or it will 404 on Pages.

To check a Pages-style build locally:

```bash
BASE_PATH=/ra1461392411016/ pnpm build
```

then serve `dist/client` under that sub-path.

## Environment variables

| Variable          | Where                 | Required | Purpose                                         |
| ----------------- | --------------------- | -------- | ----------------------------------------------- |
| `BASE_PATH`       | Set by the workflow   | No       | Sub-path the site is served from (default `/`). |
| `VITE_DISCORD_ID` | Repo Actions variable | No       | Discord user id for the Lanyard live-status pill. |

Everything ends up in the public bundle — there are no server secrets.

## Limitations of a static host

- **No server functions.** The contact form opens the visitor's email app with
  a prefilled `mailto:` instead of sending mail itself. To send from the page,
  use a form service that accepts browser requests.
- **Not private.** A GitHub Pages site is public to anyone with the URL
  (private Pages requires GitHub Enterprise Cloud).

## Content still to supply

- `panda.gif` in `/public` for the EasterEgg (falls back to the 🐼 emoji).
