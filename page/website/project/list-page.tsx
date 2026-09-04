"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Building2, ExternalLink, Github } from "lucide-react";
import { FaGooglePlay } from "react-icons/fa6";

import { usePortfolioProjects } from "@/hooks/use-public-portfolio";
import type { PortfolioProject } from "@/constants/types";
import { cn } from "@/lib/utils";

const PROJECTS_PER_PAGE = 8;

const featuredProjectOrder = [
  "Iku Team",
  "Golden Eugenia Myanmar",
  "Myat Taw Win",
  "City Hospital Mandalay",
  "Power Nine Group",
  "Zay Yar Lin Photography",
  "India Myanmar Chamber of Commerce",
  "Asia Beauty Paradise",
];

const pinnedLastProjectOrder = [
  "Royal Shambella",
  "Quan Zhu Fuan",
  "OMUK Myanmar",
  "Royal Immigrate",
  "EIKA Marine",
  "Internal Revenue Department (UI Template)",
];

function getProjectSortRank(project: PortfolioProject) {
  const pinnedLastIndex = pinnedLastProjectOrder.indexOf(project.title);

  if (pinnedLastIndex >= 0) return 100 + pinnedLastIndex;

  const featuredIndex = featuredProjectOrder.indexOf(project.title);

  if (featuredIndex >= 0) return featuredIndex;
  if (project.tech_stack.includes("WordPress CMS")) return 20;
  if (
    project.tech_stack.some((tech) =>
      ["React", "Next.js", "React Native", "Redux"].includes(tech),
    )
  ) {
    return 40;
  }
  if (project.tech_stack.includes("HTML")) return 60;

  return project.sort_order ?? 80;
}

function ProjectPreview({
  image,
  title,
}: {
  image?: string | null;
  title: string;
}) {
  return (
    <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-xl border border-border/40 bg-background/60">
      {image ? (
        <Image
          src={image}
          alt={`${title} website preview`}
          fill
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

export default function ProjectsPage() {
  const { projects } = usePortfolioProjects();
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(projects.map((project) => project.category).filter(Boolean)),
    );
    return ["All", ...uniqueCategories];
  }, [projects]);

  const orderedProjects = useMemo(() => {
    return [...projects].sort(
      (a, b) => getProjectSortRank(a) - getProjectSortRank(b),
    );
  }, [projects]);

  const filtered =
    activeCategory === "All"
      ? orderedProjects
      : orderedProjects.filter((project) => project.category === activeCategory);

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / PROJECTS_PER_PAGE),
  );
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedProjects = filtered.slice(
    (safeCurrentPage - 1) * PROJECTS_PER_PAGE,
    safeCurrentPage * PROJECTS_PER_PAGE,
  );

  return (
    <div className="relative z-10 pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-sm font-mono tracking-[0.3em] text-primary uppercase mb-4">
            My Work
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Projects & Case Studies
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            Real client projects across WordPress, React, React Native, and
            business-focused website builds. Each project can now include
            editable contribution notes, implementation details, and visual
            sections from the Laravel backend.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setCurrentPage(1);
              }}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-muted border border-border/50",
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {paginatedProjects.map((project) => (
            <div
              key={project.slug}
              className={cn(
                "group/card relative h-full overflow-hidden rounded-2xl border border-border/50 bg-secondary/30 p-5 transition-all duration-500 hover:border-primary/30 hover:bg-secondary/40 hover:shadow-[0_24px_70px_rgba(0,0,0,0.28)]",
                project.lowVisibility && "opacity-80",
              )}
            >
              <span className="pointer-events-none absolute inset-0 opacity-0 blur-2xl transition-opacity duration-700 group-hover/card:opacity-100 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.28),transparent_42%)]" />
              <div className="relative z-10 flex h-full flex-col">
                <Link
                  href={`/project/detail?slug=${project.slug}`}
                  className="block"
                >
                  <ProjectPreview image={project.image_url} title={project.title} />
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
                      className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
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
                        className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
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
                  href={`/project/detail?slug=${project.slug}`}
                  className="block"
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
              className="px-4 py-2 text-sm rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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
                    "w-9 h-9 text-sm rounded-full border transition-colors",
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
              className="px-4 py-2 text-sm rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}

        <div className="mt-12 p-6 rounded-2xl border border-primary/20 bg-primary/5">
          <p className="text-sm text-muted-foreground leading-relaxed">
            I also have in-house POS systems, HR software, and internal apps
            that are still in development or private by owner policy. If you
            want to review those examples,{" "}
            <Link href="/contact" className="text-primary hover:underline">
              contact me personally
            </Link>{" "}
            and I can share demos when owner permission is available.
          </p>
        </div>
      </div>
    </div>
  );
}
