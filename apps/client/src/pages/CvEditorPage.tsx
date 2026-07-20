import { zodResolver } from "@hookform/resolvers/zod";
import { cvSchema, type Cv } from "@matchfolio/shared";
import { ArrowLeft, Check, CloudAlert, LoaderCircle } from "lucide-react";
import { useState } from "react";
import {
  FormProvider,
  useForm,
  useWatch,
  type Resolver,
} from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { CvEditorForm } from "../components/editor/CvEditorForm";
import { CvPreview } from "../components/preview/CvPreview";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { useAutosaveCv } from "../hooks/useAutosaveCv";
import { useCv } from "../hooks/useCv";

export function CvEditorPage() {
  const { cvId } = useParams();
  const state = useCv(cvId);
  if (state.status === "loading") return <StateMessage>Loading CV…</StateMessage>;
  if (state.status === "not-found")
    return (
      <StateMessage>
        CV not found. It may have been deleted from this browser.
      </StateMessage>
    );
  if (state.status === "error") return <StateMessage>{state.message}</StateMessage>;
  return <LoadedEditor key={state.cv.id} cv={state.cv} />;
}

function LoadedEditor({ cv }: { cv: Cv }) {
  const methods = useForm<Cv>({
    defaultValues: cv,
    mode: "onChange",
    resolver: zodResolver(cvSchema) as Resolver<Cv>,
  });
  const liveCv = useWatch({ control: methods.control }) as Cv;
  const { status, error, retry } = useAutosaveCv(liveCv);
  const [mobileView, setMobileView] = useState<"edit" | "preview">("edit");
  const labels = {
    saved: "Saved",
    saving: "Saving…",
    unsaved: "Unsaved changes",
    failed: "Save failed",
  };
  return (
    <FormProvider {...methods}>
      <div className="-mx-1">
        <header className="mb-5 rounded-xl border border-slate-200 bg-white p-4">
          <Link
            to="/"
            className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft className="size-4" />
            Back to dashboard
          </Link>
          <div className="grid gap-3 md:grid-cols-[1fr_240px_auto] md:items-end">
            <label className="grid gap-1 text-xs font-semibold text-slate-500">
              CV name
              <Input {...methods.register("name")} />
            </label>
            <label className="grid gap-1 text-xs font-semibold text-slate-500">
              Template
              <Select {...methods.register("templateId")}>
                <option value="european-tech">European Tech</option>
                <option value="australian-professional">
                  Australian Professional
                </option>
              </Select>
            </label>
            <div
              className={`flex min-h-10 items-center gap-2 text-sm font-semibold ${status === "failed" ? "text-red-600" : "text-slate-500"}`}
            >
              {status === "saved" ? (
                <Check className="size-4 text-teal-600" />
              ) : status === "failed" ? (
                <CloudAlert className="size-4" />
              ) : (
                <LoaderCircle
                  className={`size-4 ${status === "saving" ? "animate-spin" : ""}`}
                />
              )}
              {labels[status]}
              {status === "failed" && (
                <Button
                  variant="ghost"
                  className="min-h-8 px-2"
                  onClick={retry}
                >
                  Retry save
                </Button>
              )}
            </div>
          </div>
          {error && (
            <p role="alert" className="mt-2 text-xs text-red-600">
              {error}
            </p>
          )}
        </header>
        <div className="mb-4 grid grid-cols-2 rounded-lg bg-slate-200 p-1 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileView("edit")}
            className={`rounded-md py-2 text-sm font-semibold ${mobileView === "edit" ? "bg-white shadow-sm" : "text-slate-500"}`}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => setMobileView("preview")}
            className={`rounded-md py-2 text-sm font-semibold ${mobileView === "preview" ? "bg-white shadow-sm" : "text-slate-500"}`}
          >
            Preview
          </button>
        </div>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)]">
          <div
            className={mobileView === "preview" ? "hidden lg:block" : "block"}
          >
            <CvEditorForm />
          </div>
          <div
            className={`${mobileView === "edit" ? "hidden lg:block" : "block"} lg:sticky lg:top-5 lg:self-start`}
          >
            <CvPreview cv={liveCv} />
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
function StateMessage({ children }: { children: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
      <p className="text-slate-600">{children}</p>
      <Link
        to="/"
        className="mt-4 inline-block text-sm font-semibold text-teal-700"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
