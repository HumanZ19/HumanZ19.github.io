# Karim AIT HAMMOU — Portfolio

Portfolio professionnel bilingue (FR/EN) construit avec Astro 4.x.

**Live** → [humanz19.github.io](https://humanz19.github.io)

---

## Stack

| Technologie | Rôle |
|-------------|------|
| [Astro 4.x](https://astro.build) | Framework SSG (output: static) |
| [Tailwind CSS 3.x](https://tailwindcss.com) | Styles + dark mode |
| [TypeScript strict](https://www.typescriptlang.org) | Typage complet |
| [Zod 3.x](https://zod.dev) | Validation JSON au build |
| [Puppeteer](https://pptr.dev) | Génération PDF post-build |
| GitHub Actions | CI/CD → GitHub Pages |

---

## Architecture

```
src/
├── components/        # 15 composants Astro (SSR statique)
│   ├── SEOHead.astro  # JSON-LD, OG, Twitter Card, hreflang
│   ├── Header.astro   # Navigation fixe + mobile menu
│   ├── Hero.astro     # Section hero avec stats
│   ├── About.astro    # Bio, langues, disponibilité
│   ├── ExperienceTimeline.astro + ExperienceCard.astro
│   ├── ProjectsGrid.astro + ProjectCard.astro
│   ├── ProjectFilters.astro  # Filtres JS vanilla
│   ├── Stack.astro    # Barres de compétences animées
│   ├── Testimonials.astro + TestimonialCarousel.astro
│   ├── Footer.astro   # Contact intégré
│   ├── ThemeToggle.astro + LanguageSwitch.astro
│   └── ImageWithFallback.astro
├── data/
│   ├── profile.json   # Source unique : bio, expérience, compétences
│   └── projects.json  # 20 projets FR+EN
├── i18n/
│   ├── fr.json        # Strings UI français
│   └── en.json        # Strings UI anglais
├── layouts/
│   ├── BaseLayout.astro    # Shell HTML + dark mode init
│   └── CVPrintLayout.astro # Layout A4 pour impression
├── pages/
│   ├── index.astro         # Page FR (/)
│   ├── en/index.astro      # Page EN (/en/)
│   └── cv-print.astro      # CV imprimable (/cv-print/)
├── schemas/
│   ├── profile.schema.ts   # Zod schema profile
│   ├── projects.schema.ts  # Zod schema projets
│   └── validate.ts         # Script de validation CLI
├── types/index.ts
└── utils/
    ├── i18n.ts             # t(), localized(), getLangFromUrl()
    └── helpers.ts          # getProjectFilterCategory(), etc.
scripts/
└── generate-pdf.ts    # Puppeteer → dist/cv-karim-aithammou.pdf
public/
├── images/            # profile.png + 6 images projets
├── sitemap.xml        # Sitemap manuel (FR + EN)
├── robots.txt
└── favicon.svg
.github/workflows/
└── deploy.yml         # Pipeline CI/CD GitHub Pages
```

---

## Commandes

```bash
# Développement (hot-reload)
pnpm run dev

# Build production
pnpm run build

# Preview du build
pnpm run preview

# Valider les données JSON (Zod)
pnpm run validate

# Générer le PDF CV (nécessite pnpm build d'abord)
pnpm run generate-pdf
```

> **Note** : pnpm est installé dans `~/.local/bin/pnpm`. Ajouter au PATH :
> ```bash
> echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc && source ~/.bashrc
> ```

---

## Données

Tout le contenu est dans deux fichiers JSON — **aucun contenu en dur dans les composants**.

- `src/data/profile.json` — Informations personnelles, 5 expériences, 3 catégories de compétences (48 skills), 4 langues
- `src/data/projects.json` — 20 projets bilingues avec catégories, technologies, témoignages

Les schémas Zod valident ces fichiers au **build time** — un JSON invalide bloque le déploiement.

---

## i18n

- **FR** → `/` (langue par défaut, pas de préfixe)
- **EN** → `/en/`
- Switch de langue via `LanguageSwitch.astro` dans le header
- Chaque champ de contenu utilise le pattern `{ fr: string, en: string }`

---

## Filtres projets

| Filtre | Critère | Projets |
|--------|---------|---------|
| Tous | — | 20 |
| Récents | date contient 2020–2025 | 7 |
| Institutionnel | catégorie éducation/recherche | 7 |
| Pionnier | date contient 2007–2009 | 7 |

---

## CI/CD

Le pipeline `.github/workflows/deploy.yml` s'exécute sur chaque push vers `main` :

1. `pnpm install --frozen-lockfile`
2. `pnpm run validate` — Zod (bloque si données invalides)
3. `pnpm run build` — astro check + astro build
4. Install dépendances Puppeteer système
5. `pnpm run generate-pdf` → `dist/cv-karim-aithammou.pdf`
6. Upload `dist/` → GitHub Pages

---

## Performances cibles

- Lighthouse ≥ 95 (Performance, Accessibility, Best Practices, SEO)
- FCP < 1.5s, LCP < 2.5s
- 0 JS client-side sauf 4 islands approuvés (ThemeToggle, LanguageSwitch, ProjectFilters, TestimonialCarousel)
