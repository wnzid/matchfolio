import { create } from "zustand";

export type CvSort = "updated" | "name" | "created";
type CvLibraryUiState = {
  searchQuery: string;
  sortBy: CvSort;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: CvSort) => void;
};

export const useCvLibraryStore = create<CvLibraryUiState>((set) => ({
  searchQuery: "",
  sortBy: "updated",
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSortBy: (sortBy) => set({ sortBy }),
}));
