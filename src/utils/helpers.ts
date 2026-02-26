import type { Project, Lang } from '../types';

/**
 * Determine the filter category of a project for the project filters.
 * Returns one of: 'recent' | 'institutional' | 'pioneer' | 'other'
 */
export function getProjectFilterCategory(project: Project): 'recent' | 'institutional' | 'pioneer' | 'other' {
  const date = project.date;
  const categoryFr = project.category.fr.toLowerCase();
  const categoryEn = project.category.en.toLowerCase();

  // Pioneer: 2007, 2008, or 2009
  if (date.includes('2007') || date.includes('2008') || date.includes('2009')) {
    return 'pioneer';
  }

  // Institutional: education, research, training, digital strategy, events
  const institutionalKeywords = [
    'éducation', 'education', 'recherche', 'research', 'formation', 'training',
    'stratégie digitale', 'digital strategy', 'événements', 'event', 'académique', 'academic',
    'publications', 'institutional',
  ];
  if (
    institutionalKeywords.some((kw) => categoryFr.includes(kw) || categoryEn.includes(kw))
  ) {
    return 'institutional';
  }

  // Recent: 2020+
  const recentYears = ['2020', '2021', '2022', '2023', '2024', '2025'];
  if (recentYears.some((year) => date.includes(year))) {
    return 'recent';
  }

  return 'other';
}

/**
 * Get the CSS color class for a project status badge.
 */
export function getStatusColorClass(status: string): string {
  const s = status.toLowerCase();
  if (s.includes('production') || s.includes('opérationnel') || s.includes('operational') || s.includes('leader')) {
    return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
  }
  if (s.includes('livré') || s.includes('delivered')) {
    return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
  }
  if (s.includes('archivé') || s.includes('archived') || s.includes('historique') || s.includes('historical')) {
    return 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300';
  }
  if (s.includes('migré') || s.includes('migrated') || s.includes('refonte') || s.includes('redesign')) {
    return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
  }
  return 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300';
}

/**
 * Generate gradient placeholder colors for a project image fallback.
 * Returns a Tailwind gradient string based on project ID.
 */
export function getProjectGradient(id: string): string {
  const gradients = [
    'from-indigo-500 to-purple-600',
    'from-blue-500 to-cyan-600',
    'from-emerald-500 to-teal-600',
    'from-orange-500 to-red-600',
    'from-violet-500 to-fuchsia-600',
    'from-sky-500 to-blue-600',
    'from-rose-500 to-pink-600',
    'from-amber-500 to-orange-600',
  ];
  // Deterministic pick based on id characters
  const index = id.charCodeAt(0) % gradients.length;
  return gradients[index];
}

/**
 * Get the initials (max 2 chars) from a project title for the fallback placeholder.
 */
export function getProjectInitials(title: string): string {
  const words = title.split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}
