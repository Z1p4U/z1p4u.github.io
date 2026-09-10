import { listPublishedServices } from "@/lib/server/db-queries";
import { jsonOk, serverError } from "@/lib/server/http";
import { mapService } from "@/lib/server/portfolio";

export const runtime = "nodejs";

export async function GET() {
  try {
    const services = await listPublishedServices();

    return jsonOk("Services retrieved.", services.map(mapService));
  } catch (error) {
    return serverError(error);
  }
}
