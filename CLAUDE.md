# Portfolio Karim AIT HAMMOU — Development Guidelines

**Project**: Astro Migration of `https://github.com/HumanZ19/HumanZ19.github.io`
**Working Branch**: `feature/astro-migration`
**Constitution**: `.specify/memory/constitution.md`
**Spec + Plan + Tasks**: `specs/001-astro-migration/`

---

## Active Technologies

| Tool | Version | Purpose |
|------|---------|---------|
| Astro | 4.x | Static site framework |
| TypeScript | 5.x strict | All source files |
| Tailwind CSS | 3.x | Styling |
| Zod | 3.x | Build-time data validation |
| pnpm | 8.x | Package manager — use pnpm, never npm or yarn |
| Node.js | LTS ≥20 | Runtime |
| Puppeteer | latest | PDF generation post-build |

---

## Project Structure

```text
src/
├── components/     # 15 Astro components
├── data/           # profile.json + projects.json (single source of truth)
├── i18n/           # fr.json + en.json (UI strings only)
├── layouts/        # BaseLayout.astro + CVPrintLayout.astro
├── pages/          # index.astro (FR) + en/index.astro (EN) + cv-print.astro
├── schemas/        # profile.schema.ts + projects.schema.ts + validate.ts
├── styles/         # global.css
├── utils/          # i18n.ts + helpers.ts
└── types/          # index.ts (re-exports from schemas)
scripts/            # generate-pdf.ts
public/images/      # Migrated assets from legacy repo
```

---

## Commands

```bash
pnpm dev              # Development server
pnpm build            # Type check + build (FAILS if Zod validation fails)
pnpm preview          # Preview built site
pnpm run validate     # Validate profile.json + projects.json with Zod
pnpm run generate-pdf # Generate cv.pdf from built cv-print page
pnpm lint             # Prettier check
pnpm format           # Prettier format
```

---

## Critical Rules (from Constitution)

1. **NEVER commit to `main`** — all work on `feature/astro-migration`
2. **NEVER hardcode text** in component files — all content from JSON or i18n files
3. **NEVER add client-side JS** outside the 4 approved islands: ThemeToggle, LanguageSwitch, ProjectFilters, TestimonialCarousel
4. **ALWAYS run `pnpm run validate`** after editing profile.json or projects.json
5. **TypeScript strict** — no `any` without suppression comment and justification

---

## Code Style

- Astro components: props typed via TypeScript interfaces or inferred from Zod
- Content access: always use `localized(field, lang)` helper, never `field.fr` directly
- i18n strings: always use `t('nav.about', lang)` helper, never hardcoded text
- Commits: conventional commits (`feat:`, `fix:`, `chore:`, `docs:`)

---

## Key Data Facts

- **20 projects** in projects.json (FR + EN bilingual)
- **5 experience entries**: 2021-Present, 2017-2020, 2015-Present, 2010-2015, 2007-2010
- **3 skill categories**: Leadership & Management, Architecture & Développement, IA & Data
- **Contact**: aithammoukarim@gmail.com | +212 6 15-80-76-63 | Rabat, Maroc
- **Stats**: 16 years experience, 50+ projects, 21 max team managed
- **Images available** in `public/images/projects/`: aaf.png, assabil.png, ecis2020.png, ecis2021.jpg, medmetiers-institute.jpg, worldwide-team.png
- **Images missing** (use ImageWithFallback gradient placeholder): kmb-trader, sci-x, sunlight-systems, soussagri, eriser, radioplus, packinfo, fellahconseil, amfel, hem-*, cesem, economia, alma-water-distribution

---

## Recent Changes

- 2026-02-26: Initial setup — speckit constitution, spec, plan, tasks created. Repository cloned and analyzed. No Astro code written yet.
