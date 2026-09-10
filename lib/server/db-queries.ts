import { db } from "@/prisma/db";
import type { FieldOutputTypes } from "@/prisma/schema.d";
import type {
  ContactMessageData,
  ProfileData,
  ProjectData,
  ProjectTaxonomyData,
  ProjectDetailSectionData,
} from "@/lib/server/portfolio";

export type DbModels = FieldOutputTypes["public"];
export type DbUser = DbModels["User"];
export type DbProfile = DbModels["Profile"];
export type DbProject = DbModels["Project"];
export type DbProjectCategory = DbModels["ProjectCategory"];
export type DbProjectDetailSection = DbModels["ProjectDetailSection"];
export type DbProjectSource = DbModels["ProjectSource"];
export type DbProjectTechStack = DbModels["ProjectTechStack"];
export type DbService = DbModels["Service"];
export type DbSkill = DbModels["Skill"];
export type DbExperience = DbModels["Experience"];
export type DbContactMessage = DbModels["ContactMessage"];
export type DbProjectWithSections = DbProject & {
  detailSections?: DbProjectDetailSection[];
};

export function findUserByEmail(email: string) {
  return db.orm.public.User.where({ email: email.toLowerCase().trim() }).first();
}

export function findAdminUserById(id: number) {
  return db.orm.public.User.where({ id, isAdmin: true }).first();
}

export function upsertAdminUser(data: {
  name: string;
  email: string;
  passwordHash: string;
  isAdmin: boolean;
}) {
  return db.orm.public.User.upsert({
    create: data,
    update: {
      name: data.name,
      passwordHash: data.passwordHash,
      isAdmin: data.isAdmin,
    },
    conflictOn: { email: data.email },
  });
}

export function getFirstProfile() {
  return db.orm.public.Profile.orderBy((profile) => profile.id.asc()).first();
}

export async function saveProfile(data: ProfileData) {
  const existingProfile = await db.orm.public.Profile.select("id")
    .orderBy((profile) => profile.id.asc())
    .first();

  if (!existingProfile) return db.orm.public.Profile.create(data);

  const profile = await db.orm.public.Profile.where({ id: existingProfile.id }).update(data);
  if (!profile) throw new Error("Profile disappeared before it could be updated.");

  return profile;
}

type ProjectFilters = {
  category?: string | null;
  source?: string | null;
};

function filteredPublishedProjects(filters: ProjectFilters = {}) {
  const projects = db.orm.public.Project.where({ isPublished: true });
  const byCategory = filters.category && filters.category !== "All"
    ? projects.where({ category: filters.category })
    : projects;

  return filters.source && filters.source !== "All"
    ? byCategory.where({ source: filters.source })
    : byCategory;
}

export async function countPublishedProjects(filters: ProjectFilters = {}) {
  const result = await filteredPublishedProjects(filters).aggregate(
    (aggregate) => ({
      total: aggregate.count(),
    }),
  );

  return result.total;
}

export async function listPublishedProjects(options: {
  category?: string | null;
  source?: string | null;
  skip: number;
  take: number;
}) {
  const filtered = filteredPublishedProjects(options);
  const [featuredTotal, featuredProjects] = await Promise.all([
    filtered.where({ isFeatured: true }).aggregate((aggregate) => ({
      total: aggregate.count(),
    })),
    filtered
      .where({ isFeatured: true })
      .orderBy([
        (project) => project.sortOrder.asc(),
        (project) => project.id.asc(),
      ])
      .offset(options.skip)
      .limit(options.take)
      .all(),
  ]);
  const rows = [...featuredProjects];
  const remaining = options.take - rows.length;

  if (remaining <= 0) return rows;

  const regularSkip = Math.max(options.skip - featuredTotal.total, 0);
  const regularProjects = await filtered
    .where({ isFeatured: false })
    .orderBy([
      (project) => project.sortOrder.asc(),
      (project) => project.id.asc(),
    ])
    .offset(regularSkip)
    .limit(remaining)
    .all();

  return [...rows, ...regularProjects];
}

export function listFeaturedProjects() {
  return db.orm.public.Project.where({ isFeatured: true, isPublished: true })
    .orderBy([
      (project) => project.sortOrder.asc(),
      (project) => project.id.asc(),
    ])
    .all();
}

