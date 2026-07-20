import type { CvTemplateId } from "@matchfolio/shared";

export type TemplateMetadata = { id: CvTemplateId; name: string; description: string; region: string; bestFor: string[] };
export const templateMetadata: TemplateMetadata[] = [
  { id: "european-tech", name: "European Tech", region: "Europe / International", description: "Compact, achievement-focused CV for software engineering and technical roles.", bestFor: ["Software engineering", "IT", "Technical graduate roles", "Project-focused applications"] },
  { id: "australian-professional", name: "Australian Professional", region: "Australia", description: "Skills-led Australian résumé with responsibilities, achievements and references.", bestFor: ["Australian employers", "SEEK applications", "Professional and graduate roles", "Clear career history"] },
];
export function getTemplateMetadata(id: CvTemplateId) { return templateMetadata.find((template) => template.id === id)!; }
