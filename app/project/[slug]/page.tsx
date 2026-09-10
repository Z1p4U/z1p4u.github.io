import { notFound } from "next/navigation";

import { ProjectDetailClient } from "@/page/website/project/detail-page";
import { findPublishedProjectWithSections } from "@/lib/server/db-queries";
import { mapProject } from "@/lib/server/portfolio";
import type { PortfolioProject } from "@/constants/types";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectForPage(slug);

  if (!project) notFound();

  return (
    <ProjectDetailClient
      key={slug}
      slug={slug}
      initialProject={project}
    />
  );
}

async function getProjectForPage(slug: string): Promise<PortfolioProject | null> {
  try {
    const project = await findPublishedProjectWithSections(slug);
    if (project) return mapProject(project);
  } catch {
    return null;
  }

  return null;
}
