"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type SyntheticEvent } from "react";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import type { ProjectSourcePayload } from "@/constants/types";
import { PanelPageFrame } from "@/page/panel/components/panel-page-frame";
import {
  emptyTaxonomyForm,
  TaxonomyForm,
  taxonomyFormToPayload,
  type TaxonomyFormState,
} from "@/page/panel/components/taxonomy-form";
import { useCreateProjectSourceMutation } from "@/redux/api/portfolioApi";

const sourceListHref = "/panel/filters/sources";

export default function CreateSourcePage() {
  const router = useRouter();
  const [createSource, { isLoading }] = useCreateProjectSourceMutation();
  const [form, setForm] = useState<TaxonomyFormState>(emptyTaxonomyForm);

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await createSource(
        taxonomyFormToPayload(form) as ProjectSourcePayload,
      ).unwrap();
      toast.success("Source created.");
      router.push(sourceListHref);
    } catch {
      toast.error("Could not create source. Check name and slug.");
    }
  };

  return (
    <PanelPageFrame activeTab="sources">
      <div className="mx-auto max-w-3xl space-y-5">
        <Link
          href={sourceListHref}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Sources
        </Link>
        <TaxonomyForm
          cancelHref={sourceListHref}
          form={form}
          isSaving={isLoading}
          itemLabel="Source"
          setForm={setForm}
          submitLabel="Create Source"
          title="Create Source"
          onSubmit={handleSubmit}
        />
      </div>
    </PanelPageFrame>
  );
}
