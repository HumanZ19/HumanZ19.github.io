# Design system - Portfolio Karim AIT HAMMOU

Direction retenue : **salle de controle**. Instrumentation industrielle sobre.
Reference mentale : un poste de supervision, pas un terminal de film. Les donnees
priment sur la decoration. Aucun effet n'existe s'il ne sert pas la lecture.

Ce document est la source de verite visuelle. Tout ecart en code est un bug.

---

## 1. Anti-objectifs

Interdits absolus, issus du diagnostic de l'ancienne version :

- gradients multicolores, blobs flous (`blur-3xl`), halos decoratifs
- indigo / violet / purple sous toutes leurs formes
- photo ronde avec anneau, pastille de validation
- badge de disponibilite vert avec point qui pulse
- fleche de scroll animee (`animate-bounce`)
- `rounded-xl` generalise, ombres portees douces empilees
- emojis en guise d'iconographie

## 2. Typographie

| Role | Fonte | Graisses | Usage |
|---|---|---|---|
| Titres | IBM Plex Sans Condensed | 600, 700 | Titres de section, noms de projets |
| Donnees | IBM Plex Mono | 400, 500 | Metriques, labels, technologies, dates, numeros |
| Corps | IBM Plex Sans | 400, 500 | Descriptions, paragraphes |

Choix motive : la famille Plex vient de l'ingenierie industrielle, elle porte le
sujet. Le condensed donne du caractere aux titres sans crier. Interdit d'utiliser
Inter, Roboto, Arial, system-ui ou Space Grotesk.

**Echelle** (base 16px, ratio 1.25, valeurs en rem) :

```
xs    0.75    12px   labels, unites, mentions
sm    0.875   14px   texte secondaire, technologies
base  1       16px   corps
lg    1.25    20px   sous-titres
xl    1.5625  25px   titres de projet
2xl   1.9531  31px   titres de section
3xl   2.4414  39px   titre de page
4xl   3.0518  49px   nom en hero
5xl   3.8147  61px   nom en hero (desktop large)
```

Interlignage : 1.2 pour les titres, 1.6 pour le corps, 1 pour les donnees.
Interlettrage : +0.08em sur les labels en capitales monospace, 0 ailleurs,
-0.01em sur les titres au-dela de 39px.

## 3. Couleurs

Palette monochrome froide, un seul accent. Un accent unique et rare frappe plus
fort qu'une palette repartie.

```css
--ink-900: #0B0D0E;  /* fond de page */
--ink-800: #131719;  /* surfaces, cards */
--ink-700: #1B2023;  /* surfaces surelevees, hover */
--line-600: #262C30; /* bordures 1px */
--line-500: #333A3F; /* bordures accentuees */
--text-100: #E8EBEC; /* texte primaire */
--text-300: #9AA1A6; /* texte secondaire */
--text-500: #646C71; /* texte tertiaire, unites */
--amber: #FFB000;    /* accent unique */
--amber-dim: #8A5F00;/* accent en retrait, rails */
```

Regle d'emploi de l'accent : au maximum **un element ambre par bloc visuel**.
L'ambre marque ce qui est actif, mesure ou en cours. Jamais un fond plein large.

### Deux themes, un seul jeu de classes

Les couleurs ci-dessus sont exposees en **variables CSS** consommees par
Tailwind (`rgb(var(--c-ink-900) / <alpha-value>)`). Consequence : les deux
themes partagent exactement les memes classes et aucun composant ne connait le
theme courant. Basculer revient a poser la classe `light` sur `<html>`.

Le **sombre est la direction principale** : salle de controle de nuit. Le
**clair en est la declinaison de jour**, pas un theme concurrent : papier
technique legerement chaud plutot que blanc pur, encre presque noire.

```css
html.light {
  --c-ink-900: 247 246 243;  /* papier */
  --c-ink-800: 255 255 255;  /* surfaces */
  --c-txt-100: 26 25 23;     /* encre */
  --c-signal: 154 102 0;     /* ambre assombri */
}
```

L'ambre change de valeur entre les deux themes, et ce n'est pas negociable :
l'ambre vif du theme sombre (#FFB000) tombe a 1.8:1 de contraste sur fond clair,
soit illisible. Chaque role de texte doit tenir **4.5:1 minimum dans les deux
themes** ; un script de verification mesure ces ratios sur le rendu reel.

La preference est memorisee en `localStorage` et appliquee par un script inline
place avant le premier rendu, sans quoi la page clignote en sombre avant de
basculer.

