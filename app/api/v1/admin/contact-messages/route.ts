import type { NextRequest } from "next/server";

import { requireAdmin } from "@/lib/server/auth";
import {
  countContactMessages,
  listContactMessages,
} from "@/lib/server/db-queries";
import {
  getPagination,
  jsonOk,
  makePaginatedData,
  serverError,
} from "@/lib/server/http";
import { mapContactMessage } from "@/lib/server/portfolio";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAdmin(request);
    if ("response" in auth) return auth.response;

    const { page, perPage, skip } = getPagination(
      request.nextUrl.searchParams,
    );
    const status = request.nextUrl.searchParams.get("status");
    const [total, messages] = await Promise.all([
      countContactMessages(status),
      listContactMessages({ status, skip, take: perPage }),
    ]);

    return jsonOk(
      "Contact messages retrieved.",
      makePaginatedData(messages.map(mapContactMessage), total, perPage, page),
    );
  } catch (error) {
    return serverError(error);
  }
}
