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
  ProjectDetailSection,
  ProjectDetailSectionPayload,
  ProjectPayload,
  ProfilePayload,
} from "@/constants/types";

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
    getDashboardProfile: builder.query<ApiEnvelope<PortfolioProfile>, void>({
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
    getAdminProjects: builder.query<
      ApiEnvelope<PaginatedData<PortfolioProject>>,
      void
    >({
      query: () => `${endpoints.ADMIN_PROJECTS}?per_page=100`,
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
      void
    >({
      query: () => `${endpoints.ADMIN_CONTACT_MESSAGES}?per_page=100`,
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
  useCreateProjectDetailSectionMutation,
  useCreateProjectMutation,
  useDeleteContactMessageMutation,
  useDeleteProjectDetailSectionMutation,
  useDeleteProjectMutation,
  useGetAdminProjectsQuery,
  useGetContactMessagesQuery,
  useGetDashboardProfileQuery,
  useGetProjectDetailSectionsQuery,
  useLoginMutation,
  useMarkContactMessageReadMutation,
  useMeQuery,
  useUpdateDashboardProfileMutation,
  useUpdateProjectDetailSectionMutation,
  useUpdateProjectMutation,
} = portfolioApi;
