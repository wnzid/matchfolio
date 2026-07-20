import type { Cv } from "@matchfolio/shared";
import Dexie, { type Table } from "dexie";

export class MatchfolioDatabase extends Dexie {
  cvs!: Table<Cv, string>;

  constructor(name = "matchfolio") {
    super(name);
    this.version(1).stores({ cvs: "id, name, templateId, createdAt, updatedAt" });
  }
}

export const db = new MatchfolioDatabase();
