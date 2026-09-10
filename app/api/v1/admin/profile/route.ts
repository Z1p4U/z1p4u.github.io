import { requireAdmin } from "@/lib/server/auth";
import { getFirstProfile, saveProfile } from "@/lib/server/db-queries";
import {
  jsonOk,
  readJson,
  serverError,
  validationError,
} from "@/lib/server/http";
import { mapProfile, parseProfilePayload } from "@/lib/server/portfolio";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const auth = await requireAdmin(request);
    if ("response" in auth) return auth.response;

    const profile = await getFirstProfile();

    return jsonOk("Profile retrieved.", profile ? mapProfile(profile) : null);
  } catch (error) {
    return serverError(error);
  }
}

export async function PUT(request: Request) {
  try {
    const auth = await requireAdmin(request);
    if ("response" in auth) return auth.response;

    const payload = parseProfilePayload(await readJson(request));
    if (!payload.ok) return validationError(payload.errors);

    const profile = await saveProfile(payload.data);

    return jsonOk("Profile updated.", mapProfile(profile));
  } catch (error) {
    return serverError(error);
  }
}
