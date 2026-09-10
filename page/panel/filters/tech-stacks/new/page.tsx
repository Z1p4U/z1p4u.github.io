"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type SyntheticEvent } from "react";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import type { ProjectTechStackPayload } from "@/constants/types";
import { PanelPageFrame } from "@/page/panel/components/panel-page-frame";
import {
  emptyTaxonomyForm,
  TaxonomyForm,
  taxonomyFormToPayload,
  type TaxonomyFormState,
} from "@/page/panel/components/taxonomy-form";
import { useCreateProjectTechStackMutation } from "@/redux/api/portfolioApi";

const techStackListHref = "/panel/filters/tech-stacks";

export default function CreateTechStackPage() {
  const router = useRouter();
  const [createTechStack, { isLoading }] =
    useCreateProjectTechStackMutation();
  const [form, setForm] = useState<TaxonomyFormState>(emptyTaxonomyForm);

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await createTechStack(
        taxonomyFormToPayload(form) as ProjectTechStackPayload,
      ).unwrap();
      toast.success("Tech stack created.");
      router.push(techStackListHref);
    } catch {
      toast.error("Could not create tech stack. Check name and slug.");
    }
  };

  return (
    <PanelPageFrame activeTab="techStacks">
      <div className="mx-auto max-w-3xl space-y-5">
        <Link
          href={techStackListHref}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tech Stacks
        </Link>
        <TaxonomyForm
          cancelHref={techStackListHref}
          form={form}
          isSaving={isLoading}
          itemLabel="Tech Stack"
          setForm={setForm}
          submitLabel="Create Tech Stack"
          title="Create Tech Stack"
          onSubmit={handleSubmit}
        />
      </div>
    </PanelPageFrame>
  );
}
