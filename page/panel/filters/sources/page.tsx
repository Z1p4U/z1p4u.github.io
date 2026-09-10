"use client";

import { toast } from "sonner";

import type { ProjectSourcePayload, ProjectTaxonomy } from "@/constants/types";
import { PanelPageFrame } from "@/page/panel/components/panel-page-frame";
import { TaxonomyListingPanel } from "@/page/panel/components/taxonomy-listing-panel";
import { taxonomyToPayload } from "@/page/panel/components/taxonomy-form";
import {
  useDeleteProjectSourceMutation,
  useGetAdminProjectSourcesQuery,
  useUpdateProjectSourceMutation,
} from "@/redux/api/portfolioApi";

export default function SourcesPage() {
  return (
    <PanelPageFrame activeTab="sources">
      <SourcesContent />
    </PanelPageFrame>
  );
}

function SourcesContent() {
  const { data, isFetching } = useGetAdminProjectSourcesQuery();
  const [updateSource, { isLoading: isUpdating }] =
    useUpdateProjectSourceMutation();
  const [deleteSource, { isLoading: isDeleting }] =
    useDeleteProjectSourceMutation();
  const sources = data?.data ?? [];

  const handlePublishedChange = async (
    source: ProjectTaxonomy,
    checked: boolean,
  ) => {
    if (!source.id) return;

    try {
      await updateSource({
        id: source.id,
        body: {
          ...(taxonomyToPayload(source) as ProjectSourcePayload),
          is_published: checked,
        },
      }).unwrap();
      toast.success(checked ? "Source published." : "Source moved to draft.");
    } catch {
      toast.error("Could not update source.");
    }
  };

  const handleDelete = async (sourceId?: number) => {
    if (!sourceId || !window.confirm("Delete this source?")) return;

    try {
      await deleteSource(sourceId).unwrap();
      toast.success("Source deleted.");
    } catch {
      toast.error("Move projects using this source before deleting it.");
    }
  };

  return (
    <TaxonomyListingPanel
      createHref="/panel/filters/sources/new"
      editHref={(id) => `/panel/filters/sources/${id}/edit`}
      isDeleting={isDeleting}
      isFetching={isFetching}
      isUpdating={isUpdating}
      itemLabel="source"
      records={sources}
      title="Sources"
      onDelete={handleDelete}
      onPublishedChange={handlePublishedChange}
    />
  );
}
