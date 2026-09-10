"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type SyntheticEvent } from "react";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import type { ProjectCategoryPayload } from "@/constants/types";
import { PanelPageFrame } from "@/page/panel/components/panel-page-frame";
import {
  emptyTaxonomyForm,
  TaxonomyForm,
  taxonomyFormToPayload,
  type TaxonomyFormState,
} from "@/page/panel/components/taxonomy-form";
import { useCreateProjectCategoryMutation } from "@/redux/api/portfolioApi";

const categoryListHref = "/panel/filters/categories";

export default function CreateCategoryPage() {
  const router = useRouter();
  const [createCategory, { isLoading }] = useCreateProjectCategoryMutation();
  const [form, setForm] = useState<TaxonomyFormState>(emptyTaxonomyForm);

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await createCategory(
        taxonomyFormToPayload(form) as ProjectCategoryPayload,
      ).unwrap();
      toast.success("Category created.");
      router.push(categoryListHref);
    } catch {
      toast.error("Could not create category. Check name and slug.");
    }
  };

  return (
    <PanelPageFrame activeTab="categories">
      <div className="mx-auto max-w-3xl space-y-5">
        <Link
          href={categoryListHref}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Categories
        </Link>
        <TaxonomyForm
          cancelHref={categoryListHref}
          form={form}
          isSaving={isLoading}
          itemLabel="Category"
          setForm={setForm}
          submitLabel="Create Category"
          title="Create Category"
          onSubmit={handleSubmit}
        />
      </div>
    </PanelPageFrame>
  );
}
