import type { Lang, LocalizedField, LocalizedArray } from '../types';

// Static imports for synchronous use in Astro components
import frStrings from '../i18n/fr.json';
import enStrings from '../i18n/en.json';

const strings = { fr: frStrings, en: enStrings } as const;

/**
 * Translate a dot-notation key for the given language.
 * Falls back to the key itself if not found.
 */
export function t(key: string, lang: Lang): string {
  const keys = key.split('.');
  let result: unknown = strings[lang];
  for (const k of keys) {
    result = (result as Record<string, unknown>)?.[k];
  }
  return (result as string) ?? key;
}

/**
 * Get the localized string for the given language.
 * Falls back to French if the requested language is missing.
 */
export function localized(field: LocalizedField, lang: Lang): string {
  return field[lang] || field.fr;
}

/**
 * Get the localized string array for the given language.
 * Falls back to French array if the requested language is missing.
 */
export function localizedArray(field: LocalizedArray, lang: Lang): string[] {
  return field[lang] || field.fr;
}

/**
 * Detect the current language from the page URL.
 * URL starting with /en/ → 'en', everything else → 'fr'
 */
export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  if (first === 'en') return 'en';
  return 'fr';
}

/**
 * Get the alternate URL for language switching.
 */
export function getAlternateUrl(url: URL, targetLang: Lang): string {
  const currentLang = getLangFromUrl(url);
  if (currentLang === targetLang) return url.pathname;

  if (targetLang === 'en') {
    // FR → EN: prepend /en
    return '/en' + url.pathname;
  } else {
    // EN → FR: remove /en prefix
    return url.pathname.replace(/^\/en/, '') || '/';
  }
}
