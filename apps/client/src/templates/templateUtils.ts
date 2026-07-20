export function dateRange(start?: string, end?: string, current = false) {
  const format = (value?: string) => value ? new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}-01T00:00:00Z`)) : "";
  return [format(start), current ? "Present" : format(end)].filter(Boolean).join(" – ");
}
export function compact(values: Array<string | undefined>) { return values.filter(Boolean).join(" · "); }
