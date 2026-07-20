import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeader } from "../components/layout/PageHeader";

export function PlaceholderPage({ title, description, back = false }: { title: string; description: string; back?: boolean }) {
  return <div>{back && <Link to="/" className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"><ArrowLeft className="size-4" />Back to dashboard</Link>}<PageHeader title={title} description={description} /><div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"><p className="text-sm font-medium text-slate-500">This workspace will be built in the next milestone.</p></div></div>;
}
