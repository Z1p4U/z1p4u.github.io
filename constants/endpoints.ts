export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "/api/v1";

export const endpoints = {
  PORTFOLIO: "/portfolio",
  PROJECTS: "/projects",
  PROJECT_DETAIL: (slug: string) => `/projects/${slug}`,
  PROJECT_CATEGORIES: "/project-categories",
  PROJECT_SOURCES: "/project-sources",
  PROJECT_TECH_STACKS: "/project-tech-stacks",
  SERVICES: "/services",
  SKILLS: "/skills",
  EXPERIENCES: "/experiences",
  CONTACT_MESSAGES: "/contact-messages",

  LOGIN: "/auth/login",
  ME: "/auth/me",

  ADMIN_PROFILE: "/admin/profile",
  ADMIN_PROJECTS: "/admin/projects",
  ADMIN_PROJECT: (id: number) => `/admin/projects/${id}`,
  ADMIN_PROJECT_CATEGORIES: "/admin/project-categories",
  ADMIN_PROJECT_CATEGORY: (id: number) => `/admin/project-categories/${id}`,
  ADMIN_PROJECT_SOURCES: "/admin/project-sources",
  ADMIN_PROJECT_SOURCE: (id: number) => `/admin/project-sources/${id}`,
  ADMIN_PROJECT_TECH_STACKS: "/admin/project-tech-stacks",
  ADMIN_PROJECT_TECH_STACK: (id: number) => `/admin/project-tech-stacks/${id}`,
  ADMIN_PROJECT_IMAGE_UPLOAD: "/admin/uploads/project-image",
  ADMIN_CV_UPLOAD: "/admin/uploads/cv",
  ADMIN_PROJECT_DETAIL_SECTIONS: (projectId: number) =>
    `/admin/projects/${projectId}/detail-sections`,
  ADMIN_PROJECT_DETAIL_SECTION: (projectId: number, sectionId: number) =>
    `/admin/projects/${projectId}/detail-sections/${sectionId}`,
  ADMIN_CONTACT_MESSAGES: "/admin/contact-messages",
  ADMIN_CONTACT_MESSAGE_READ: (id: number) => `/admin/contact-messages/${id}/read`,
  ADMIN_CONTACT_MESSAGE: (id: number) => `/admin/contact-messages/${id}`,
} as const;
