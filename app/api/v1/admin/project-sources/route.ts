import { requireAdmin } from "@/lib/server/auth";
import {
  createProjectSource,
  listAdminProjectSources,
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
  mapProjectSource,
  parseProjectSourcePayload,
} from "@/lib/server/portfolio";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const auth = await requireAdmin(request);
    if ("response" in auth) return auth.response;

    const sources = await listAdminProjectSources();

    return jsonOk(
      "Project sources retrieved.",
      sources.map(mapProjectSource),
    );
  } catch (error) {
    return serverError(error);
  }
}

export async function POST(request: Request) {
  try {
    const auth = await requireAdmin(request);
    if ("response" in auth) return auth.response;

    const payload = parseProjectSourcePayload(await readJson(request));
    if (!payload.ok) return validationError(payload.errors);

    const source = await createProjectSource(payload.data);

    return jsonOk("Project source created.", mapProjectSource(source), 201);
  } catch (error) {
    if (isUniqueViolation(error)) {
      return jsonError("A source with this name or slug already exists.", 409);
    }

    return serverError(error);
  }
}
