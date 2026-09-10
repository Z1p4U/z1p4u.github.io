"use client";

import { toast } from "sonner";

import type { ProjectTaxonomy, ProjectTechStackPayload } from "@/constants/types";
import { PanelPageFrame } from "@/page/panel/components/panel-page-frame";
import { TaxonomyListingPanel } from "@/page/panel/components/taxonomy-listing-panel";
import { taxonomyToPayload } from "@/page/panel/components/taxonomy-form";
import {
  useDeleteProjectTechStackMutation,
  useGetAdminProjectTechStacksQuery,
  useUpdateProjectTechStackMutation,
} from "@/redux/api/portfolioApi";

export default function TechStacksPage() {
  return (
    <PanelPageFrame activeTab="techStacks">
      <TechStacksContent />
    </PanelPageFrame>
  );
}

function TechStacksContent() {
  const { data, isFetching } = useGetAdminProjectTechStacksQuery();
  const [updateTechStack, { isLoading: isUpdating }] =
    useUpdateProjectTechStackMutation();
  const [deleteTechStack, { isLoading: isDeleting }] =
    useDeleteProjectTechStackMutation();
  const techStacks = data?.data ?? [];

  const handlePublishedChange = async (
    techStack: ProjectTaxonomy,
    checked: boolean,
  ) => {
    if (!techStack.id) return;

    try {
      await updateTechStack({
        id: techStack.id,
        body: {
          ...(taxonomyToPayload(techStack) as ProjectTechStackPayload),
          is_published: checked,
        },
      }).unwrap();
      toast.success(
        checked ? "Tech stack published." : "Tech stack moved to draft.",
      );
    } catch {
      toast.error("Could not update tech stack.");
    }
  };

  const handleDelete = async (techStackId?: number) => {
    if (!techStackId || !window.confirm("Delete this tech stack?")) return;

    try {
      await deleteTechStack(techStackId).unwrap();
      toast.success("Tech stack deleted.");
    } catch {
      toast.error("Move projects using this tech stack before deleting it.");
    }
  };

  return (
    <TaxonomyListingPanel
      createHref="/panel/filters/tech-stacks/new"
      editHref={(id) => `/panel/filters/tech-stacks/${id}/edit`}
      isDeleting={isDeleting}
      isFetching={isFetching}
      isUpdating={isUpdating}
      itemLabel="tech stack"
      records={techStacks}
      title="Tech Stacks"
      onDelete={handleDelete}
      onPublishedChange={handlePublishedChange}
    />
  );
}
