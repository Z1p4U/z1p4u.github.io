import type {
  DbContactMessage,
  DbExperience,
  DbProfile,
  DbProject,
  DbProjectCategory,
  DbProjectDetailSection,
  DbProjectSource,
  DbProjectTechStack,
  DbService,
  DbSkill,
} from "@/lib/server/db-queries";
import type {
  ContactMessage,
  PortfolioExperience,
  PortfolioProfile,
  PortfolioProject,
  PortfolioService,
  PortfolioSkill,
  ProjectCategory,
  ProjectCategoryPayload,
  ProjectDetailSection,
  ProjectDetailSectionPayload,
  ProjectPayload,
  ProjectSource,
  ProjectSourcePayload,
  ProjectTechStack,
  ProjectTechStackPayload,
} from "@/constants/types";
import type { FieldErrors } from "@/lib/server/http";

type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; errors: FieldErrors };

type ContactMessageValidationResult =
  | { ok: true; data: ContactMessageData; spam: false }
  | { ok: true; data: null; spam: true }
  | { ok: false; errors: FieldErrors };

type ProjectWithSections = DbProject & {
  detailSections?: DbProjectDetailSection[];
};

export type ProfileData = {
  name: string;
  headline: string;
  summary: string;
  bio: string | null;
  email: string;
  phone: string | null;
  location: string | null;
  availability: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  cvUrl: string | null;
  yearsExperience: number;
  clientsCount: number;
  projectsCount: number;
};

export type ProjectData = {
  title: string;
  slug: string;
  description: string;
  category: string;
  source: string | null;
  year: string | null;
  projectUrl: string | null;
  repositoryUrl: string | null;
  imageUrl: string | null;
  techStack: string;
  sortOrder: number;
  isFeatured: boolean;
  isPublished: boolean;
  lowVisibility?: boolean;
  linkKind?: string | null;
};

export type ProjectDetailSectionData = {
  blockType: ProjectDetailSection["block_type"];
  layout: ProjectDetailSection["layout"];
  title: string;
  body: string;
  imageUrl: string | null;
  imageAlt: string | null;
  caption: string | null;
  externalUrl: string | null;
  metadata: string | null;
  sortOrder: number;
  isPublished: boolean;
};

export type ProjectTaxonomyData = {
  name: string;
  slug: string;
  description: string | null;
  sortOrder: number;
  isPublished: boolean;
};

export type ContactMessageData = {
  name: string;
  email: string;
  phone: string | null;
  budget: string | null;
  subject: string;
  message: string;
};

const detailBlockTypes = [
  "overview",
  "challenge",
  "contribution",
  "implementation",
  "result",
] as const;

const detailLayouts = [
  "image_left",
  "image_right",
  "full_width",
  "text_only",
] as const;

const contactStatuses = ["unread", "read", "archived"] as const;

const CONTACT_MIN_SUBMIT_TIME_MS = 1500;
const CONTACT_MAX_SUBMIT_TIME_MS = 2 * 60 * 60 * 1000;

export function mapProfile(profile: DbProfile): PortfolioProfile {
  return {
    id: profile.id,
    name: profile.name,
    headline: profile.headline,
    summary: profile.summary,
    bio: profile.bio,
    email: profile.email,
    phone: profile.phone,
    location: profile.location,
    availability: profile.availability,
    github_url: profile.githubUrl,
    linkedin_url: profile.linkedinUrl,
    cv_url: profile.cvUrl,
    stats: {
      years_experience: profile.yearsExperience,
      clients_count: profile.clientsCount,
      projects_count: profile.projectsCount,
    },
  };
}

export function mapProject(project: ProjectWithSections): PortfolioProject {
  return {
    id: project.id,
    title: project.title,
    slug: project.slug,
    description: project.description,
    category: project.category,
    source: project.source,
    year: project.year,
    project_url: project.projectUrl,
    repository_url: project.repositoryUrl,
    image_url: project.imageUrl,
    tech_stack: parseStringList(project.techStack),
    sort_order: project.sortOrder,
    is_featured: project.isFeatured,
    is_published: project.isPublished,
    lowVisibility: project.lowVisibility,
    linkKind: project.linkKind === "android" ? "android" : undefined,
    detail_sections: project.detailSections?.map(mapProjectDetailSection),
  };
}

export function mapProjectDetailSection(
  section: DbProjectDetailSection,
): ProjectDetailSection {
  return {
    id: section.id,
    project_id: section.projectId,
    block_type: toDetailBlockType(section.blockType),
    layout: toDetailLayout(section.layout),
    title: section.title,
    body: section.body,
    image_url: section.imageUrl,
    image_alt: section.imageAlt,
    caption: section.caption,
    external_url: section.externalUrl,
    metadata: parseMetadata(section.metadata),
    sort_order: section.sortOrder,
    is_published: section.isPublished,
  };
}

