import type { ReactNode } from "react";

export function Badge({ children, appearance = "neutral" }: { children: ReactNode; appearance?: "neutral" | "accent" }) {
  const color = appearance === "accent" ? "bg-teal-50 text-teal-700 ring-teal-600/15" : "bg-slate-100 text-slate-600 ring-slate-500/10";
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${color}`}>{children}</span>;
}
