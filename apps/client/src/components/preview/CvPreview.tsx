import type { Cv } from "@matchfolio/shared";
import { useEffect, useRef, useState } from "react";
import { templateRegistry } from "../../templates/templateRegistry";
import { Button } from "../ui/Button";

export function CvPreview({ cv }: { cv: Cv }) {
  const [zoom, setZoom] = useState<"fit" | "100">("fit");
  const [fitScale, setFitScale] = useState(0.72);
  const [overflow, setOverflow] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const Template = templateRegistry[cv.templateId];
  const scale = zoom === "100" ? 1 : fitScale;

  useEffect(() => {
    const update = () => { const width = viewportRef.current?.clientWidth ?? 794; setFitScale(Math.min(1, Math.max(0.3, (width - 32) / 794))); window.requestAnimationFrame(() => setOverflow((pageRef.current?.scrollHeight ?? 0) > 1125)); };
    update(); const observer = new ResizeObserver(update); if (viewportRef.current) observer.observe(viewportRef.current); return () => observer.disconnect();
  }, [cv]);

  return <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-200/70"><div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-2"><span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Live preview</span><div className="flex gap-1"><Button variant={zoom === "fit" ? "primary" : "ghost"} className="min-h-8 px-3 text-xs" onClick={() => setZoom("fit")}>Fit</Button><Button variant={zoom === "100" ? "primary" : "ghost"} className="min-h-8 px-3 text-xs" onClick={() => setZoom("100")}>100%</Button></div></div>{overflow && <p role="status" className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-800">This CV exceeds one page. You can shorten content or continue with a multi-page CV.</p>}<div ref={viewportRef} className="max-h-[calc(100vh-13rem)] overflow-auto p-4"><div style={{ width: 794 * scale, minHeight: 1123 * scale }} className="mx-auto"><div ref={pageRef} style={{ width: 794, transform: `scale(${scale})`, transformOrigin: "top left" }} className="shadow-lg shadow-slate-900/15"><Template cv={cv} /></div></div></div></div>;
}
