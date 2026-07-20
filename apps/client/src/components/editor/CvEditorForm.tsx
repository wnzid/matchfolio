import { createId, type Cv, type Reference } from "@matchfolio/shared";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import {
  useFieldArray,
  useFormContext,
  useWatch,
  type FieldPath,
} from "react-hook-form";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { EditorSection } from "./EditorSection";

const labelClass = "grid gap-1.5 text-sm font-medium text-slate-700";
const areaClass =
  "min-h-24 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-200";
const grid = "grid gap-4 sm:grid-cols-2";

function TextField({
  label,
  path,
  type = "text",
  placeholder,
}: {
  label: string;
  path: FieldPath<Cv>;
  type?: string;
  placeholder?: string;
}) {
  const { register } = useFormContext<Cv>();
  return (
    <label className={labelClass}>
      {label}
      <Input type={type} placeholder={placeholder} {...register(path)} />
    </label>
  );
}
function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-8 place-items-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
    >
      {children}
    </button>
  );
}

function StringList({
  path,
  label,
  placeholder = "Add item",
}: {
  path: FieldPath<Cv>;
  label: string;
  placeholder?: string;
}) {
  const { control, getValues, setValue } = useFormContext<Cv>();
  const values =
    (useWatch({ control, name: path }) as string[] | undefined) ?? [];
  const update = (next: string[]) =>
    setValue(path, next as never, { shouldDirty: true });
  return (
    <div className="sm:col-span-2">
      <p className="mb-2 text-sm font-medium text-slate-700">{label}</p>
      <div className="space-y-2">
        {values.map((value, index) => (
          <div className="flex gap-2" key={index}>
            <Input
              value={value}
              onChange={(event) =>
                update(
                  values.map((item, itemIndex) =>
                    itemIndex === index ? event.target.value : item,
                  ),
                )
              }
            />
            <IconButton
              label={`Move ${label} up`}
              onClick={() => {
                if (index > 0) {
                  const next = [...values];
                  [next[index - 1], next[index]] = [
                    next[index],
                    next[index - 1],
                  ];
                  update(next);
                }
              }}
            >
              <ArrowUp className="size-4" />
            </IconButton>
            <IconButton
              label={`Move ${label} down`}
              onClick={() => {
                if (index < values.length - 1) {
                  const next = [...values];
                  [next[index + 1], next[index]] = [
                    next[index],
                    next[index + 1],
                  ];
                  update(next);
                }
              }}
            >
              <ArrowDown className="size-4" />
            </IconButton>
            <IconButton
              label={`Remove ${label} item`}
              onClick={() =>
                update(values.filter((_, itemIndex) => itemIndex !== index))
              }
            >
              <Trash2 className="size-4" />
            </IconButton>
          </div>
        ))}
      </div>
      <Button
        variant="ghost"
        className="mt-2 px-2"
        onClick={() => update([...((getValues(path) as string[]) ?? []), ""])}
      >
        <Plus className="size-4" />
        {placeholder}
      </Button>
    </div>
  );
}

function ItemActions({
  index,
  total,
  onMove,
  onRemove,
}: {
  index: number;
  total: number;
  onMove: (from: number, to: number) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex">
      <IconButton
        label="Move item up"
        onClick={() => index > 0 && onMove(index, index - 1)}
      >
        <ArrowUp className="size-4" />
      </IconButton>
      <IconButton
        label="Move item down"
        onClick={() => index < total - 1 && onMove(index, index + 1)}
      >
        <ArrowDown className="size-4" />
      </IconButton>
      <IconButton label="Remove item" onClick={onRemove}>
        <Trash2 className="size-4" />
      </IconButton>
    </div>
  );
}

function Personal() {
  const {
    formState: { errors },
  } = useFormContext<Cv>();
  return (
    <EditorSection title="Personal details" defaultOpen>
      <div className={grid}>
        <TextField label="Full name" path="personalDetails.fullName" />
        <TextField
          label="Professional title"
          path="personalDetails.professionalTitle"
        />
        <TextField label="Email" type="email" path="personalDetails.email" />
        <TextField label="Phone" type="tel" path="personalDetails.phone" />
        <TextField label="Location" path="personalDetails.location" />
        <TextField label="Website" type="url" path="personalDetails.website" />
        <TextField
          label="LinkedIn"
          type="url"
          path="personalDetails.linkedin"
        />
        <TextField label="GitHub" type="url" path="personalDetails.github" />
      </div>
      {errors.personalDetails && (
        <p className="mt-3 text-xs text-red-600">
          Please provide a name, valid email, and valid URLs.
        </p>
      )}
    </EditorSection>
  );
}
function Summary() {
  const { register, control } = useFormContext<Cv>();
  const value = useWatch({ control, name: "professionalSummary" });
  return (
    <EditorSection title="Professional summary">
      <label className={labelClass}>
        Summary
        <textarea className={areaClass} {...register("professionalSummary")} />
      </label>
      <div className="mt-2 flex justify-between text-xs text-slate-500">
        <span>
          Aim for 40–80 words and focus on experience, strengths and target
          roles.
        </span>
        <span>{value.trim() ? value.trim().split(/\s+/).length : 0} words</span>
      </div>
    </EditorSection>
  );
}

