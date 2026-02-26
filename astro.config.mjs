import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://humanz19.github.io',
  integrations: [
    tailwind(),
    // sitemap: generated as static public/sitemap.xml
    // @astrojs/sitemap@3.7.0 crashes with Astro i18n routing (upstream bug)
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
