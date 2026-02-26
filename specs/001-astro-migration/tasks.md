# Tasks: Astro Migration — Portfolio Karim AIT HAMMOU

**Input**: Design documents from `specs/001-astro-migration/`
**Prerequisites**: plan.md ✅ | spec.md ✅ | constitution.md ✅
**Branch**: `feature/astro-migration`

---

## Phase 1: Setup (Scaffolding)

**Purpose**: Initialize Astro project, configure toolchain, create branch.

- [ ] T001 Create branch `feature/astro-migration` from `main` via `git checkout -b feature/astro-migration`
- [ ] T002 Initialize Astro project: `pnpm create astro@latest . --template minimal --typescript strict`
- [ ] T003 [P] Install runtime dependencies: `pnpm add astro @astrojs/tailwind @astrojs/sitemap astro-icon zod`
- [ ] T004 [P] Install dev dependencies: `pnpm add -D tailwindcss @tailwindcss/typography prettier prettier-plugin-astro puppeteer tsx`
- [ ] T005 Write `astro.config.mjs` — site URL, tailwind, sitemap (exclude cv-print), i18n (fr default, no prefix)
- [ ] T006 Write `tailwind.config.mjs` — Inter font, JetBrains Mono, indigo primary palette, dark mode class, fadeIn/slideUp keyframes
- [ ] T007 Write `tsconfig.json` — strict mode, path aliases
- [ ] T008 Create complete directory structure: src/{components,data,i18n,layouts,pages/en,schemas,styles,utils,types}, scripts/, public/images/projects/
- [ ] T009 Write `src/styles/global.css` — Tailwind directives, smooth scroll, @media print rules
- [ ] T010 Commit: `chore: initialize astro project with dependencies and structure`

---

## Phase 2: Data Layer — MOST CRITICAL PHASE

**Purpose**: Establish the single source of truth. Zero placeholders permitted.

**⚠️ CRITICAL**: All downstream components depend on this phase. No component work before data is validated.

### Step 2a: Zod Schemas and Types

- [ ] T011 [P] Write `src/schemas/profile.schema.ts` — ProfileSchema with all nested Zod types (LocalizedString, LocalizedStringArray, ExperienceSchema, EducationSchema, CertificationSchema, SkillCategorySchema, SkillItemSchema)
- [ ] T012 [P] Write `src/schemas/projects.schema.ts` — ProjectSchema with optional testimonial/achievements/subProjects/url. ProjectsSchema wrapper.
- [ ] T013 Write `src/types/index.ts` — re-export Profile, Project, Projects, Lang, LocalizedField, LocalizedArray
- [ ] T014 Write `src/utils/i18n.ts` — t(key, lang), localized(field, lang), localizedArray(field, lang), getLangFromUrl(url)
- [ ] T015 Write `src/utils/helpers.ts` — getProjectFilterCategory(project, lang), formatDate(date), getStatusColor(status)

### Step 2b: i18n UI Strings

- [ ] T016 [P] Write `src/i18n/fr.json` — nav, hero, sections, projects (filter labels, features, status, client, tech_stack), testimonials, footer, theme keys
- [ ] T017 [P] Write `src/i18n/en.json` — English equivalents of all keys in fr.json

### Step 2c: Profile JSON (Real Data — NO Placeholders)

- [ ] T018 Write `src/data/profile.json` with ALL real data:
  - basics: name, label (fr/en), email, phone, summary (fr/en full bio), location, profiles (LinkedIn, GitHub), yearsOfExperience=16, availability (fr/en)
  - experience[0]: 2021-Present, Freelance Solutions Architect (KMB Trader, WorldWide Team, Sci-X, AAF, Assabil)
  - experience[1]: 2017-2020, DSI at Institut HEM / LCI Education (21 collabs, 300 users, 1M DH migration)
  - experience[2]: 2015-Present, Drupal Solutions Architect Freelance (MedMétiers, HEM V2, ECIS 2020/2021)
  - experience[3]: 2010-2015, Senior Webmaster Institut HEM (10-person team, multimedia production)
  - experience[4]: 2007-2010, Gérant Sunlight Systems SARL (SoussAgri 2ème Prix INNOFEL 2008)
  - skills.technical[0]: Leadership & Management (8 items fr/en)
  - skills.technical[1]: Architecture & Développement (22 tech tags)
  - skills.technical[2]: IA & Data (18 items fr/en)
  - skills.soft: fr/en arrays
  - education: extract from HTML
  - certifications: extract from HTML
  - languages: Français/Bilingue, Anglais/Professionnel, Arabe/Natif, Amazigh/Natif

### Step 2d: Projects JSON (All 20 Projects — Real Data)

