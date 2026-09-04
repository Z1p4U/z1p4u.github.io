"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Github,
  Layers3,
} from "lucide-react";

import { fetchProject } from "@/lib/portfolio-api";
import type {
  PortfolioProject,
  ProjectDetailSection,
} from "@/constants/types";
import { cn } from "@/lib/utils";

function SectionImage({
  section,
  project,
}: {
  section: ProjectDetailSection;
  project: PortfolioProject;
}) {
  if (!section.image_url) return null;

  return (
    <figure className="relative overflow-hidden rounded-2xl border border-border/50 bg-secondary/30">
      <div className="relative aspect-[16/10]">
        <Image
          src={section.image_url}
          alt={section.image_alt ?? `${project.title} section image`}
          fill
          unoptimized
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-top"
        />
      </div>
      {section.caption ? (
        <figcaption className="border-t border-border/40 px-4 py-3 text-xs text-muted-foreground">
          {section.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function DetailSection({
  section,
  project,
  index,
}: {
  section: ProjectDetailSection;
  project: PortfolioProject;
  index: number;
}) {
  const hasImage = Boolean(section.image_url);
  const isImageRight = section.layout === "image_right";
  const isTextOnly = section.layout === "text_only" || !hasImage;
  const isFullWidth = section.layout === "full_width";

  return (
    <section
      className={cn(
        "grid gap-8 border-t border-border/40 py-12",
        !isTextOnly && !isFullWidth && "lg:grid-cols-2 lg:items-center",
      )}
    >
      <div
        className={cn(
          "space-y-5",
          !isTextOnly && !isFullWidth && isImageRight && "lg:order-first",
          !isTextOnly && !isFullWidth && !isImageRight && "lg:order-last",
        )}
      >
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.26em] text-primary">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{section.block_type.replace("_", " ")}</span>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-4xl">
          {section.title}
        </h2>
        <p className="whitespace-pre-line text-sm leading-7 text-muted-foreground md:text-base">
          {section.body}
        </p>
        {section.external_url ? (
          <a
            href={section.external_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Open Reference
            <ExternalLink className="h-4 w-4" />
          </a>
        ) : null}
      </div>

      {!isTextOnly && !isFullWidth ? (
        <div className={cn(isImageRight ? "lg:order-last" : "lg:order-first")}>
          <SectionImage section={section} project={project} />
        </div>
      ) : null}

      {!isTextOnly && isFullWidth ? (
        <div className="lg:col-span-2">
          <SectionImage section={section} project={project} />
        </div>
      ) : null}
    </section>
  );
}

export function ProjectDetailClient({
  slug,
  fallbackProject,
}: {
  slug: string;
  fallbackProject?: PortfolioProject | null;
}) {
  const [project, setProject] = useState<PortfolioProject | null>(
    fallbackProject ?? null,
  );
  const [hasLoaded, setHasLoaded] = useState(Boolean(fallbackProject));
  const sections = useMemo(
    () =>
      [...(project?.detail_sections ?? [])].sort(
        (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0),
      ),
    [project?.detail_sections],
  );

  useEffect(() => {
    let mounted = true;

    fetchProject(slug).then((data) => {
      if (mounted && data) setProject(data);
    }).finally(() => {
      if (mounted) setHasLoaded(true);
    });

    return () => {
      mounted = false;
    };
  }, [slug]);

  if (!project) {
    return (
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.24em] text-primary">
            Project Detail
          </p>
          <h1 className="mt-3 text-3xl font-semibold">
            {hasLoaded ? "Project not found" : "Loading project..."}
          </h1>
          <Link
            href="/project"
            className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 pt-28 pb-24 px-6">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/project"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end">
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-mono text-primary">
                {project.category}
              </span>
              {project.source ? (
                <span className="rounded-full border border-border/50 bg-secondary/30 px-3 py-1 text-xs text-muted-foreground">
                  {project.source}
                </span>
              ) : null}
              {project.year ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-secondary/30 px-3 py-1 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  {project.year}
                </span>
              ) : null}
            </div>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              {project.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
              {project.description}
            </p>
          </div>

          <div className="rounded-2xl border border-border/50 bg-secondary/25 p-5">
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
              <Layers3 className="h-4 w-4 text-primary" />
              Project Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border/50 bg-background/55 px-3 py-1 text-xs font-mono text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.repository_url ? (
                <a
                  href={project.repository_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-border/60 px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <Github className="h-4 w-4" />
                  Code
                </a>
              ) : null}
              {project.project_url ? (
                <a
                  href={project.project_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Live Project
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </div>
        </div>

        {project.image_url ? (
          <div className="mt-12 overflow-hidden rounded-2xl border border-border/50 bg-secondary/25">
            <div className="relative aspect-[16/8] min-h-[260px]">
              <Image
                src={project.image_url}
                alt={`${project.title} preview`}
                fill
                unoptimized
                priority
                sizes="100vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        ) : null}

        <div className="mt-8">
          {sections.map((section, index) => (
            <DetailSection
              key={section.id ?? `${section.title}-${index}`}
              section={section}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
