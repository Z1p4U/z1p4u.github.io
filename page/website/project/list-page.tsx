"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Building2,
  ExternalLink,
  Github,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { FaGooglePlay } from "react-icons/fa6";

import {
  usePortfolioProjects,
  useProjectTaxonomies,
} from "@/hooks/use-public-portfolio";
import { cn } from "@/lib/utils";

const PROJECTS_PER_PAGE = 8;
const FILTER_PANEL_TRANSITION_MS = 300;
const PROJECT_GRID_TRANSITION_MS = 180;

function ProjectPreview({
  image,
  priority = false,
  title,
}: {
  image?: string | null;
  priority?: boolean;
  title: string;
}) {
  return (
    <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-xl border border-border/40 bg-background/60">
      {image ? (
        <Image
          src={image}
          alt={`${title} website preview`}
          fill
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          unoptimized
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover object-top transition duration-700 group-hover/card:scale-105"
        />
      ) : (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(124,58,237,0.35),transparent_34%),linear-gradient(135deg,rgba(15,23,42,0.88),rgba(8,7,11,0.96))]" />
          <div className="absolute inset-x-4 top-4 flex items-center justify-between">
            <span className="h-2 w-20 rounded-full bg-white/35" />
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary/70" />
              <span className="h-2 w-2 rounded-full bg-white/30" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
            </div>
          </div>
          <div className="absolute inset-x-4 top-12 grid grid-cols-4 gap-2">
            <span className="col-span-2 h-14 rounded-lg bg-white/20" />
            <span className="col-span-2 h-14 rounded-lg bg-primary/25" />
            <span className="h-10 rounded-lg bg-white/15" />
            <span className="h-10 rounded-lg bg-white/25" />
            <span className="col-span-2 h-10 rounded-lg bg-black/30" />
          </div>
          <div className="absolute bottom-4 left-4 right-4 space-y-2">
            <span className="block h-2.5 w-2/3 rounded-full bg-white/35" />
            <span className="block h-2 w-1/2 rounded-full bg-white/20" />
          </div>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
    </div>
  );
}

function FilterButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "cursor-pointer px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
        active
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-muted border border-border/50",
      )}
    >
      {children}
    </button>
  );
}

