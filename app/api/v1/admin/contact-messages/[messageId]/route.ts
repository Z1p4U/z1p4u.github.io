import { requireAdmin } from "@/lib/server/auth";
import {
  deleteContactMessage,
  findContactMessageId,
} from "@/lib/server/db-queries";
import { jsonOk, notFound, readRouteId, serverError } from "@/lib/server/http";

export const runtime = "nodejs";

type ContactMessageRouteContext = {
  params: Promise<{
    messageId: string;
  }>;
};

export async function DELETE(
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

    await deleteContactMessage(id);

    return jsonOk("Contact message deleted.", null);
  } catch (error) {
    return serverError(error);
  }
}
