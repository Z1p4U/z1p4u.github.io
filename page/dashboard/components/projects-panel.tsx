"use client";

import type { Dispatch, SetStateAction, SyntheticEvent } from "react";
import { FileText, Pencil, Plus, Save, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type {
  PortfolioProject,
  ProjectDetailSection,
} from "@/constants/types";

import { CheckField, Field } from "./dashboard-field";
import { sectionToForm, statusText } from "../lib/helpers";
import {
  emptyDetailForm,
  emptyProjectForm,
  type DetailFormState,
  type ProjectFormState,
} from "../types";

type ProjectsPanelProps = {
  detailForm: DetailFormState;
  detailSections: ProjectDetailSection[];
  isCreatingDetail: boolean;
  isCreatingProject: boolean;
  isDeletingDetail: boolean;
  isDeletingProject: boolean;
  isDetailsFetching: boolean;
  isProjectsFetching: boolean;
  isUpdatingDetail: boolean;
  isUpdatingProject: boolean;
  projectForm: ProjectFormState;
  projects: PortfolioProject[];
  selectedProject?: PortfolioProject;
  selectedProjectId: number | null;
  setDetailForm: Dispatch<SetStateAction<DetailFormState>>;
  setProjectForm: Dispatch<SetStateAction<ProjectFormState>>;
  onDetailDelete: (sectionId?: number) => void;
  onDetailSubmit: (event: SyntheticEvent<HTMLFormElement>) => void;
  onProjectDelete: (projectId?: number) => void;
  onProjectSubmit: (event: SyntheticEvent<HTMLFormElement>) => void;
  onSelectProject: (projectId: number | null) => void;
};

export function ProjectsPanel({
  detailForm,
  detailSections,
  isCreatingDetail,
  isCreatingProject,
  isDeletingDetail,
  isDeletingProject,
  isDetailsFetching,
  isProjectsFetching,
  isUpdatingDetail,
  isUpdatingProject,
  projectForm,
  projects,
  selectedProject,
  selectedProjectId,
  setDetailForm,
  setProjectForm,
  onDetailDelete,
  onDetailSubmit,
  onProjectDelete,
  onProjectSubmit,
  onSelectProject,
}: ProjectsPanelProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
      <div className="space-y-6">
        <section className="rounded-lg border border-border/50 bg-secondary/25">
          <div className="flex items-center justify-between gap-3 border-b border-border/50 p-4">
            <h2 className="font-semibold">Projects</h2>
            <Button
              type="button"
              size="sm"
              onClick={() => {
                setProjectForm(emptyProjectForm);
                setDetailForm(emptyDetailForm);
              }}
            >
              <Plus className="h-4 w-4" />
              New
            </Button>
          </div>
          <div className="divide-y divide-border/40">
            {projects.map((project) => (
              <div
                key={project.id ?? project.slug}
                className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-medium">{project.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {project.category} / {project.tech_stack.join(", ")}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setProjectForm({
                        id: project.id,
                        title: project.title,
                        slug: project.slug,
                        description: project.description,
                        category: project.category,
                        source: project.source ?? "",
                        year: project.year ?? "",
                        project_url: project.project_url ?? "",
                        repository_url: project.repository_url ?? "",
                        image_url: project.image_url ?? "",
                        tech_stack: project.tech_stack.join(", "),
                        sort_order: String(project.sort_order ?? 0),
                        is_featured: Boolean(project.is_featured),
                        is_published: project.is_published ?? true,
                      });
                      onSelectProject(project.id ?? null);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => onSelectProject(project.id ?? null)}
                  >
                    <FileText className="h-4 w-4" />
                    Details
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    disabled={isDeletingProject}
                    onClick={() => onProjectDelete(project.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
            {isProjectsFetching ? (
              <p className="p-4 text-sm text-muted-foreground">
                Loading projects...
              </p>
            ) : null}
          </div>
        </section>

        <section className="rounded-lg border border-border/50 bg-secondary/25">
          <div className="border-b border-border/50 p-4">
            <Label>Project Detail Page</Label>
            <Select
              value={selectedProjectId ? String(selectedProjectId) : undefined}
              onValueChange={(value) => {
                onSelectProject(Number(value));
                setDetailForm(emptyDetailForm);
              }}
            >
              <SelectTrigger className="mt-2 w-full">
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem
                    key={project.id ?? project.slug}
                    value={String(project.id)}
                  >
                    {project.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="divide-y divide-border/40">
            {detailSections.map((section) => (
              <div
                key={section.id ?? section.title}
                className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-medium">{section.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {section.block_type} / {section.layout}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => setDetailForm(sectionToForm(section))}
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    disabled={isDeletingDetail}
                    onClick={() => onDetailDelete(section.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
            {isDetailsFetching ? (
              <p className="p-4 text-sm text-muted-foreground">
                Loading detail sections...
              </p>
            ) : null}
            {!isDetailsFetching && detailSections.length === 0 ? (
              <p className="p-4 text-sm text-muted-foreground">
                No detail sections for {selectedProject?.title ?? "this project"}.
              </p>
            ) : null}
          </div>
        </section>
      </div>

      <div className="space-y-6">
        <form
          onSubmit={onProjectSubmit}
          className="rounded-lg border border-border/50 bg-secondary/25 p-5"
        >
          <h2 className="mb-5 font-semibold">
            {projectForm.id ? "Edit Project" : "Create Project"}
          </h2>
          <div className="grid gap-4">
            <Field label="Title">
              <Input
                value={projectForm.title}
                onChange={(event) =>
                  setProjectForm({
                    ...projectForm,
                    title: event.target.value,
                  })
                }
                required
              />
            </Field>
            <Field label="Slug">
              <Input
                value={projectForm.slug}
                placeholder="Auto-generated from title"
                onChange={(event) =>
                  setProjectForm({ ...projectForm, slug: event.target.value })
                }
              />
            </Field>
            <Field label="Description">
              <Textarea
                rows={4}
                value={projectForm.description}
                onChange={(event) =>
                  setProjectForm({
                    ...projectForm,
                    description: event.target.value,
                  })
                }
                required
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Category">
                <Input
                  value={projectForm.category}
                  onChange={(event) =>
                    setProjectForm({
                      ...projectForm,
                      category: event.target.value,
                    })
                  }
                  required
                />
              </Field>
              <Field label="Year">
                <Input
                  value={projectForm.year}
                  onChange={(event) =>
                    setProjectForm({
                      ...projectForm,
                      year: event.target.value,
                    })
                  }
                />
              </Field>
            </div>
            <Field label="Source">
              <Input
                value={projectForm.source}
                onChange={(event) =>
                  setProjectForm({
                    ...projectForm,
                    source: event.target.value,
                  })
                }
              />
            </Field>
            <Field label="Project URL">
              <Input
                value={projectForm.project_url}
                onChange={(event) =>
                  setProjectForm({
                    ...projectForm,
                    project_url: event.target.value,
                  })
                }
              />
            </Field>
            <Field label="Repository URL">
              <Input
                value={projectForm.repository_url}
                onChange={(event) =>
                  setProjectForm({
                    ...projectForm,
                    repository_url: event.target.value,
                  })
                }
              />
            </Field>
            <Field label="Image URL">
              <Input
                value={projectForm.image_url}
                onChange={(event) =>
                  setProjectForm({
                    ...projectForm,
                    image_url: event.target.value,
                  })
                }
              />
            </Field>
            <Field label="Tech Stack">
              <Input
                value={projectForm.tech_stack}
                placeholder="React, Laravel, MySQL"
                onChange={(event) =>
                  setProjectForm({
                    ...projectForm,
                    tech_stack: event.target.value,
                  })
                }
              />
            </Field>
            <Field label="Sort Order">
              <Input
                type="number"
                value={projectForm.sort_order}
                onChange={(event) =>
                  setProjectForm({
                    ...projectForm,
                    sort_order: event.target.value,
                  })
                }
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <CheckField
                label="Featured"
                checked={projectForm.is_featured}
                onCheckedChange={(checked) =>
                  setProjectForm({
                    ...projectForm,
                    is_featured: checked,
                  })
                }
              />
              <CheckField
                label="Published"
                checked={projectForm.is_published}
                onCheckedChange={(checked) =>
                  setProjectForm({
                    ...projectForm,
                    is_published: checked,
                  })
                }
              />
            </div>
            <Button type="submit" disabled={isCreatingProject || isUpdatingProject}>
              <Save className="h-4 w-4" />
              {statusText(isCreatingProject || isUpdatingProject) ??
                (projectForm.id ? "Update Project" : "Create Project")}
            </Button>
          </div>
        </form>

        <form
          onSubmit={onDetailSubmit}
          className="rounded-lg border border-border/50 bg-secondary/25 p-5"
        >
          <h2 className="mb-5 font-semibold">
            {detailForm.id ? "Edit Detail Block" : "Create Detail Block"}
          </h2>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Type">
                <Select
                  value={detailForm.block_type}
                  onValueChange={(value) =>
                    setDetailForm({
                      ...detailForm,
                      block_type: value as DetailFormState["block_type"],
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "overview",
                      "challenge",
                      "contribution",
                      "implementation",
                      "result",
                    ].map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Layout">
                <Select
                  value={detailForm.layout}
                  onValueChange={(value) =>
                    setDetailForm({
                      ...detailForm,
                      layout: value as DetailFormState["layout"],
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["image_left", "image_right", "full_width", "text_only"].map(
                      (value) => (
                        <SelectItem key={value} value={value}>
                          {value}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <Field label="Title">
              <Input
                value={detailForm.title}
                onChange={(event) =>
                  setDetailForm({ ...detailForm, title: event.target.value })
                }
                required
              />
            </Field>
            <Field label="Body">
              <Textarea
                rows={6}
                value={detailForm.body}
                onChange={(event) =>
                  setDetailForm({ ...detailForm, body: event.target.value })
                }
                required
              />
            </Field>
            <Field label="Image URL">
              <Input
                value={detailForm.image_url}
                onChange={(event) =>
                  setDetailForm({
                    ...detailForm,
                    image_url: event.target.value,
                  })
                }
              />
            </Field>
            <Field label="Image Alt">
              <Input
                value={detailForm.image_alt}
                onChange={(event) =>
                  setDetailForm({
                    ...detailForm,
                    image_alt: event.target.value,
                  })
                }
              />
            </Field>
            <Field label="Caption">
              <Input
                value={detailForm.caption}
                onChange={(event) =>
                  setDetailForm({
                    ...detailForm,
                    caption: event.target.value,
                  })
                }
              />
            </Field>
            <Field label="External URL">
              <Input
                value={detailForm.external_url}
                onChange={(event) =>
                  setDetailForm({
                    ...detailForm,
                    external_url: event.target.value,
                  })
                }
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Sort Order">
                <Input
                  type="number"
                  value={detailForm.sort_order}
                  onChange={(event) =>
                    setDetailForm({
                      ...detailForm,
                      sort_order: event.target.value,
                    })
                  }
                />
              </Field>
              <CheckField
                label="Published"
                checked={detailForm.is_published}
                onCheckedChange={(checked) =>
                  setDetailForm({
                    ...detailForm,
                    is_published: checked,
                  })
                }
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                type="submit"
                disabled={!selectedProjectId || isCreatingDetail || isUpdatingDetail}
              >
                <Save className="h-4 w-4" />
                {statusText(isCreatingDetail || isUpdatingDetail) ??
                  (detailForm.id ? "Update Block" : "Create Block")}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDetailForm(emptyDetailForm)}
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
