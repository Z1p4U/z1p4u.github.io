import {
  fallbackExperiences,
  fallbackProfile,
  fallbackProjects,
  fallbackServices,
  fallbackSkills,
  getFallbackProject,
} from "@/lib/portfolio-data";
import axiosInstance from "@/constants/axios";
import { endpoints } from "@/constants/endpoints";
import type {
  ApiEnvelope,
  PaginatedData,
  PortfolioExperience,
  PortfolioProject,
  PortfolioService,
  PortfolioSkill,
} from "@/constants/types";

async function getJson<T>(path: string): Promise<T> {
  const response = await axiosInstance.get<T>(path);
  return response.data;
}

export async function fetchPortfolioOverview() {
  const fallback = {
    profile: fallbackProfile,
    featured_projects: fallbackProjects.filter((project) => project.is_featured),
    services: fallbackServices,
    skills: fallbackSkills,
    experiences: fallbackExperiences,
  };

  try {
    const response = await getJson<ApiEnvelope<typeof fallback>>(endpoints.PORTFOLIO);
    return response.data;
  } catch {
    return fallback;
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
    return fallbackProjects;
  }
}

export async function fetchProject(slug: string): Promise<PortfolioProject | null> {
  try {
    const response = await getJson<ApiEnvelope<PortfolioProject>>(
      endpoints.PROJECT_DETAIL(slug),
    );
    return response.data;
  } catch {
    return getFallbackProject(slug);
  }
}

export async function fetchServices(): Promise<PortfolioService[]> {
  try {
    const response = await getJson<ApiEnvelope<PortfolioService[]>>(
      endpoints.SERVICES,
    );
    return response.data;
  } catch {
    return fallbackServices;
  }
}

export async function fetchSkills(): Promise<PortfolioSkill[]> {
  try {
    const response = await getJson<ApiEnvelope<PortfolioSkill[]>>(endpoints.SKILLS);
    return response.data;
  } catch {
    return fallbackSkills;
  }
}

export async function fetchExperiences(): Promise<PortfolioExperience[]> {
  try {
    const response = await getJson<ApiEnvelope<PortfolioExperience[]>>(
      endpoints.EXPERIENCES,
    );
    return response.data;
  } catch {
    return fallbackExperiences;
  }
}
