# Feature Specification: Astro Migration — Portfolio Karim AIT HAMMOU

**Feature Branch**: `feature/astro-migration`
**Created**: 2026-02-26
**Status**: Draft
**Source Repo**: `https://github.com/HumanZ19/HumanZ19.github.io`

---

## Context

Migration of a legacy static HTML/CSS/JS portfolio into a modern, production-ready Astro-based architecture. The existing site at `https://humanz19.github.io` is a manually maintained bilingual (FR/EN) portfolio with hardcoded content in HTML files and JavaScript data arrays. The migration introduces a data-driven, type-safe, bilingual architecture with Lighthouse 95+ performance targets.

**Existing assets extracted:**
- `index.html` (French) + `en/index.html` (English)
- `js/projects-data.js` (20 French projects) + `js/projects-data-en.js` (20 English projects)
- `js/script.js` + `js/script-en.js` (UI logic)
- `images/`: profile.png, projects/aaf.png, assabil.png, ecis2020.png, ecis2021.jpg, medmetiers-institute.jpg, worldwide-team.png
- `assets/cv_Karim_AIT-HAMMOU_2025_Fr.pdf`

---

## User Scenarios & Testing

### User Story 1 — Visitor browses bilingual portfolio (Priority: P1)

A recruiter or potential client visits `https://humanz19.github.io` (FR default) or `https://humanz19.github.io/en/` (EN). They see the complete portfolio — hero, about, skills, experience timeline, projects grid, testimonials, and footer — all rendered server-side with no JavaScript required to read content.

**Why this priority**: Core deliverable. Without this working, no other feature matters. Represents 100% of the site's primary purpose.

**Independent Test**: Navigate to `/` — full French portfolio renders. Navigate to `/en/` — full English portfolio renders. Content matches data in `profile.json` and `projects.json`. No JS errors in console.

**Acceptance Scenarios**:

1. **Given** a visitor arrives at `/`, **When** the page loads, **Then** they see: hero with Karim's name + title + 16yr stats, about section with bilingual bio, experience timeline with 5 entries, skills section with 3 categories, 20 projects in grid, 4+ testimonials, footer with contact info.
2. **Given** a visitor arrives at `/en/`, **When** the page loads, **Then** all text is in English and the content matches the EN variants from `profile.json` and `projects.json`.
3. **Given** a visitor with JavaScript disabled, **When** the page loads, **Then** all static content (hero, about, skills, experience, footer) renders correctly. Only project filters, testimonial carousel, theme toggle, and language switch are non-functional.
4. **Given** a mobile visitor (375px viewport), **When** the page loads, **Then** the layout is responsive with no horizontal overflow.

---

### User Story 2 — Recruiter filters projects by era (Priority: P2)

A technical recruiter wants to see only recent projects (2020+) to assess current skills, or only the AgriTech pioneer projects (2007-2009) to understand the candidate's origin.

**Why this priority**: Distinguishes the Astro site from the legacy site. The legacy site shows all 20 projects in a single unfiltered list — the new architecture adds meaningful navigation.

**Independent Test**: Click "Récents (2020+)" filter — only 6 projects shown (kmb-trader, worldwide-team, assabil-extractor, aaf, sci-x-platform, ecis-platform + alma-water-distribution). Click "Pionnier" — only agritech projects shown. "Tous" restores all 20.

**Acceptance Scenarios**:

1. **Given** the projects section is visible, **When** visitor clicks "Récents (2020+)" / "Recent (2020+)", **Then** only projects with date containing 2020–2025 are shown with smooth transition.
2. **Given** the projects section is visible, **When** visitor clicks "Institutionnel" / "Institutional", **Then** only projects from education/institutional categories are shown (HEM ecosystem, CESEM, MedMétiers, ECIS).
3. **Given** the projects section is visible, **When** visitor clicks "Pionnier (2007-2009)" / "Pioneer (2007-2009)", **Then** only historic agritech projects are shown (SoussAgri, Eriser, RadioPlus, Packinfo, FellahConseil, Amfel, Sunlight-Systems).
4. **Given** a filter is active, **When** the count label shows, **Then** it reflects the number of visible projects for that filter.

