// @ts-check
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://jonathan-scattolini.fr',

  // French at the root (no prefix), English under /en/.
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    routing: { prefixDefaultLocale: false },
  },

  build: {
    // Always emit stylesheets as files: the enforced CSP (style-src 'self')
    // blocks inline <style> blocks.
    inlineStylesheets: 'never',
  },

  vite: {
    build: {
      // Never inline anything, for the same CSP: below this limit Astro would
      // inline small component <script>s into the page (script-src 'self'), and
      // Vite would turn small files such as font subsets into data: URIs
      // (font-src 'self').
      assetsInlineLimit: 0,
    },
  },
})
