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
import type { ProjectSourcePayload } from "@/constants/types";
import { PanelPageFrame } from "@/page/panel/components/panel-page-frame";
import {
  emptyTaxonomyForm,
  TaxonomyForm,
  taxonomyFormToPayload,
  taxonomyToForm,
  type TaxonomyFormState,
} from "@/page/panel/components/taxonomy-form";
import {
  useGetAdminProjectSourceQuery,
  useUpdateProjectSourceMutation,
} from "@/redux/api/portfolioApi";

const sourceListHref = "/panel/filters/sources";

export default function EditSourcePage() {
  return (
    <PanelPageFrame activeTab="sources">
      <EditSourceContent />
    </PanelPageFrame>
  );
}

function EditSourceContent() {
  const router = useRouter();
  const params = useParams<{ sourceId: string }>();
  const sourceId = Number(params.sourceId);
  const canLoadSource = Number.isInteger(sourceId) && sourceId > 0;
  const { data, isFetching } = useGetAdminProjectSourceQuery(sourceId, {
    skip: !canLoadSource,
  });
  const [updateSource, { isLoading: isUpdating }] =
    useUpdateProjectSourceMutation();
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
    if (!canLoadSource) return;

    try {
      await updateSource({
        id: sourceId,
        body: taxonomyFormToPayload(form) as ProjectSourcePayload,
      }).unwrap();
      toast.success("Source updated.");
      router.push(sourceListHref);
    } catch {
      toast.error("Could not update source. Check name and slug.");
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div>
        <Link
          href={sourceListHref}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Sources
        </Link>
      </div>
      {isFetching && !data?.data ? (
        <LoadingState label="Loading source..." />
      ) : (
        <TaxonomyForm
          cancelHref={sourceListHref}
          form={form}
          isSaving={isUpdating}
          itemLabel="Source"
          setForm={setForm}
          submitLabel="Update Source"
          title="Edit Source"
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
