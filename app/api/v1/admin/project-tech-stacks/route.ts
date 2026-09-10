import { requireAdmin } from "@/lib/server/auth";
import {
  createProjectTechStack,
  listAdminProjectTechStacks,
} from "@/lib/server/db-queries";
import {
  isUniqueViolation,
  jsonError,
  jsonOk,
  readJson,
  serverError,
  validationError,
} from "@/lib/server/http";
import {
  mapProjectTechStack,
  parseProjectTechStackPayload,
} from "@/lib/server/portfolio";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const auth = await requireAdmin(request);
    if ("response" in auth) return auth.response;

    const techStacks = await listAdminProjectTechStacks();

    return jsonOk(
      "Project tech stacks retrieved.",
      techStacks.map(mapProjectTechStack),
    );
  } catch (error) {
    return serverError(error);
  }
}

export async function POST(request: Request) {
  try {
    const auth = await requireAdmin(request);
    if ("response" in auth) return auth.response;

    const payload = parseProjectTechStackPayload(await readJson(request));
    if (!payload.ok) return validationError(payload.errors);

    const techStack = await createProjectTechStack(payload.data);

    return jsonOk(
      "Project tech stack created.",
      mapProjectTechStack(techStack),
      201,
    );
  } catch (error) {
    if (isUniqueViolation(error)) {
      return jsonError(
        "A tech stack with this name or slug already exists.",
        409,
      );
    }

    return serverError(error);
  }
}
