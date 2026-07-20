import { z } from "zod";

const requiredString = z.string().trim().min(1);
const optionalUrl = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z.string().url().optional(),
);
const month = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Use YYYY-MM format");
const optionalMonth = z.preprocess(
  (value) => (value === "" ? undefined : value),
  month.optional(),
);

export const personalDetailsSchema = z.object({
  fullName: requiredString,
  professionalTitle: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  location: z.string().optional(),
  website: optionalUrl,
  linkedin: optionalUrl,
  github: optionalUrl,
});

export const workExperienceSchema = z.object({
  id: requiredString,
  company: requiredString,
  position: requiredString,
  location: z.string().optional(),
  startDate: month,
  endDate: optionalMonth,
  isCurrent: z.boolean(),
  description: z.string().optional(),
  highlights: z.array(z.string()),
});

export const educationSchema = z.object({
  id: requiredString,
  institution: requiredString,
  degree: requiredString,
  fieldOfStudy: z.string().optional(),
  location: z.string().optional(),
  startDate: optionalMonth,
  endDate: optionalMonth,
  isCurrent: z.boolean(),
  grade: z.string().optional(),
  highlights: z.array(z.string()),
});

export const projectSchema = z.object({
  id: requiredString,
  name: requiredString,
  role: z.string().optional(),
  description: z.string().optional(),
  url: optionalUrl,
  repositoryUrl: optionalUrl,
  startDate: optionalMonth,
  endDate: optionalMonth,
  technologies: z.array(z.string()),
  highlights: z.array(z.string()),
});

export const skillGroupSchema = z.object({
  id: requiredString,
  name: requiredString,
  skills: z.array(z.string()),
});

export const certificationSchema = z.object({
  id: requiredString,
  name: requiredString,
  issuer: z.string().optional(),
  issueDate: optionalMonth,
  credentialUrl: optionalUrl,
});

export const languageSchema = z.object({
  id: requiredString,
  name: requiredString,
  proficiency: z.string().optional(),
});

export const customSectionItemSchema = z.object({
  id: requiredString,
  title: requiredString,
  subtitle: z.string().optional(),
  description: z.string().optional(),
  highlights: z.array(z.string()),
});

export const customSectionSchema = z.object({
  id: requiredString,
  title: requiredString,
  items: z.array(customSectionItemSchema),
});

export const cvSchema = z.object({
  id: requiredString,
  name: requiredString,
  templateId: requiredString.default("classic"),
  personalDetails: personalDetailsSchema,
  professionalSummary: z.string(),
  workExperience: z.array(workExperienceSchema),
  education: z.array(educationSchema),
  projects: z.array(projectSchema),
  skillGroups: z.array(skillGroupSchema),
  certifications: z.array(certificationSchema),
  languages: z.array(languageSchema),
  customSections: z.array(customSectionSchema),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type PersonalDetails = z.infer<typeof personalDetailsSchema>;
export type WorkExperience = z.infer<typeof workExperienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Project = z.infer<typeof projectSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type Language = z.infer<typeof languageSchema>;
export type CustomSectionItem = z.infer<typeof customSectionItemSchema>;
export type CustomSection = z.infer<typeof customSectionSchema>;
export type Cv = z.infer<typeof cvSchema>;

export function createId(): string {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }

  return `cv-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function createEmptyCv(id = createId()): Cv {
  const timestamp = new Date().toISOString();

  return {
    id,
    name: "Untitled CV",
    templateId: "classic",
    personalDetails: { fullName: "", email: "" },
    professionalSummary: "",
    workExperience: [],
    education: [],
    projects: [],
    skillGroups: [],
    certifications: [],
    languages: [],
    customSections: [],
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}
