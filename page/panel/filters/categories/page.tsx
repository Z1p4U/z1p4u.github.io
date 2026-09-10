"use client";

import { toast } from "sonner";

import type { ProjectCategoryPayload, ProjectTaxonomy } from "@/constants/types";
import { PanelPageFrame } from "@/page/panel/components/panel-page-frame";
import { TaxonomyListingPanel } from "@/page/panel/components/taxonomy-listing-panel";
import { taxonomyToPayload } from "@/page/panel/components/taxonomy-form";
import {
  useDeleteProjectCategoryMutation,
  useGetAdminProjectCategoriesQuery,
  useUpdateProjectCategoryMutation,
} from "@/redux/api/portfolioApi";

export default function CategoriesPage() {
  return (
    <PanelPageFrame activeTab="categories">
      <CategoriesContent />
    </PanelPageFrame>
  );
}

function CategoriesContent() {
  const { data, isFetching } = useGetAdminProjectCategoriesQuery();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateProjectCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteProjectCategoryMutation();
  const categories = data?.data ?? [];

  const handlePublishedChange = async (
    category: ProjectTaxonomy,
    checked: boolean,
  ) => {
    if (!category.id) return;

    try {
      await updateCategory({
        id: category.id,
        body: {
          ...(taxonomyToPayload(category) as ProjectCategoryPayload),
          is_published: checked,
        },
      }).unwrap();
      toast.success(
        checked ? "Category published." : "Category moved to draft.",
      );
    } catch {
      toast.error("Could not update category.");
    }
  };

  const handleDelete = async (categoryId?: number) => {
    if (!categoryId || !window.confirm("Delete this category?")) return;

    try {
      await deleteCategory(categoryId).unwrap();
      toast.success("Category deleted.");
    } catch {
      toast.error("Move projects using this category before deleting it.");
    }
  };

  return (
    <TaxonomyListingPanel
      createHref="/panel/filters/categories/new"
      editHref={(id) => `/panel/filters/categories/${id}/edit`}
      isDeleting={isDeleting}
      isFetching={isFetching}
      isUpdating={isUpdating}
      itemLabel="category"
      records={categories}
      title="Categories"
      onDelete={handleDelete}
      onPublishedChange={handlePublishedChange}
    />
  );
}
