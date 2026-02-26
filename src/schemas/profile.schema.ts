import { z } from 'zod';

const LocalizedString = z.object({
  fr: z.string(),
  en: z.string(),
});

const LocalizedStringArray = z.object({
  fr: z.array(z.string()),
  en: z.array(z.string()),
});

const SkillItemSchema = z.object({
  name: z.string(),
  level: z.number().min(0).max(100),
  icon: z.string(),
});

const SkillCategorySchema = z.object({
  category: LocalizedString,
  items: z.array(SkillItemSchema),
});

const ExperienceSchema = z.object({
  company: z.string(),
  position: LocalizedString,
  startDate: z.string(),
  endDate: z.string(),
  summary: LocalizedString,
  highlights: LocalizedStringArray,
  stack: z.array(z.string()),
});

const EducationSchema = z.object({
  institution: z.string(),
  area: LocalizedString,
  studyType: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

const CertificationSchema = z.object({
  name: z.string(),
  issuer: z.string(),
  date: z.string(),
  url: z.string().url().optional(),
});

const ProfileSchema = z.object({
  basics: z.object({
    name: z.string(),
    label: LocalizedString,
    email: z.string().email(),
    phone: z.string(),
    summary: LocalizedString,
    location: z.object({
      city: z.string(),
      country: LocalizedString,
    }),
    profiles: z.array(
      z.object({
        network: z.string(),
        url: z.string().url(),
        icon: z.string(),
      })
    ),
    yearsOfExperience: z.number(),
    availability: LocalizedString,
    heroStats: z
      .object({
        projectsCount: z.string(),
        maxTeamManaged: z.number(),
        countriesDeployed: z.string().optional(),
        legislationsCompliance: z.number().optional(),
      })
      .optional(),
  }),
  experience: z.array(ExperienceSchema),
  education: z.array(EducationSchema),
  certifications: z.array(CertificationSchema),
  skills: z.object({
    technical: z.array(SkillCategorySchema),
    soft: LocalizedStringArray,
  }),
  languages: z.array(
    z.object({
      language: LocalizedString,
      fluency: LocalizedString,
    })
  ),
});

export default ProfileSchema;
export type Profile = z.infer<typeof ProfileSchema>;
