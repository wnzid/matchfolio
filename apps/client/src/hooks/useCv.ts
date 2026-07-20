import type { Cv } from "@matchfolio/shared";
import { useEffect, useState } from "react";
import { getCvById } from "../db/cvRepository";

type CvLoadState = { status: "loading" } | { status: "loaded"; cv: Cv } | { status: "not-found" } | { status: "error"; message: string };
type CompletedLoad = { id: string; result: Exclude<CvLoadState, { status: "loading" }> };

export function useCv(id?: string): CvLoadState {
  const [completed, setCompleted] = useState<CompletedLoad>();
  useEffect(() => {
    let active = true;
    if (!id) return;
    void getCvById(id).then((cv) => { if (active) setCompleted({ id, result: cv ? { status: "loaded", cv } : { status: "not-found" } }); }).catch((reason: unknown) => { if (active) setCompleted({ id, result: { status: "error", message: reason instanceof Error ? reason.message : "Unable to open this CV." } }); });
    return () => { active = false; };
  }, [id]);
  if (!id) return { status: "not-found" };
  return completed?.id === id ? completed.result : { status: "loading" };
}