- [ ] T019 Write `src/data/projects.json` with ALL 20 projects, complete FR+EN bilingual:
  1. kmb-trader (Trading Algorithmique / Algorithmic Trading)
  2. worldwide-team (Géolocalisation & Management / Geolocation & Management)
  3. assabil-extractor (Intégration ERP / ERP Integration)
  4. aaf — Ateliers d'Art de France (CMS & E-commerce) — use FR id `aaf`, not `ateliers-art-france`
  5. sci-x-platform (IA & Recherche / AI & Scientific Research)
  6. ecis-platform (Gestion d'Événements / Event Management)
  7. sunlight-systems (Web & Multimédia / Web Development & Multimedia)
  8. soussagri (Agricole & AgriTech / Agricultural Platform & AgriTech)
  9. eriser (AgriTech & Irrigation / AgriTech & Irrigation Solutions)
  10. radioplus-agadir (Média & Streaming / Media & Audio Streaming)
  11. packinfo (Média Agricole / Agricultural Media & Subscription)
  12. fellahconseil (Agricole B2B / B2B Agricultural Platform)
  13. amfel (Annuaire B2B / B2B Directory & Sector Portal)
  14. hem-institutional-site (Éducation Supérieure / Higher Education)
  15. hem-digital-ecosystem (Stratégie Digitale / Digital Strategy & Community Management)
  16. cesem-research-center (Recherche Académique / Academic Research & Publications)
  17. economia-academic-journal (Publications Académiques / Academic Publications & Research)
  18. medmetiers-institute (Formation Professionnelle / Professional Training & Higher Education)
  19. alma-water-distribution (Industrie & Infrastructure / Industry & Hydraulic Infrastructure)
  20. hem-refonte-2015 (Éducation Supérieure / Higher Education & Institutional Communication)

### Step 2e: Validation & Image Migration

- [ ] T020 Write `src/schemas/validate.ts` — validates both JSON files, exits 1 on failure
- [ ] T021 Copy existing images from `/tmp/legacy-cv/images/` to `public/images/`: profile.png, projects/aaf.png, assabil.png, ecis2020.png, ecis2021.jpg, medmetiers-institute.jpg, worldwide-team.png
- [ ] T022 Run `pnpm run validate` — must output "✅ profile.json is valid" + "✅ projects.json is valid — 20 projects loaded"
- [ ] T023 Commit: `feat: add complete data layer (profile.json, projects.json, schemas, i18n, utils)`

**Checkpoint**: Data layer complete. All 20 projects validated. Images migrated. Ready for component work.

---

## Phase 3: Layouts & Infrastructure Components

**Purpose**: HTML shell and shared infrastructure needed by all page components.

- [ ] T024 Write `src/components/SEOHead.astro` — meta charset/viewport/description, OG tags (title/description/image/url/type), Twitter Card, JSON-LD Person schema, canonical URL, hreflang fr/en, favicon
- [ ] T025 Write `src/layouts/BaseLayout.astro` — HTML shell, dark mode blocking init script, SEOHead slot, font loading (Inter), smooth scroll CSS, slot for page content
- [ ] T026 Write `src/layouts/CVPrintLayout.astro` — minimal HTML, A4 print CSS, system fonts only, no dark mode, no nav, @media print rules
- [ ] T027 Write `src/components/ImageWithFallback.astro` — renders `<img loading="lazy">` if image path exists, else renders gradient placeholder div with project initials text
- [ ] T028 Commit: `feat: add SEOHead, BaseLayout, CVPrintLayout, ImageWithFallback`

---

## Phase 4: Navigation Components (Islands)

**Purpose**: Header with theme and language controls.

- [ ] T029 Write `src/components/ThemeToggle.astro` — sun/moon icon button, client:load island, toggles `dark` class on `<html>`, persists to localStorage
- [ ] T030 Write `src/components/LanguageSwitch.astro` — client:load island, FR/EN buttons, redirects to `/` (fr) or `/en/` (en), preserves current page section
- [ ] T031 Write `src/components/Header.astro` — fixed top nav with backdrop blur, smooth scroll anchors to all sections, ThemeToggle, LanguageSwitch, hamburger mobile menu, active section highlighting on scroll
- [ ] T032 Commit: `feat: add Header with navigation, ThemeToggle island, LanguageSwitch island`

---

## Phase 5: Hero & About Components (P1 Story)

**Goal**: Core identity sections — fully server-side rendered from profile.json

- [ ] T033 Write `src/components/Hero.astro` — gradient name display, job title, hero-subtitle tagline from profile summary, two CTAs (Download CV → /cv.pdf, Contact → #contact), social links row (LinkedIn, GitHub), hero stats (16yr, 50+, 21), profile image, subtle background gradient, years badge
- [ ] T034 Write `src/components/About.astro` — professional summary from profile.json, key stats cards (years experience, projects count, max team), languages spoken list, availability status badge, two-column desktop layout
- [ ] T035 Commit: `feat: add Hero and About components`

---

## Phase 6: Skills & Experience Components (P1 Story)

**Goal**: Technical credibility sections — server-side rendered

- [ ] T036 Write `src/components/Stack.astro` — skill categories grouped (Leadership, Dev, AI/Data), each skill with name + proficiency bar (animated via CSS), soft skills section, responsive grid
- [ ] T037 Write `src/components/ExperienceCard.astro` — company, position, date range badge (with "Présent/Present" badge for current), summary, highlights as bullet list, tech stack tags
- [ ] T038 Write `src/components/ExperienceTimeline.astro` — vertical timeline with left border line, maps experience array to ExperienceCard sub-components
- [ ] T039 Commit: `feat: add Stack and ExperienceTimeline components`

---

## Phase 7: Projects Grid with Filters (P2 Story)

**Goal**: 20-project grid with era-based filtering — the key feature of the new architecture

- [ ] T040 Write `src/components/ProjectCard.astro` — project image (ImageWithFallback), category badge top-left overlay, status badge top-right (color-coded: green=production, blue=delivered/livré, gray=archived), title, 3-line clamped description, technology tags, date + client meta, expandable key features section (CSS details/summary), testimonial quote (if exists), achievement badges (if exists, trophy icon), hover scale + shadow
- [ ] T041 Write `src/components/ProjectFilters.astro` — client:load island, filter buttons (All/Tous, Recent 2020+/Récents 2020+, Institutional/Institutionnel, Pioneer/Pionnier 2007-2009), stores active filter in state, emits filter events to ProjectsGrid, shows project count per filter, smooth fade transition
- [ ] T042 Write `src/components/ProjectsGrid.astro` — receives projects array, renders ProjectFilters island at top, renders 3-col responsive grid (1 mobile, 2 tablet, 3 desktop), passes filter state to control card visibility, ARIA live region for count announcements
- [ ] T043 Commit: `feat: add ProjectsGrid with filter system (All/Recent/Institutional/Pioneer)`

---

## Phase 8: Testimonials Component (P1/P2 Story)

**Goal**: Aggregate and display testimonials from projects data

- [ ] T044 Write `src/components/TestimonialCarousel.astro` — client:load island, displays 6+ testimonials aggregated from projects.json, auto-rotates every 5 seconds, manual prev/next arrows, navigation dots, large quote text with project reference, author name
- [ ] T045 Write `src/components/Testimonials.astro` — section wrapper, aggregates testimonials from all projects where `testimonial` field exists, passes to TestimonialCarousel island, section title from i18n
- [ ] T046 Commit: `feat: add Testimonials section with carousel island`

---

## Phase 9: Footer Component

- [ ] T047 Write `src/components/Footer.astro` — contact info (email, phone, location), social icons (LinkedIn, GitHub, mailto), quick nav links, "Built with Astro & Tailwind" credit, dynamic copyright year, back to top button
- [ ] T048 Commit: `feat: add Footer component`

---

## Phase 10: Pages (P1 Story MVP)

**Purpose**: Wire all components together into deployable pages.

- [ ] T049 Write `src/pages/index.astro` — lang='fr', imports all components, validates profile+projects at build time via Zod .parse(), passes profile+projects props to components
- [ ] T050 Write `src/pages/en/index.astro` — lang='en', same structure as FR page
- [ ] T051 Write `src/pages/cv-print.astro` — uses CVPrintLayout, renders name/contact header, summary, 5 experience entries, all skill categories, education, languages. NO projects section. No dark mode.
- [ ] T052 Commit: `feat: add FR/EN index pages and cv-print page with build-time validation`

**Checkpoint**: `pnpm build` must succeed. All 3 pages render. User Story 1 (P1) is independently testable.

---

## Phase 11: CI/CD Pipeline (P4 Story)

- [ ] T053 Write `.github/workflows/deploy.yml` — triggers on push to main, node 20 + pnpm 8 setup, install + validate + build + generate-pdf steps, upload-pages-artifact, deploy-pages job
- [ ] T054 Write `scripts/generate-pdf.ts` — Puppeteer launches headless Chrome, opens file:///dist/cv-print/index.html, generates A4 PDF to dist/cv.pdf with 15mm margins
- [ ] T055 Update `package.json` scripts — dev, build (astro check + astro build), preview, validate (tsx), generate-pdf (tsx), lint, format
- [ ] T056 Commit: `feat: add GitHub Actions deploy workflow and PDF generation script`

---

## Phase 12: QA & Polish (All Stories)

**Purpose**: Verify all acceptance criteria and quality gates from constitution.

- [ ] T057 Run `pnpm run validate` — must pass with 20 projects
- [ ] T058 Run `pnpm build` — zero errors, zero warnings
- [ ] T059 [P] Test dark mode: toggle → persists on refresh, persists across language switch
- [ ] T060 [P] Test language switch: / → /en/ → / with correct content in each lang
- [ ] T061 [P] Test project filters: All (20), Recent (7), Institutional (7), Pioneer (7) — verify counts and correct projects
- [ ] T062 [P] Test testimonials: minimum 6 visible, auto-rotate working, dots navigation working
- [ ] T063 [P] Test ImageWithFallback: projects with missing images show gradient placeholder (no broken img tags)
- [ ] T064 [P] Validate JSON-LD at https://validator.schema.org
- [ ] T065 [P] Validate OpenGraph at https://www.opengraph.xyz (FR and EN pages)
- [ ] T066 [P] Test responsive at 375px, 768px, 1024px, 1440px — no horizontal overflow
- [ ] T067 [P] Run Lighthouse on / — all metrics ≥95
- [ ] T068 [P] Run Lighthouse on /en/ — all metrics ≥95
- [ ] T069 Test cv-print page: Ctrl+P renders clean A4 layout, 1-2 pages
- [ ] T070 Test PDF: dist/cv.pdf generated and opens correctly
- [ ] T071 Verify sitemap: /sitemap-index.xml present, contains / and /en/, excludes /cv-print
- [ ] T072 Check all social links: LinkedIn, GitHub, email, phone are correct
- [ ] T073 Commit any fixes: `fix: address QA checklist items`
- [ ] T074 Write README.md with architecture documentation and setup instructions
- [ ] T075 Commit: `docs: add README with architecture documentation`
- [ ] T076 **Final: Merge `feature/astro-migration` → `main` via PR** (after all QA passes)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1** (Setup): No dependencies — start immediately
- **Phase 2** (Data Layer): Depends on Phase 1 — **BLOCKS all component work**
- **Phase 3** (Layouts): Depends on Phase 2 validation passing
- **Phases 4-9** (Components): Depend on Phase 3. Components within can run in parallel.
- **Phase 10** (Pages): Depends on all components being complete
- **Phase 11** (CI/CD): Can run in parallel with Phase 10 after Phase 1
- **Phase 12** (QA): Depends on Phase 10 + 11 both complete

### Parallel Opportunities within Component Phases

```bash
# Phase 3 — all can be written independently:
Task: SEOHead.astro (no dependencies)
Task: BaseLayout.astro (depends on SEOHead)
Task: CVPrintLayout.astro (independent)
Task: ImageWithFallback.astro (independent)

# Phases 5-9 — after Phase 3 completes, these are independent:
Task: Hero.astro + About.astro
Task: Stack.astro + ExperienceTimeline.astro + ExperienceCard.astro
Task: ProjectCard.astro + ProjectFilters.astro + ProjectsGrid.astro
Task: TestimonialCarousel.astro + Testimonials.astro
Task: Footer.astro
```

### Within Each Phase

- Schemas before JSON data files
- JSON data before validation script
- Validation passing before any component work
- Component before it appears in a page
- Pages before CI/CD testing

---

## Implementation Strategy

### MVP First (Phase 1 + 2 + 3 + 4 + 5 + 10)

1. Phase 1: Setup
2. Phase 2: Data Layer (validate passes) ← CRITICAL GATE
3. Phase 3: Layouts
4. Phase 4: Navigation
5. Phase 5: Hero + About
6. Phase 10: Partial — index.astro with only Hero + About renders
7. **STOP and VALIDATE**: Static page visible at localhost, content from JSON

### Incremental Delivery

Then add each component phase and rebuild to verify:
- Add Stack + Experience → rebuild → test
- Add Projects + Filters → rebuild → test filters
- Add Testimonials → rebuild → test carousel
- Add Footer → rebuild → complete page
- Add CV Print page → test print
- Add CI/CD → push to main → verify GitHub Actions

---

## Notes

- [P] = can run in parallel (different files, no interdependencies)
- Always run `pnpm run validate` before and after editing JSON files
- Commit after each logical task group — do not accumulate uncommitted changes
- Test dark mode manually in browser — cannot be unit tested
- Test language switch by navigating to / and /en/ separately
- For T019 (projects.json): Use FR data from `js/projects-data.js` as canonical for all fields. Merge EN data from `js/projects-data-en.js`. Where EN translation is missing (e.g., soussagri has no EN description in projects-data-en.js), translate from FR accurately.
- Image paths in JSON should be relative to public/: `"images/projects/aaf.png"` (not `"images/projects/aaf.png"`)
- For `aaf` project: English id in `projects-data-en.js` is `ateliers-art-france` — normalize to `aaf` in unified JSON
