import {
  BarChart3,
  Code2,
  FolderKanban,
  Inbox,
  Tags,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import type { ProjectDetailSection } from "@/constants/types";
import type { ProfilePayload } from "@/constants/types";

export type DashboardTab =
  | "overview"
  | "requests"
  | "projects"
  | "categories"
  | "sources"
  | "techStacks"
  | "profile";

export type DashboardTabItem = {
  value: DashboardTab;
  label: string;
  icon: LucideIcon;
};

export type DashboardNavGroup = {
  value: "filters";
  label: string;
  icon: LucideIcon;
  children: DashboardTabItem[];
};

export type DashboardNavItem = DashboardTabItem | DashboardNavGroup;

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
  { value: "categories", label: "Category", icon: Tags },
  { value: "sources", label: "Source", icon: Tags },
  { value: "techStacks", label: "Tech Stack", icon: Code2 },
  { value: "profile", label: "Profile", icon: UserRound },
];

export const dashboardNavItems: DashboardNavItem[] = [
  dashboardTabs[0],
  dashboardTabs[1],
  dashboardTabs[2],
  {
    value: "filters",
    label: "Filters",
    icon: Tags,
    children: [dashboardTabs[3], dashboardTabs[4], dashboardTabs[5]],
  },
  dashboardTabs[6],
];

export function isDashboardTab(value: string | null): value is DashboardTab {
  return dashboardTabs.some((tab) => tab.value === value);
}

export function getPanelHref(tab: DashboardTab) {
  if (tab === "overview") return "/panel";
  if (tab === "categories") return "/panel/filters/categories";
  if (tab === "sources") return "/panel/filters/sources";
  if (tab === "techStacks") return "/panel/filters/tech-stacks";
  return `/panel?tab=${tab}`;
}

export const emptyProjectForm: ProjectFormState = {
  title: "",
  slug: "",
  description: "",
  category: "",
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
