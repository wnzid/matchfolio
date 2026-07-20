import { useMemo, useState } from "react";
import { useCvLibraryStore } from "../../stores/cvLibraryStore";
import { CvCard } from "./CvCard";
import { CvLibraryToolbar } from "./CvLibraryToolbar";
import { EmptyCvState } from "./EmptyCvState";

export function CvLibrary() {
  const { cvs, searchQuery, sortBy, setSearchQuery, setSortBy, deleteCv, duplicateCv, renameCv } = useCvLibraryStore();
  const [template, setTemplate] = useState("all");
  const visibleCvs = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();
    return cvs
      .filter((cv) => (!query || cv.name.toLocaleLowerCase().includes(query)) && (template === "all" || cv.templateId === template))
      .sort((a, b) => sortBy === "name" ? a.name.localeCompare(b.name) : new Date(sortBy === "created" ? b.createdAt : b.updatedAt).getTime() - new Date(sortBy === "created" ? a.createdAt : a.updatedAt).getTime());
  }, [cvs, searchQuery, sortBy, template]);

  return (
    <section id="cvs" aria-labelledby="cvs-title" className="scroll-mt-24">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 id="cvs-title" className="text-lg font-bold text-slate-950">Your CVs</h2>
          <p className="mt-1 text-sm text-slate-500">Open an existing CV or start a new version.</p>
        </div>
        <span className="text-sm font-medium text-slate-400">{cvs.length} total</span>
      </div>
      <CvLibraryToolbar searchQuery={searchQuery} sortBy={sortBy} template={template} onSearch={setSearchQuery} onSort={setSortBy} onTemplate={setTemplate} />
      <div className="mt-5">
        {visibleCvs.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleCvs.map((cv) => <CvCard key={cv.id} cv={cv} onDelete={() => deleteCv(cv.id)} onDuplicate={() => duplicateCv(cv.id)} onRename={(name) => renameCv(cv.id, name)} />)}
          </div>
        ) : <EmptyCvState filtered={cvs.length > 0} />}
      </div>
    </section>
  );
}
