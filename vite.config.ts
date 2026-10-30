import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages serves project sites under /<repo>/. The deploy workflow sets
// BASE_PATH; locally the app runs at the root. The router basepath follows it.
const base = process.env.BASE_PATH ?? '/'

const config = defineConfig({
  base,
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    tailwindcss(),
    // Static site: render every route to HTML at build time into dist/client,
    // so GitHub Pages can serve it with no server at runtime.
    tanstackStart({ prerender: { enabled: true, crawlLinks: false } }),
    viteReact(),
  ],
})

export default config