export function listPublishedProjectCategories() {
  return db.orm.public.ProjectCategory.where({ isPublished: true })
    .orderBy([
      (category) => category.sortOrder.asc(),
      (category) => category.id.asc(),
    ])
    .all();
}

export function listAdminProjectCategories() {
  return db.orm.public.ProjectCategory.orderBy([
    (category) => category.sortOrder.asc(),
    (category) => category.id.asc(),
  ]).all();
}

export function findProjectCategoryById(id: number) {
  return db.orm.public.ProjectCategory.where({ id }).first();
}

export function createProjectCategory(data: ProjectTaxonomyData) {
  return db.orm.public.ProjectCategory.create(data);
}

export async function updateProjectCategory(
  id: number,
  data: ProjectTaxonomyData,
) {
  const existing = await findProjectCategoryById(id);
  if (!existing) return null;

  const category = await db.orm.public.ProjectCategory.where({ id }).update(data);
  if (!category) return null;

  if (existing.name !== category.name) {
    await db.orm.public.Project.where({
      category: existing.name,
    }).updateAndCount({ category: category.name });
  }

  return category;
}

export function deleteProjectCategory(id: number) {
  return db.orm.public.ProjectCategory.where({ id }).delete();
}

export async function countProjectsByCategory(category: string) {
  const result = await db.orm.public.Project.where({ category }).aggregate(
    (aggregate) => ({
      total: aggregate.count(),
    }),
  );

  return result.total;
}

export function listPublishedProjectSources() {
  return db.orm.public.ProjectSource.where({ isPublished: true })
    .orderBy([
      (source) => source.sortOrder.asc(),
      (source) => source.id.asc(),
    ])
    .all();
}

export function listAdminProjectSources() {
  return db.orm.public.ProjectSource.orderBy([
    (source) => source.sortOrder.asc(),
    (source) => source.id.asc(),
  ]).all();
}

export function findProjectSourceById(id: number) {
  return db.orm.public.ProjectSource.where({ id }).first();
}

export function createProjectSource(data: ProjectTaxonomyData) {
  return db.orm.public.ProjectSource.create(data);
}

export async function updateProjectSource(id: number, data: ProjectTaxonomyData) {
  const existing = await findProjectSourceById(id);
  if (!existing) return null;

  const source = await db.orm.public.ProjectSource.where({ id }).update(data);
  if (!source) return null;

  if (existing.name !== source.name) {
    await db.orm.public.Project.where({
      source: existing.name,
    }).updateAndCount({ source: source.name });
  }

  return source;
}

export function deleteProjectSource(id: number) {
  return db.orm.public.ProjectSource.where({ id }).delete();
}

export async function countProjectsBySource(source: string) {
  const result = await db.orm.public.Project.where({ source }).aggregate(
    (aggregate) => ({
      total: aggregate.count(),
    }),
  );

  return result.total;
}

export function listPublishedProjectTechStacks() {
  return db.orm.public.ProjectTechStack.where({ isPublished: true })
    .orderBy([
      (techStack) => techStack.sortOrder.asc(),
      (techStack) => techStack.id.asc(),
    ])
    .all();
}

export function listAdminProjectTechStacks() {
  return db.orm.public.ProjectTechStack.orderBy([
    (techStack) => techStack.sortOrder.asc(),
    (techStack) => techStack.id.asc(),
  ]).all();
}

export function findProjectTechStackById(id: number) {
  return db.orm.public.ProjectTechStack.where({ id }).first();
}

export function createProjectTechStack(data: ProjectTaxonomyData) {
  return db.orm.public.ProjectTechStack.create(data);
}

export async function updateProjectTechStack(
  id: number,
  data: ProjectTaxonomyData,
) {
  const existing = await findProjectTechStackById(id);
  if (!existing) return null;

  const techStack = await db.orm.public.ProjectTechStack.where({ id }).update(
    data,
  );
  if (!techStack) return null;

  if (existing.name !== techStack.name) {
    await replaceProjectTechStack(existing.name, techStack.name);
  }

  return techStack;
}

