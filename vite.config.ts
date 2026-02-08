import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/** URL base del sitio (debe terminar en /). Usado en index.html para OG y canonical. */
const SITE_URL =
  process.env.VITE_SITE_URL ||
  'https://santiagocacua.github.io/Portafolio/'

/** Inyecta la URL del sitio en index.html (crawlers sin JS ven og:image y og:url absolutos). */
function htmlSeoPlugin() {
  return {
    name: 'html-seo-url',
    transformIndexHtml(html: string) {
      return html.replace(/__SITE_URL__/g, SITE_URL)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [htmlSeoPlugin(), react(), tailwindcss()],
  base: '/Portafolio/',
})
