"use client";

import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { PortfolioProject } from "@/constants/types";

import type { OverviewStat } from "../types";

export function OverviewPanel({
  projects,
  stats,
  onEditProject,
}: {
  projects: PortfolioProject[];
  stats: OverviewStat[];
  onEditProject: (project: PortfolioProject) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-border/50 bg-secondary/25 p-5"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-3 text-3xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-border/50 bg-secondary/25 p-5">
        <h2 className="font-semibold">Recent Projects</h2>
        <div className="mt-4 divide-y divide-border/40">
          {projects.slice(0, 6).map((project) => (
            <div
              key={project.id ?? project.slug}
              className="flex items-center justify-between gap-4 py-3"
            >
              <div>
                <p className="font-medium">{project.title}</p>
                <p className="text-sm text-muted-foreground">
                  {project.category} / {project.source ?? "No source"}
                </p>
              </div>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => onEditProject(project)}
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
