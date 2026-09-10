import { hash } from "bcryptjs";

import type {
  ProjectCategoryPayload,
  ProjectPayload,
  ProjectSourcePayload,
  ProjectTechStackPayload,
  ProfilePayload,
} from "../constants/types";
import {
  seedProfile,
  seedExperiences,
  seedProjects,
  seedServices,
  seedSkills,
  makeSeedDetailSections,
} from "./seed-data";
import {
  clearSeededPortfolioData,
  closeDb,
  upsertAdminUser,
} from "../lib/server/db-queries";
import {
  serializeDetailPayload,
  serializeProjectCategoryPayload,
  serializeProjectPayload,
  serializeProjectSourcePayload,
  serializeProjectTechStackPayload,
  slugify,
} from "../lib/server/portfolio";
import { db } from "./db";

const legacyFeaturedProjectOrder = [
  "Iku Team",
  "Golden Eugenia Myanmar",
  "Myat Taw Win",
  "City Hospital Mandalay",
  "Power Nine Group",
  "Zay Yar Lin Photography",
  "India Myanmar Chamber of Commerce",
  "Asia Beauty Paradise",
];

const legacyPinnedLastProjectOrder = [
  "Royal Shambella",
  "Quan Zhu Fuan",
  "OMUK Myanmar",
  "Royal Immigrate",
  "EIKA Marine",
  "Internal Revenue Department (UI Template)",
];

