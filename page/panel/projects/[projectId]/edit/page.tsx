"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  type Dispatch,
  type SetStateAction,
  type SyntheticEvent,
  useMemo,
  useState,
} from "react";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { LoadingState } from "@/components/ui/loading-state";
import { PanelPageFrame } from "@/page/panel/components/panel-page-frame";
import { ProjectDetailBlocksEditor } from "@/page/panel/components/project-detail-blocks-editor";
import { ProjectForm } from "@/page/panel/components/project-form";
import {
  useGetAdminProjectQuery,
  useUpdateProjectMutation,
} from "@/redux/api/portfolioApi";

import { projectToForm, projectToPayload } from "@/page/panel/lib/helpers";
import {
  emptyProjectForm,
  type ProjectFormState,
} from "@/page/panel/types";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams<{ projectId: string }>();
  const projectId = Number(params.projectId);
  const canLoadProject = Number.isInteger(projectId) && projectId > 0;
  const { data, isFetching } = useGetAdminProjectQuery(projectId, {
    skip: !canLoadProject,
  });
  const [updateProject, { isLoading: isUpdating }] =
    useUpdateProjectMutation();
  const [projectDraft, setProjectDraft] =
    useState<ProjectFormState | null>(null);
  const projectDefaults = useMemo(
    () => (data?.data ? projectToForm(data.data) : emptyProjectForm),
    [data],
  );
  const projectForm = projectDraft ?? projectDefaults;
  const setProjectForm: Dispatch<SetStateAction<ProjectFormState>> = (
    action,
  ) => {
    setProjectDraft((current) => {
      const base = current ?? projectDefaults;
      return typeof action === "function" ? action(base) : action;
    });
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canLoadProject) return;

    try {
      await updateProject({
        id: projectId,
        body: projectToPayload(projectForm),
      }).unwrap();
      toast.success("Project updated.");
      router.push("/panel?tab=projects");
    } catch {
      toast.error("Could not update project. Check required fields and slug.");
    }
  };

  return (
    <PanelPageFrame activeTab="projects">
      <div className="mx-auto max-w-6xl space-y-5">
        <div>
          <Link
            href="/panel?tab=projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
        </div>
        {isFetching && !data?.data ? (
          <LoadingState label="Loading project..." />
        ) : (
          <>
            <ProjectForm
              cancelHref="/panel?tab=projects"
              isSaving={isUpdating}
              projectForm={projectForm}
              setProjectForm={setProjectForm}
              submitLabel="Update Project"
              title="Edit Project"
              onSubmit={handleSubmit}
            />
            {canLoadProject ? (
              <ProjectDetailBlocksEditor
                projectId={projectId}
                projectTitle={projectForm.title}
              />
            ) : null}
          </>
        )}
      </div>
    </PanelPageFrame>
  );
}
