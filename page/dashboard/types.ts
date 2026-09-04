import {
  BarChart3,
  FolderKanban,
  Inbox,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import type { ProjectDetailSection } from "@/constants/types";
import type { ProfilePayload } from "@/constants/types";

export type DashboardTab = "overview" | "requests" | "projects" | "profile";

export type DashboardTabItem = {
  value: DashboardTab;
  label: string;
  icon: LucideIcon;
};

export type ProjectFormState = {
  id?: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  source: string;
  year: string;
  project_url: string;
  repository_url: string;
  image_url: string;
  tech_stack: string;
  sort_order: string;
  is_featured: boolean;
  is_published: boolean;
};

export type DetailFormState = {
  id?: number;
  block_type: ProjectDetailSection["block_type"];
  layout: ProjectDetailSection["layout"];
  title: string;
  body: string;
  image_url: string;
  image_alt: string;
  caption: string;
  external_url: string;
  sort_order: string;
  is_published: boolean;
};

export type OverviewStat = {
  label: string;
  value: number;
};

export const dashboardTabs: DashboardTabItem[] = [
  { value: "overview", label: "Overview", icon: BarChart3 },
  { value: "requests", label: "Requests", icon: Inbox },
  { value: "projects", label: "Projects", icon: FolderKanban },
  { value: "profile", label: "Profile", icon: UserRound },
];

export const emptyProjectForm: ProjectFormState = {
  title: "",
  slug: "",
  description: "",
  category: "Portfolio",
  source: "",
  year: "",
  project_url: "",
  repository_url: "",
  image_url: "",
  tech_stack: "",
  sort_order: "0",
  is_featured: false,
  is_published: true,
};

export const emptyDetailForm: DetailFormState = {
  block_type: "contribution",
  layout: "image_right",
  title: "",
  body: "",
  image_url: "",
  image_alt: "",
  caption: "",
  external_url: "",
  sort_order: "0",
  is_published: true,
};

export const emptyProfileForm: ProfilePayload = {
  name: "",
  headline: "",
  summary: "",
  bio: "",
  email: "",
  phone: "",
  location: "",
  availability: "",
  github_url: "",
  linkedin_url: "",
  cv_url: "",
  years_experience: 0,
  clients_count: 0,
  projects_count: 0,
};
