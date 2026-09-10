import { requireAdmin } from "@/lib/server/auth";
import {
  countProjectsByTechStack,
  deleteProjectTechStack,
  findProjectTechStackById,
  updateProjectTechStack,
} from "@/lib/server/db-queries";
import {
  isUniqueViolation,
  jsonError,
  jsonOk,
  notFound,
  readJson,
  readRouteId,
  serverError,
  validationError,
} from "@/lib/server/http";
import {
  mapProjectTechStack,
  parseProjectTechStackPayload,
} from "@/lib/server/portfolio";

export const runtime = "nodejs";

type TechStackRouteContext = {
  params: Promise<{
    techStackId: string;
  }>;
};

export async function GET(
  request: Request,
  { params }: TechStackRouteContext,
) {
  try {
    const auth = await requireAdmin(request);
    if ("response" in auth) return auth.response;

    const { techStackId } = await params;
    const id = readRouteId(techStackId);
    if (!id) return notFound("Project tech stack");

    const techStack = await findProjectTechStackById(id);
    if (!techStack) return notFound("Project tech stack");

    return jsonOk(
      "Project tech stack retrieved.",
      mapProjectTechStack(techStack),
    );
  } catch (error) {
    return serverError(error);
  }
}

export async function PUT(
  request: Request,
  { params }: TechStackRouteContext,
) {
  try {
    const auth = await requireAdmin(request);
    if ("response" in auth) return auth.response;

    const { techStackId } = await params;
    const id = readRouteId(techStackId);
    if (!id) return notFound("Project tech stack");

    const payload = parseProjectTechStackPayload(await readJson(request));
    if (!payload.ok) return validationError(payload.errors);

    const techStack = await updateProjectTechStack(id, payload.data);
    if (!techStack) return notFound("Project tech stack");

    return jsonOk(
      "Project tech stack updated.",
      mapProjectTechStack(techStack),
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

export async function DELETE(
  request: Request,
  { params }: TechStackRouteContext,
) {
  try {
    const auth = await requireAdmin(request);
    if ("response" in auth) return auth.response;

    const { techStackId } = await params;
    const id = readRouteId(techStackId);
    if (!id) return notFound("Project tech stack");

    const techStack = await findProjectTechStackById(id);
    if (!techStack) return notFound("Project tech stack");

    const projectsUsingTechStack = await countProjectsByTechStack(
      techStack.name,
    );
    if (projectsUsingTechStack > 0) {
      return jsonError(
        "This tech stack is used by projects. Move those projects before deleting it.",
        409,
      );
    }

    await deleteProjectTechStack(id);

    return jsonOk("Project tech stack deleted.", null);
  } catch (error) {
    return serverError(error);
  }
}
