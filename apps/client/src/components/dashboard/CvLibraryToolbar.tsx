import { Search } from "lucide-react";
import type { CvSort } from "../../stores/cvLibraryStore";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";

export function CvLibraryToolbar({ searchQuery, sortBy, template, onSearch, onSort, onTemplate }: {
  searchQuery: string;
  sortBy: CvSort;
  template: string;
  onSearch: (value: string) => void;
  onSort: (value: CvSort) => void;
  onTemplate: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <label className="relative min-w-0 flex-1 sm:max-w-sm">
        <span className="sr-only">Search CVs</span>
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <Input value={searchQuery} onChange={(event) => onSearch(event.target.value)} placeholder="Search your CVs" className="pl-9" />
      </label>
      <label>
        <span className="sr-only">Filter by template</span>
        <Select value={template} onChange={(event) => onTemplate(event.target.value)} className="w-full sm:w-auto">
          <option value="all">All templates</option>
          <option value="european-tech">European Tech</option>
          <option value="australian-professional">Australian Professional</option>
        </Select>
      </label>
      <label>
        <span className="sr-only">Sort CVs</span>
        <Select value={sortBy} onChange={(event) => onSort(event.target.value as CvSort)} className="w-full sm:w-auto">
          <option value="updated">Recently updated</option>
          <option value="name">Name</option>
          <option value="created">Date created</option>
        </Select>
      </label>
    </div>
  );
}
