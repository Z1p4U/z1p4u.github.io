import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

import { requireAdmin } from "@/lib/server/auth";
import { jsonError, jsonOk, serverError } from "@/lib/server/http";

export const runtime = "nodejs";

const MAX_IMAGE_SIZE = 4 * 1024 * 1024;
const allowedImageTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
]);

export async function POST(request: Request) {
  try {
    const auth = await requireAdmin(request);
    if ("response" in auth) return auth.response;

    const formData = await request.formData();
    const upload = formData.get("file");

    if (!(upload instanceof File)) {
      return jsonError("Image file is required.", 422);
    }

    if (!allowedImageTypes.has(upload.type)) {
      return jsonError("Only JPG, PNG, WEBP, and GIF images are allowed.", 422);
    }

    if (upload.size > MAX_IMAGE_SIZE) {
      return jsonError("Please upload an image smaller than 4 MB.", 422);
    }

    if (upload.size === 0) {
      return jsonError("Please upload a non-empty image.", 422);
    }

    const fileBuffer = Buffer.from(await upload.arrayBuffer());

    if (!matchesImageSignature(fileBuffer, upload.type)) {
      return jsonError("The uploaded file does not match its image type.", 422);
    }

    const extension = allowedImageTypes.get(upload.type) ?? "webp";
    const filename = `${randomUUID()}.${extension}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "projects");
    const uploadPath = path.join(uploadDir, filename);

    await mkdir(uploadDir, { recursive: true });
    await writeFile(uploadPath, fileBuffer);

    return jsonOk("Project image uploaded.", {
      url: `/uploads/projects/${filename}`,
    });
  } catch (error) {
    return serverError(error);
  }
}

function matchesImageSignature(buffer: Buffer, mimeType: string) {
  if (mimeType === "image/jpeg") {
    return buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }

  if (mimeType === "image/png") {
    return buffer.subarray(0, 8).equals(
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    );
  }

  if (mimeType === "image/webp") {
    return (
      buffer.length >= 12 &&
      buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
      buffer.subarray(8, 12).toString("ascii") === "WEBP"
    );
  }

  if (mimeType === "image/gif") {
    const signature = buffer.subarray(0, 6).toString("ascii");
    return signature === "GIF87a" || signature === "GIF89a";
  }

  return false;
}
