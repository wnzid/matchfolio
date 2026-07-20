import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";

export function EditorSection({ title, children, defaultOpen = false }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return <section className="rounded-xl border border-slate-200 bg-white"><button type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="flex w-full items-center justify-between px-5 py-4 text-left font-bold text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500">{title}<ChevronDown className={`size-4 transition ${open ? "rotate-180" : ""}`} /></button>{open && <div className="border-t border-slate-100 p-5">{children}</div>}</section>;
}
