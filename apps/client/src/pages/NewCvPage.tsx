import { createEmptyCv, type CvTemplateId } from "@matchfolio/shared";
import { useState, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, ButtonLink } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { createCv } from "../db/cvRepository";

export function NewCvPage() {
  const navigate = useNavigate(); const [params] = useSearchParams();
  const requested = params.get("template");
  const [name, setName] = useState("Master CV");
  const [templateId, setTemplateId] = useState<CvTemplateId>(requested === "australian-professional" ? requested : "european-tech");
  const [error, setError] = useState(""); const [creating, setCreating] = useState(false);
  const submit = async (event: FormEvent) => { event.preventDefault(); if (!name.trim()) { setError("Enter a CV name."); return; } setCreating(true); try { const cv = { ...createEmptyCv(), name: name.trim(), templateId }; await createCv(cv); navigate(`/cvs/${cv.id}`); } catch (reason) { setError(reason instanceof Error ? reason.message : "Could not create the CV."); setCreating(false); } };
  return <div className="mx-auto max-w-lg py-8"><div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><h1 className="text-2xl font-bold text-slate-950">Create a new CV</h1><p className="mt-2 text-sm leading-6 text-slate-500">Name your CV and choose a starting template. You can switch templates later.</p><form onSubmit={(event) => void submit(event)} className="mt-6 space-y-5"><label className="grid gap-2 text-sm font-semibold text-slate-700">CV name<Input autoFocus value={name} onChange={(event) => setName(event.target.value)} /></label><label className="grid gap-2 text-sm font-semibold text-slate-700">Template<Select value={templateId} onChange={(event) => setTemplateId(event.target.value as CvTemplateId)}><option value="european-tech">European Tech</option><option value="australian-professional">Australian Professional</option></Select></label>{error && <p role="alert" className="text-sm text-red-600">{error}</p>}<div className="flex justify-end gap-2"><ButtonLink to="/" variant="secondary">Cancel</ButtonLink><Button type="submit" disabled={creating}>{creating ? "Creating…" : "Create CV"}</Button></div></form></div></div>;
}
