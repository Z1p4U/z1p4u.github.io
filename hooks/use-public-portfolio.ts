"use client";

import { useEffect, useState } from "react";
import type { PortfolioProject } from "@/constants/types";
import { fetchPortfolioOverview, fetchProjects } from "@/lib/portfolio-api";
import {
  fallbackExperiences,
  fallbackProfile,
  fallbackProjects,
  fallbackServices,
  fallbackSkills,
} from "@/lib/portfolio-data";

export function usePortfolioOverview() {
  const [overview, setOverview] = useState({
    profile: fallbackProfile,
    featured_projects: fallbackProjects.filter((project) => project.is_featured),
    services: fallbackServices,
    skills: fallbackSkills,
    experiences: fallbackExperiences,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetchPortfolioOverview()
      .then((data) => {
        if (mounted) setOverview(data);
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { ...overview, isLoading };
}

export function usePortfolioProjects(initialProjects?: PortfolioProject[]) {
  const [projects, setProjects] = useState(initialProjects ?? fallbackProjects);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetchProjects()
      .then((data) => {
        if (mounted) setProjects(data);
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { projects, isLoading };
}
