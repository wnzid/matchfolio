import { FilePlus2, LayoutTemplate, PencilLine } from "lucide-react";

const activity = [
  { text: "Frontend Developer CV updated", time: "2 days ago", icon: PencilLine },
  { text: "Graduate Software Engineer CV created", time: "12 Jul", icon: FilePlus2 },
  { text: "Classic template applied", time: "8 Jul", icon: LayoutTemplate },
];

export function RecentActivity() {
  return (
    <section aria-labelledby="activity-title" className="mt-9">
      <h2 id="activity-title" className="text-lg font-bold text-slate-950">Recent activity</h2>
      <div className="mt-4 rounded-xl border border-slate-200 bg-white px-5">
        {activity.map(({ text, time, icon: Icon }, index) => (
          <div key={text} className={`flex items-center gap-3 py-4 ${index ? "border-t border-slate-100" : ""}`}>
            <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-500"><Icon className="size-4" /></div>
            <p className="min-w-0 flex-1 truncate text-sm font-medium text-slate-700">{text}</p>
            <time className="shrink-0 text-xs text-slate-400">{time}</time>
          </div>
        ))}
      </div>
    </section>
  );
}
