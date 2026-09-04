import { notFound } from "next/navigation";

import { ProjectDetailClient } from "@/page/website/project/detail-page";
import { fallbackProjects, getFallbackProject } from "@/lib/portfolio-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return fallbackProjects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fallbackProject = getFallbackProject(slug);

  if (!fallbackProject) notFound();

  return (
    <ProjectDetailClient
      key={slug}
      slug={slug}
      fallbackProject={fallbackProject}
    />
  );
}
