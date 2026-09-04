"use client";

import { useRouter } from "next/navigation";
import { type SyntheticEvent, useEffect, useMemo, useState } from "react";

import type { PortfolioProject } from "@/constants/types";
import {
  useCreateProjectDetailSectionMutation,
  useCreateProjectMutation,
  useDeleteContactMessageMutation,
  useDeleteProjectDetailSectionMutation,
  useDeleteProjectMutation,
  useGetAdminProjectsQuery,
  useGetContactMessagesQuery,
  useGetDashboardProfileQuery,
  useGetProjectDetailSectionsQuery,
  useMarkContactMessageReadMutation,
  useUpdateDashboardProfileMutation,
  useUpdateProjectDetailSectionMutation,
  useUpdateProjectMutation,
} from "@/redux/api/portfolioApi";
import type { ProjectDetailSectionPayload, ProfilePayload } from "@/constants/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearCredentials } from "@/redux/slices/authSlice";

import { DashboardShell } from "../components/dashboard-shell";
import { nullable, projectToForm, projectToPayload } from "../lib/helpers";
import { OverviewPanel } from "../components/overview-panel";
import { ProfilePanel } from "../components/profile-panel";
import { ProjectsPanel } from "../components/projects-panel";
import { RequestsPanel } from "../components/requests-panel";
import {
  emptyDetailForm,
  emptyProfileForm,
  emptyProjectForm,
  type DashboardTab,
  type DetailFormState,
  type ProjectFormState,
} from "../types";

