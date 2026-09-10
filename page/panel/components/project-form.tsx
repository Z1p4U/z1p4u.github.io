"use client";

import Link from "next/link";
import type { Dispatch, SetStateAction, SyntheticEvent } from "react";
import { Save, X } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  useGetAdminProjectCategoriesQuery,
  useGetAdminProjectSourcesQuery,
  useGetAdminProjectTechStacksQuery,
} from "@/redux/api/portfolioApi";

import { Field, SwitchField } from "./dashboard-field";
import { ImageUploadField } from "./image-upload-field";
import { statusText } from "../lib/helpers";
import type { ProjectFormState } from "../types";

type ProjectFormProps = {
  cancelHref: string;
  isSaving: boolean;
  projectForm: ProjectFormState;
  setProjectForm: Dispatch<SetStateAction<ProjectFormState>>;
  submitLabel: string;
  title: string;
  onSubmit: (event: SyntheticEvent<HTMLFormElement>) => void;
};

const NO_SOURCE_VALUE = "__no_source__";

function taxonomyOptions(options: string[], currentValue: string) {
  return Array.from(
    new Set(
      [...options, currentValue]
        .map((option) => option.trim())
        .filter(Boolean),
    ),
  );
}

function parseTechStack(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function serializeTechStack(values: string[]) {
  return values.join(", ");
}

function TechStackPicker({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  const selectedStacks = parseTechStack(value);
  const allOptions = taxonomyOptions(
    [...options, ...selectedStacks],
    "",
  );
  const availableStacks = allOptions.filter(
    (option) => !selectedStacks.includes(option),
  );

  const addStack = (stack: string) => {
    if (selectedStacks.includes(stack)) return;
    onChange(serializeTechStack([...selectedStacks, stack]));
  };

  const removeStack = (stack: string) => {
    onChange(
      serializeTechStack(selectedStacks.filter((item) => item !== stack)),
    );
  };

  return (
    <div className="space-y-3">
      <Select
        key={selectedStacks.join("|") || "empty-stack"}
        disabled={availableStacks.length === 0}
        onValueChange={addStack}
      >
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={
              availableStacks.length ? "Add tech stack" : "No more tech stacks"
            }
          />
        </SelectTrigger>
        <SelectContent>
          {availableStacks.map((stack) => (
            <SelectItem key={stack} value={stack}>
              {stack}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex min-h-9 flex-wrap gap-2">
        {selectedStacks.map((stack) => (
          <span
            key={stack}
            className="inline-flex h-8 items-center gap-2 rounded-full border border-border/50 bg-background/60 px-3 text-xs"
          >
            <span className="max-w-36 truncate">{stack}</span>
            <button
              type="button"
              aria-label={`Remove ${stack}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => removeStack(stack)}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </span>
        ))}
        {selectedStacks.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            Add the stack from the saved tech-stack filters.
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function ProjectForm({
  cancelHref,
  isSaving,
  projectForm,
  setProjectForm,
  submitLabel,
  title,
  onSubmit,
}: ProjectFormProps) {
  const { data: categoryData } = useGetAdminProjectCategoriesQuery();
  const { data: sourceData } = useGetAdminProjectSourcesQuery();
  const { data: techStackData } = useGetAdminProjectTechStacksQuery();
  const categoryOptions = taxonomyOptions(
    categoryData?.data.map((category) => category.name) ?? [],
    projectForm.category,
  );
  const sourceOptions = taxonomyOptions(
    sourceData?.data.map((source) => source.name) ?? [],
    projectForm.source,
  );
  const techStackOptions = taxonomyOptions(
    techStackData?.data.map((techStack) => techStack.name) ?? [],
    "",
  );

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]"
    >
      <section className="rounded-lg border border-border/50 bg-secondary/25 p-5">
        <h2 className="mb-5 font-semibold">{title}</h2>
        <div className="grid gap-4">
          <Field label="Title">
            <Input
              value={projectForm.title}
              onChange={(event) =>
                setProjectForm((current) => ({
                  ...current,
                  title: event.target.value,
                }))
              }
              required
            />
          </Field>
          <Field label="Slug">
            <Input
              value={projectForm.slug}
              placeholder="Auto-generated from title"
              onChange={(event) =>
                setProjectForm((current) => ({
                  ...current,
                  slug: event.target.value,
                }))
              }
            />
          </Field>
          <Field label="Description">
            <Textarea
              rows={4}
              value={projectForm.description}
              onChange={(event) =>
                setProjectForm((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              required
            />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Category">
              <Select
                value={projectForm.category}
                onValueChange={(value) =>
                  setProjectForm((current) => ({
                    ...current,
                    category: value,
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Year">
              <Input
                value={projectForm.year}
                onChange={(event) =>
                  setProjectForm((current) => ({
                    ...current,
                    year: event.target.value,
                  }))
                }
              />
            </Field>
          </div>
          <Field label="Source">
            <Select
              value={projectForm.source || NO_SOURCE_VALUE}
              onValueChange={(value) =>
                setProjectForm((current) => ({
                  ...current,
                  source: value === NO_SOURCE_VALUE ? "" : value,
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={NO_SOURCE_VALUE}>No source</SelectItem>
                {sourceOptions.map((source) => (
                  <SelectItem key={source} value={source}>
                    {source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Project URL">
            <Input
              value={projectForm.project_url}
              onChange={(event) =>
                setProjectForm((current) => ({
                  ...current,
                  project_url: event.target.value,
                }))
              }
            />
          </Field>
          <Field label="Repository URL">
            <Input
              value={projectForm.repository_url}
              onChange={(event) =>
                setProjectForm((current) => ({
                  ...current,
                  repository_url: event.target.value,
                }))
              }
            />
          </Field>
          <Field label="Project Image">
            <ImageUploadField
              alt={`${projectForm.title || "Project"} preview`}
              value={projectForm.image_url}
              onChange={(imageUrl) =>
                setProjectForm((current) => ({
                  ...current,
                  image_url: imageUrl,
                }))
              }
            />
          </Field>
        </div>
      </section>

      <aside className="self-start rounded-lg border border-border/50 bg-secondary/25 p-5 lg:sticky lg:top-6">
        <h2 className="mb-5 font-semibold">Project Setting</h2>
        <div className="grid gap-4">
          <Field label="Tech Stack">
            <TechStackPicker
              options={techStackOptions}
              value={projectForm.tech_stack}
              onChange={(techStack) =>
                setProjectForm((current) => ({
                  ...current,
                  tech_stack: techStack,
                }))
              }
            />
          </Field>
          <Field label="Sort Order">
            <Input
              type="number"
              value={projectForm.sort_order}
              onChange={(event) =>
                setProjectForm((current) => ({
                  ...current,
                  sort_order: event.target.value,
                }))
              }
            />
          </Field>
          <SwitchField
            label="Feature on Home"
            checked={projectForm.is_featured}
            onCheckedChange={(checked) =>
              setProjectForm((current) => ({
                ...current,
                is_featured: checked,
              }))
            }
          />
          <SwitchField
            label="Published"
            checked={projectForm.is_published}
            onCheckedChange={(checked) =>
              setProjectForm((current) => ({
                ...current,
                is_published: checked,
              }))
            }
          />
          <div className="grid gap-2 pt-2">
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
      </aside>
    </form>
  );
}
