/** @type {import('tailwindcss').Config} */
// Tokens issus de docs/DESIGN-SYSTEM.md. Toute valeur hors de ces echelles
// est un ecart a la spec, pas une liberte creative.
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  // Theme sombre unique. La classe `dark` est posee en dur sur <html> pour que
  // les variantes dark: heritees des anciens composants restent actives.
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['IBM Plex Sans Condensed', 'system-ui', 'sans-serif'],
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      // Les couleurs pointent vers des variables CSS definies dans global.css.
      // Consequence : un seul jeu de classes (bg-ink-900, text-txt-100, ...)
      // sert les deux themes, et aucun composant n'a besoin de variante
      // conditionnelle. Le theme se change en basculant une classe sur <html>.
      colors: {
        ink: {
          900: 'rgb(var(--c-ink-900) / <alpha-value>)',
          800: 'rgb(var(--c-ink-800) / <alpha-value>)',
          700: 'rgb(var(--c-ink-700) / <alpha-value>)',
        },
        line: {
          600: 'rgb(var(--c-line-600) / <alpha-value>)',
          500: 'rgb(var(--c-line-500) / <alpha-value>)',
        },
        txt: {
          100: 'rgb(var(--c-txt-100) / <alpha-value>)',
          300: 'rgb(var(--c-txt-300) / <alpha-value>)',
          500: 'rgb(var(--c-txt-500) / <alpha-value>)',
        },
        signal: {
          DEFAULT: 'rgb(var(--c-signal) / <alpha-value>)',
          dim: 'rgb(var(--c-signal-dim) / <alpha-value>)',
        },
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.45' }],
        base: ['1rem', { lineHeight: '1.6' }],
        lg: ['1.25rem', { lineHeight: '1.4' }],
        xl: ['1.5625rem', { lineHeight: '1.2' }],
        '2xl': ['1.9531rem', { lineHeight: '1.18' }],
        '3xl': ['2.4414rem', { lineHeight: '1.12' }],
        '4xl': ['3.0518rem', { lineHeight: '1.08' }],
        '5xl': ['3.8147rem', { lineHeight: '1.04' }],
      },
      maxWidth: {
        content: '1280px',
      },
      transitionDuration: {
        DEFAULT: '150ms',
      },
    },
  },
  plugins: [],
};
