import { ArrowRight, FilePlus2 } from "lucide-react";
import { ButtonLink } from "../ui/Button";

export function WelcomeCard() {
  return (
    <section aria-labelledby="welcome-title" className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex gap-4">
          <div className="hidden size-11 shrink-0 place-items-center rounded-xl bg-teal-50 text-teal-700 sm:grid"><FilePlus2 className="size-5" /></div>
          <div>
            <h2 id="welcome-title" className="font-bold text-slate-950">Build your master CV</h2>
            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">Add your complete experience once, then create tailored versions for each job without rewriting everything from scratch.</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <ButtonLink to="/templates" variant="secondary">Explore templates</ButtonLink>
          <ButtonLink to="/cvs/new">Create master CV <ArrowRight className="size-4" /></ButtonLink>
        </div>
      </div>
    </section>
  );
}
