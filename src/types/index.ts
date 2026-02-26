export type { Profile } from '../schemas/profile.schema';
export type { Project, Projects } from '../schemas/projects.schema';

export type Lang = 'fr' | 'en';

export type LocalizedField = { fr: string; en: string };
export type LocalizedArray = { fr: string[]; en: string[] };
