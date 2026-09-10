"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ExternalLink,
  FileText,
  Grid3X3,
  MoreVertical,
  Pencil,
  Plus,
  Table2,
  Trash2,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { LoadingState } from "@/components/ui/loading-state";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import type { PortfolioProject } from "@/constants/types";
import { cn } from "@/lib/utils";

import {
  getPaginationSummary,
  PaginationControls,
  type PaginationMeta,
} from "./pagination-controls";

type ProjectViewMode = "table" | "grid";

type ProjectsPanelProps = {
  isDeletingProject: boolean;
  isProjectsFetching: boolean;
  isUpdatingProject: boolean;
  paginationMeta?: PaginationMeta;
  projects: PortfolioProject[];
  onFeatureToggle: (project: PortfolioProject, checked: boolean) => void;
  onPageChange: (page: number) => void;
  onProjectDelete: (projectId?: number) => void;
};

const projectViews: {
  value: ProjectViewMode;
  label: string;
  icon: typeof Table2;
}[] = [
  { value: "table", label: "Table", icon: Table2 },
  { value: "grid", label: "Blocks", icon: Grid3X3 },
];

function ProjectThumbnail({
  className,
  project,
}: {
  className?: string;
  project: PortfolioProject;
}) {
  const imageUrl = project.image_url?.trim();

  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-md border border-border/50 bg-background/60",
        className,
      )}
    >
      {imageUrl ? (
        <div
          role="img"
          aria-label={`${project.title} preview`}
          className="absolute inset-0 bg-cover bg-top"
          style={{ backgroundImage: `url("${imageUrl}")` }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <FileText className="h-5 w-5 text-muted-foreground" />
        </div>
      )}
    </div>
  );
}

function ProjectStatus({ project }: { project: PortfolioProject }) {
  if (!project.is_published) {
    return (
      <span className="inline-flex rounded-full border border-muted-foreground/25 px-2 py-1 text-xs text-muted-foreground">
        Draft
      </span>
    );
  }

  return (
    <span className="inline-flex rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300">
      Published
    </span>
  );
}

function FeatureToggle({
  project,
  disabled,
  onFeatureToggle,
}: {
  project: PortfolioProject;
  disabled: boolean;
  onFeatureToggle: (project: PortfolioProject, checked: boolean) => void;
}) {
  return (
    <Switch
      aria-label={`Feature ${project.title} on home`}
      checked={Boolean(project.is_featured)}
      disabled={disabled}
      onCheckedChange={(checked) => onFeatureToggle(project, checked)}
    />
  );
}

function ProjectActionsMenu({
  project,
  isDeletingProject,
  onProjectDelete,
}: {
  project: PortfolioProject;
  isDeletingProject: boolean;
  onProjectDelete: (projectId?: number) => void;
}) {
  const editHref = project.id
    ? `/panel/projects/${project.id}/edit`
    : "/panel?tab=projects";
  const detailsHref = project.id
    ? `/panel/projects/${project.id}/edit#detail-blocks`
    : "/panel?tab=projects";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={`Open actions for ${project.title}`}
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {project.project_url ? (
          <DropdownMenuItem asChild>
            <a href={project.project_url} target="_blank" rel="noreferrer">
              <ExternalLink className="h-4 w-4" />
              Open
            </a>
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuItem asChild>
          <Link href={editHref}>
            <Pencil className="h-4 w-4" />
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={detailsHref}>
            <FileText className="h-4 w-4" />
            Details
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          disabled={isDeletingProject}
          onSelect={() => onProjectDelete(project.id)}
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ProjectMeta({ project }: { project: PortfolioProject }) {
  return (
    <p className="truncate text-sm text-muted-foreground">
      {[project.category, project.source, project.year]
        .filter(Boolean)
        .join(" / ")}
    </p>
  );
}

export function ProjectsPanel({
  isDeletingProject,
  isProjectsFetching,
  isUpdatingProject,
  paginationMeta,
  projects,
  onFeatureToggle,
  onPageChange,
  onProjectDelete,
}: ProjectsPanelProps) {
  const [viewMode, setViewMode] = useState<ProjectViewMode>("table");
  const hasProjects = projects.length > 0;

  return (
    <section className="rounded-lg border border-border/50 bg-secondary/25">
      <div className="flex flex-col gap-3 border-b border-border/50 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-semibold">Projects</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {isProjectsFetching
              ? "Loading projects..."
              : getPaginationSummary(paginationMeta)}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-md border border-border/50 bg-background/45 p-1">
            {projectViews.map((view) => (
              <button
                key={view.value}
                type="button"
                title={`${view.label} view`}
                onClick={() => setViewMode(view.value)}
                className={cn(
                  "inline-flex h-8 items-center gap-2 rounded px-3 text-xs font-medium transition-colors",
                  viewMode === view.value
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <view.icon className="h-4 w-4" />
                <span>{view.label}</span>
              </button>
            ))}
          </div>
          <Link
            href="/panel/projects/new"
            className={cn(buttonVariants({ size: "sm" }))}
          >
            <Plus className="h-4 w-4" />
            New
          </Link>
        </div>
      </div>

      {isProjectsFetching && !hasProjects ? (
        <div className="p-4">
          <LoadingState compact label="Loading projects..." />
        </div>
      ) : null}

      {!isProjectsFetching && !hasProjects ? (
        <div className="p-6 text-sm text-muted-foreground">
          No projects found in the database. Create one or run the seed command.
        </div>
      ) : null}

      {hasProjects && viewMode === "table" ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead className="border-b border-border/50 text-xs uppercase tracking-[0.14em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Image</th>
                <th className="px-4 py-3 font-medium">Project</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 font-medium">Feature on Home</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {projects.map((project) => (
                <tr
                  key={project.id ?? project.slug}
                  className="transition-colors hover:bg-muted/30"
                >
                  <td className="w-32 px-4 py-3">
                    <ProjectThumbnail className="w-24" project={project} />
                  </td>
                  <td className="max-w-[18rem] px-4 py-3">
                    <p className="truncate font-medium">{project.title}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {project.slug}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {project.category}
                  </td>
                  <td className="max-w-[12rem] px-4 py-3 text-muted-foreground">
                    <span className="block truncate">
                      {project.source ?? "No source"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <FeatureToggle
                      project={project}
                      disabled={isUpdatingProject}
                      onFeatureToggle={onFeatureToggle}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <ProjectStatus project={project} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <ProjectActionsMenu
                      project={project}
                      isDeletingProject={isDeletingProject}
                      onProjectDelete={onProjectDelete}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {hasProjects && viewMode === "grid" ? (
        <div className="grid gap-4 p-4 md:grid-cols-2 2xl:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.id ?? project.slug}
              className="overflow-hidden rounded-lg border border-border/50 bg-background/45 transition-colors hover:border-primary/35"
            >
              <ProjectThumbnail project={project} />
              <div className="space-y-4 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{project.title}</p>
                    <ProjectMeta project={project} />
                  </div>
                  <ProjectActionsMenu
                    project={project}
                    isDeletingProject={isDeletingProject}
                    onProjectDelete={onProjectDelete}
                  />
                </div>
                <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
                  {project.description}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <ProjectStatus project={project} />
                  <FeatureToggle
                    project={project}
                    disabled={isUpdatingProject}
                    onFeatureToggle={onFeatureToggle}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : null}
      <PaginationControls
        isFetching={isProjectsFetching}
        meta={paginationMeta}
        onPageChange={onPageChange}
      />
    </section>
  );
}
