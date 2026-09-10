import { requireAdmin } from "@/lib/server/auth";
import {
  createProjectCategory,
  listAdminProjectCategories,
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
  mapProjectCategory,
  parseProjectCategoryPayload,
} from "@/lib/server/portfolio";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const auth = await requireAdmin(request);
    if ("response" in auth) return auth.response;

    const categories = await listAdminProjectCategories();

    return jsonOk(
      "Project categories retrieved.",
      categories.map(mapProjectCategory),
    );
  } catch (error) {
    return serverError(error);
  }
}

export async function POST(request: Request) {
  try {
    const auth = await requireAdmin(request);
    if ("response" in auth) return auth.response;

    const payload = parseProjectCategoryPayload(await readJson(request));
    if (!payload.ok) return validationError(payload.errors);

    const category = await createProjectCategory(payload.data);

    return jsonOk("Project category created.", mapProjectCategory(category), 201);
  } catch (error) {
    if (isUniqueViolation(error)) {
      return jsonError("A category with this name or slug already exists.", 409);
    }

    return serverError(error);
  }
}
