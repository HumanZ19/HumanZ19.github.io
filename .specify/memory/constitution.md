# Karim AIT HAMMOU Portfolio — Astro Migration Constitution

## Core Principles

### I. Data-First (Single Source of Truth) — NON-NEGOTIABLE

All content MUST originate from exactly two JSON files:
- `src/data/profile.json` — biography, experience, education, certifications, skills, languages
- `src/data/projects.json` — all 20 projects with full FR+EN bilingual content

**Prohibited**: Hardcoded text strings in any `.astro`, `.ts`, or `.html` component file.
**Prohibited**: Partial data in components (e.g., project titles, dates, descriptions must come from JSON).
**Exception**: UI chrome strings (button labels, nav items, section headings) come from `src/i18n/fr.json` and `src/i18n/en.json`.

Every field in `profile.json` and `projects.json` uses the `LocalizedField` shape `{ fr: string, en: string }` or `LocalizedArray { fr: string[], en: string[] }` unless the field is language-neutral (e.g., `date`, `technologies`, `email`).

### II. Static-First / Astro Islands Architecture — NON-NEGOTIABLE

The site is a **fully static Astro build** (`output: 'static'`). Zero client-side JavaScript is loaded on the page unless it belongs to one of these four explicitly approved islands:
1. **ThemeToggle** — dark/light mode toggle with localStorage persistence
2. **LanguageSwitch** — FR/EN navigation (redirects to `/` or `/en/`)
3. **ProjectFilters** — client-side filter by era (All, Recent 2020+, Institutional, Pioneer 2007-2009)
4. **TestimonialCarousel** — auto-rotate every 5 seconds with manual navigation dots

Any proposal to add client-side JS outside these four islands **requires explicit justification** and amendment to this constitution.

**Performance target**: Lighthouse ≥95 on all four metrics (Performance, Accessibility, Best Practices, SEO).

### III. Type Safety (NON-NEGOTIABLE)

- TypeScript `strict: true` in `tsconfig.json` — no exceptions, no `any` without suppression comment.
- Zod schemas in `src/schemas/` validate ALL data at **build time**. If `profile.json` or `projects.json` fail validation, the build FAILS. This is intentional and desired.
- Types are inferred from Zod schemas via `z.infer<>` — no manual type duplication.
- All component props are explicitly typed.

### IV. Bilingual by Design

- French (`fr`) is the **default locale** — served at `/`
- English (`en`) is served at `/en/`
- Astro native i18n config: `defaultLocale: 'fr'`, `prefixDefaultLocale: false`
- Every content field that varies by language uses `LocalizedField { fr: string, en: string }`
- Helper functions `localized(field, lang)` and `localizedArray(field, lang)` are used for all field access — never `field.fr` directly in templates
- UI strings (nav labels, button text, section headings) come from `src/i18n/fr.json` / `src/i18n/en.json` via the `t(key, lang)` helper

### V. Content Preservation — CRITICAL

Every single piece of content from the existing `https://github.com/HumanZ19/HumanZ19.github.io` site MUST be extracted and migrated. This includes:

**Profile (from `index.html` + `en/index.html`):**
- Full biography text (FR + EN)
- 5 experience entries (2021-Present, 2017-2020, 2015-Present, 2010-2015, 2007-2010)
- 3 skill categories: Leadership & Management, Architecture & Développement, Intelligence Artificielle & Data
- Contact: aithammoukarim@gmail.com, +212 6 15-80-76-63, Rabat Maroc
- Stats: 16 years experience, 50+ projects, 21 max team managed
- 4 Upwork/client testimonials

