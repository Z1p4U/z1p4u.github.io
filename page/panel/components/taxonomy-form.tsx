"use client";

import Link from "next/link";
import type { Dispatch, SetStateAction, SyntheticEvent } from "react";
import { Save } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type {
  ProjectCategoryPayload,
  ProjectSourcePayload,
  ProjectTaxonomy,
  ProjectTechStackPayload,
} from "@/constants/types";
import { cn } from "@/lib/utils";

import { Field, SwitchField } from "./dashboard-field";
import { statusText } from "../lib/helpers";

export type TaxonomyFormState = {
  id?: number;
  name: string;
  slug: string;
  description: string;
  sort_order: string;
  is_published: boolean;
};

type TaxonomyFormProps = {
  cancelHref: string;
  isSaving: boolean;
  itemLabel: string;
  form: TaxonomyFormState;
  setForm: Dispatch<SetStateAction<TaxonomyFormState>>;
  submitLabel: string;
  title: string;
  onSubmit: (event: SyntheticEvent<HTMLFormElement>) => void;
};

export const emptyTaxonomyForm: TaxonomyFormState = {
  name: "",
  slug: "",
  description: "",
  sort_order: "0",
  is_published: true,
};

export function taxonomyToForm(record: ProjectTaxonomy): TaxonomyFormState {
  return {
    id: record.id,
    name: record.name,
    slug: record.slug,
    description: record.description ?? "",
    sort_order: String(record.sort_order ?? 0),
    is_published: record.is_published ?? true,
  };
}

export function taxonomyFormToPayload(
  form: TaxonomyFormState,
): ProjectCategoryPayload | ProjectSourcePayload | ProjectTechStackPayload {
  return {
    name: form.name.trim(),
    slug: form.slug.trim(),
    description: form.description.trim() || null,
    sort_order: Number(form.sort_order || 0),
    is_published: form.is_published,
  };
}

export function taxonomyToPayload(
  record: ProjectTaxonomy,
): ProjectCategoryPayload | ProjectSourcePayload | ProjectTechStackPayload {
  return {
    name: record.name,
    slug: record.slug,
    description: record.description ?? null,
    sort_order: record.sort_order ?? 0,
    is_published: record.is_published ?? true,
  };
}

export function TaxonomyForm({
  cancelHref,
  isSaving,
  itemLabel,
  form,
  setForm,
  submitLabel,
  title,
  onSubmit,
}: TaxonomyFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-lg border border-border/50 bg-secondary/25 p-5"
    >
      <h2 className="mb-5 font-semibold">{title}</h2>
      <div className="grid gap-4">
        <Field label="Name">
          <Input
            value={form.name}
            placeholder={`${itemLabel} name`}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                name: event.target.value,
              }))
            }
            required
          />
        </Field>
        <Field label="Slug">
          <Input
            value={form.slug}
            placeholder="Auto-generated from name"
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                slug: event.target.value,
              }))
            }
          />
        </Field>
        <Field label="Description">
          <Textarea
            rows={4}
            value={form.description}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                description: event.target.value,
              }))
            }
          />
        </Field>
        <div className="grid gap-3 sm:grid-cols-[1fr_180px] sm:items-end">
          <Field label="Sort Order">
            <Input
              type="number"
              value={form.sort_order}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  sort_order: event.target.value,
                }))
              }
            />
          </Field>
          <SwitchField
            label="Published"
            checked={form.is_published}
            onCheckedChange={(checked) =>
              setForm((current) => ({
                ...current,
                is_published: checked,
              }))
            }
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="submit" disabled={isSaving}>
            <Save className="h-4 w-4" />
            {statusText(isSaving) ?? submitLabel}
          </Button>
          <Link
            href={cancelHref}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
}
