import { createId, cvSchema, type Cv } from "@matchfolio/shared";
import { db } from "./database";

function validateCv(value: unknown): Cv {
  const result = cvSchema.safeParse(value);
  if (!result.success) throw new Error("The CV contains invalid data and could not be saved.");
  return result.data;
}

export async function getAllCvs(): Promise<Cv[]> {
  const records = await db.cvs.toArray();
  return records.flatMap((record) => {
    const result = cvSchema.safeParse(record);
    if (!result.success) {
      console.warn(`Skipping malformed CV record ${record.id}.`, result.error);
      return [];
    }
    return [result.data];
  });
}

export async function getCvById(id: string): Promise<Cv | undefined> {
  const record = await db.cvs.get(id);
  if (!record) return undefined;
  const result = cvSchema.safeParse(record);
  if (!result.success) throw new Error("This saved CV is malformed and cannot be opened.");
  return result.data;
}

export async function createCv(cv: Cv): Promise<Cv> {
  const valid = validateCv(cv);
  await db.cvs.add(valid);
  return valid;
}

export async function updateCv(cv: Cv): Promise<Cv> {
  const valid = validateCv({ ...cv, updatedAt: new Date().toISOString() });
  await db.cvs.put(valid);
  return valid;
}

export async function deleteCv(id: string): Promise<void> {
  await db.cvs.delete(id);
}

export async function duplicateCv(id: string): Promise<Cv> {
  const source = await getCvById(id);
  if (!source) throw new Error("CV not found.");
  const timestamp = new Date().toISOString();
  const copy = validateCv({ ...structuredClone(source), id: createId(), name: `${source.name} Copy`, createdAt: timestamp, updatedAt: timestamp });
  await db.cvs.add(copy);
  return copy;
}

export async function renameCv(id: string, name: string): Promise<Cv> {
  const cleanName = name.trim();
  if (!cleanName) throw new Error("CV name cannot be blank.");
  const cv = await getCvById(id);
  if (!cv) throw new Error("CV not found.");
  return updateCv({ ...cv, name: cleanName });
}