export function mapProjectCategory(category: DbProjectCategory): ProjectCategory {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    sort_order: category.sortOrder,
    is_published: category.isPublished,
  };
}

export function mapProjectSource(source: DbProjectSource): ProjectSource {
  return {
    id: source.id,
    name: source.name,
    slug: source.slug,
    description: source.description,
    sort_order: source.sortOrder,
    is_published: source.isPublished,
  };
}

export function mapProjectTechStack(
  techStack: DbProjectTechStack,
): ProjectTechStack {
  return {
    id: techStack.id,
    name: techStack.name,
    slug: techStack.slug,
    description: techStack.description,
    sort_order: techStack.sortOrder,
    is_published: techStack.isPublished,
  };
}

export function mapService(service: DbService): PortfolioService {
  return {
    id: service.id,
    title: service.title,
    slug: service.slug,
    summary: service.summary,
    description: service.description,
    deliverables: parseStringList(service.deliverables),
    tech_stack: parseStringList(service.techStack),
  };
}

export function mapSkill(skill: DbSkill): PortfolioSkill {
  return {
    id: skill.id,
    name: skill.name,
    category: skill.category,
    proficiency: skill.proficiency,
  };
}

export function mapExperience(experience: DbExperience): PortfolioExperience {
  return {
    id: experience.id,
    period: experience.period,
    title: experience.title,
    company: experience.company,
    description: experience.description,
  };
}

export function mapContactMessage(message: DbContactMessage): ContactMessage {
  return {
    id: message.id,
    name: message.name,
    email: message.email,
    phone: message.phone,
    budget: message.budget,
    subject: message.subject,
    message: message.message,
    status: toContactStatus(message.status),
    read_at: toIsoString(message.readAt),
    created_at: toIsoString(message.createdAt) ?? "",
  };
}

export function parseProfilePayload(
  payload: unknown,
): ValidationResult<ProfileData> {
  const record = asRecord(payload);
  if (!record) return invalidBody();

  const errors: FieldErrors = {};
  const name = requiredText(record, "name", errors);
  const headline = requiredText(record, "headline", errors);
  const summary = requiredText(record, "summary", errors);
  const email = requiredEmail(record, "email", errors);

  if (hasErrors(errors)) return { ok: false, errors };

  return {
    ok: true,
    data: {
      name,
      headline,
      summary,
      bio: optionalText(record, "bio"),
      email,
      phone: optionalText(record, "phone"),
      location: optionalText(record, "location"),
      availability: optionalText(record, "availability"),
      githubUrl: optionalText(record, "github_url"),
      linkedinUrl: optionalText(record, "linkedin_url"),
      cvUrl: optionalText(record, "cv_url"),
      yearsExperience: numberField(record, "years_experience", 0),
      clientsCount: numberField(record, "clients_count", 0),
      projectsCount: numberField(record, "projects_count", 0),
    },
  };
}

export function parseProjectPayload(
  payload: unknown,
): ValidationResult<ProjectData> {
  const record = asRecord(payload);
  if (!record) return invalidBody();

  const errors: FieldErrors = {};
  const title = requiredText(record, "title", errors);
  const description = requiredText(record, "description", errors);
  const category = requiredText(record, "category", errors);
  const slug = optionalText(record, "slug") ?? slugify(title);

  if (!slug) errors.slug = ["A slug is required."];
  if (hasErrors(errors)) return { ok: false, errors };

  return {
    ok: true,
    data: {
      title,
      slug,
      description,
      category,
      source: optionalText(record, "source"),
      year: optionalText(record, "year"),
      projectUrl: optionalText(record, "project_url"),
      repositoryUrl: optionalText(record, "repository_url"),
      imageUrl: optionalText(record, "image_url"),
      techStack: serializeStringList(record.tech_stack),
      sortOrder: numberField(record, "sort_order", 0),
      isFeatured: booleanField(record, "is_featured", false),
      isPublished: booleanField(record, "is_published", true),
    },
  };
}

export function parseProjectDetailPayload(
  payload: unknown,
): ValidationResult<ProjectDetailSectionData> {
  const record = asRecord(payload);
  if (!record) return invalidBody();

  const errors: FieldErrors = {};
  const title = requiredText(record, "title", errors);
  const body = requiredText(record, "body", errors);
  const blockType = enumField(
    record,
    "block_type",
    detailBlockTypes,
    "contribution",
  );
  const layout = enumField(record, "layout", detailLayouts, "image_right");

  if (hasErrors(errors)) return { ok: false, errors };

  return {
    ok: true,
    data: {
      blockType,
      layout,
      title,
      body,
      imageUrl: optionalText(record, "image_url"),
      imageAlt: optionalText(record, "image_alt"),
      caption: optionalText(record, "caption"),
      externalUrl: optionalText(record, "external_url"),
      metadata: serializeMetadata(record.metadata),
      sortOrder: numberField(record, "sort_order", 0),
      isPublished: booleanField(record, "is_published", true),
    },
  };
}

