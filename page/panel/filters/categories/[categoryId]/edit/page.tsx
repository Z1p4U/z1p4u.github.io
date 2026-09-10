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
import type { ProjectCategoryPayload } from "@/constants/types";
import { PanelPageFrame } from "@/page/panel/components/panel-page-frame";
import {
  emptyTaxonomyForm,
  TaxonomyForm,
  taxonomyFormToPayload,
  taxonomyToForm,
  type TaxonomyFormState,
} from "@/page/panel/components/taxonomy-form";
import {
  useGetAdminProjectCategoryQuery,
  useUpdateProjectCategoryMutation,
} from "@/redux/api/portfolioApi";

const categoryListHref = "/panel/filters/categories";

export default function EditCategoryPage() {
  return (
    <PanelPageFrame activeTab="categories">
      <EditCategoryContent />
    </PanelPageFrame>
  );
}

function EditCategoryContent() {
  const router = useRouter();
  const params = useParams<{ categoryId: string }>();
  const categoryId = Number(params.categoryId);
  const canLoadCategory = Number.isInteger(categoryId) && categoryId > 0;
  const { data, isFetching } = useGetAdminProjectCategoryQuery(categoryId, {
    skip: !canLoadCategory,
  });
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateProjectCategoryMutation();
  const [draft, setDraft] = useState<TaxonomyFormState | null>(null);
  const defaults = useMemo(
    () => (data?.data ? taxonomyToForm(data.data) : emptyTaxonomyForm),
    [data],
  );
  const form = draft ?? defaults;
  const setForm: Dispatch<SetStateAction<TaxonomyFormState>> = (action) => {
    setDraft((current) => {
      const base = current ?? defaults;
      return typeof action === "function" ? action(base) : action;
    });
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canLoadCategory) return;

    try {
      await updateCategory({
        id: categoryId,
        body: taxonomyFormToPayload(form) as ProjectCategoryPayload,
      }).unwrap();
      toast.success("Category updated.");
      router.push(categoryListHref);
    } catch {
      toast.error("Could not update category. Check name and slug.");
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div>
        <Link
          href={categoryListHref}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Categories
        </Link>
      </div>
      {isFetching && !data?.data ? (
        <LoadingState label="Loading category..." />
      ) : (
        <TaxonomyForm
          cancelHref={categoryListHref}
          form={form}
          isSaving={isUpdating}
          itemLabel="Category"
          setForm={setForm}
          submitLabel="Update Category"
          title="Edit Category"
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