export default function ProjectsPage() {
  const { projects } = usePortfolioProjects();
  const {
    categories: categoryRecords,
    sources: sourceRecords,
    techStacks: techStackRecords,
  } = useProjectTaxonomies();
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSource, setActiveSource] = useState("All");
  const [activeTechStack, setActiveTechStack] = useState("All");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filtersMounted, setFiltersMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(() => {
    const names = categoryRecords.map((category) => category.name);
    const projectCategoryNames = Array.from(
      new Set(projects.map((project) => project.category).filter(Boolean)),
    );

    return ["All", ...(names.length ? names : projectCategoryNames)];
  }, [categoryRecords, projects]);

  const sources = useMemo(() => {
    const names = sourceRecords.map((source) => source.name);
    const projectSourceNames = Array.from(
      new Set(
        projects.flatMap((project) =>
          project.source ? [project.source] : [],
        ),
      ),
    );

    return ["All", ...(names.length ? names : projectSourceNames)];
  }, [projects, sourceRecords]);

  const techStacks = useMemo(() => {
    const names = techStackRecords.map((techStack) => techStack.name);
    const projectTechStackNames = Array.from(
      new Set(projects.flatMap((project) => project.tech_stack)),
    );

    return ["All", ...(names.length ? names : projectTechStackNames)];
  }, [projects, techStackRecords]);

  const activeFilterCount = [
    activeCategory,
    activeSource,
    activeTechStack,
  ].filter((filter) => filter !== "All").length;

  const filtered = projects.filter((project) => {
    const matchesCategory =
      activeCategory === "All" || project.category === activeCategory;
    const matchesSource =
      activeSource === "All" || project.source === activeSource;
    const matchesTechStack =
      activeTechStack === "All" || project.tech_stack.includes(activeTechStack);

    return matchesCategory && matchesSource && matchesTechStack;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / PROJECTS_PER_PAGE),
  );
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedProjects = filtered.slice(
    (safeCurrentPage - 1) * PROJECTS_PER_PAGE,
    safeCurrentPage * PROJECTS_PER_PAGE,
  );
  const visibleProjectKey = paginatedProjects
    .map((project) => project.slug)
    .join("|");
  const [displayedProjects, setDisplayedProjects] = useState(paginatedProjects);
  const [cardsVisible, setCardsVisible] = useState(true);

  useEffect(() => {
    if (displayedProjects.map((project) => project.slug).join("|") === visibleProjectKey) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setCardsVisible(false);
    });
    const timeout = window.setTimeout(() => {
      setDisplayedProjects(paginatedProjects);
      window.requestAnimationFrame(() => setCardsVisible(true));
    }, PROJECT_GRID_TRANSITION_MS);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [displayedProjects, paginatedProjects, visibleProjectKey]);

  function openFilters() {
    setFiltersMounted(true);
    window.requestAnimationFrame(() => setFiltersOpen(true));
  }

  function closeFilters() {
    setFiltersOpen(false);
    window.setTimeout(() => {
      setFiltersMounted(false);
    }, FILTER_PANEL_TRANSITION_MS);
  }

  function toggleFilters() {
    if (filtersOpen) {
      closeFilters();
      return;
    }

    openFilters();
  }

  return (
    <div className="relative z-10 pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-sm font-mono tracking-[0.3em] text-primary uppercase mb-4">
            Project
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Projects & Case Studies
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            Browse published projects and case studies from the portfolio
            database.
          </p>
        </div>

        <div className="mb-12 flex justify-end border-b border-border/50 pb-8">
          <button
            type="button"
            onClick={toggleFilters}
            aria-expanded={filtersOpen}
            aria-controls="project-filters"
            className={cn(
              "inline-flex w-fit shrink-0 cursor-pointer items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-all",
              filtersOpen || activeFilterCount > 0
                ? "border-primary/50 bg-primary text-primary-foreground shadow-[0_14px_34px_rgba(124,58,237,0.22)]"
                : "border-border/60 bg-secondary/60 text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filter</span>
            {activeFilterCount > 0 ? (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-background/20 px-1.5 text-xs">
                {activeFilterCount}
              </span>
            ) : null}
          </button>
        </div>

        {filtersMounted ? (
          <div
            id="project-filters"
            className={cn(
              "grid overflow-hidden transition-[grid-template-rows,opacity,transform,filter,margin] duration-300 ease-out",
              filtersOpen
                ? "mb-12 grid-rows-[1fr] opacity-100 translate-y-0 blur-0"
                : "mb-0 grid-rows-[0fr] -translate-y-3 opacity-0 blur-sm",
            )}
          >
            <div className="overflow-hidden">
              <div className="rounded-2xl border border-border/50 bg-secondary/25 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                    Project Filters
                  </p>
                  <button
                    type="button"
                    onClick={closeFilters}
                    aria-label="Close filters"
                    className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-border/50 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                      Category
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <FilterButton
                          key={category}
                          active={activeCategory === category}
                          onClick={() => {
                            setActiveCategory(category);
                            setCurrentPage(1);
                          }}
                        >
                          {category}
                        </FilterButton>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                      Source
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {sources.map((source) => (
                        <FilterButton
                          key={source}
                          active={activeSource === source}
                          onClick={() => {
                            setActiveSource(source);
                            setCurrentPage(1);
                          }}
                        >
                          {source}
                        </FilterButton>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                      Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {techStacks.map((techStack) => (
                        <FilterButton
                          key={techStack}
                          active={activeTechStack === techStack}
                          onClick={() => {
                            setActiveTechStack(techStack);
                            setCurrentPage(1);
                          }}
                        >
                          {techStack}
                        </FilterButton>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div
          className={cn(
            "grid md:grid-cols-2 gap-6 transition-all duration-200 ease-out",
            cardsVisible
              ? "opacity-100 translate-y-0 blur-0"
              : "opacity-0 translate-y-2 blur-sm",
          )}
        >
          {displayedProjects.map((project, index) => (
            <div
              key={project.slug}
              className={cn(
                "group/card relative h-full overflow-hidden rounded-2xl border border-border/50 bg-secondary/30 p-5 transition-all duration-500 hover:border-primary/30 hover:bg-secondary/40 hover:shadow-[0_24px_70px_rgba(0,0,0,0.28)]",
                project.lowVisibility && cardsVisible && "opacity-80",
                cardsVisible ? "translate-y-0" : "translate-y-3 opacity-0",
              )}
              style={{ transitionDelay: cardsVisible ? `${index * 35}ms` : "0ms" }}
            >
              <span className="pointer-events-none absolute inset-0 opacity-0 blur-2xl transition-opacity duration-700 group-hover/card:opacity-100 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.28),transparent_42%)]" />
              <div className="relative z-10 flex h-full flex-col">
                <Link
                  href={`/project/${project.slug}`}
                  className="block cursor-pointer"
                >
                  <ProjectPreview
                    image={project.image_url}
                    priority={index === 0}
                    title={project.title}
                  />
                </Link>
                <div className="flex items-start justify-between mb-4 gap-4">
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <span className="text-xs font-mono text-primary px-3 py-1 rounded-full bg-primary/10">
                      {project.category}
                    </span>
                    {project.source ? (
                      <span className="inline-flex min-w-0 items-center gap-1.5 rounded-full border border-border/40 bg-background/45 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors group-hover/card:border-primary/25 group-hover/card:text-foreground">
                        <Building2 className="h-3.5 w-3.5 shrink-0 text-primary/80" />
                        <span className="truncate">{project.source}</span>
                      </span>
                    ) : null}
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <a
                      href={project.repository_url ?? "https://github.com/Z1p4U"}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View ${project.title} code`}
                      className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all cursor-pointer"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    {project.project_url ? (
                      <a
                        href={project.project_url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={
                          project.linkKind === "android"
                            ? `Open ${project.title} on Play Store`
                            : `Visit ${project.title}`
                        }
                        className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all cursor-pointer"
                      >
                        {project.linkKind === "android" ? (
                          <FaGooglePlay className="w-4 h-4" />
                        ) : (
                          <ExternalLink className="w-4 h-4" />
                        )}
                      </a>
                    ) : null}
                  </div>
                </div>

                <Link
                  href={`/project/${project.slug}`}
                  className="block cursor-pointer"
                >
                  <h3 className="text-lg font-bold text-foreground group-hover/card:text-primary transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {project.description}
                  </p>
                </Link>

                <div className="mt-auto flex flex-wrap gap-2 pt-1">
                  {project.tech_stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-mono rounded-full bg-muted text-muted-foreground border border-border/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) =>
                  Math.max(1, Math.min(page, totalPages) - 1),
                )
              }
              disabled={safeCurrentPage === 1}
              className="px-4 py-2 text-sm rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors enabled:cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    "w-9 h-9 cursor-pointer text-sm rounded-full border transition-colors",
                    safeCurrentPage === page
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/40",
                  )}
                >
                  {page}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(totalPages, Math.min(page, totalPages) + 1),
                )
              }
              disabled={safeCurrentPage === totalPages}
              className="px-4 py-2 text-sm rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors enabled:cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}

        <div className="mt-12 p-6 rounded-2xl border border-primary/20 bg-primary/5">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Some work may be private or unpublished. To ask about additional
            examples,{" "}
            <Link href="/contact" className="cursor-pointer text-primary hover:underline">
              contact me
            </Link>{" "}
            directly.
          </p>
        </div>
      </div>
    </div>
  );
}
