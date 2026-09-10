import { NextResponse } from "next/server";

import type { ApiEnvelope, PaginatedData } from "@/constants/types";

export type FieldErrors = Record<string, string[]>;

export function jsonOk<T>(message: string, data: T, status = 200) {
  return NextResponse.json<ApiEnvelope<T>>({ message, data }, { status });
}

export function jsonError(
  message: string,
  status = 400,
  errors?: FieldErrors,
) {
  return NextResponse.json({ message, errors }, { status });
}

export function unauthorized() {
  return jsonError("Unauthenticated.", 401);
}

export function notFound(label = "Resource") {
  return jsonError(`${label} not found.`, 404);
}

export function validationError(errors: FieldErrors) {
  return jsonError("The given data was invalid.", 422, errors);
}

export function serverError(error: unknown) {
  console.error(error);
  return jsonError("Something went wrong.", 500);
}

export async function readJson(request: Request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export function getPagination(searchParams: URLSearchParams) {
  const page = readPositiveInteger(searchParams.get("page"), 1);
  const perPage = Math.min(
    readPositiveInteger(searchParams.get("per_page"), 12),
    100,
  );

  return {
    page,
    perPage,
    skip: (page - 1) * perPage,
  };
}

export function makePaginatedData<T>(
  data: T[],
  total: number,
  perPage: number,
  currentPage: number,
): PaginatedData<T> {
  return {
    data,
    meta: {
      current_page: currentPage,
      last_page: Math.max(1, Math.ceil(total / perPage)),
      per_page: perPage,
      total,
    },
  };
}

export function readRouteId(value: string) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export function isUniqueViolation(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    (("sqlState" in error && error.sqlState === "23505") ||
      ("code" in error && error.code === "P2002"))
  );
}

function readPositiveInteger(value: string | null, fallback: number) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) return fallback;
  return parsed;
}
