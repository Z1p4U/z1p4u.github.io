"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { type SyntheticEvent, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { LoadingState } from "@/components/ui/loading-state";
import type { PortfolioProject, ProfilePayload } from "@/constants/types";
import {
  useDeleteContactMessageMutation,
  useDeleteProjectMutation,
  useGetAdminProjectsQuery,
  useGetContactMessagesQuery,
  useGetDashboardProfileQuery,
  useMarkContactMessageReadMutation,
  useUpdateDashboardProfileMutation,
  useUpdateProjectMutation,
} from "@/redux/api/portfolioApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearCredentials } from "@/redux/slices/authSlice";

import { DashboardShell } from "../components/dashboard-shell";
import { projectToForm, projectToPayload } from "../lib/helpers";
import { OverviewPanel } from "../components/overview-panel";
import { ProfilePanel } from "../components/profile-panel";
import { ProjectsPanel } from "../components/projects-panel";
import { RequestsPanel } from "../components/requests-panel";
import {
  emptyProfileForm,
  getPanelHref,
  type DashboardTab,
  isDashboardTab,
} from "../types";

const emptyProjects: PortfolioProject[] = [];
const PANEL_PAGE_SIZE = 12;

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const isAuthHydrated = useAppSelector((state) => state.auth.isHydrated);
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  const requestedTab = searchParams.get("tab");
  const activeTab: DashboardTab = isDashboardTab(requestedTab)
    ? requestedTab
    : "overview";
  const [profileDraft, setProfileForm] = useState<ProfilePayload | null>(null);
  const [projectsPage, setProjectsPage] = useState(1);
  const [messagesPage, setMessagesPage] = useState(1);

  const { data: profileData, isFetching: isProfileFetching } =
    useGetDashboardProfileQuery(undefined, { skip: !token });
  const { data: projectsData, isFetching: isProjectsFetching } =
    useGetAdminProjectsQuery(
      { page: projectsPage, perPage: PANEL_PAGE_SIZE },
      { skip: !token },
    );
  const { data: messagesData, isFetching: isMessagesFetching } =
    useGetContactMessagesQuery(
      { page: messagesPage, perPage: PANEL_PAGE_SIZE },
      { skip: !token },
    );
  const { data: statsProjectsData } = useGetAdminProjectsQuery(
    { page: 1, perPage: 100 },
    { skip: !token || activeTab !== "overview" },
  );
  const { data: statsMessagesData } = useGetContactMessagesQuery(
    { page: 1, perPage: 100 },
    { skip: !token || activeTab !== "overview" },
  );

  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateDashboardProfileMutation();
  const [updateProject, { isLoading: isUpdatingProject }] =
    useUpdateProjectMutation();
  const [deleteProject, { isLoading: isDeletingProject }] =
    useDeleteProjectMutation();
  const [markRead] = useMarkContactMessageReadMutation();
  const [deleteMessage, { isLoading: isDeletingMessage }] =
    useDeleteContactMessageMutation();

  const projects = useMemo(
    () => projectsData?.data.data ?? emptyProjects,
    [projectsData],
  );
  const projectsMeta = projectsData?.data.meta;
  const messages = useMemo(() => messagesData?.data.data ?? [], [messagesData]);
  const messagesMeta = messagesData?.data.meta;
  const statsProjectsTotal = statsProjectsData?.data.meta?.total;
  const statsProjects = useMemo(
    () => statsProjectsData?.data.data ?? projects,
    [projects, statsProjectsData],
  );
  const statsMessages = useMemo(
    () => statsMessagesData?.data.data ?? messages,
    [messages, statsMessagesData],
  );
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

  const overviewStats = useMemo(() => {
    return [
      {
        label: "Published Projects",
        value: statsProjects.filter((project) => project.is_published).length,
      },
      {
        label: "Featured Projects",
        value: statsProjects.filter((project) => project.is_featured).length,
      },
      {
        label: "Total Projects",
        value: statsProjectsTotal ?? statsProjects.length,
      },
      {
        label: "Unread Requests",
        value: statsMessages.filter((message) => message.status === "unread")
          .length,
      },
    ];
  }, [statsMessages, statsProjects, statsProjectsTotal]);

  useEffect(() => {
    if (isAuthHydrated && !token) router.replace("/panel/login");
  }, [isAuthHydrated, router, token]);

  useEffect(() => {
    if (
      activeTab === "categories" ||
      activeTab === "sources" ||
      activeTab === "techStacks"
    ) {
      router.replace(getPanelHref(activeTab));
    }
  }, [activeTab, router]);

  const handleTabChange = (tab: DashboardTab) => {
    router.replace(getPanelHref(tab), {
      scroll: false,
    });
  };

  const handleProjectsPageChange = (page: number) => {
    setProjectsPage(Math.max(1, Math.min(page, projectsMeta?.last_page ?? page)));
  };

  const handleMessagesPageChange = (page: number) => {
    setMessagesPage(Math.max(1, Math.min(page, messagesMeta?.last_page ?? page)));
  };

  const handleLogout = () => {
    dispatch(clearCredentials());
    router.push("/panel/login");
  };

  const handleProfileSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await updateProfile(profileForm).unwrap();
      toast.success("Profile updated.");
    } catch {
      toast.error("Could not update profile.");
    }
  };

  const handleProjectDelete = async (projectId?: number) => {
    if (!projectId || !window.confirm("Delete this project?")) return;

    try {
      await deleteProject(projectId).unwrap();
      toast.success("Project deleted.");
    } catch {
      toast.error("Could not delete project.");
    }
  };

  const handleEditProject = (project: PortfolioProject) => {
    if (project.id) router.push(`/panel/projects/${project.id}/edit`);
  };

  const handleFeatureToggle = async (
    project: PortfolioProject,
    checked: boolean,
  ) => {
    if (!project.id) return;

    try {
      await updateProject({
        id: project.id,
        body: projectToPayload({
          ...projectToForm(project),
          is_featured: checked,
        }),
      }).unwrap();
      toast.success(
        checked ? "Project featured on home." : "Project removed from home.",
      );
    } catch {
      toast.error("Could not update project featured status.");
    }
  };

  const handleMessageDelete = async (messageId: number) => {
    try {
      await deleteMessage(messageId).unwrap();
      toast.success("Contact request deleted.");
    } catch {
      toast.error("Could not delete contact request.");
    }
  };

  const handleMarkMessageRead = async (messageId: number) => {
    try {
      await markRead(messageId).unwrap();
      toast.success("Contact request marked as read.");
    } catch {
      toast.error("Could not update contact request.");
    }
  };

  if (!isAuthHydrated) {
    return (
      <main className="min-h-screen bg-background p-6 text-foreground">
        <LoadingState label="Loading panel..." />
      </main>
    );
  }

  if (!token) return null;

  return (
    <DashboardShell
      activeTab={activeTab}
      user={user}
      onLogout={handleLogout}
      onTabChange={handleTabChange}
    >
      {activeTab === "overview" ? (
        <OverviewPanel
          projects={statsProjects}
          stats={overviewStats}
          onEditProject={handleEditProject}
        />
      ) : null}

      {activeTab === "requests" ? (
        <RequestsPanel
          isDeleting={isDeletingMessage}
          isFetching={isMessagesFetching}
          messages={messages}
          paginationMeta={messagesMeta}
          onDelete={handleMessageDelete}
          onPageChange={handleMessagesPageChange}
          onMarkRead={handleMarkMessageRead}
        />
      ) : null}

      {activeTab === "projects" ? (
        <ProjectsPanel
          isDeletingProject={isDeletingProject}
          isProjectsFetching={isProjectsFetching}
          isUpdatingProject={isUpdatingProject}
          paginationMeta={projectsMeta}
          projects={projects}
          onFeatureToggle={handleFeatureToggle}
          onPageChange={handleProjectsPageChange}
          onProjectDelete={handleProjectDelete}
        />
      ) : null}

      {activeTab === "profile" ? (
        isProfileFetching && !profileData?.data ? (
          <LoadingState label="Loading profile..." />
        ) : (
          <ProfilePanel
            isUpdating={isUpdatingProfile}
            profileForm={profileForm}
            setProfileForm={setProfileForm}
            onSubmit={handleProfileSubmit}
          />
        )
      ) : null}
    </DashboardShell>
  );
}