export function parseProjectCategoryPayload(
  payload: unknown,
): ValidationResult<ProjectTaxonomyData> {
  return parseProjectTaxonomyPayload(payload);
}

export function parseProjectSourcePayload(
  payload: unknown,
): ValidationResult<ProjectTaxonomyData> {
  return parseProjectTaxonomyPayload(payload);
}

export function parseProjectTechStackPayload(
  payload: unknown,
): ValidationResult<ProjectTaxonomyData> {
  return parseProjectTaxonomyPayload(payload);
}

export function parseContactMessagePayload(
  payload: unknown,
): ContactMessageValidationResult {
  const record = asRecord(payload);
  if (!record) {
    return {
      ok: false,
      errors: {
        body: ["Request body must be a JSON object."],
      },
    };
  }

  const honeypot = optionalText(record, "website");
  if (honeypot) return { ok: true, data: null, spam: true };

  const errors: FieldErrors = {};
  const name = requiredText(record, "name", errors);
  const email = requiredEmail(record, "email", errors);
  const subject = requiredText(record, "subject", errors);
  const message = requiredText(record, "message", errors);
  const phone = optionalText(record, "phone");
  const budget = optionalText(record, "budget");
  const startedAt = timestampField(record, "form_started_at");

  limitLength("name", name, 100, errors);
  limitLength("email", email, 190, errors);
  limitLength("phone", phone, 40, errors);
  limitLength("budget", budget, 80, errors);
  limitLength("subject", subject, 160, errors);
  limitLength("message", message, 4000, errors);

  if (message && message.length < 10) {
    errors.message = ["Please include a little more detail."];
  }

  if (countUrls(`${name} ${subject}`) > 0) {
    errors.subject = ["Please keep links inside the message body."];
  }

  if (countUrls(message) > 3) {
    errors.message = ["Please include at most three links."];
  }

  if (hasLongRepeatedRun(message)) {
    errors.message = ["Please enter a readable message."];
  }

  if (!startedAt) {
    errors.form_started_at = ["Invalid form submission."];
  } else {
    const elapsed = Date.now() - startedAt.getTime();

    if (elapsed < CONTACT_MIN_SUBMIT_TIME_MS) {
      return { ok: true, data: null, spam: true };
    }

    if (elapsed > CONTACT_MAX_SUBMIT_TIME_MS) {
      errors.form_started_at = ["Please refresh the page and try again."];
    }
  }

  if (hasErrors(errors)) return { ok: false, errors };

  return {
    ok: true,
    spam: false,
    data: {
      name,
      email,
      phone,
      budget,
      subject,
      message,
    },
  };
}

export function serializeProjectPayload(project: ProjectPayload): ProjectData {
  return {
    title: project.title,
    slug: project.slug,
    description: project.description,
    category: project.category,
    source: project.source ?? null,
    year: project.year ?? null,
    projectUrl: project.project_url ?? null,
    repositoryUrl: project.repository_url ?? null,
    imageUrl: project.image_url ?? null,
    techStack: serializeStringList(project.tech_stack),
    sortOrder: project.sort_order ?? 0,
    isFeatured: project.is_featured ?? false,
    isPublished: project.is_published ?? true,
  };
}

export function serializeProjectCategoryPayload(
  category: ProjectCategoryPayload,
): ProjectTaxonomyData {
  return serializeProjectTaxonomyPayload(category);
}

export function serializeProjectSourcePayload(
  source: ProjectSourcePayload,
): ProjectTaxonomyData {
  return serializeProjectTaxonomyPayload(source);
}

export function serializeProjectTechStackPayload(
  techStack: ProjectTechStackPayload,
): ProjectTaxonomyData {
  return serializeProjectTaxonomyPayload(techStack);
}

export function serializeDetailPayload(
  section: ProjectDetailSectionPayload,
): ProjectDetailSectionData {
  return {
    blockType: section.block_type,
    layout: section.layout,
    title: section.title,
    body: section.body,
    imageUrl: section.image_url ?? null,
    imageAlt: section.image_alt ?? null,
    caption: section.caption ?? null,
    externalUrl: section.external_url ?? null,
    metadata: serializeMetadata(section.metadata),
    sortOrder: section.sort_order ?? 0,
    isPublished: section.is_published ?? true,
  };
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseStringList(value: string | null | undefined) {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? normalizeStringList(parsed) : [];
  } catch {
    return [];
  }
}

