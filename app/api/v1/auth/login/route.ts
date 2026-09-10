import {
  createAccessToken,
  getJwtExpiresIn,
  validateLogin,
} from "@/lib/server/auth";
import { jsonError, jsonOk, readJson, serverError, validationError } from "@/lib/server/http";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await readJson(request);
    const credentials = parseCredentials(body);
    if (!credentials.ok) return validationError(credentials.errors);

    const user = await validateLogin(
      credentials.data.email,
      credentials.data.password,
    );
    if (!user) return jsonError("Invalid credentials.", 401);

    return jsonOk("Login successful.", {
      access_token: createAccessToken(user),
      token_type: "bearer" as const,
      expires_in: getJwtExpiresIn(),
      user,
    });
  } catch (error) {
    return serverError(error);
  }
}

function parseCredentials(payload: unknown) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {
      ok: false as const,
      errors: {
        body: ["Request body must be a JSON object."],
      },
    };
  }

  const record = payload as Record<string, unknown>;
  const email = typeof record.email === "string" ? record.email.trim() : "";
  const password =
    typeof record.password === "string" ? record.password.trim() : "";
  const errors: Record<string, string[]> = {};

  if (!email) errors.email = ["This field is required."];
  if (!password) errors.password = ["This field is required."];

  if (Object.keys(errors).length > 0) {
    return { ok: false as const, errors };
  }

  return {
    ok: true as const,
    data: {
      email,
      password,
    },
  };
}
