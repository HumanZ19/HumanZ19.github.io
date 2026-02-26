import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://humanz19.github.io',
  integrations: [
    tailwind(),
    // sitemap: re-enable in Phase 5 (known bug with i18n in @astrojs/sitemap@3.x)
  ],
  output: 'static',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