function serializeStringList(value: unknown) {
  return JSON.stringify(normalizeStringList(value));
}

function normalizeStringList(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === "string" ? item.trim() : String(item)))
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function parseMetadata(value: string | null | undefined) {
  if (!value) return undefined;

  try {
    const parsed = JSON.parse(value);
    return asRecord(parsed) ?? undefined;
  } catch {
    return undefined;
  }
}

function serializeMetadata(value: unknown) {
  if (!value) return null;
  const record = asRecord(value);
  return record ? JSON.stringify(record) : null;
}

function toDetailBlockType(value: string): ProjectDetailSection["block_type"] {
  return detailBlockTypes.includes(
    value as ProjectDetailSection["block_type"],
  )
    ? (value as ProjectDetailSection["block_type"])
    : "contribution";
}

function toDetailLayout(value: string): ProjectDetailSection["layout"] {
  return detailLayouts.includes(value as ProjectDetailSection["layout"])
    ? (value as ProjectDetailSection["layout"])
    : "image_right";
}

function toContactStatus(value: string): ContactMessage["status"] {
  return contactStatuses.includes(value as ContactMessage["status"])
    ? (value as ContactMessage["status"])
    : "unread";
}

function parseProjectTaxonomyPayload(
  payload: unknown,
): ValidationResult<ProjectTaxonomyData> {
  const record = asRecord(payload);
  if (!record) return invalidBody();

  const errors: FieldErrors = {};
  const name = requiredText(record, "name", errors);
  const slug = optionalText(record, "slug") ?? slugify(name);

  if (!slug) errors.slug = ["A slug is required."];
  if (hasErrors(errors)) return { ok: false, errors };

  return {
    ok: true,
    data: {
      name,
      slug,
      description: optionalText(record, "description"),
      sortOrder: numberField(record, "sort_order", 0),
      isPublished: booleanField(record, "is_published", true),
    },
  };
}

function serializeProjectTaxonomyPayload(
  taxonomy:
    | ProjectCategoryPayload
    | ProjectSourcePayload
    | ProjectTechStackPayload,
): ProjectTaxonomyData {
  return {
    name: taxonomy.name,
    slug: taxonomy.slug || slugify(taxonomy.name),
    description: taxonomy.description ?? null,
    sortOrder: taxonomy.sort_order ?? 0,
    isPublished: taxonomy.is_published ?? true,
  };
}

function enumField<T extends readonly string[]>(
  record: Record<string, unknown>,
  field: string,
  values: T,
  fallback: T[number],
) {
  const value = optionalText(record, field);
  return values.includes(value ?? "") ? (value as T[number]) : fallback;
}

function requiredText(
  record: Record<string, unknown>,
  field: string,
  errors: FieldErrors,
) {
  const value = optionalText(record, field);
  if (value) return value;

  errors[field] = ["This field is required."];
  return "";
}

function requiredEmail(
  record: Record<string, unknown>,
  field: string,
  errors: FieldErrors,
) {
  const value = requiredText(record, field, errors);
  if (!value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return value;

  errors[field] = ["Enter a valid email address."];
  return value;
}

function optionalText(record: Record<string, unknown>, field: string) {
  const value = record[field];
  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function numberField(
  record: Record<string, unknown>,
  field: string,
  fallback: number,
) {
  const value = record[field];
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function booleanField(
  record: Record<string, unknown>,
  field: string,
  fallback: boolean,
) {
  const value = record[field];
  return typeof value === "boolean" ? value : fallback;
}

function timestampField(record: Record<string, unknown>, field: string) {
  const value = record[field];
  const parsed =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number(value)
        : Number.NaN;

  if (!Number.isFinite(parsed)) return null;

  const date = new Date(parsed);
  return Number.isNaN(date.getTime()) ? null : date;
}

function limitLength(
  field: string,
  value: string | null,
  maxLength: number,
  errors: FieldErrors,
) {
  if (!value || value.length <= maxLength) return;

  errors[field] = [`Please keep this under ${maxLength} characters.`];
}

function countUrls(value: string | null) {
  if (!value) return 0;

  return value.match(/https?:\/\/|www\./gi)?.length ?? 0;
}

function hasLongRepeatedRun(value: string | null) {
  if (!value) return false;

  return /(.)\1{24,}/.test(value);
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function invalidBody<T>(): ValidationResult<T> {
  return {
    ok: false,
    errors: {
      body: ["Request body must be a JSON object."],
    },
  };
}

function hasErrors(errors: FieldErrors) {
  return Object.keys(errors).length > 0;
}

function toIsoString(value: Date | string | null | undefined) {
  if (!value) return null;
  return value instanceof Date ? value.toISOString() : value;
}
