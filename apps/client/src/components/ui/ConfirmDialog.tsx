import { useEffect, useRef } from "react";
import { Button } from "./Button";

export function ConfirmDialog({ title, description, confirmLabel, onCancel, onConfirm }: { title: string; description: string; confirmLabel: string; onCancel: () => void; onConfirm: () => void }) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { cancelRef.current?.focus(); }, []);
  return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/35 p-4" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onCancel()}><div role="alertdialog" aria-modal="true" aria-labelledby="dialog-title" aria-describedby="dialog-description" onKeyDown={(event) => event.key === "Escape" && onCancel()} className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-xl"><h2 id="dialog-title" className="text-lg font-bold text-slate-950">{title}</h2><p id="dialog-description" className="mt-2 text-sm leading-6 text-slate-500">{description}</p><div className="mt-6 flex justify-end gap-2"><Button ref={cancelRef} variant="secondary" onClick={onCancel}>Cancel</Button><Button variant="danger" className="border border-red-200" onClick={onConfirm}>{confirmLabel}</Button></div></div></div>;
}
