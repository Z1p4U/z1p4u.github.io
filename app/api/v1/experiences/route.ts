import { listPublishedExperiences } from "@/lib/server/db-queries";
import { jsonOk, serverError } from "@/lib/server/http";
import { mapExperience } from "@/lib/server/portfolio";

export const runtime = "nodejs";

export async function GET() {
  try {
    const experiences = await listPublishedExperiences();

    return jsonOk("Experiences retrieved.", experiences.map(mapExperience));
  } catch (error) {
    return serverError(error);
  }
}