const emptyProjects: PortfolioProject[] = [];

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");
  const [notice, setNotice] = useState<string | null>(null);
  const [profileDraft, setProfileForm] = useState<ProfilePayload | null>(null);
  const [projectForm, setProjectForm] =
    useState<ProjectFormState>(emptyProjectForm);
  const [detailForm, setDetailForm] =
    useState<DetailFormState>(emptyDetailForm);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null,
  );

  const { data: profileData, isFetching: isProfileFetching } =
    useGetDashboardProfileQuery(undefined, { skip: !token });
  const { data: projectsData, isFetching: isProjectsFetching } =
    useGetAdminProjectsQuery(undefined, { skip: !token });
  const { data: messagesData, isFetching: isMessagesFetching } =
    useGetContactMessagesQuery(undefined, { skip: !token });
  const { data: detailSectionsData, isFetching: isDetailsFetching } =
    useGetProjectDetailSectionsQuery(selectedProjectId ?? 0, {
      skip: !token || !selectedProjectId,
    });

  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateDashboardProfileMutation();
  const [createProject, { isLoading: isCreatingProject }] =
    useCreateProjectMutation();
  const [updateProject, { isLoading: isUpdatingProject }] =
    useUpdateProjectMutation();
  const [deleteProject, { isLoading: isDeletingProject }] =
    useDeleteProjectMutation();
  const [createDetailSection, { isLoading: isCreatingDetail }] =
    useCreateProjectDetailSectionMutation();
  const [updateDetailSection, { isLoading: isUpdatingDetail }] =
    useUpdateProjectDetailSectionMutation();
  const [deleteDetailSection, { isLoading: isDeletingDetail }] =
    useDeleteProjectDetailSectionMutation();
  const [markRead] = useMarkContactMessageReadMutation();
  const [deleteMessage, { isLoading: isDeletingMessage }] =
    useDeleteContactMessageMutation();

  const projects = useMemo(
    () => projectsData?.data.data ?? emptyProjects,
    [projectsData],
  );
  const messages = useMemo(() => messagesData?.data.data ?? [], [messagesData]);
  const detailSections = detailSectionsData?.data ?? [];
  const profileDefaults = useMemo(() => {
    const profile = profileData?.data;
    if (!profile) return emptyProfileForm;

    return {
      name: profile.name,
      headline: profile.headline,
      summary: profile.summary,
      bio: profile.bio ?? "",
      email: profile.email,
      phone: profile.phone ?? "",
      location: profile.location ?? "",
      availability: profile.availability ?? "",
      github_url: profile.github_url ?? "",
      linkedin_url: profile.linkedin_url ?? "",
      cv_url: profile.cv_url ?? "",
      years_experience: profile.stats.years_experience,
      clients_count: profile.stats.clients_count,
      projects_count: profile.stats.projects_count,
    };
  }, [profileData]);
  const profileForm = profileDraft ?? profileDefaults;
  const selectedProject =
    projects.find((project) => project.id === selectedProjectId) ?? projects[0];

  const overviewStats = useMemo(() => {
    return [
      {
        label: "Published Projects",
        value: projects.filter((project) => project.is_published).length,
      },
      {
        label: "Featured Projects",
        value: projects.filter((project) => project.is_featured).length,
      },
      {
        label: "Detail Blocks",
        value: detailSections.length,
      },
      {
        label: "Unread Requests",
        value: messages.filter((message) => message.status === "unread").length,
      },
    ];
  }, [detailSections.length, messages, projects]);

  useEffect(() => {
    if (!token) router.replace("/dashboard/login");
  }, [router, token]);

  const handleLogout = () => {
    dispatch(clearCredentials());
    router.push("/dashboard/login");
  };

  const handleProfileSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateProfile(profileForm).unwrap();
    setNotice("Profile updated.");
  };

  const handleProjectSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = projectToPayload(projectForm);

    if (projectForm.id) {
      await updateProject({ id: projectForm.id, body: payload }).unwrap();
      setNotice("Project updated.");
    } else {
      const response = await createProject(payload).unwrap();
      setSelectedProjectId(response.data.id ?? null);
      setNotice("Project created.");
    }

    setProjectForm(emptyProjectForm);
  };

  const handleProjectDelete = async (projectId?: number) => {
    if (!projectId || !window.confirm("Delete this project?")) return;
    await deleteProject(projectId).unwrap();
    setProjectForm(emptyProjectForm);
    setNotice("Project deleted.");
  };

  const buildDetailPayload = (): ProjectDetailSectionPayload => ({
    block_type: detailForm.block_type,
    layout: detailForm.layout,
    title: detailForm.title,
    body: detailForm.body,
    image_url: nullable(detailForm.image_url),
    image_alt: nullable(detailForm.image_alt),
    caption: nullable(detailForm.caption),
    external_url: nullable(detailForm.external_url),
    sort_order: Number(detailForm.sort_order || 0),
    is_published: detailForm.is_published,
  });

  const handleDetailSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedProjectId) return;

    const payload = buildDetailPayload();

    if (detailForm.id) {
      await updateDetailSection({
        projectId: selectedProjectId,
        sectionId: detailForm.id,
        body: payload,
      }).unwrap();
      setNotice("Detail block updated.");
    } else {
      await createDetailSection({
        projectId: selectedProjectId,
        body: payload,
      }).unwrap();
      setNotice("Detail block created.");
    }

    setDetailForm(emptyDetailForm);
  };

  const handleDetailDelete = async (sectionId?: number) => {
    if (
      !selectedProjectId ||
      !sectionId ||
      !window.confirm("Delete this section?")
    ) {
      return;
    }

    await deleteDetailSection({
      projectId: selectedProjectId,
      sectionId,
    }).unwrap();
    setDetailForm(emptyDetailForm);
    setNotice("Detail block deleted.");
  };

  const handleEditProject = (project: PortfolioProject) => {
    setProjectForm(projectToForm(project));
    setSelectedProjectId(project.id ?? null);
    setActiveTab("projects");
  };

  const handleSelectProject = (projectId: number | null) => {
    setSelectedProjectId(projectId);
    setDetailForm(emptyDetailForm);
  };

  if (!token) return null;

  return (
    <DashboardShell
      activeTab={activeTab}
      notice={notice}
      user={user}
      onLogout={handleLogout}
      onTabChange={setActiveTab}
    >
      {activeTab === "overview" ? (
        <OverviewPanel
          projects={projects}
          stats={overviewStats}
          onEditProject={handleEditProject}
        />
      ) : null}

      {activeTab === "requests" ? (
        <RequestsPanel
          isDeleting={isDeletingMessage}
          isFetching={isMessagesFetching}
          messages={messages}
          onDelete={(messageId) => deleteMessage(messageId)}
          onMarkRead={(messageId) => markRead(messageId)}
        />
      ) : null}

      {activeTab === "projects" ? (
        <ProjectsPanel
          detailForm={detailForm}
          detailSections={detailSections}
          isCreatingDetail={isCreatingDetail}
          isCreatingProject={isCreatingProject}
          isDeletingDetail={isDeletingDetail}
          isDeletingProject={isDeletingProject}
          isDetailsFetching={isDetailsFetching}
          isProjectsFetching={isProjectsFetching}
          isUpdatingDetail={isUpdatingDetail}
          isUpdatingProject={isUpdatingProject}
          projectForm={projectForm}
          projects={projects}
          selectedProject={selectedProject}
          selectedProjectId={selectedProjectId}
          setDetailForm={setDetailForm}
          setProjectForm={setProjectForm}
          onDetailDelete={handleDetailDelete}
          onDetailSubmit={handleDetailSubmit}
          onProjectDelete={handleProjectDelete}
          onProjectSubmit={handleProjectSubmit}
          onSelectProject={handleSelectProject}
        />
      ) : null}

      {activeTab === "profile" ? (
        <ProfilePanel
          isFetching={isProfileFetching}
          isUpdating={isUpdatingProfile}
          profileForm={profileForm}
          setProfileForm={setProfileForm}
          onSubmit={handleProfileSubmit}
        />
      ) : null}
    </DashboardShell>
  );
}
