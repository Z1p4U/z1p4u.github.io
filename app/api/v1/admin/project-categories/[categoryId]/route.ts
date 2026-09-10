import { requireAdmin } from "@/lib/server/auth";
import {
  countProjectsByCategory,
  deleteProjectCategory,
  findProjectCategoryById,
  updateProjectCategory,
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
  mapProjectCategory,
  parseProjectCategoryPayload,
} from "@/lib/server/portfolio";

export const runtime = "nodejs";

type CategoryRouteContext = {
  params: Promise<{
    categoryId: string;
  }>;
};

export async function GET(request: Request, { params }: CategoryRouteContext) {
  try {
    const auth = await requireAdmin(request);
    if ("response" in auth) return auth.response;

    const { categoryId } = await params;
    const id = readRouteId(categoryId);
    if (!id) return notFound("Project category");

    const category = await findProjectCategoryById(id);
    if (!category) return notFound("Project category");

    return jsonOk("Project category retrieved.", mapProjectCategory(category));
  } catch (error) {
    return serverError(error);
  }
}

export async function PUT(request: Request, { params }: CategoryRouteContext) {
  try {
    const auth = await requireAdmin(request);
    if ("response" in auth) return auth.response;

    const { categoryId } = await params;
    const id = readRouteId(categoryId);
    if (!id) return notFound("Project category");

    const payload = parseProjectCategoryPayload(await readJson(request));
    if (!payload.ok) return validationError(payload.errors);

    const category = await updateProjectCategory(id, payload.data);
    if (!category) return notFound("Project category");

    return jsonOk("Project category updated.", mapProjectCategory(category));
  } catch (error) {
    if (isUniqueViolation(error)) {
      return jsonError("A category with this name or slug already exists.", 409);
    }

    return serverError(error);
  }
}

export async function DELETE(
  request: Request,
  { params }: CategoryRouteContext,
) {
  try {
    const auth = await requireAdmin(request);
    if ("response" in auth) return auth.response;

    const { categoryId } = await params;
    const id = readRouteId(categoryId);
    if (!id) return notFound("Project category");

    const category = await findProjectCategoryById(id);
    if (!category) return notFound("Project category");

    const projectsUsingCategory = await countProjectsByCategory(category.name);
    if (projectsUsingCategory > 0) {
      return jsonError(
        "This category is used by projects. Move those projects before deleting it.",
        409,
      );
    }

    await deleteProjectCategory(id);

    return jsonOk("Project category deleted.", null);
  } catch (error) {
    return serverError(error);
  }
}