function Work() {
  const { control, register, setValue } = useFormContext<Cv>();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "workExperience",
  });
  return (
    <EditorSection title="Work experience">
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="rounded-lg border border-slate-200 p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <b className="text-sm">Role {index + 1}</b>
              <ItemActions
                index={index}
                total={fields.length}
                onMove={move}
                onRemove={() => remove(index)}
              />
            </div>
            <div className={grid}>
              <TextField
                label="Position"
                path={`workExperience.${index}.position`}
              />
              <TextField
                label="Company"
                path={`workExperience.${index}.company`}
              />
              <TextField
                label="Location"
                path={`workExperience.${index}.location`}
              />
              <TextField
                label="Start date"
                type="month"
                path={`workExperience.${index}.startDate`}
              />
              <TextField
                label="End date"
                type="month"
                path={`workExperience.${index}.endDate`}
              />
              <label className="flex items-center gap-2 pt-7 text-sm">
                <input
                  type="checkbox"
                  {...register(`workExperience.${index}.isCurrent`)}
                  onChange={(event) => {
                    setValue(
                      `workExperience.${index}.isCurrent`,
                      event.target.checked,
                      { shouldDirty: true },
                    );
                    if (event.target.checked)
                      setValue(`workExperience.${index}.endDate`, undefined, {
                        shouldDirty: true,
                      });
                  }}
                />
                Currently working here
              </label>
              <label className={`${labelClass} sm:col-span-2`}>
                Role overview
                <textarea
                  className={areaClass}
                  {...register(`workExperience.${index}.description`)}
                />
              </label>
              <StringList
                label="Responsibilities"
                path={`workExperience.${index}.responsibilities`}
                placeholder="Add responsibility"
              />
              <StringList
                label="Achievements"
                path={`workExperience.${index}.achievements`}
                placeholder="Add achievement"
              />
              <StringList
                label="Technologies"
                path={`workExperience.${index}.technologies`}
                placeholder="Add technology"
              />
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="secondary"
        className="mt-4"
        onClick={() =>
          append({
            id: createId(),
            company: "",
            position: "",
            startDate: new Date().toISOString().slice(0, 7),
            isCurrent: false,
            responsibilities: [],
            achievements: [],
            technologies: [],
          })
        }
      >
        <Plus className="size-4" />
        Add role
      </Button>
    </EditorSection>
  );
}

function EducationEditor() {
  const { control, register, setValue } = useFormContext<Cv>();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "education",
  });
  return (
    <EditorSection title="Education">
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-lg border p-4">
            <div className="flex justify-end">
              <ItemActions
                index={index}
                total={fields.length}
                onMove={move}
                onRemove={() => remove(index)}
              />
            </div>
            <div className={grid}>
              <TextField
                label="Institution"
                path={`education.${index}.institution`}
              />
              <TextField label="Degree" path={`education.${index}.degree`} />
              <TextField
                label="Field of study"
                path={`education.${index}.fieldOfStudy`}
              />
              <TextField
                label="Location"
                path={`education.${index}.location`}
              />
              <TextField
                label="Start date"
                type="month"
                path={`education.${index}.startDate`}
              />
              <TextField
                label="End date"
                type="month"
                path={`education.${index}.endDate`}
              />
              <label className="flex items-center gap-2 pt-7 text-sm">
                <input
                  type="checkbox"
                  {...register(`education.${index}.isCurrent`)}
                  onChange={(event) => {
                    setValue(`education.${index}.isCurrent`, event.target.checked, { shouldDirty: true });
                    if (event.target.checked) setValue(`education.${index}.endDate`, undefined, { shouldDirty: true });
                  }}
                />
                Currently studying
              </label>
              <TextField label="Grade" path={`education.${index}.grade`} />
              <StringList
                label="Highlights"
                path={`education.${index}.highlights`}
              />
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="secondary"
        className="mt-4"
        onClick={() =>
          append({
            id: createId(),
            institution: "",
            degree: "",
            isCurrent: false,
            highlights: [],
          })
        }
      >
        <Plus className="size-4" />
        Add education
      </Button>
    </EditorSection>
  );
}