export function deleteProjectTechStack(id: number) {
  return db.orm.public.ProjectTechStack.where({ id }).delete();
}

export async function countProjectsByTechStack(techStack: string) {
  const projects = await db.orm.public.Project.select("techStack").all();

  return projects.filter((project) =>
    parseProjectTechStacks(project.techStack).includes(techStack),
  ).length;
}

async function replaceProjectTechStack(currentName: string, nextName: string) {
  const projects = await db.orm.public.Project.all();
  const updates = projects
    .map((project) => {
      const techStacks = parseProjectTechStacks(project.techStack);
      if (!techStacks.includes(currentName)) return null;

      return db.orm.public.Project.where({ id: project.id }).update({
        techStack: JSON.stringify(
          techStacks.map((techStack) =>
            techStack === currentName ? nextName : techStack,
          ),
        ),
      });
    })
    .filter((update) => update !== null);

  await Promise.all(updates);
}

function parseProjectTechStacks(value: string | null | undefined) {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((item) => (typeof item === "string" ? item.trim() : String(item)))
      .filter(Boolean);
  } catch {
    return [];
  }
}

export function findPublishedProjectWithSections(slug: string) {
  return db.orm.public.Project.where({ slug, isPublished: true })
    .include("detailSections", (sections) =>
      sections
        .where({ isPublished: true })
        .orderBy([
          (section) => section.sortOrder.asc(),
          (section) => section.id.asc(),
        ]),
    )
    .first() as Promise<DbProjectWithSections | null>;
}

export async function countAdminProjects() {
  const result = await db.orm.public.Project.aggregate((aggregate) => ({
    total: aggregate.count(),
  }));

  return result.total;
}

export async function listAdminProjects(options: { skip: number; take: number }) {
  const projects = db.orm.public.Project.include("detailSections", (sections) =>
    sections.orderBy([
      (section) => section.sortOrder.asc(),
      (section) => section.id.asc(),
    ]),
  );
  const [featuredTotal, featuredProjects] = await Promise.all([
    db.orm.public.Project.where({ isFeatured: true }).aggregate((aggregate) => ({
      total: aggregate.count(),
    })),
    projects
      .where({ isFeatured: true })
      .orderBy([
        (project) => project.sortOrder.asc(),
        (project) => project.id.asc(),
      ])
      .offset(options.skip)
      .limit(options.take)
      .all(),
  ]);
  const rows = [...featuredProjects];
  const remaining = options.take - rows.length;

  if (remaining <= 0) return rows as DbProjectWithSections[];

  const regularSkip = Math.max(options.skip - featuredTotal.total, 0);
  const regularProjects = await projects
    .where({ isFeatured: false })
    .orderBy([
      (project) => project.sortOrder.asc(),
      (project) => project.id.asc(),
    ])
    .offset(regularSkip)
    .limit(remaining)
    .all();

  return [...rows, ...regularProjects] as DbProjectWithSections[];
}

export async function createProject(data: ProjectData) {
  const project = await db.orm.public.Project.create({
    ...data,
    lowVisibility: data.lowVisibility ?? false,
    linkKind: data.linkKind ?? null,
  });

  return findProjectWithSectionsById(project.id);
}

export async function updateProject(id: number, data: ProjectData) {
  const project = await db.orm.public.Project.where({ id }).update({
    ...data,
    ...(data.lowVisibility === undefined
      ? {}
      : { lowVisibility: data.lowVisibility }),
    ...(data.linkKind === undefined ? {} : { linkKind: data.linkKind }),
  });

  if (!project) return null;
  return findProjectWithSectionsById(project.id);
}

export function findProjectId(id: number) {
  return db.orm.public.Project.select("id").where({ id }).first();
}

export function deleteProject(id: number) {
  return db.orm.public.Project.where({ id }).delete();
}

export function findProjectWithSectionsById(id: number) {
  return db.orm.public.Project.where({ id })
    .include("detailSections", (sections) =>
      sections.orderBy([
        (section) => section.sortOrder.asc(),
        (section) => section.id.asc(),
      ]),
    )
    .first() as Promise<DbProjectWithSections | null>;
}

