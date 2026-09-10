import { requireAdmin } from "@/lib/server/auth";
import {
  createProjectDetailSection,
  findProjectId,
  listProjectDetailSections,
} from "@/lib/server/db-queries";
import {
  jsonOk,
  notFound,
  readJson,
  readRouteId,
  serverError,
  validationError,
} from "@/lib/server/http";
import {
  mapProjectDetailSection,
  parseProjectDetailPayload,
} from "@/lib/server/portfolio";

export const runtime = "nodejs";

type ProjectDetailRouteContext = {
  params: Promise<{
    projectId: string;
  }>;
};

export async function GET(
  request: Request,
  { params }: ProjectDetailRouteContext,
) {
  try {
    const auth = await requireAdmin(request);
    if ("response" in auth) return auth.response;

    const { projectId } = await params;
    const id = readRouteId(projectId);
    if (!id) return notFound("Project");

    const project = await findProjectId(id);
    if (!project) return notFound("Project");

    const sections = await listProjectDetailSections(id);

    return jsonOk(
      "Project detail sections retrieved.",
      sections.map(mapProjectDetailSection),
    );
  } catch (error) {
    return serverError(error);
  }
}

export async function POST(
  request: Request,
  { params }: ProjectDetailRouteContext,
) {
  try {
    const auth = await requireAdmin(request);
    if ("response" in auth) return auth.response;

    const { projectId } = await params;
    const id = readRouteId(projectId);
    if (!id) return notFound("Project");

    const payload = parseProjectDetailPayload(await readJson(request));
    if (!payload.ok) return validationError(payload.errors);

    const project = await findProjectId(id);
    if (!project) return notFound("Project");

    const section = await createProjectDetailSection(id, payload.data);

    return jsonOk(
      "Project detail section created.",
      mapProjectDetailSection(section),
      201,
    );
  } catch (error) {
    return serverError(error);
  }
}