function ProjectsEditor() {
  const { control, register } = useFormContext<Cv>();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "projects",
  });
  return (
    <EditorSection title="Projects">
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-lg border p-4">
            <div className="flex justify-end">
              <ItemActions
                index={index}
                total={fields.length}
                onMove={move}
                onRemove={() => remove(index)}
              />
            </div>
            <div className={grid}>
              <TextField label="Project name" path={`projects.${index}.name`} />
              <TextField label="Role" path={`projects.${index}.role`} />
              <TextField
                label="Project URL"
                type="url"
                path={`projects.${index}.url`}
              />
              <TextField
                label="Repository URL"
                type="url"
                path={`projects.${index}.repositoryUrl`}
              />
              <TextField
                label="Start date"
                type="month"
                path={`projects.${index}.startDate`}
              />
              <TextField
                label="End date"
                type="month"
                path={`projects.${index}.endDate`}
              />
              <label className={`${labelClass} sm:col-span-2`}>
                Description
                <textarea
                  className={areaClass}
                  {...register(`projects.${index}.description`)}
                />
              </label>
              <StringList
                label="Technologies"
                path={`projects.${index}.technologies`}
              />
              <StringList
                label="Highlights"
                path={`projects.${index}.highlights`}
              />
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="secondary"
        className="mt-4"
        onClick={() =>
          append({ id: createId(), name: "", technologies: [], highlights: [] })
        }
      >
        <Plus className="size-4" />
        Add project
      </Button>
    </EditorSection>
  );
}

function SkillsEditor() {
  const { control } = useFormContext<Cv>();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "skillGroups",
  });
  return (
    <EditorSection title="Skills">
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-lg border p-4">
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <TextField
                  label="Group name"
                  path={`skillGroups.${index}.name`}
                />
              </div>
              <div className="pt-6">
                <ItemActions
                  index={index}
                  total={fields.length}
                  onMove={move}
                  onRemove={() => remove(index)}
                />
              </div>
            </div>
            <div className="mt-3">
              <StringList
                label="Skills"
                path={`skillGroups.${index}.skills`}
                placeholder="Add skill"
              />
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="secondary"
        className="mt-4"
        onClick={() => append({ id: createId(), name: "Skills", skills: [] })}
      >
        <Plus className="size-4" />
        Add skill group
      </Button>
    </EditorSection>
  );
}

function CertificationsEditor() {
  const { control } = useFormContext<Cv>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
  });
  return (
    <EditorSection title="Certifications">
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-lg border p-4">
            <div className="flex justify-end">
              <IconButton
                label="Remove certification"
                onClick={() => remove(index)}
              >
                <Trash2 className="size-4" />
              </IconButton>
            </div>
            <div className={grid}>
              <TextField label="Name" path={`certifications.${index}.name`} />
              <TextField
                label="Issuer"
                path={`certifications.${index}.issuer`}
              />
              <TextField
                label="Issue date"
                type="month"
                path={`certifications.${index}.issueDate`}
              />
              <TextField
                label="Credential URL"
                type="url"
                path={`certifications.${index}.credentialUrl`}
              />
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="secondary"
        className="mt-4"
        onClick={() => append({ id: createId(), name: "" })}
      >
        <Plus className="size-4" />
        Add certification
      </Button>
    </EditorSection>
  );
}

function LanguagesEditor() {
  const { control } = useFormContext<Cv>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages",
  });
  return (
    <EditorSection title="Languages">
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-end gap-2">
            <div className="grid flex-1 gap-3 sm:grid-cols-2">
              <TextField label="Language" path={`languages.${index}.name`} />
              <TextField
                label="Proficiency"
                path={`languages.${index}.proficiency`}
              />
            </div>
            <IconButton label="Remove language" onClick={() => remove(index)}>
              <Trash2 className="size-4" />
            </IconButton>
          </div>
        ))}
      </div>
      <Button
        variant="secondary"
        className="mt-4"
        onClick={() => append({ id: createId(), name: "" })}
      >
        <Plus className="size-4" />
        Add language
      </Button>
    </EditorSection>
  );
}

function InterestsEditor() {
  return (
    <EditorSection title="Interests">
      <StringList
        label="Interests"
        path="interests"
        placeholder="Add interest"
      />
    </EditorSection>
  );
}

