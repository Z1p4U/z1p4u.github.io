import type { NextRequest } from "next/server";

import { requireAdmin } from "@/lib/server/auth";
import {
  countAdminProjects,
  createProject,
  listAdminProjects,
} from "@/lib/server/db-queries";
import {
  getPagination,
  isUniqueViolation,
  jsonError,
  jsonOk,
  makePaginatedData,
  readJson,
  serverError,
  validationError,
} from "@/lib/server/http";
import { mapProject, parseProjectPayload } from "@/lib/server/portfolio";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAdmin(request);
    if ("response" in auth) return auth.response;

    const { page, perPage, skip } = getPagination(
      request.nextUrl.searchParams,
    );
    const [total, projects] = await Promise.all([
      countAdminProjects(),
      listAdminProjects({ skip, take: perPage }),
    ]);

    return jsonOk(
      "Projects retrieved.",
      makePaginatedData(projects.map(mapProject), total, perPage, page),
    );
  } catch (error) {
    return serverError(error);
  }
}

export async function POST(request: Request) {
  try {
    const auth = await requireAdmin(request);
    if ("response" in auth) return auth.response;

    const payload = parseProjectPayload(await readJson(request));
    if (!payload.ok) return validationError(payload.errors);

    const project = await createProject(payload.data);
    if (!project) {
      return serverError(new Error("Project was created but could not be reloaded."));
    }

    return jsonOk("Project created.", mapProject(project), 201);
  } catch (error) {
    if (isUniqueViolation(error)) {
      return jsonError("A project with this slug already exists.", 409);
    }

    return serverError(error);
  }
}
