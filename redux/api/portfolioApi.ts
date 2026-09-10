import { baseApi } from "@/redux/api/baseApi";
import { endpoints } from "@/constants/endpoints";
import type {
  ApiEnvelope,
  ContactMessage,
  LoginRequest,
  LoginResponse,
  PaginatedData,
  PortfolioProfile,
  PortfolioProject,
  ProjectCategory,
  ProjectCategoryPayload,
  ProjectDetailSection,
  ProjectDetailSectionPayload,
  ProjectPayload,
  ProjectSource,
  ProjectSourcePayload,
  ProjectTechStack,
  ProjectTechStackPayload,
  ProfilePayload,
} from "@/constants/types";

type PaginationQuery = {
  page?: number;
  perPage?: number;
};

type UploadedImage = {
  url: string;
};

function paginationParams({ page = 1, perPage = 12 }: PaginationQuery = {}) {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
  });

  return params.toString();
}

export const portfolioApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ApiEnvelope<LoginResponse>, LoginRequest>({
      query: (body) => ({
        url: endpoints.LOGIN,
        method: "POST",
        body,
      }),
    }),
    me: builder.query<ApiEnvelope<LoginResponse["user"]>, void>({
      query: () => endpoints.ME,
    }),
    getDashboardProfile: builder.query<ApiEnvelope<PortfolioProfile | null>, void>({
      query: () => endpoints.ADMIN_PROFILE,
      providesTags: ["Profile"],
    }),
    updateDashboardProfile: builder.mutation<
      ApiEnvelope<PortfolioProfile>,
      ProfilePayload
    >({
      query: (body) => ({
        url: endpoints.ADMIN_PROFILE,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
    getProjectCategories: builder.query<ApiEnvelope<ProjectCategory[]>, void>({
      query: () => endpoints.PROJECT_CATEGORIES,
      providesTags: ["ProjectCategory"],
    }),
    getProjectSources: builder.query<ApiEnvelope<ProjectSource[]>, void>({
      query: () => endpoints.PROJECT_SOURCES,
      providesTags: ["ProjectSource"],
    }),
    getProjectTechStacks: builder.query<ApiEnvelope<ProjectTechStack[]>, void>({
      query: () => endpoints.PROJECT_TECH_STACKS,
      providesTags: ["ProjectTechStack"],
    }),
    getAdminProjectCategories: builder.query<
      ApiEnvelope<ProjectCategory[]>,
      void
    >({
      query: () => endpoints.ADMIN_PROJECT_CATEGORIES,
      providesTags: ["ProjectCategory"],
    }),
    getAdminProjectCategory: builder.query<ApiEnvelope<ProjectCategory>, number>({
      query: (id) => endpoints.ADMIN_PROJECT_CATEGORY(id),
      providesTags: ["ProjectCategory"],
    }),
    createProjectCategory: builder.mutation<
      ApiEnvelope<ProjectCategory>,
      ProjectCategoryPayload
    >({
      query: (body) => ({
        url: endpoints.ADMIN_PROJECT_CATEGORIES,
        method: "POST",
        body,
      }),
      invalidatesTags: ["ProjectCategory"],
    }),
    updateProjectCategory: builder.mutation<
      ApiEnvelope<ProjectCategory>,
      { id: number; body: ProjectCategoryPayload }
    >({
      query: ({ id, body }) => ({
        url: endpoints.ADMIN_PROJECT_CATEGORY(id),
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Project", "ProjectCategory"],
    }),
    deleteProjectCategory: builder.mutation<ApiEnvelope<null>, number>({
      query: (id) => ({
        url: endpoints.ADMIN_PROJECT_CATEGORY(id),
        method: "DELETE",
      }),
      invalidatesTags: ["ProjectCategory"],
    }),
    getAdminProjectSources: builder.query<ApiEnvelope<ProjectSource[]>, void>({
      query: () => endpoints.ADMIN_PROJECT_SOURCES,
      providesTags: ["ProjectSource"],
    }),
    getAdminProjectSource: builder.query<ApiEnvelope<ProjectSource>, number>({
      query: (id) => endpoints.ADMIN_PROJECT_SOURCE(id),
      providesTags: ["ProjectSource"],
    }),
    createProjectSource: builder.mutation<
      ApiEnvelope<ProjectSource>,
      ProjectSourcePayload
    >({
      query: (body) => ({
        url: endpoints.ADMIN_PROJECT_SOURCES,
        method: "POST",
        body,
      }),
      invalidatesTags: ["ProjectSource"],
    }),
    updateProjectSource: builder.mutation<
      ApiEnvelope<ProjectSource>,
      { id: number; body: ProjectSourcePayload }
    >({
      query: ({ id, body }) => ({
        url: endpoints.ADMIN_PROJECT_SOURCE(id),
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Project", "ProjectSource"],
    }),
    deleteProjectSource: builder.mutation<ApiEnvelope<null>, number>({
      query: (id) => ({
        url: endpoints.ADMIN_PROJECT_SOURCE(id),
        method: "DELETE",
      }),
      invalidatesTags: ["ProjectSource"],
    }),
    getAdminProjectTechStacks: builder.query<
      ApiEnvelope<ProjectTechStack[]>,
      void
    >({
      query: () => endpoints.ADMIN_PROJECT_TECH_STACKS,
      providesTags: ["ProjectTechStack"],
    }),
    getAdminProjectTechStack: builder.query<ApiEnvelope<ProjectTechStack>, number>({
      query: (id) => endpoints.ADMIN_PROJECT_TECH_STACK(id),
      providesTags: ["ProjectTechStack"],
    }),
    createProjectTechStack: builder.mutation<
      ApiEnvelope<ProjectTechStack>,
      ProjectTechStackPayload
    >({
      query: (body) => ({
        url: endpoints.ADMIN_PROJECT_TECH_STACKS,
        method: "POST",
        body,
      }),
      invalidatesTags: ["ProjectTechStack"],
    }),
    updateProjectTechStack: builder.mutation<
      ApiEnvelope<ProjectTechStack>,
      { id: number; body: ProjectTechStackPayload }
    >({
      query: ({ id, body }) => ({
        url: endpoints.ADMIN_PROJECT_TECH_STACK(id),
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Project", "ProjectTechStack"],
    }),
    deleteProjectTechStack: builder.mutation<ApiEnvelope<null>, number>({
      query: (id) => ({
        url: endpoints.ADMIN_PROJECT_TECH_STACK(id),
        method: "DELETE",
      }),
      invalidatesTags: ["ProjectTechStack"],
    }),
    uploadProjectImage: builder.mutation<ApiEnvelope<UploadedImage>, File>({
      query: (file) => {
        const body = new FormData();
        body.append("file", file);

        return {
          url: endpoints.ADMIN_PROJECT_IMAGE_UPLOAD,
          method: "POST",
          body,
        };
      },
    }),
    uploadCv: builder.mutation<ApiEnvelope<UploadedImage>, File>({
      query: (file) => {
        const body = new FormData();
        body.append("file", file);

        return {
          url: endpoints.ADMIN_CV_UPLOAD,
          method: "POST",
          body,
        };
      },
    }),
    getAdminProjects: builder.query<
      ApiEnvelope<PaginatedData<PortfolioProject>>,
      PaginationQuery | void
    >({
      query: (params) =>
        `${endpoints.ADMIN_PROJECTS}?${paginationParams(params ?? undefined)}`,
      providesTags: ["Project"],
    }),
    getAdminProject: builder.query<ApiEnvelope<PortfolioProject>, number>({
      query: (id) => endpoints.ADMIN_PROJECT(id),
      providesTags: ["Project"],
    }),
    createProject: builder.mutation<ApiEnvelope<PortfolioProject>, ProjectPayload>(
      {
        query: (body) => ({
          url: endpoints.ADMIN_PROJECTS,
          method: "POST",
          body,
        }),
        invalidatesTags: ["Project"],
      },
    ),
    updateProject: builder.mutation<
      ApiEnvelope<PortfolioProject>,
      { id: number; body: ProjectPayload }
    >({
      query: ({ id, body }) => ({
        url: endpoints.ADMIN_PROJECT(id),
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Project", "ProjectDetailSection"],
    }),
    deleteProject: builder.mutation<ApiEnvelope<null>, number>({
      query: (id) => ({
        url: endpoints.ADMIN_PROJECT(id),
        method: "DELETE",
      }),
      invalidatesTags: ["Project", "ProjectDetailSection"],
    }),
    getProjectDetailSections: builder.query<
      ApiEnvelope<ProjectDetailSection[]>,
      number
    >({
      query: (projectId) => endpoints.ADMIN_PROJECT_DETAIL_SECTIONS(projectId),
      providesTags: ["ProjectDetailSection"],
    }),
    createProjectDetailSection: builder.mutation<
      ApiEnvelope<ProjectDetailSection>,
      { projectId: number; body: ProjectDetailSectionPayload }
    >({
      query: ({ projectId, body }) => ({
        url: endpoints.ADMIN_PROJECT_DETAIL_SECTIONS(projectId),
        method: "POST",
        body,
      }),
      invalidatesTags: ["ProjectDetailSection", "Project"],
    }),
    updateProjectDetailSection: builder.mutation<
      ApiEnvelope<ProjectDetailSection>,
      {
        projectId: number;
        sectionId: number;
        body: ProjectDetailSectionPayload;
      }
    >({
      query: ({ projectId, sectionId, body }) => ({
        url: endpoints.ADMIN_PROJECT_DETAIL_SECTION(projectId, sectionId),
        method: "PUT",
        body,
      }),
      invalidatesTags: ["ProjectDetailSection", "Project"],
    }),
    deleteProjectDetailSection: builder.mutation<
      ApiEnvelope<null>,
      { projectId: number; sectionId: number }
    >({
      query: ({ projectId, sectionId }) => ({
        url: endpoints.ADMIN_PROJECT_DETAIL_SECTION(projectId, sectionId),
        method: "DELETE",
      }),
      invalidatesTags: ["ProjectDetailSection", "Project"],
    }),
    getContactMessages: builder.query<
      ApiEnvelope<PaginatedData<ContactMessage>>,
      PaginationQuery | void
    >({
      query: (params) =>
        `${endpoints.ADMIN_CONTACT_MESSAGES}?${paginationParams(
          params ?? undefined,
        )}`,
      providesTags: ["ContactMessage"],
    }),
    markContactMessageRead: builder.mutation<ApiEnvelope<ContactMessage>, number>({
      query: (id) => ({
        url: endpoints.ADMIN_CONTACT_MESSAGE_READ(id),
        method: "POST",
      }),
      invalidatesTags: ["ContactMessage"],
    }),
    deleteContactMessage: builder.mutation<ApiEnvelope<null>, number>({
      query: (id) => ({
        url: endpoints.ADMIN_CONTACT_MESSAGE(id),
        method: "DELETE",
      }),
      invalidatesTags: ["ContactMessage"],
    }),
  }),
});

export const {
  useCreateProjectCategoryMutation,
  useCreateProjectDetailSectionMutation,
  useCreateProjectMutation,
  useCreateProjectSourceMutation,
  useCreateProjectTechStackMutation,
  useDeleteContactMessageMutation,
  useDeleteProjectCategoryMutation,
  useDeleteProjectDetailSectionMutation,
  useDeleteProjectMutation,
  useDeleteProjectSourceMutation,
  useDeleteProjectTechStackMutation,
  useGetAdminProjectCategoryQuery,
  useGetAdminProjectCategoriesQuery,
  useGetAdminProjectsQuery,
  useGetAdminProjectQuery,
  useGetAdminProjectSourceQuery,
  useGetAdminProjectSourcesQuery,
  useGetAdminProjectTechStackQuery,
  useGetAdminProjectTechStacksQuery,
  useGetContactMessagesQuery,
  useGetDashboardProfileQuery,
  useGetProjectCategoriesQuery,
  useGetProjectDetailSectionsQuery,
  useGetProjectSourcesQuery,
  useGetProjectTechStacksQuery,
  useLoginMutation,
  useMarkContactMessageReadMutation,
  useMeQuery,
  useUpdateProjectCategoryMutation,
  useUpdateDashboardProfileMutation,
  useUpdateProjectDetailSectionMutation,
  useUpdateProjectMutation,
  useUpdateProjectSourceMutation,
  useUpdateProjectTechStackMutation,
  useUploadCvMutation,
  useUploadProjectImageMutation,
} = portfolioApi;
