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
import type { ProjectTechStackPayload } from "@/constants/types";
import { PanelPageFrame } from "@/page/panel/components/panel-page-frame";
import {
  emptyTaxonomyForm,
  TaxonomyForm,
  taxonomyFormToPayload,
  taxonomyToForm,
  type TaxonomyFormState,
} from "@/page/panel/components/taxonomy-form";
import {
  useGetAdminProjectTechStackQuery,
  useUpdateProjectTechStackMutation,
} from "@/redux/api/portfolioApi";

const techStackListHref = "/panel/filters/tech-stacks";

export default function EditTechStackPage() {
  return (
    <PanelPageFrame activeTab="techStacks">
      <EditTechStackContent />
    </PanelPageFrame>
  );
}

function EditTechStackContent() {
  const router = useRouter();
  const params = useParams<{ techStackId: string }>();
  const techStackId = Number(params.techStackId);
  const canLoadTechStack = Number.isInteger(techStackId) && techStackId > 0;
  const { data, isFetching } = useGetAdminProjectTechStackQuery(techStackId, {
    skip: !canLoadTechStack,
  });
  const [updateTechStack, { isLoading: isUpdating }] =
    useUpdateProjectTechStackMutation();
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
    if (!canLoadTechStack) return;

    try {
      await updateTechStack({
        id: techStackId,
        body: taxonomyFormToPayload(form) as ProjectTechStackPayload,
      }).unwrap();
      toast.success("Tech stack updated.");
      router.push(techStackListHref);
    } catch {
      toast.error("Could not update tech stack. Check name and slug.");
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div>
        <Link
          href={techStackListHref}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tech Stacks
        </Link>
      </div>
      {isFetching && !data?.data ? (
        <LoadingState label="Loading tech stack..." />
      ) : (
        <TaxonomyForm
          cancelHref={techStackListHref}
          form={form}
          isSaving={isUpdating}
          itemLabel="Tech Stack"
          setForm={setForm}
          submitLabel="Update Tech Stack"
          title="Edit Tech Stack"
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
