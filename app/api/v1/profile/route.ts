import { getFirstProfile } from "@/lib/server/db-queries";
import { jsonOk, serverError } from "@/lib/server/http";
import { mapProfile } from "@/lib/server/portfolio";

export const runtime = "nodejs";

export async function GET() {
  try {
    const profile = await getFirstProfile();

    return jsonOk("Profile retrieved.", profile ? mapProfile(profile) : null);
  } catch (error) {
    return serverError(error);
  }
}
