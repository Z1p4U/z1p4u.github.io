import { requireAdmin } from "@/lib/server/auth";
import {
  deleteProject,
  findProjectId,
  findProjectWithSectionsById,
  updateProject,
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
import { mapProject, parseProjectPayload } from "@/lib/server/portfolio";

export const runtime = "nodejs";

type ProjectRouteContext = {
  params: Promise<{
    projectId: string;
  }>;
};

export async function GET(request: Request, { params }: ProjectRouteContext) {
  try {
    const auth = await requireAdmin(request);
    if ("response" in auth) return auth.response;

    const { projectId } = await params;
    const id = readRouteId(projectId);
    if (!id) return notFound("Project");

    const project = await findProjectWithSectionsById(id);
    if (!project) return notFound("Project");

    return jsonOk("Project retrieved.", mapProject(project));
  } catch (error) {
    return serverError(error);
  }
}

export async function PUT(request: Request, { params }: ProjectRouteContext) {
  try {
    const auth = await requireAdmin(request);
    if ("response" in auth) return auth.response;

    const { projectId } = await params;
    const id = readRouteId(projectId);
    if (!id) return notFound("Project");

    const payload = parseProjectPayload(await readJson(request));
    if (!payload.ok) return validationError(payload.errors);

    const existingProject = await findProjectId(id);
    if (!existingProject) return notFound("Project");

    const project = await updateProject(id, payload.data);
    if (!project) return notFound("Project");

    return jsonOk("Project updated.", mapProject(project));
  } catch (error) {
    if (isUniqueViolation(error)) {
      return jsonError("A project with this slug already exists.", 409);
    }

    return serverError(error);
  }
}

export async function DELETE(
  request: Request,
  { params }: ProjectRouteContext,
) {
  try {
    const auth = await requireAdmin(request);
    if ("response" in auth) return auth.response;

    const { projectId } = await params;
    const id = readRouteId(projectId);
    if (!id) return notFound("Project");

    const existingProject = await findProjectId(id);
    if (!existingProject) return notFound("Project");

    await deleteProject(id);

    return jsonOk("Project deleted.", null);
  } catch (error) {
    return serverError(error);
  }
}
