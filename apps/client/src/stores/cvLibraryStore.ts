import { createId, type Cv } from "@matchfolio/shared";
import { create } from "zustand";
import { mockCvs } from "../data/mockCvs";

export type CvSort = "updated" | "name" | "created";

type CvLibraryState = {
  cvs: Cv[];
  searchQuery: string;
  sortBy: CvSort;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: CvSort) => void;
  deleteCv: (id: string) => void;
  duplicateCv: (id: string) => void;
  renameCv: (id: string, name: string) => void;
};

export const useCvLibraryStore = create<CvLibraryState>((set) => ({
  cvs: mockCvs,
  searchQuery: "",
  sortBy: "updated",
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSortBy: (sortBy) => set({ sortBy }),
  deleteCv: (id) => set((state) => ({ cvs: state.cvs.filter((cv) => cv.id !== id) })),
  duplicateCv: (id) => set((state) => {
    const source = state.cvs.find((cv) => cv.id === id);
    if (!source) return state;
    const timestamp = new Date().toISOString();
    return {
      cvs: [{ ...source, id: createId(), name: `${source.name} Copy`, createdAt: timestamp, updatedAt: timestamp }, ...state.cvs],
    };
  }),
  renameCv: (id, name) => {
    const cleanName = name.trim();
    if (!cleanName) return;
    set((state) => ({
      cvs: state.cvs.map((cv) => cv.id === id ? { ...cv, name: cleanName, updatedAt: new Date().toISOString() } : cv),
    }));
  },
}));
