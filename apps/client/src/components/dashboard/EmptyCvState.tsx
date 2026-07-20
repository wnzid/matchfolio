import { FileText } from "lucide-react";
import { ButtonLink } from "../ui/Button";

export function EmptyCvState({ filtered = false }: { filtered?: boolean }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
      <div className="mx-auto grid size-12 place-items-center rounded-xl bg-slate-100 text-slate-500"><FileText className="size-6" /></div>
      <h3 className="mt-4 font-bold text-slate-900">{filtered ? "No matching CVs" : "No CVs yet"}</h3>
      <p className="mx-auto mt-1.5 max-w-sm text-sm leading-6 text-slate-500">{filtered ? "Try changing your search or template filter." : "Create a master CV to keep your complete experience in one place."}</p>
      {!filtered && <ButtonLink to="/cvs/new" className="mt-5">Create your first CV</ButtonLink>}
    </div>
  );
}
