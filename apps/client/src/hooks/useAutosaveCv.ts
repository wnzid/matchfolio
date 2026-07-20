import { cvSchema, type Cv } from "@matchfolio/shared";
import { useEffect, useRef, useState } from "react";
import { updateCv } from "../db/cvRepository";

export type SaveStatus = "saved" | "saving" | "unsaved" | "failed";

export function useAutosaveCv(cv: Cv, delay = 700) {
  const [status, setStatus] = useState<SaveStatus>("saved");
  const [error, setError] = useState("");
  const initial = useRef(true);
  const version = useRef(0);
  const latest = useRef(cv);

  useEffect(() => {
    latest.current = cv;
  }, [cv]);

  useEffect(() => {
    const flush = () => {
      const result = cvSchema.safeParse(latest.current);
      if (result.success) void updateCv(result.data);
    };
    window.addEventListener("pagehide", flush);
    return () => {
      window.removeEventListener("pagehide", flush);
      flush();
    };
  }, []);

  const save = async (candidate: Cv, saveVersion: number) => {
    const result = cvSchema.safeParse(candidate);
    if (!result.success) { if (saveVersion === version.current) setStatus("unsaved"); return; }
    setStatus("saving");
    try {
      await updateCv(result.data);
      if (saveVersion === version.current) { setStatus("saved"); setError(""); }
    } catch (reason) {
      if (saveVersion === version.current) { setStatus("failed"); setError(reason instanceof Error ? reason.message : "Unable to save this CV."); }
    }
  };

  useEffect(() => {
    if (initial.current) { initial.current = false; return; }
    const editVersion = ++version.current;
    setStatus("unsaved");
    const timer = window.setTimeout(() => void save(cv, editVersion), delay);
    return () => window.clearTimeout(timer);
  }, [cv, delay]);

  const retry = () => { const retryVersion = ++version.current; void save(cv, retryVersion); };
  return { status, error, retry };
}
