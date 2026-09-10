import { requireAdmin } from "@/lib/server/auth";
import {
  findContactMessageId,
  markContactMessageRead,
} from "@/lib/server/db-queries";
import { jsonOk, notFound, readRouteId, serverError } from "@/lib/server/http";
import { mapContactMessage } from "@/lib/server/portfolio";

export const runtime = "nodejs";

type ContactMessageRouteContext = {
  params: Promise<{
    messageId: string;
  }>;
};

export async function POST(
  request: Request,
  { params }: ContactMessageRouteContext,
) {
  try {
    const auth = await requireAdmin(request);
    if ("response" in auth) return auth.response;

    const { messageId } = await params;
    const id = readRouteId(messageId);
    if (!id) return notFound("Contact message");

    const existingMessage = await findContactMessageId(id);
    if (!existingMessage) return notFound("Contact message");

    const message = await markContactMessageRead(id);
    if (!message) return notFound("Contact message");

    return jsonOk("Contact message marked as read.", mapContactMessage(message));
  } catch (error) {
    return serverError(error);
  }
}
