"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type SyntheticEvent, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import {
  draftDetailBlockToPayload,
  ProjectDraftDetailBlocksEditor,
  type DraftDetailBlock,
} from "@/page/panel/components/project-draft-detail-blocks-editor";
import { ProjectForm } from "@/page/panel/components/project-form";
import { PanelPageFrame } from "@/page/panel/components/panel-page-frame";
import {
  useCreateProjectDetailSectionMutation,
  useCreateProjectMutation,
} from "@/redux/api/portfolioApi";

import { projectToPayload } from "@/page/panel/lib/helpers";
import {
  emptyProjectForm,
  type ProjectFormState,
} from "@/page/panel/types";

export default function CreateProjectPage() {
  const router = useRouter();
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const [createDetailSection, { isLoading: isCreatingDetail }] =
    useCreateProjectDetailSectionMutation();
  const [projectForm, setProjectForm] =
    useState<ProjectFormState>(emptyProjectForm);
  const [detailBlocks, setDetailBlocks] = useState<DraftDetailBlock[]>([]);
  const isSaving = isLoading || isCreatingDetail;

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await createProject(projectToPayload(projectForm)).unwrap();
      const projectId = response.data.id;

      if (typeof projectId !== "number") {
        throw new Error("Project was created without an ID.");
      }

      for (const block of detailBlocks) {
        await createDetailSection({
          projectId,
          body: draftDetailBlockToPayload(block),
        }).unwrap();
      }

      toast.success(
        detailBlocks.length
          ? "Project and contribution blocks created."
          : "Project created.",
      );
      router.push(`/panel/projects/${projectId}/edit#detail-blocks`);
    } catch {
      toast.error("Could not create project. Check required fields and slug.");
    }
  };

  return (
    <PanelPageFrame activeTab="projects">
      <div className="mx-auto max-w-6xl space-y-5">
        <Link
          href="/panel?tab=projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>
        <ProjectForm
          cancelHref="/panel?tab=projects"
          isSaving={isSaving}
          projectForm={projectForm}
          setProjectForm={setProjectForm}
          submitLabel="Create Project"
          title="Create Project"
          onSubmit={handleSubmit}
        />
        <ProjectDraftDetailBlocksEditor
          blocks={detailBlocks}
          projectTitle={projectForm.title}
          setBlocks={setDetailBlocks}
        />
      </div>
    </PanelPageFrame>
  );
}
