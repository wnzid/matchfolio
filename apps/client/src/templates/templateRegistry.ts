import type { Cv, CvTemplateId } from "@matchfolio/shared";
import type { ComponentType } from "react";
import { AustralianProfessionalTemplate } from "./AustralianProfessionalTemplate";
import { EuropeanTechTemplate } from "./EuropeanTechTemplate";

export type CvTemplateProps = { cv: Cv };
export const templateRegistry = { "european-tech": EuropeanTechTemplate, "australian-professional": AustralianProfessionalTemplate } satisfies Record<CvTemplateId, ComponentType<CvTemplateProps>>;
