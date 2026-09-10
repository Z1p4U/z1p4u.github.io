import { requireAdmin } from "@/lib/server/auth";
import {
  deleteProjectDetailSection,
  findProjectDetailSectionId,
  updateProjectDetailSection,
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
    sectionId: string;
  }>;
};

export async function PUT(
  request: Request,
  { params }: ProjectDetailRouteContext,
) {
  try {
    const auth = await requireAdmin(request);
    if ("response" in auth) return auth.response;

    const { projectId, sectionId } = await params;
    const parentId = readRouteId(projectId);
    const id = readRouteId(sectionId);
    if (!parentId || !id) return notFound("Project detail section");

    const payload = parseProjectDetailPayload(await readJson(request));
    if (!payload.ok) return validationError(payload.errors);

    const existingSection = await findProjectDetailSectionId(id, parentId);
    if (!existingSection) return notFound("Project detail section");

    const section = await updateProjectDetailSection(id, payload.data);
    if (!section) return notFound("Project detail section");

    return jsonOk(
      "Project detail section updated.",
      mapProjectDetailSection(section),
    );
  } catch (error) {
    return serverError(error);
  }
}

export async function DELETE(
  request: Request,
  { params }: ProjectDetailRouteContext,
) {
  try {
    const auth = await requireAdmin(request);
    if ("response" in auth) return auth.response;

    const { projectId, sectionId } = await params;
    const parentId = readRouteId(projectId);
    const id = readRouteId(sectionId);
    if (!parentId || !id) return notFound("Project detail section");

    const existingSection = await findProjectDetailSectionId(id, parentId);
    if (!existingSection) return notFound("Project detail section");

    await deleteProjectDetailSection(id);

    return jsonOk("Project detail section deleted.", null);
  } catch (error) {
    return serverError(error);
  }
}
