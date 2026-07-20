import type { Cv } from "@matchfolio/shared";
import { BriefcaseBusiness, Copy, ExternalLink, FolderKanban, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "../ui/Badge";
import { DropdownItem, DropdownMenu } from "../ui/DropdownMenu";

const templateNames: Record<string, string> = { classic: "Classic", modern: "Modern" };

export function CvCard({ cv, onDelete, onDuplicate, onRename }: { cv: Cv; onDelete: () => void; onDuplicate: () => void; onRename: (name: string) => void }) {
  const updated = new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(new Date(cv.updatedAt));
  const rename = () => {
    const name = window.prompt("Rename CV", cv.name);
    if (name !== null) onRename(name);
  };

  return (
    <article className="group flex min-w-0 flex-col rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Badge appearance={cv.id.startsWith("master-") ? "accent" : "neutral"}>{cv.id.startsWith("master-") ? "Master" : "Tailored"}</Badge>
          <h3 className="mt-3 line-clamp-2 text-base font-bold leading-6 text-slate-900">{cv.name}</h3>
        </div>
        <DropdownMenu>
          <DropdownItem onClick={rename}><Pencil className="mr-2 size-4" />Rename</DropdownItem>
          <DropdownItem onClick={onDuplicate}><Copy className="mr-2 size-4" />Duplicate</DropdownItem>
          <DropdownItem onClick={onDelete} danger><Trash2 className="mr-2 size-4" />Delete</DropdownItem>
        </DropdownMenu>
      </div>
      <p className="mt-2 text-sm text-slate-500">{templateNames[cv.templateId] ?? cv.templateId} template</p>
      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-y border-slate-100 py-4 text-xs font-medium text-slate-500">
        <span className="flex items-center gap-1.5"><BriefcaseBusiness className="size-4 text-slate-400" />{cv.workExperience.length} experience</span>
        <span className="flex items-center gap-1.5"><FolderKanban className="size-4 text-slate-400" />{cv.projects.length} projects</span>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs text-slate-400">Updated {updated}</p>
        <Link to={`/cvs/${cv.id}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300">Open <ExternalLink className="size-3.5" /></Link>
      </div>
    </article>
  );
}
