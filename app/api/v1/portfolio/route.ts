import {
  getFirstProfile,
  listFeaturedProjects,
  listPublishedExperiences,
  listPublishedServices,
  listPublishedSkills,
} from "@/lib/server/db-queries";
import { jsonOk, serverError } from "@/lib/server/http";
import {
  mapExperience,
  mapProfile,
  mapProject,
  mapService,
  mapSkill,
} from "@/lib/server/portfolio";

export const runtime = "nodejs";

export async function GET() {
  try {
    const [profile, featuredProjects, services, skills, experiences] =
      await Promise.all([
        getFirstProfile(),
        listFeaturedProjects(),
        listPublishedServices(),
        listPublishedSkills(),
        listPublishedExperiences(),
      ]);

    return jsonOk("Portfolio overview retrieved.", {
      profile: profile ? mapProfile(profile) : null,
      featured_projects: featuredProjects.map(mapProject),
      services: services.map(mapService),
      skills: skills.map(mapSkill),
      experiences: experiences.map(mapExperience),
    });
  } catch (error) {
    return serverError(error);
  }
}