---

### User Story 3 — User toggles dark mode and language (Priority: P3)

A user prefers dark mode and wants to switch between French and English without losing their dark mode preference.

**Why this priority**: UX polish and accessibility. Dark mode is expected in modern portfolios. Language switch is required for the bilingual architecture.

**Independent Test**: Toggle dark mode — page switches to dark theme. Refresh page — dark mode persists. Click EN — navigates to `/en/`. Click FR — navigates back to `/`. Dark mode still active after language switch.

**Acceptance Scenarios**:

1. **Given** the page loads, **When** the system preference is dark mode, **Then** dark mode is applied automatically before first paint (no flash).
2. **Given** user clicks the theme toggle, **When** toggled, **Then** dark/light class applied to `<html>` and persisted in localStorage.
3. **Given** user is on `/` and clicks "EN", **When** redirected, **Then** they land on `/en/` with same scroll position.
4. **Given** user is on `/en/` and clicks "FR", **When** redirected, **Then** they land on `/` (no `/fr/` prefix — French is default).

---

### User Story 4 — Recruiter downloads or prints CV (Priority: P4)

A recruiter wants to download a clean, professional PDF of Karim's CV, or print directly from the browser.

**Why this priority**: Concrete career deliverable. The PDF is the offline artifact that gets shared in hiring pipelines.

**Independent Test**: Click "Télécharger mon CV" — PDF downloads or opens. Navigate to `/cv-print` — clean A4 layout renders without navigation, without dark mode, ready for Ctrl+P.

**Acceptance Scenarios**:

1. **Given** hero CTA "Télécharger mon CV" is clicked, **When** clicked, **Then** `/cv.pdf` is downloaded (auto-generated by Puppeteer in CI/CD).
2. **Given** `/cv-print` page is loaded, **When** Ctrl+P is pressed, **Then** the layout is A4-optimized, black-and-white friendly, no navigation bar, fits 1–2 pages.
3. **Given** `/cv-print` is loaded, **When** inspected, **Then** it contains: Name + contact, Summary, 5 Experience entries, Skills (all 3 categories), Education, Languages. No projects section.

---

### User Story 5 — Social sharing with rich metadata (Priority: P5)

When the portfolio URL is shared on LinkedIn, Twitter/X, WhatsApp, or via Google search, it renders a proper preview with photo, title, and description.

**Why this priority**: SEO and personal branding. LinkedIn posts with rich previews get 3× more engagement.

**Independent Test**: Use https://www.opengraph.xyz to check `/` and `/en/`. Use https://validator.schema.org to validate JSON-LD. Check Google Search Console for structured data.

**Acceptance Scenarios**:

1. **Given** the FR homepage URL is shared, **When** a link preview is generated, **Then** it shows: title "Karim AIT HAMMOU — Solutions Architect", description from profile summary, profile image.
2. **Given** the EN page URL is shared, **When** a link preview is generated, **Then** all og: tags are in English, hreflang links are present in `<head>`.
3. **Given** JSON-LD is inspected, **When** validated, **Then** Schema.org `Person` type is valid with: name, jobTitle, email, telephone, url, sameAs (LinkedIn, GitHub), knowsAbout array.
4. **Given** sitemap is generated, **When** accessed at `/sitemap-index.xml`, **Then** it contains both `/` and `/en/` URLs. `/cv-print` is excluded.

---

### Edge Cases

