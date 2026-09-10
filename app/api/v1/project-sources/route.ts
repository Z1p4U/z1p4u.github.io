import { listPublishedProjectSources } from "@/lib/server/db-queries";
import { jsonOk, serverError } from "@/lib/server/http";
import { mapProjectSource } from "@/lib/server/portfolio";

export const runtime = "nodejs";

export async function GET() {
  try {
    const sources = await listPublishedProjectSources();

    return jsonOk(
      "Project sources retrieved.",
      sources.map(mapProjectSource),
    );
  } catch (error) {
    return serverError(error);
  }
}
