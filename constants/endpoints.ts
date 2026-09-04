export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api/v1";

export const endpoints = {
  PORTFOLIO: "/portfolio",
  PROJECTS: "/projects",
  PROJECT_DETAIL: (slug: string) => `/projects/${slug}`,
  SERVICES: "/services",
  SKILLS: "/skills",
  EXPERIENCES: "/experiences",
  CONTACT_MESSAGES: "/contact-messages",

  LOGIN: "/auth/login",
  ME: "/auth/me",

  ADMIN_PROFILE: "/admin/profile",
  ADMIN_PROJECTS: "/admin/projects",
  ADMIN_PROJECT: (id: number) => `/admin/projects/${id}`,
  ADMIN_PROJECT_DETAIL_SECTIONS: (projectId: number) =>
    `/admin/projects/${projectId}/detail-sections`,
  ADMIN_PROJECT_DETAIL_SECTION: (projectId: number, sectionId: number) =>
    `/admin/projects/${projectId}/detail-sections/${sectionId}`,
  ADMIN_CONTACT_MESSAGES: "/admin/contact-messages",
  ADMIN_CONTACT_MESSAGE_READ: (id: number) => `/admin/contact-messages/${id}/read`,
  ADMIN_CONTACT_MESSAGE: (id: number) => `/admin/contact-messages/${id}`,
} as const;
