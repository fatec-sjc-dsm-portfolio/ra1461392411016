// Files in /public are referenced from the site root ('/images/…'). On GitHub
// Pages the site lives under /<repo>/, so prefix them with Vite's base path.
export function assetUrl(path: string, base: string = import.meta.env.BASE_URL): string {
  if (!path.startsWith('/')) return path
  return `${base.replace(/\/$/, '')}${path}`
}
