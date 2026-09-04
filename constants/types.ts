export type ProjectDetailSection = {
  id?: number;
  project_id?: number;
  block_type: "overview" | "challenge" | "contribution" | "implementation" | "result";
  layout: "image_left" | "image_right" | "full_width" | "text_only";
  title: string;
  body: string;
  image_url?: string | null;
  image_alt?: string | null;
  caption?: string | null;
  external_url?: string | null;
  metadata?: Record<string, unknown>;
  sort_order?: number;
  is_published?: boolean;
};

export type PortfolioProject = {
  id?: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  source?: string | null;
  year?: string | null;
  project_url?: string | null;
  repository_url?: string | null;
  image_url?: string | null;
  tech_stack: string[];
  sort_order?: number;
  is_featured?: boolean;
  is_published?: boolean;
  lowVisibility?: boolean;
  linkKind?: "android";
  detail_sections?: ProjectDetailSection[];
};

export type PortfolioProfile = {
  id?: number;
  name: string;
  headline: string;
  summary: string;
  bio?: string | null;
  email: string;
  phone?: string | null;
  location?: string | null;
  availability?: string | null;
  github_url?: string | null;
  linkedin_url?: string | null;
  cv_url?: string | null;
  stats: {
    years_experience: number;
    clients_count: number;
    projects_count: number;
  };
};

export type PortfolioService = {
  id?: number;
  title: string;
  slug: string;
  summary: string;
  description?: string | null;
  deliverables: string[];
  tech_stack: string[];
};

export type PortfolioSkill = {
  id?: number;
  name: string;
  category: string;
  proficiency: number;
};

export type PortfolioExperience = {
  id?: number;
  period: string;
  title: string;
  company?: string | null;
  description: string;
};

export type ApiEnvelope<T> = {
  message: string;
  data: T;
};

export type PaginatedData<T> = {
  data: T[];
  links?: unknown;
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  budget?: string | null;
  subject: string;
  message: string;
  status: "unread" | "read" | "archived";
  read_at?: string | null;
  created_at?: string | null;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  token_type: "bearer";
  expires_in: number;
  user: {
    id: number;
    name: string;
    email: string;
    is_admin?: boolean;
  };
};

export type ProfilePayload = Omit<PortfolioProfile, "id" | "stats"> & {
  years_experience: number;
  clients_count: number;
  projects_count: number;
};

export type ProjectPayload = Omit<
  PortfolioProject,
  "id" | "detail_sections" | "lowVisibility" | "linkKind"
>;

export type ProjectDetailSectionPayload = Omit<
  ProjectDetailSection,
  "id" | "project_id"
>;
