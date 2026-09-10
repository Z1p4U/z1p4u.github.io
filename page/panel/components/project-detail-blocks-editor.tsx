"use client";

import { type SyntheticEvent, useState } from "react";
import { FileText, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/ui/loading-state";
import {
  useCreateProjectDetailSectionMutation,
  useDeleteProjectDetailSectionMutation,
  useGetProjectDetailSectionsQuery,
  useUpdateProjectDetailSectionMutation,
} from "@/redux/api/portfolioApi";

import {
  buildDetailPayload,
  formatDetailLabel,
  ProjectDetailBlockForm,
} from "./project-detail-block-form";
import { sectionToForm } from "../lib/helpers";
import { emptyDetailForm, type DetailFormState } from "../types";

type ProjectDetailBlocksEditorProps = {
  projectId: number;
  projectTitle: string;
};

function DetailThumbnail({
  imageUrl,
  title,
}: {
  imageUrl?: string | null;
  title: string;
}) {
  const src = imageUrl?.trim();

  return (
    <div className="relative aspect-[16/10] w-20 shrink-0 overflow-hidden rounded-md border border-border/50 bg-background/60">
      {src ? (
        <div
          role="img"
          aria-label={`${title} preview`}
          className="absolute inset-0 bg-cover bg-top"
          style={{ backgroundImage: `url("${src}")` }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <FileText className="h-4 w-4 text-muted-foreground" />
        </div>
      )}
    </div>
  );
}

export function ProjectDetailBlocksEditor({
  projectId,
  projectTitle,
}: ProjectDetailBlocksEditorProps) {
  const canUseProject = Number.isInteger(projectId) && projectId > 0;
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [detailForm, setDetailForm] =
    useState<DetailFormState>(emptyDetailForm);
  const { data, isFetching } = useGetProjectDetailSectionsQuery(projectId, {
    skip: !canUseProject,
  });
  const [createDetailSection, { isLoading: isCreatingDetail }] =
    useCreateProjectDetailSectionMutation();
  const [updateDetailSection, { isLoading: isUpdatingDetail }] =
    useUpdateProjectDetailSectionMutation();
  const [deleteDetailSection, { isLoading: isDeletingDetail }] =
    useDeleteProjectDetailSectionMutation();
  const detailSections = data?.data ?? [];

  const handleDetailSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canUseProject) return;

    const payload = buildDetailPayload(detailForm);

    try {
      if (detailForm.id) {
        await updateDetailSection({
          projectId,
          sectionId: detailForm.id,
          body: payload,
        }).unwrap();
      } else {
        await createDetailSection({
          projectId,
          body: payload,
        }).unwrap();
      }

      toast.success(
        detailForm.id
          ? "Contribution block updated."
          : "Contribution block added.",
      );
      setDetailForm(emptyDetailForm);
      setIsFormOpen(false);
    } catch {
      toast.error("Could not save contribution block.");
    }
  };

  const handleDetailDelete = async (sectionId?: number) => {
    if (!sectionId || !window.confirm("Delete this contribution block?")) {
      return;
    }

    try {
      await deleteDetailSection({
        projectId,
        sectionId,
      }).unwrap();
      toast.success("Contribution block deleted.");
      setDetailForm(emptyDetailForm);
      setIsFormOpen(false);
    } catch {
      toast.error("Could not delete contribution block.");
    }
  };

  return (
    <section
      id="detail-blocks"
      className="grid gap-5 rounded-lg border border-border/50 bg-secondary/25 p-5"
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.24em] text-primary">
            Project Detail
          </p>
          <h2 className="mt-1 text-xl font-semibold">Project Contributions</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            These blocks belong only to {projectTitle || "this project"} and
            render on its public detail page.
          </p>
        </div>
        <Button
          type="button"
          onClick={() => {
            setDetailForm(emptyDetailForm);
            setIsFormOpen(true);
          }}
        >
          <Plus className="h-4 w-4" />
          Add Contribution Block
        </Button>
      </div>

      <div className="rounded-lg border border-border/50 bg-background/35">
        <div className="border-b border-border/50 px-4 py-3">
          <h3 className="font-medium">Existing Blocks</h3>
        </div>
        <div className="divide-y divide-border/40">
          {detailSections.map((section) => (
            <div
              key={section.id ?? section.title}
              className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex min-w-0 items-center gap-3">
                <DetailThumbnail
                  imageUrl={section.image_url}
                  title={section.title}
                />
                <div className="min-w-0">
                  <p className="truncate font-medium">{section.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDetailLabel(section.block_type)} /{" "}
                    {formatDetailLabel(section.layout)}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setDetailForm(sectionToForm(section));
                    setIsFormOpen(true);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  disabled={isDeletingDetail}
                  onClick={() => handleDetailDelete(section.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
          {isFetching && detailSections.length === 0 ? (
            <div className="p-4">
              <LoadingState compact label="Loading contribution blocks..." />
            </div>
          ) : null}
          {!isFetching && detailSections.length === 0 ? (
            <p className="p-4 text-sm text-muted-foreground">
              No contribution blocks yet.
            </p>
          ) : null}
        </div>
      </div>

      {isFormOpen ? (
        <ProjectDetailBlockForm
          canSubmit={canUseProject}
          detailForm={detailForm}
          isSaving={isCreatingDetail || isUpdatingDetail}
          setDetailForm={setDetailForm}
          submitLabel={detailForm.id ? "Update Block" : "Create Block"}
          title={
            detailForm.id
              ? "Edit Contribution Block"
              : "Create Contribution Block"
          }
          onSubmit={handleDetailSubmit}
          onCancel={() => {
            setDetailForm(emptyDetailForm);
            setIsFormOpen(false);
          }}
        />
      ) : null}
    </section>
  );
}
