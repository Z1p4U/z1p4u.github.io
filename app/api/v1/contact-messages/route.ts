import {
  createContactMessage,
  findDuplicateContactMessage,
} from "@/lib/server/db-queries";
import {
  jsonOk,
  readJson,
  serverError,
  validationError,
} from "@/lib/server/http";
import { sendContactNotification } from "@/lib/server/mail";
import {
  mapContactMessage,
  parseContactMessagePayload,
} from "@/lib/server/portfolio";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const payload = parseContactMessagePayload(await readJson(request));
    if (!payload.ok) return validationError(payload.errors);
    if (payload.spam) return jsonOk("Message received.", null, 202);

    const duplicateMessage = await findDuplicateContactMessage(payload.data);

    if (duplicateMessage) {
      return jsonOk(
        "Message received.",
        mapContactMessage(duplicateMessage),
        202,
      );
    }

    const message = await createContactMessage(payload.data);

    sendContactNotification(message).catch((error: unknown) => {
      console.error("Contact notification failed.", error);
    });

    return jsonOk("Message received.", mapContactMessage(message), 201);
  } catch (error) {
    return serverError(error);
  }
}
