// @vitest-environment jsdom
import "fake-indexeddb/auto";
import "@testing-library/jest-dom/vitest";
import { createEmptyCv } from "@matchfolio/shared";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { CvLibrary } from "../components/dashboard/CvLibrary";
import { CvPreview } from "../components/preview/CvPreview";
import { db } from "../db/database";
import { getAllCvs } from "../db/cvRepository";
import { NewCvPage } from "./NewCvPage";

class ResizeObserverMock { observe() {} unobserve() {} disconnect() {} }
vi.stubGlobal("ResizeObserver", ResizeObserverMock);
afterEach(cleanup);
beforeEach(async () => { await db.cvs.clear(); });

function LocationProbe() { return <p>Current route: {useLocation().pathname}</p>; }

describe("editor flows", () => {
  it("creates a new CV and navigates to its editor", async () => {
    const user = userEvent.setup();
    render(<MemoryRouter initialEntries={["/cvs/new"]}><Routes><Route path="/cvs/new" element={<NewCvPage />} /><Route path="/cvs/:cvId" element={<LocationProbe />} /></Routes></MemoryRouter>);
    await user.click(screen.getByRole("button", { name: "Create CV" }));
    expect(await screen.findByText(/Current route: \/cvs\//)).toBeInTheDocument();
    expect((await getAllCvs())[0]?.name).toBe("Master CV");
  });

  it("renders the empty dashboard library", async () => {
    render(<MemoryRouter><CvLibrary /></MemoryRouter>);
    expect(await screen.findByText("No CVs yet")).toBeInTheDocument();
  });

  it("switches preview templates without changing CV content", async () => {
    const cv = { ...createEmptyCv("preview-test"), workExperience: [{ id: "role", company: "Acme", position: "Engineer", startDate: "2025-01", isCurrent: true, responsibilities: ["Build products"], achievements: ["Improved reliability"], technologies: ["TypeScript"] }] };
    const view = render(<CvPreview cv={cv} />);
    expect(screen.getByText("Work experience")).toBeInTheDocument();
    view.rerender(<CvPreview cv={{ ...cv, templateId: "australian-professional" }} />);
    await waitFor(() => expect(screen.getByText("Career history")).toBeInTheDocument());
    expect(screen.getByText("Acme", { exact: false })).toBeInTheDocument();
  });
});
