"use client";

import { type Dispatch, type SetStateAction, type SyntheticEvent, useState } from "react";
import { FileText, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import type { ProjectDetailSectionPayload } from "@/constants/types";

import {
  buildDetailPayload,
  formatDetailLabel,
  ProjectDetailBlockForm,
} from "./project-detail-block-form";
import { emptyDetailForm, type DetailFormState } from "../types";

export type DraftDetailBlock = DetailFormState & {
  draft_id: string;
};

type ProjectDraftDetailBlocksEditorProps = {
  blocks: DraftDetailBlock[];
  projectTitle: string;
  setBlocks: Dispatch<SetStateAction<DraftDetailBlock[]>>;
};

export function draftDetailBlockToPayload(
  block: DraftDetailBlock,
): ProjectDetailSectionPayload {
  return buildDetailPayload(block);
}

function newDraftId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `draft-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

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

export function ProjectDraftDetailBlocksEditor({
  blocks,
  projectTitle,
  setBlocks,
}: ProjectDraftDetailBlocksEditorProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDraftId, setEditingDraftId] = useState<string | null>(null);
  const [detailForm, setDetailForm] =
    useState<DetailFormState>(emptyDetailForm);

  const closeForm = () => {
    setDetailForm(emptyDetailForm);
    setEditingDraftId(null);
    setIsFormOpen(false);
  };

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (editingDraftId) {
      setBlocks((current) =>
        current.map((block) =>
          block.draft_id === editingDraftId
            ? { ...detailForm, draft_id: editingDraftId }
            : block,
        ),
      );
      toast.success("Draft contribution block updated.");
    } else {
      setBlocks((current) => [
        ...current,
        { ...detailForm, draft_id: newDraftId() },
      ]);
      toast.success("Draft contribution block added.");
    }

    closeForm();
  };

  const handleEdit = (block: DraftDetailBlock) => {
    const { draft_id: draftId, ...form } = block;

    setDetailForm(form);
    setEditingDraftId(draftId);
    setIsFormOpen(true);
  };

  const handleDelete = (draftId: string) => {
    setBlocks((current) => current.filter((block) => block.draft_id !== draftId));
    toast.success("Draft contribution block removed.");
  };

  return (
    <section className="grid gap-5 rounded-lg border border-border/50 bg-secondary/25 p-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.24em] text-primary">
            Project Detail
          </p>
          <h2 className="mt-1 text-xl font-semibold">Project Contributions</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            These blocks will be created after{" "}
            {projectTitle.trim() || "the project"} is saved.
          </p>
        </div>
        <Button
          type="button"
          onClick={() => {
            setDetailForm(emptyDetailForm);
            setEditingDraftId(null);
            setIsFormOpen(true);
          }}
        >
          <Plus className="h-4 w-4" />
          Add Contribution Block
        </Button>
      </div>

      {blocks.length > 0 ? (
        <div className="rounded-lg border border-border/50 bg-background/35">
          <div className="border-b border-border/50 px-4 py-3">
            <h3 className="font-medium">Draft Blocks</h3>
          </div>
          <div className="divide-y divide-border/40">
            {blocks.map((block) => (
              <div
                key={block.draft_id}
                className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <DetailThumbnail imageUrl={block.image_url} title={block.title} />
                  <div className="min-w-0">
                    <p className="truncate font-medium">
                      {block.title || "Untitled contribution block"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDetailLabel(block.block_type)} /{" "}
                      {formatDetailLabel(block.layout)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(block)}
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(block.draft_id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {blocks.length === 0 && !isFormOpen ? (
        <p className="rounded-lg border border-border/50 bg-background/35 p-4 text-sm text-muted-foreground">
          No draft contribution blocks yet.
        </p>
      ) : null}

      {isFormOpen ? (
        <ProjectDetailBlockForm
          detailForm={detailForm}
          isSaving={false}
          setDetailForm={setDetailForm}
          submitLabel={
            editingDraftId ? "Update Draft Block" : "Add Draft Block"
          }
          title={
            editingDraftId
              ? "Edit Contribution Block"
              : "Create Contribution Block"
          }
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      ) : null}
    </section>
  );
}
