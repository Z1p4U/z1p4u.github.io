import type {
  PortfolioProject,
  ProjectDetailSection,
  ProjectPayload,
} from "@/constants/types";

import type { DetailFormState, ProjectFormState } from "../types";

export function splitList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function nullable(value: string) {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function projectToForm(project: PortfolioProject): ProjectFormState {
  return {
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
  };
}

export function projectToPayload(projectForm: ProjectFormState): ProjectPayload {
  return {
    title: projectForm.title,
    slug: projectForm.slug || slugify(projectForm.title),
    description: projectForm.description,
    category: projectForm.category,
    source: nullable(projectForm.source),
    year: nullable(projectForm.year),
    project_url: nullable(projectForm.project_url),
    repository_url: nullable(projectForm.repository_url),
    image_url: nullable(projectForm.image_url),
    tech_stack: splitList(projectForm.tech_stack),
    sort_order: Number(projectForm.sort_order || 0),
    is_featured: projectForm.is_featured,
    is_published: projectForm.is_published,
  };
}

export function sectionToForm(section: ProjectDetailSection): DetailFormState {
  return {
    id: section.id,
    block_type: section.block_type,
    layout: section.layout,
    title: section.title,
    body: section.body,
    image_url: section.image_url ?? "",
    image_alt: section.image_alt ?? "",
    caption: section.caption ?? "",
    external_url: section.external_url ?? "",
    sort_order: String(section.sort_order ?? 0),
    is_published: section.is_published ?? true,
  };
}

export function statusText(isLoading: boolean, label = "Saving...") {
  return isLoading ? label : null;
}
