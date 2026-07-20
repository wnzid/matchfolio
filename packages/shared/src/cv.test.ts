import { describe, expect, it } from "vitest";
import { createEmptyCv, cvSchema, cvTemplateIdSchema, personalDetailsSchema } from "./cv";

describe("CV schema", () => {
  it("creates a schema-valid empty CV", () => { expect(cvSchema.safeParse(createEmptyCv()).success).toBe(true); });
  it("normalizes empty optional URLs", () => { const result = personalDetailsSchema.parse({ fullName: "Alex", email: "alex@example.com", website: "", linkedin: "", github: "" }); expect(result.website).toBeUndefined(); });
  it("rejects an invalid email", () => { expect(personalDetailsSchema.safeParse({ fullName: "Alex", email: "not-an-email" }).success).toBe(false); });
  it("accepts only supported template IDs", () => { expect(cvTemplateIdSchema.safeParse("european-tech").success).toBe(true); expect(cvTemplateIdSchema.safeParse("classic").success).toBe(false); });
});
