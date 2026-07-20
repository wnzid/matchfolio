import type { Cv } from "@matchfolio/shared";
import { useLiveQuery } from "dexie-react-hooks";
import { useMemo, useState } from "react";
import { deleteCv, duplicateCv, getAllCvs, renameCv } from "../../db/cvRepository";
import { useCvLibraryStore } from "../../stores/cvLibraryStore";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { CvCard } from "./CvCard";
import { CvLibraryToolbar } from "./CvLibraryToolbar";
import { EmptyCvState } from "./EmptyCvState";

export function CvLibrary() {
  const [error, setError] = useState("");
  const cvs = useLiveQuery(() => getAllCvs().catch((reason: unknown) => {
    setError(reason instanceof Error ? reason.message : "Local CV storage is unavailable.");
    return [];
  }), [], undefined);
  const { searchQuery, sortBy, setSearchQuery, setSortBy } = useCvLibraryStore();
  const [template, setTemplate] = useState("all");
  const [pendingDelete, setPendingDelete] = useState<Cv>();
  const visibleCvs = useMemo(() => (cvs ?? []).filter((cv) => (!searchQuery.trim() || cv.name.toLowerCase().includes(searchQuery.trim().toLowerCase())) && (template === "all" || cv.templateId === template)).sort((a, b) => sortBy === "name" ? a.name.localeCompare(b.name) : Date.parse(sortBy === "created" ? b.createdAt : b.updatedAt) - Date.parse(sortBy === "created" ? a.createdAt : a.updatedAt)), [cvs, searchQuery, sortBy, template]);
  const run = async (action: () => Promise<unknown>) => { try { setError(""); await action(); } catch (reason) { setError(reason instanceof Error ? reason.message : "The CV action failed."); } };

  return <section id="cvs" aria-labelledby="cvs-title" className="scroll-mt-24"><div className="mb-4 flex items-center justify-between"><div><h2 id="cvs-title" className="text-lg font-bold text-slate-950">Your CVs</h2><p className="mt-1 text-sm text-slate-500">Open an existing CV or start a new version.</p></div><span className="text-sm font-medium text-slate-400">{cvs?.length ?? 0} total</span></div><CvLibraryToolbar searchQuery={searchQuery} sortBy={sortBy} template={template} onSearch={setSearchQuery} onSort={setSortBy} onTemplate={setTemplate} />{error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}<div className="mt-5">{cvs === undefined ? <p className="py-10 text-center text-sm text-slate-500">Loading your CVs…</p> : visibleCvs.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{visibleCvs.map((cv) => <CvCard key={cv.id} cv={cv} onDelete={() => setPendingDelete(cv)} onDuplicate={() => void run(() => duplicateCv(cv.id))} onRename={(name) => void run(() => renameCv(cv.id, name))} />)}</div> : <EmptyCvState filtered={cvs.length > 0} />}</div>{pendingDelete && <ConfirmDialog title={`Delete “${pendingDelete.name}”?`} description="This CV will be removed from this browser. This action cannot be undone." confirmLabel="Delete CV" onCancel={() => setPendingDelete(undefined)} onConfirm={() => { const id = pendingDelete.id; setPendingDelete(undefined); void run(() => deleteCv(id)); }} />}</section>;
}
