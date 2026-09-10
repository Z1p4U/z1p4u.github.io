"use client";

import { useEffect, useState } from "react";
import type {
  PortfolioOverview,
  PortfolioProject,
  ProjectCategory,
  ProjectSource,
  ProjectTechStack,
} from "@/constants/types";
import {
  fetchPortfolioOverview,
  fetchProjectCategories,
  fetchProjects,
  fetchProjectSources,
  fetchProjectTechStacks,
} from "@/lib/portfolio-api";

const emptyPortfolioOverview: PortfolioOverview = {
  profile: null,
  featured_projects: [],
  services: [],
  skills: [],
  experiences: [],
};

export function usePortfolioOverview() {
  const [overview, setOverview] = useState<PortfolioOverview>(
    emptyPortfolioOverview,
  );
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
  const [projects, setProjects] = useState(initialProjects ?? []);
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

export function useProjectTaxonomies() {
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [sources, setSources] = useState<ProjectSource[]>([]);
  const [techStacks, setTechStacks] = useState<ProjectTechStack[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    Promise.all([
      fetchProjectCategories(),
      fetchProjectSources(),
      fetchProjectTechStacks(),
    ])
      .then(([nextCategories, nextSources, nextTechStacks]) => {
        if (!mounted) return;
        setCategories(nextCategories);
        setSources(nextSources);
        setTechStacks(nextTechStacks);
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { categories, sources, techStacks, isLoading };
}