function ReferencesEditor() {
  const { control, getValues, setValue } = useFormContext<Cv>();
  const references = useWatch({ control, name: "references" });
  const mode = references.some((item) => item.isAvailableOnRequest)
    ? "request"
    : references.length
      ? "named"
      : "hidden";
  const setMode = (next: string) => {
    if (next === "hidden") setValue("references", [], { shouldDirty: true });
    if (next === "request")
      setValue("references", [{ id: createId(), isAvailableOnRequest: true }], {
        shouldDirty: true,
      });
    if (next === "named")
      setValue(
        "references",
        [{ id: createId(), isAvailableOnRequest: false }],
        { shouldDirty: true },
      );
  };
  const add = () =>
    setValue(
      "references",
      [
        ...getValues("references"),
        { id: createId(), isAvailableOnRequest: false },
      ],
      { shouldDirty: true },
    );
  const remove = (index: number) =>
    setValue(
      "references",
      getValues("references").filter((_, itemIndex) => itemIndex !== index),
      { shouldDirty: true },
    );
  return (
    <EditorSection title="References">
      <label className={labelClass}>
        References mode
        <Select value={mode} onChange={(event) => setMode(event.target.value)}>
          <option value="hidden">Hide references section</option>
          <option value="request">Available upon request</option>
          <option value="named">Named references</option>
        </Select>
      </label>
      {mode === "named" && (
        <div className="mt-4 space-y-4">
          {references.map((reference: Reference, index) => (
            <div key={reference.id} className="rounded-lg border p-4">
              <div className="flex justify-end">
                <IconButton
                  label="Remove reference"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="size-4" />
                </IconButton>
              </div>
              <div className={grid}>
                <TextField label="Name" path={`references.${index}.name`} />
                <TextField
                  label="Position"
                  path={`references.${index}.position`}
                />
                <TextField
                  label="Company"
                  path={`references.${index}.company`}
                />
                <TextField
                  label="Email"
                  type="email"
                  path={`references.${index}.email`}
                />
                <TextField label="Phone" path={`references.${index}.phone`} />
              </div>
            </div>
          ))}
          <Button variant="secondary" onClick={add}>
            <Plus className="size-4" />
            Add reference
          </Button>
        </div>
      )}
    </EditorSection>
  );
}

function CustomSectionsEditor() {
  const { control, getValues, register, setValue } = useFormContext<Cv>();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "customSections",
  });
  const addItem = (sectionIndex: number) => {
    const sections = getValues("customSections");
    sections[sectionIndex]?.items.push({
      id: createId(),
      title: "",
      highlights: [],
    });
    setValue("customSections", [...sections], { shouldDirty: true });
  };
  const removeItem = (sectionIndex: number, itemIndex: number) => {
    const sections = getValues("customSections");
    if (sections[sectionIndex])
      sections[sectionIndex].items = sections[sectionIndex].items.filter(
        (_, index) => index !== itemIndex,
      );
    setValue("customSections", [...sections], { shouldDirty: true });
  };
  return (
    <EditorSection title="Custom sections">
      <div className="space-y-4">
        {fields.map((section, sectionIndex) => (
          <div key={section.id} className="rounded-lg border p-4">
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <TextField
                  label="Section title"
                  path={`customSections.${sectionIndex}.title`}
                />
              </div>
              <ItemActions
                index={sectionIndex}
                total={fields.length}
                onMove={move}
                onRemove={() => remove(sectionIndex)}
              />
            </div>
            <div className="mt-4 space-y-3">
              {section.items.map((item, itemIndex) => (
                <div key={item.id} className="rounded-md bg-slate-50 p-3">
                  <div className="flex justify-end">
                    <IconButton
                      label="Remove custom item"
                      onClick={() => removeItem(sectionIndex, itemIndex)}
                    >
                      <Trash2 className="size-4" />
                    </IconButton>
                  </div>
                  <div className={grid}>
                    <TextField
                      label="Item title"
                      path={`customSections.${sectionIndex}.items.${itemIndex}.title`}
                    />
                    <TextField
                      label="Subtitle"
                      path={`customSections.${sectionIndex}.items.${itemIndex}.subtitle`}
                    />
                    <label className={`${labelClass} sm:col-span-2`}>
                      Description
                      <textarea
                        className={areaClass}
                        {...register(
                          `customSections.${sectionIndex}.items.${itemIndex}.description`,
                        )}
                      />
                    </label>
                    <StringList
                      label="Highlights"
                      path={`customSections.${sectionIndex}.items.${itemIndex}.highlights`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" onClick={() => addItem(sectionIndex)}>
              <Plus className="size-4" />
              Add item
            </Button>
          </div>
        ))}
      </div>
      <Button
        variant="secondary"
        className="mt-4"
        onClick={() =>
          append({ id: createId(), title: "Custom section", items: [] })
        }
      >
        <Plus className="size-4" />
        Add custom section
      </Button>
    </EditorSection>
  );
}

export function CvEditorForm() {
  return (
    <div className="space-y-3">
      <Personal />
      <Summary />
      <Work />
      <EducationEditor />
      <ProjectsEditor />
      <SkillsEditor />
      <CertificationsEditor />
      <LanguagesEditor />
      <InterestsEditor />
      <ReferencesEditor />
      <CustomSectionsEditor />
    </div>
  );
}
