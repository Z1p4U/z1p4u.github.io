import { listPublishedProjectCategories } from "@/lib/server/db-queries";
import { jsonOk, serverError } from "@/lib/server/http";
import { mapProjectCategory } from "@/lib/server/portfolio";

export const runtime = "nodejs";

export async function GET() {
  try {
    const categories = await listPublishedProjectCategories();

    return jsonOk(
      "Project categories retrieved.",
      categories.map(mapProjectCategory),
    );
  } catch (error) {
    return serverError(error);
  }
}
