import { listPublishedProjectTechStacks } from "@/lib/server/db-queries";
import { jsonOk, serverError } from "@/lib/server/http";
import { mapProjectTechStack } from "@/lib/server/portfolio";

export const runtime = "nodejs";

export async function GET() {
  try {
    const techStacks = await listPublishedProjectTechStacks();

    return jsonOk(
      "Project tech stacks retrieved.",
      techStacks.map(mapProjectTechStack),
    );
  } catch (error) {
    return serverError(error);
  }
}