- **Missing project images**: `screenshots/` folder does not exist in the repo (sunlight-systems, soussagri, eriser, radioplus, packinfo, fellahconseil, amfel screenshots are missing). `ImageWithFallback.astro` must render a styled gradient placeholder with project initials — zero broken `<img>` tags.
- **Long project descriptions**: Some projects (aaf, amfel, radioplus) have very long descriptions. `ProjectCard.astro` truncates at 3 lines with CSS `line-clamp-3`.
- **French default locale**: Astro i18n with `prefixDefaultLocale: false` means `/` serves French. Any redirect from `/fr/` to `/` must be handled if applicable.
- **Build-time validation**: If `profile.json` or `projects.json` contain invalid data, `astro build` FAILS. This is a feature, not a bug.
- **PDF generation order**: PDF generation requires `astro build` to complete first (depends on `/cv-print/index.html` existing in `dist/`).
- **Projects data alignment**: Some projects have differing dates between FR and EN versions (e.g., `aaf` is "08/2023 - 04/2024" in FR vs "2022" in EN). Use FR date as canonical, add EN translation.

---

## Requirements

### Functional Requirements

- **FR-001**: Site MUST render the complete portfolio in French at `/` with all content from `profile.json` and `projects.json`.
- **FR-002**: Site MUST render the complete portfolio in English at `/en/` with all content from `profile.json` and `projects.json`.
- **FR-003**: `projects.json` MUST contain all 20 projects with full FR+EN bilingual content.
- **FR-004**: `profile.json` MUST contain complete bio, 5 experience entries, skills, education, certifications, languages, contact info.
- **FR-005**: Build MUST fail if `profile.json` or `projects.json` fail Zod schema validation.
- **FR-006**: Project filters MUST support: All (default), Recent (date ≥2020), Institutional (education/research categories), Pioneer (2007-2009).
- **FR-007**: Dark mode MUST be applied before first paint using a blocking script that checks `localStorage` and `prefers-color-scheme`.
- **FR-008**: Theme preference MUST persist across page refreshes and language switches.
- **FR-009**: `/cv-print` page MUST be optimized for A4 printing with `@media print` rules.
- **FR-010**: CI/CD MUST auto-generate `/cv.pdf` via Puppeteer after each successful build.
- **FR-011**: All pages MUST include JSON-LD structured data (Schema.org `Person`).
- **FR-012**: All pages MUST include complete OpenGraph and Twitter Card meta tags.
- **FR-013**: Sitemap MUST include both FR and EN pages. `/cv-print` MUST be excluded.
- **FR-014**: `ImageWithFallback.astro` MUST render gradient placeholder (no broken img) for missing project images.
- **FR-015**: Zero hardcoded text strings are permitted in component files — all from JSON or i18n files.
- **FR-016**: GitHub Actions workflow MUST deploy to GitHub Pages on every push to `main`.

### Key Entities

- **Profile**: name, label (localized), email, phone, summary (localized), location, social profiles, yearsOfExperience, availability (localized), experience[], education[], certifications[], skills{technical[], soft}, languages[]
- **Project**: id (kebab-case), title, category (localized), description (localized), technologies[], image, features (localized array), status (localized), date, client (localized), testimonial{text (localized), author}?, achievements (localized array)?, subProjects[]?, url?
- **Lang**: `'fr' | 'en'`
- **LocalizedField**: `{ fr: string, en: string }`
- **LocalizedArray**: `{ fr: string[], en: string[] }`

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: Lighthouse scores ≥95 on Performance, Accessibility, Best Practices, SEO (measured on `/` and `/en/`).
- **SC-002**: `pnpm build` completes in under 60 seconds on CI (GitHub Actions ubuntu-latest).
- **SC-003**: All 20 projects render correctly in both FR and EN with zero content gaps.
- **SC-004**: Zero broken images in the browser (ImageWithFallback covers all missing screenshots).
- **SC-005**: `pnpm run validate` outputs "✅ profile.json is valid" and "✅ projects.json is valid — 20 projects loaded".
- **SC-006**: `/cv-print` renders a clean 1–2 page A4 layout when printed from Chrome.
- **SC-007**: JSON-LD validates without errors at https://validator.schema.org.
- **SC-008**: Language switch navigates correctly between `/` and `/en/` on all sections.
- **SC-009**: Dark mode persists after browser refresh, preserving user preference.
- **SC-010**: GitHub Actions workflow deploys successfully on push to `main`.
