import axiosInstance from "@/constants/axios";
import { endpoints } from "@/constants/endpoints";
import type {
  ApiEnvelope,
  PaginatedData,
  PortfolioExperience,
  PortfolioOverview,
  PortfolioProject,
  PortfolioService,
  PortfolioSkill,
  ProjectCategory,
  ProjectSource,
  ProjectTechStack,
} from "@/constants/types";

async function getJson<T>(path: string): Promise<T> {
  const response = await axiosInstance.get<T>(path);
  return response.data;
}

export async function fetchPortfolioOverview(): Promise<PortfolioOverview> {
  try {
    const response = await getJson<ApiEnvelope<PortfolioOverview>>(
      endpoints.PORTFOLIO,
    );
    return response.data;
  } catch {
    return {
      profile: null,
      featured_projects: [],
      services: [],
      skills: [],
      experiences: [],
    };
  }
}

export async function fetchProjects(): Promise<PortfolioProject[]> {
  try {
    const response =
      await getJson<ApiEnvelope<PaginatedData<PortfolioProject>>>(
        `${endpoints.PROJECTS}?per_page=100`,
      );
    return response.data.data;
  } catch {
    return [];
  }
}

export async function fetchProjectCategories(): Promise<ProjectCategory[]> {
  try {
    const response = await getJson<ApiEnvelope<ProjectCategory[]>>(
      endpoints.PROJECT_CATEGORIES,
    );
    return response.data;
  } catch {
    return [];
  }
}

export async function fetchProjectSources(): Promise<ProjectSource[]> {
  try {
    const response = await getJson<ApiEnvelope<ProjectSource[]>>(
      endpoints.PROJECT_SOURCES,
    );
    return response.data;
  } catch {
    return [];
  }
}

export async function fetchProjectTechStacks(): Promise<ProjectTechStack[]> {
  try {
    const response = await getJson<ApiEnvelope<ProjectTechStack[]>>(
      endpoints.PROJECT_TECH_STACKS,
    );
    return response.data;
  } catch {
    return [];
  }
}

export async function fetchProject(slug: string): Promise<PortfolioProject | null> {
  try {
    const response = await getJson<ApiEnvelope<PortfolioProject>>(
      endpoints.PROJECT_DETAIL(slug),
    );
    return response.data;
  } catch {
    return null;
  }
}

export async function fetchServices(): Promise<PortfolioService[]> {
  try {
    const response = await getJson<ApiEnvelope<PortfolioService[]>>(
      endpoints.SERVICES,
    );
    return response.data;
  } catch {
    return [];
  }
}

export async function fetchSkills(): Promise<PortfolioSkill[]> {
  try {
    const response = await getJson<ApiEnvelope<PortfolioSkill[]>>(endpoints.SKILLS);
    return response.data;
  } catch {
    return [];
  }
}

export async function fetchExperiences(): Promise<PortfolioExperience[]> {
  try {
    const response = await getJson<ApiEnvelope<PortfolioExperience[]>>(
      endpoints.EXPERIENCES,
    );
    return response.data;
  } catch {
    return [];
  }
}
