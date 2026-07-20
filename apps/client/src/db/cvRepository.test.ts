import "fake-indexeddb/auto";
import { createEmptyCv } from "@matchfolio/shared";
import { beforeEach, describe, expect, it } from "vitest";
import { createCv, duplicateCv, getCvById, renameCv, updateCv } from "./cvRepository";
import { db } from "./database";

beforeEach(async () => { await db.cvs.clear(); });

describe("CV repository", () => {
  it("creates and reads a CV", async () => { const cv = createEmptyCv("create-test"); await createCv(cv); expect((await getCvById(cv.id))?.name).toBe(cv.name); });
  it("updates CV content and timestamp", async () => { const cv = createEmptyCv("update-test"); await createCv(cv); const updated = await updateCv({ ...cv, professionalSummary: "Updated" }); expect(updated.professionalSummary).toBe("Updated"); expect(Date.parse(updated.updatedAt)).toBeGreaterThanOrEqual(Date.parse(cv.updatedAt)); });
  it("duplicates with a new ID", async () => { const cv = createEmptyCv("duplicate-test"); await createCv(cv); const copy = await duplicateCv(cv.id); expect(copy.id).not.toBe(cv.id); expect(copy.name).toContain("Copy"); });
  it("rejects blank rename values", async () => { const cv = createEmptyCv("rename-test"); await createCv(cv); await expect(renameCv(cv.id, "   ")).rejects.toThrow("blank"); });
});
