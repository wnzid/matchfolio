import { FileText, LayoutDashboard, PanelsTopLeft, Settings } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const navigation = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "My CVs", to: "/#cvs", icon: FileText },
  { label: "Templates", to: "/templates", icon: PanelsTopLeft },
  { label: "Settings", to: "/settings", icon: Settings },
];

export function Wordmark() {
  return (
    <NavLink to="/" className="flex items-center gap-2.5 font-bold tracking-tight text-slate-950">
      <span className="grid size-8 place-items-center rounded-lg bg-teal-600 text-sm text-white">M</span>
      <span>Matchfolio</span>
    </NavLink>
  );
}

export function Navigation({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation();
  return (
    <nav aria-label="Main navigation" className="space-y-1">
      {navigation.map(({ label, to, icon: Icon }) => {
        const active = label === "My CVs" ? location.pathname === "/" && location.hash === "#cvs" : location.pathname === to && !location.hash;
        return (
          <NavLink key={label} to={to} onClick={onNavigate} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${active ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}>
            <Icon className="size-[18px]" />
            {label}
          </NavLink>
        );
      })}
    </nav>
  );
}

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white px-5 py-6 lg:block">
      <div className="mb-9 px-2"><Wordmark /></div>
      <Navigation />
      <div className="absolute inset-x-5 bottom-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-800">Your career, organized.</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">Keep one complete source of truth for every CV.</p>
      </div>
    </aside>
  );
}
