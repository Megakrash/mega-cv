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
})
