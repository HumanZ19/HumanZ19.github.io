import { z } from 'zod';

const LocalizedString = z.object({
  fr: z.string(),
  en: z.string(),
});

const LocalizedStringArray = z.object({
  fr: z.array(z.string()),
  en: z.array(z.string()),
});

const ProjectSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, 'ID must be kebab-case'),
  title: z.string(),
  category: LocalizedString,
  description: LocalizedString,
  technologies: z.array(z.string()),
  image: z.string(),
  features: LocalizedStringArray,
  status: LocalizedString,
  date: z.string(),
  client: LocalizedString,
  testimonial: z
    .object({
      text: LocalizedString,
      author: z.string(),
    })
    .optional(),
  achievements: LocalizedStringArray.optional(),
  subProjects: z.array(z.string()).optional(),
  url: z.string().url().optional(),
});

const ProjectsSchema = z.object({
  projects: z.array(ProjectSchema),
});

export default ProjectsSchema;
export type Project = z.infer<typeof ProjectSchema>;
export type Projects = z.infer<typeof ProjectsSchema>;
