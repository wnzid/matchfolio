import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { DashboardPage } from "./pages/DashboardPage";
import { PlaceholderPage } from "./pages/PlaceholderPage";

export default function App() {
  return <Routes><Route element={<AppShell />}><Route index element={<DashboardPage />} /><Route path="cvs/new" element={<PlaceholderPage title="Create a new CV" description="Start with your master CV details or choose a template." back />} /><Route path="cvs/:cvId" element={<PlaceholderPage title="CV editor" description="Review and edit this CV in the upcoming editor workspace." back />} /><Route path="templates" element={<PlaceholderPage title="Templates" description="Browse clean, professional layouts for your next CV." />} /><Route path="settings" element={<PlaceholderPage title="Settings" description="Manage your local Matchfolio preferences." />} /><Route path="*" element={<Navigate to="/" replace />} /></Route></Routes>;
}
