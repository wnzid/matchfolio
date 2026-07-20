import { Plus } from "lucide-react";
import { CvLibrary } from "../components/dashboard/CvLibrary";
import { RecentActivity } from "../components/dashboard/RecentActivity";
import { WelcomeCard } from "../components/dashboard/WelcomeCard";
import { PageHeader } from "../components/layout/PageHeader";
import { ButtonLink } from "../components/ui/Button";

export function DashboardPage() {
  return <><PageHeader title="Dashboard" description="Create, manage and tailor CVs for specific opportunities." action={<ButtonLink to="/cvs/new"><Plus className="size-4" />Create CV</ButtonLink>} /><WelcomeCard /><CvLibrary /><RecentActivity /></>;
}