export function listProjectDetailSections(projectId: number) {
  return db.orm.public.ProjectDetailSection.where({ projectId })
    .orderBy([
      (section) => section.sortOrder.asc(),
      (section) => section.id.asc(),
    ])
    .all();
}

export function createProjectDetailSection(
  projectId: number,
  data: ProjectDetailSectionData,
) {
  return db.orm.public.ProjectDetailSection.create({
    ...data,
    projectId,
  });
}

export function findProjectDetailSectionId(id: number, projectId: number) {
  return db.orm.public.ProjectDetailSection.select("id")
    .where({ id, projectId })
    .first();
}

export function updateProjectDetailSection(
  id: number,
  data: ProjectDetailSectionData,
) {
  return db.orm.public.ProjectDetailSection.where({ id }).update(data);
}

export function deleteProjectDetailSection(id: number) {
  return db.orm.public.ProjectDetailSection.where({ id }).delete();
}

export function listPublishedServices() {
  return db.orm.public.Service.where({ isPublished: true })
    .orderBy([
      (service) => service.sortOrder.asc(),
      (service) => service.id.asc(),
    ])
    .all();
}

export function listPublishedSkills() {
  return db.orm.public.Skill.where({ isPublished: true })
    .orderBy([
      (skill) => skill.sortOrder.asc(),
      (skill) => skill.id.asc(),
    ])
    .all();
}

export function listPublishedExperiences() {
  return db.orm.public.Experience.where({ isPublished: true })
    .orderBy([
      (experience) => experience.sortOrder.asc(),
      (experience) => experience.id.asc(),
    ])
    .all();
}

export function findDuplicateContactMessage(data: ContactMessageData) {
  const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString();

  return db.orm.public.ContactMessage.where({
    email: data.email,
    subject: data.subject,
    message: data.message,
  })
    .where((message) => message.createdAt.gte(fifteenMinutesAgo))
    .orderBy((message) => message.createdAt.desc())
    .first();
}

export function createContactMessage(data: ContactMessageData) {
  return db.orm.public.ContactMessage.create(data);
}

export async function countContactMessages(status?: string | null) {
  const result = status
    ? await db.orm.public.ContactMessage.where({ status }).aggregate(
        (aggregate) => ({
          total: aggregate.count(),
        }),
      )
    : await db.orm.public.ContactMessage.aggregate((aggregate) => ({
        total: aggregate.count(),
      }));

  return result.total;
}

export function listContactMessages(options: {
  status?: string | null;
  skip: number;
  take: number;
}) {
  const messages = options.status
    ? db.orm.public.ContactMessage.where({ status: options.status })
    : db.orm.public.ContactMessage;

  return messages
    .orderBy([
      (message) => message.createdAt.desc(),
      (message) => message.id.desc(),
    ])
    .offset(options.skip)
    .limit(options.take)
    .all();
}

export function findContactMessageId(id: number) {
  return db.orm.public.ContactMessage.select("id").where({ id }).first();
}

export function markContactMessageRead(id: number) {
  return db.orm.public.ContactMessage.where({ id }).update({
    status: "read",
    readAt: new Date().toISOString(),
  });
}

export function deleteContactMessage(id: number) {
  return db.orm.public.ContactMessage.where({ id }).delete();
}

export async function clearSeededPortfolioData() {
  await db.orm.public.ProjectDetailSection.where((section) => section.id.gte(0)).deleteAndCount();
  await db.orm.public.Project.where((project) => project.id.gte(0)).deleteAndCount();
  await db.orm.public.ProjectCategory.where((category) => category.id.gte(0)).deleteAndCount();
  await db.orm.public.ProjectSource.where((source) => source.id.gte(0)).deleteAndCount();
  await db.orm.public.ProjectTechStack.where((techStack) => techStack.id.gte(0)).deleteAndCount();
  await db.orm.public.Service.where((service) => service.id.gte(0)).deleteAndCount();
  await db.orm.public.Skill.where((skill) => skill.id.gte(0)).deleteAndCount();
  await db.orm.public.Experience.where((experience) => experience.id.gte(0)).deleteAndCount();
  await db.orm.public.Profile.where((profile) => profile.id.gte(0)).deleteAndCount();
}

export function closeDb() {
  return db.close();
}
