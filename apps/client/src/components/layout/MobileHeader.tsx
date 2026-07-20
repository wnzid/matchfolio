import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Navigation, Wordmark } from "./Sidebar";

export function MobileHeader() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur lg:hidden">
        <Wordmark />
        <button type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="grid size-10 place-items-center rounded-lg text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300">
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </header>
      {open && (
        <div className="fixed inset-0 top-16 z-40 bg-slate-950/20 lg:hidden" onClick={() => setOpen(false)}>
          <div className="w-full border-b border-slate-200 bg-white p-4 shadow-xl" onClick={(event) => event.stopPropagation()}>
            <Navigation onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