## 4. Grille et espacement

Echelle d'espacement stricte, multiples de 4px. Aucune valeur hors echelle.

```
4  8  12  16  24  32  48  64  96  128
```

- Largeur maximale du contenu : 1280px
- Marges laterales : 32px au-dela de 768px, 16px en dessous
- Grille : 12 colonnes, gouttiere 24px
- Rythme vertical : sections espacees de 96px (desktop), 64px (mobile)

## 5. Regles anti-defaut

Ces regles repondent a des exigences explicites. Elles sont non negociables et
doivent etre verifiees au rendu, pas seulement dans le code.

### 5.1 Pastilles et badges - jamais multilignes

Tout badge (technologie, statut, categorie) respecte :

```css
.tag {
  display: inline-flex;
  align-items: center;
  height: 24px;           /* hauteur fixe, jamais auto */
  padding: 0 8px;
  white-space: nowrap;    /* interdiction de passer a la ligne */
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;       /* au-dela, troncature par ellipse */
  border-radius: 2px;     /* quasi carre, pas de pilule */
}
```

Consequence sur les donnees : un libelle de technologie depassant 22 caracteres
doit etre raccourci dans `projects.json`, pas rattrape en CSS. Le conteneur de
badges utilise `flex-wrap: wrap` avec `gap: 8px` : ce sont les badges qui passent
a la ligne entre eux, jamais le texte a l'interieur d'un badge.

### 5.2 Aucun chevauchement

- Aucun `position: absolute` pour du contenu porteur de sens. Reserve aux seuls
  filets decoratifs de 1px et au header colle en haut.
- Aucune transformation au survol qui deplace un element dans l'espace d'un
  voisin. Le survol ne modifie que la couleur de bordure, le fond et l'opacite.
- `z-index` limite a trois valeurs : 0 contenu, 10 header, 20 menu mobile.

### 5.3 Cards de hauteur egale

Les grilles de cards utilisent `display: grid` avec `align-items: stretch`, ce qui
egalise les hauteurs par ligne sans calcul JavaScript. La card elle-meme est un
`flex column` dont le bloc de badges est pousse en bas par `margin-top: auto`,
pour que les pieds de cards s'alignent.

### 5.4 Debordement horizontal

`overflow-x: hidden` sur `body`, et surtout `min-width: 0` sur tout enfant direct
de grid ou de flex contenant du texte. C'est l'oubli de `min-width: 0` qui cause
la quasi-totalite des scrolls horizontaux parasites.

### 5.5 Longueurs de texte

Le contenu est contraint a la source plutot que rattrape a l'affichage :

| Champ | Limite | Comportement si depassement |
|---|---|---|
| Titre de projet | 40 caracteres | `line-clamp: 2` |
| Description de card | 180 caracteres | `line-clamp: 3` |
| Badge technologie | 22 caracteres | ellipse |
| Categorie | 30 caracteres | ellipse |

## 6. Motion

Une seule orchestration, au chargement : revelation en cascade des lignes du hero
(`animation-delay` echelonne de 60ms). Ailleurs, transitions de 150ms sur
`background-color`, `border-color` et `opacity` uniquement.

Interdits : bounce, pulse, effets de flottement, parallaxe, apparition au scroll
sur chaque element. `prefers-reduced-motion` neutralise toute animation.

## 7. Signature

Ce dont on se souvient apres avoir quitte la page :

1. **Les projets sont numerotes** `001 /`, `002 /` en monospace ambre, alignes sur
   un rail vertical de 1px. La page se lit comme un registre, pas comme une
   galerie.
2. **Les metriques sont des lectures d'instrument** : valeur en condensed large,
   unite en monospace minuscule dessous, filet de 1px au-dessus. Pas de card
   arrondie centree.
3. **Une barre de statut** en haut de page, en monospace 12px, affichant des
   informations reelles : localisation, disponibilite, date de derniere mise a
   jour du site. Elle ancre l'ensemble dans le registre de la supervision.

## 8. Verification de conformite

Avant tout commit, captures a 1440, 1024, 768 et 375px, et controle explicite :

- [ ] aucun badge sur deux lignes
- [ ] aucun element qui en chevauche un autre
- [ ] cards de meme hauteur sur chaque ligne
- [ ] aucun scroll horizontal
- [ ] espacements tous sur l'echelle de 4px
- [ ] un seul element ambre par bloc visuel
- [ ] aucune fonte hors famille IBM Plex