**All 20 Projects (from `js/projects-data.js` + `js/projects-data-en.js`):**
1. kmb-trader, 2. worldwide-team, 3. assabil-extractor, 4. aaf (Ateliers d'Art France),
5. sci-x-platform, 6. ecis-platform, 7. sunlight-systems, 8. soussagri, 9. eriser,
10. radioplus-agadir, 11. packinfo, 12. fellahconseil, 13. amfel, 14. hem-institutional-site,
15. hem-digital-ecosystem, 16. cesem-research-center, 17. economia-academic-journal,
18. medmetiers-institute, 19. alma-water-distribution, 20. hem-refonte-2015

Zero "EXTRACT FROM EXISTING HTML" placeholders are permitted in any committed JSON file.

### VI. Branch Strategy & Commit Convention

- **NEVER** commit directly to `main`. All work happens on `feature/astro-migration`.
- `main` is touched only for the final merge after the full QA checklist passes.
- Conventional commits are mandatory: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`
- Commit after each logical unit (one component, one data phase, one config file).

### VII. SEO Excellence

Every page must include:
- Standard meta tags (charset, viewport, description)
- OpenGraph tags (title, description, image, url, type=website)
- Twitter Card tags
- JSON-LD structured data (Schema.org `Person` type)
- Canonical URL
- hreflang alternates (fr / en)
- Astro Sitemap integration

---

## Technology Stack

| Layer | Choice | Version |
|-------|--------|---------|
| Framework | Astro | 4.x |
| CSS | Tailwind CSS + @tailwindcss/typography | 3.x |
| Language | TypeScript strict | 5.x |
| Package Manager | pnpm | 8.x |
| Node.js | LTS | ≥20 |
| Validation | Zod | 3.x |
| PDF | Puppeteer | latest |
| Deploy | GitHub Actions → GitHub Pages | — |
| Hosting | github.io | humanz19.github.io |

**Site URL**: `https://humanz19.github.io`
**GitHub Repo**: `https://github.com/HumanZ19/HumanZ19.github.io`
**Working Branch**: `feature/astro-migration`

---

## Project Structure (Canonical)

```
/
├── .github/workflows/deploy.yml
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Stack.astro
│   │   ├── ExperienceTimeline.astro
│   │   ├── ExperienceCard.astro
│   │   ├── ProjectsGrid.astro
│   │   ├── ProjectCard.astro
│   │   ├── ProjectFilters.astro       # Island: client:load
│   │   ├── Testimonials.astro
│   │   ├── TestimonialCarousel.astro  # Island: client:load
│   │   ├── Footer.astro
│   │   ├── LanguageSwitch.astro       # Island: client:load
│   │   ├── ThemeToggle.astro          # Island: client:load
│   │   ├── SEOHead.astro
│   │   └── ImageWithFallback.astro
│   ├── data/
│   │   ├── profile.json              # Single source of truth — profile
│   │   └── projects.json             # Single source of truth — 20 projects
│   ├── i18n/
│   │   ├── fr.json                   # UI strings French
│   │   └── en.json                   # UI strings English
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── CVPrintLayout.astro
│   ├── pages/
│   │   ├── index.astro               # Default FR page
│   │   ├── en/index.astro            # EN page
│   │   └── cv-print.astro            # Print-optimized CV
│   ├── schemas/
│   │   ├── profile.schema.ts
│   │   ├── projects.schema.ts
│   │   └── validate.ts               # CLI validation script
│   ├── styles/global.css
│   ├── utils/
│   │   ├── i18n.ts                   # t(), localized(), getLangFromUrl()
│   │   └── helpers.ts
│   └── types/index.ts
├── scripts/generate-pdf.ts
├── public/
│   ├── images/
│   │   ├── profile.png               # Migrated from existing repo
│   │   └── projects/                 # Migrated: aaf, assabil, ecis2020, ecis2021, medmetiers, worldwide-team
│   └── favicon.svg
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

---

## Quality Gates (Pre-Merge Checklist)

Before merging `feature/astro-migration` → `main`, ALL must pass:

- [ ] `pnpm run validate` — zero Zod errors on profile.json and projects.json
- [ ] `pnpm build` — zero TypeScript errors, zero build warnings
- [ ] All 20 projects present in projects.json with complete FR+EN data
- [ ] Zero "EXTRACT FROM EXISTING HTML" placeholders in any file
- [ ] Dark mode toggles and persists (localStorage)
- [ ] Language switch navigates `/` ↔ `/en/`
- [ ] Project filters work: All / Recent 2020+ / Institutional / Pioneer 2007-2009
- [ ] Testimonials section aggregates from projects data
- [ ] All social links work (LinkedIn, GitHub, email, phone)
- [ ] Mobile responsive at 375px, 768px, 1024px, 1440px
- [ ] Lighthouse ≥95 on all four metrics
- [ ] JSON-LD validates at https://validator.schema.org
- [ ] CV print page renders clean A4 layout
- [ ] PDF generation runs without errors
- [ ] No broken images (ImageWithFallback gradient fallback works)
- [ ] Images migrated from existing repo to `public/images/`

---

## Governance

This constitution supersedes all other practices. Any deviation requires:
1. Documentation of the violation and why it was necessary
2. Entry in `Complexity Tracking` in the relevant plan.md
3. Amendment to this document if the deviation becomes permanent practice

All PRs to `feature/astro-migration` must verify compliance with Principles I through VII.
Use `specs/001-astro-migration/` for runtime development guidance (spec, plan, tasks).

**Version**: 1.0.0 | **Ratified**: 2026-02-26 | **Last Amended**: 2026-02-26
