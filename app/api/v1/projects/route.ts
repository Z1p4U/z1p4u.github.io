import type { NextRequest } from "next/server";

import {
  countPublishedProjects,
  listPublishedProjects,
} from "@/lib/server/db-queries";
import {
  getPagination,
  jsonOk,
  makePaginatedData,
  serverError,
} from "@/lib/server/http";
import { mapProject } from "@/lib/server/portfolio";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const { page, perPage, skip } = getPagination(
      request.nextUrl.searchParams,
    );
    const category = request.nextUrl.searchParams.get("category");
    const source = request.nextUrl.searchParams.get("source");
    const [total, projects] = await Promise.all([
      countPublishedProjects({ category, source }),
      listPublishedProjects({ category, source, skip, take: perPage }),
    ]);

    return jsonOk(
      "Projects retrieved.",
      makePaginatedData(projects.map(mapProject), total, perPage, page),
    );
  } catch (error) {
    return serverError(error);
  }
}
