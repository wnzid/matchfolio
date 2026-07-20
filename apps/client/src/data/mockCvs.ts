import { createEmptyCv, type Cv } from "@matchfolio/shared";

function mockCv(details: Partial<Cv> & Pick<Cv, "id" | "name">): Cv {
  return { ...createEmptyCv(details.id), ...details };
}

export const mockCvs: Cv[] = [
  mockCv({
    id: "master-software-engineering",
    name: "Master Software Engineering CV",
    createdAt: "2026-05-02T09:00:00.000Z",
    updatedAt: "2026-07-19T16:24:00.000Z",
    personalDetails: { fullName: "Alex Morgan", professionalTitle: "Software Engineer", email: "alex@example.com" },
    professionalSummary: "Product-minded software engineer focused on reliable, accessible web applications.",
    workExperience: [
      { id: "work-1", company: "Northstar Labs", position: "Software Engineer", startDate: "2023-04", isCurrent: true, highlights: ["Led delivery of customer-facing workflows."] },
      { id: "work-2", company: "Fieldnote", position: "Junior Developer", startDate: "2021-06", endDate: "2023-03", isCurrent: false, highlights: ["Built reusable frontend components."] },
      { id: "work-3", company: "Studio Seven", position: "Engineering Intern", startDate: "2020-09", endDate: "2021-05", isCurrent: false, highlights: [] },
    ],
    projects: [
      { id: "project-1", name: "Release Radar", technologies: ["React", "TypeScript"], highlights: [] },
      { id: "project-2", name: "Open Metrics", technologies: ["Node.js"], highlights: [] },
    ],
  }),
  mockCv({
    id: "frontend-developer",
    name: "Frontend Developer CV",
    templateId: "modern",
    createdAt: "2026-06-10T13:30:00.000Z",
    updatedAt: "2026-07-17T10:12:00.000Z",
    personalDetails: { fullName: "Alex Morgan", professionalTitle: "Frontend Developer", email: "alex@example.com" },
    professionalSummary: "Frontend specialist creating fast and inclusive product experiences.",
    workExperience: [
      { id: "work-4", company: "Northstar Labs", position: "Software Engineer", startDate: "2023-04", isCurrent: true, highlights: [] },
      { id: "work-5", company: "Fieldnote", position: "Junior Developer", startDate: "2021-06", endDate: "2023-03", isCurrent: false, highlights: [] },
    ],
    projects: [{ id: "project-3", name: "Design System", technologies: ["React", "Storybook"], highlights: [] }],
  }),
  mockCv({
    id: "graduate-software-engineer",
    name: "Graduate Software Engineer CV",
    createdAt: "2026-07-01T08:45:00.000Z",
    updatedAt: "2026-07-12T14:08:00.000Z",
    personalDetails: { fullName: "Alex Morgan", professionalTitle: "Graduate Software Engineer", email: "alex@example.com" },
    professionalSummary: "Computer science graduate with practical full-stack project experience.",
    workExperience: [{ id: "work-6", company: "Studio Seven", position: "Engineering Intern", startDate: "2020-09", endDate: "2021-05", isCurrent: false, highlights: [] }],
    projects: [
      { id: "project-4", name: "Campus Marketplace", technologies: ["React", "Express"], highlights: [] },
      { id: "project-5", name: "Study Planner", technologies: ["TypeScript"], highlights: [] },
      { id: "project-6", name: "Transit Explorer", technologies: ["Mapbox"], highlights: [] },
    ],
  }),
];