function getLegacyProjectSortOrder(project: ProjectPayload) {
  const pinnedLastIndex = legacyPinnedLastProjectOrder.indexOf(project.title);

  if (pinnedLastIndex >= 0) return 100 + pinnedLastIndex;

  const featuredIndex = legacyFeaturedProjectOrder.indexOf(project.title);

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

function collectProjectCategories(): ProjectCategoryPayload[] {
  const categories = new Map<
    string,
    { isPublished: boolean; sortOrder: number }
  >();

  seedProjects.forEach((project, index) => {
    const name = project.category.trim();
    const current = categories.get(name);
    const isPublished = project.is_published ?? true;

    if (current) {
      current.isPublished = current.isPublished || isPublished;
      return;
    }

    categories.set(name, {
      isPublished,
      sortOrder: index,
    });
  });

  return Array.from(categories.entries()).map(([name, category]) => ({
    name,
    slug: slugify(name),
    description: null,
    sort_order: category.sortOrder,
    is_published: category.isPublished,
  }));
}

function collectProjectSources(): ProjectSourcePayload[] {
  const sources = new Map<string, { isPublished: boolean; sortOrder: number }>();

  seedProjects.forEach((project, index) => {
    const name = project.source?.trim();
    if (!name) return;

    const current = sources.get(name);
    const isPublished = project.is_published ?? true;

    if (current) {
      current.isPublished = current.isPublished || isPublished;
      return;
    }

    sources.set(name, {
      isPublished,
      sortOrder: index,
    });
  });

  return Array.from(sources.entries()).map(([name, source]) => ({
    name,
    slug: slugify(name),
    description: null,
    sort_order: source.sortOrder,
    is_published: source.isPublished,
  }));
}

function collectProjectTechStacks(): ProjectTechStackPayload[] {
  const techStacks = new Map<
    string,
    { isPublished: boolean; sortOrder: number }
  >();

  seedProjects.forEach((project) => {
    project.tech_stack.forEach((stack) => {
      const name = stack.trim();
      if (!name) return;

      const current = techStacks.get(name);
      const isPublished = project.is_published ?? true;

      if (current) {
        current.isPublished = current.isPublished || isPublished;
        return;
      }

      techStacks.set(name, {
        isPublished,
        sortOrder: techStacks.size,
      });
    });
  });

  return Array.from(techStacks.entries()).map(([name, techStack]) => ({
    name,
    slug: slugify(name),
    description: null,
    sort_order: techStack.sortOrder,
    is_published: techStack.isPublished,
  }));
}

async function main() {
  const adminEmail = process.env.PORTFOLIO_ADMIN_EMAIL ?? "zipshigoto310801@gmail.com";
  const adminPassword = process.env.PORTFOLIO_ADMIN_PASSWORD ?? "121212";
  const passwordHash = await hash(adminPassword, 12);

  await upsertAdminUser({
    name: seedProfile.name,
    email: adminEmail,
    passwordHash,
    isAdmin: true,
  });

  await clearSeededPortfolioData();

  const profilePayload: ProfilePayload = {
    name: seedProfile.name,
    headline: seedProfile.headline,
    summary: seedProfile.summary,
    bio: seedProfile.bio,
    email: seedProfile.email,
    phone: seedProfile.phone,
    location: seedProfile.location,
    availability: seedProfile.availability,
    github_url: seedProfile.github_url,
    linkedin_url: seedProfile.linkedin_url,
    cv_url: seedProfile.cv_url,
    years_experience: seedProfile.stats.years_experience,
    clients_count: seedProfile.stats.clients_count,
    projects_count: seedProfile.stats.projects_count,
  };

  await db.orm.public.Profile.create({
    name: profilePayload.name,
    headline: profilePayload.headline,
    summary: profilePayload.summary,
    bio: profilePayload.bio ?? null,
    email: profilePayload.email,
    phone: profilePayload.phone ?? null,
    location: profilePayload.location ?? null,
    availability: profilePayload.availability ?? null,
    githubUrl: profilePayload.github_url ?? null,
    linkedinUrl: profilePayload.linkedin_url ?? null,
    cvUrl: profilePayload.cv_url ?? null,
    yearsExperience: profilePayload.years_experience,
    clientsCount: profilePayload.clients_count,
    projectsCount: profilePayload.projects_count,
  });

  await db.orm.public.ProjectCategory.createAndCount(
    collectProjectCategories().map(serializeProjectCategoryPayload),
  );

  await db.orm.public.ProjectSource.createAndCount(
    collectProjectSources().map(serializeProjectSourcePayload),
  );

  await db.orm.public.ProjectTechStack.createAndCount(
    collectProjectTechStacks().map(serializeProjectTechStackPayload),
  );

  for (const project of seedProjects) {
    const projectSeed = project as ProjectPayload;
    const projectPayload = serializeProjectPayload({
      ...projectSeed,
      sort_order: project.sort_order ?? getLegacyProjectSortOrder(projectSeed),
      is_featured: project.is_featured ?? false,
      is_published: project.is_published ?? true,
    });

    const createdProject = await db.orm.public.Project.create({
      ...projectPayload,
      lowVisibility: project.lowVisibility ?? false,
      linkKind: project.linkKind ?? null,
    });
    const detailSections = project.detail_sections?.length
      ? project.detail_sections
      : makeSeedDetailSections(project);

    await db.orm.public.ProjectDetailSection.createAndCount(
      detailSections.map((section, sectionIndex) => ({
        ...serializeDetailPayload({
          ...section,
          sort_order: section.sort_order ?? sectionIndex,
          is_published: section.is_published ?? true,
        }),
        projectId: createdProject.id,
      })),
    );
  }

  await db.orm.public.Service.createAndCount(
    seedServices.map((service, index) => ({
      title: service.title,
      slug: service.slug,
      summary: service.summary,
      description: service.description ?? null,
      deliverables: JSON.stringify(service.deliverables),
      techStack: JSON.stringify(service.tech_stack),
      sortOrder: index,
      isPublished: true,
    })),
  );

  await db.orm.public.Skill.createAndCount(
    seedSkills.map((skill, index) => ({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      sortOrder: index,
      isPublished: true,
    })),
  );

  await db.orm.public.Experience.createAndCount(
    seedExperiences.map((experience, index) => ({
      period: experience.period,
      title: experience.title,
      company: experience.company ?? null,
      description: experience.description,
      sortOrder: index,
      isPublished: true,
    })),
  );

  console.log("Seeded portfolio data and admin user " + adminEmail + ".");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await closeDb();
  });
