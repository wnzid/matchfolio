import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { DashboardPage } from "./pages/DashboardPage";
import { CvEditorPage } from "./pages/CvEditorPage";
import { NewCvPage } from "./pages/NewCvPage";
import { PlaceholderPage } from "./pages/PlaceholderPage";
import { TemplatesPage } from "./pages/TemplatesPage";

export default function App() {
  return <Routes><Route element={<AppShell />}><Route index element={<DashboardPage />} /><Route path="cvs/new" element={<NewCvPage />} /><Route path="cvs/:cvId" element={<CvEditorPage />} /><Route path="templates" element={<TemplatesPage />} /><Route path="settings" element={<PlaceholderPage title="Settings" description="Manage your local Matchfolio preferences." />} /><Route path="*" element={<Navigate to="/" replace />} /></Route></Routes>;
}
