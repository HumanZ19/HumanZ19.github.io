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
      colors: {
        ink: {
          900: '#0B0D0E',
          800: '#131719',
          700: '#1B2023',
        },
        line: {
          600: '#262C30',
          500: '#333A3F',
        },
        txt: {
          100: '#E8EBEC',
          300: '#9AA1A6',
          500: '#646C71',
        },
        signal: {
          DEFAULT: '#FFB000',
          dim: '#8A5F00',
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
