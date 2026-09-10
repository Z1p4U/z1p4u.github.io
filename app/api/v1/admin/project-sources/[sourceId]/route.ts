import { requireAdmin } from "@/lib/server/auth";
import {
  countProjectsBySource,
  deleteProjectSource,
  findProjectSourceById,
  updateProjectSource,
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
  mapProjectSource,
  parseProjectSourcePayload,
} from "@/lib/server/portfolio";

export const runtime = "nodejs";

type SourceRouteContext = {
  params: Promise<{
    sourceId: string;
  }>;
};

export async function GET(request: Request, { params }: SourceRouteContext) {
  try {
    const auth = await requireAdmin(request);
    if ("response" in auth) return auth.response;

    const { sourceId } = await params;
    const id = readRouteId(sourceId);
    if (!id) return notFound("Project source");

    const source = await findProjectSourceById(id);
    if (!source) return notFound("Project source");

    return jsonOk("Project source retrieved.", mapProjectSource(source));
  } catch (error) {
    return serverError(error);
  }
}

export async function PUT(request: Request, { params }: SourceRouteContext) {
  try {
    const auth = await requireAdmin(request);
    if ("response" in auth) return auth.response;

    const { sourceId } = await params;
    const id = readRouteId(sourceId);
    if (!id) return notFound("Project source");

    const payload = parseProjectSourcePayload(await readJson(request));
    if (!payload.ok) return validationError(payload.errors);

    const source = await updateProjectSource(id, payload.data);
    if (!source) return notFound("Project source");

    return jsonOk("Project source updated.", mapProjectSource(source));
  } catch (error) {
    if (isUniqueViolation(error)) {
      return jsonError("A source with this name or slug already exists.", 409);
    }

    return serverError(error);
  }
}

export async function DELETE(request: Request, { params }: SourceRouteContext) {
  try {
    const auth = await requireAdmin(request);
    if ("response" in auth) return auth.response;

    const { sourceId } = await params;
    const id = readRouteId(sourceId);
    if (!id) return notFound("Project source");

    const source = await findProjectSourceById(id);
    if (!source) return notFound("Project source");

    const projectsUsingSource = await countProjectsBySource(source.name);
    if (projectsUsingSource > 0) {
      return jsonError(
        "This source is used by projects. Move those projects before deleting it.",
        409,
      );
    }

    await deleteProjectSource(id);

    return jsonOk("Project source deleted.", null);
  } catch (error) {
    return serverError(error);
  }
}
