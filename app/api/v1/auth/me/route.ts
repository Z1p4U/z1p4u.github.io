import { jsonOk, serverError } from "@/lib/server/http";
import { requireAdmin } from "@/lib/server/auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const auth = await requireAdmin(request);
    if ("response" in auth) return auth.response;

    return jsonOk("Authenticated user retrieved.", auth.user);
  } catch (error) {
    return serverError(error);
  }
}
