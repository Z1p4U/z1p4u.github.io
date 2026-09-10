import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

import { requireAdmin } from "@/lib/server/auth";
import { jsonError, jsonOk, serverError } from "@/lib/server/http";

export const runtime = "nodejs";

const MAX_CV_SIZE = 8 * 1024 * 1024;
const allowedCvTypes = new Map([
  ["application/pdf", "pdf"],
  ["application/msword", "doc"],
  [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "docx",
  ],
]);

export async function POST(request: Request) {
  try {
    const auth = await requireAdmin(request);
    if ("response" in auth) return auth.response;

    const formData = await request.formData();
    const upload = formData.get("file");

    if (!(upload instanceof File)) {
      return jsonError("CV file is required.", 422);
    }

    if (!allowedCvTypes.has(upload.type)) {
      return jsonError("Only PDF, DOC, and DOCX files are allowed.", 422);
    }

    if (upload.size > MAX_CV_SIZE) {
      return jsonError("Please upload a CV smaller than 8 MB.", 422);
    }

    if (upload.size === 0) {
      return jsonError("Please upload a non-empty CV.", 422);
    }

    const fileBuffer = Buffer.from(await upload.arrayBuffer());

    if (!matchesCvSignature(fileBuffer, upload.type)) {
      return jsonError("The uploaded file does not match its CV type.", 422);
    }

    const extension = allowedCvTypes.get(upload.type) ?? "pdf";
    const filename = `${randomUUID()}.${extension}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "cv");
    const uploadPath = path.join(uploadDir, filename);

    await mkdir(uploadDir, { recursive: true });
    await writeFile(uploadPath, fileBuffer);

    return jsonOk("CV uploaded.", {
      url: `/uploads/cv/${filename}`,
    });
  } catch (error) {
    return serverError(error);
  }
}

function matchesCvSignature(buffer: Buffer, mimeType: string) {
  if (mimeType === "application/pdf") {
    return buffer.subarray(0, 5).toString("ascii") === "%PDF-";
  }

  if (mimeType === "application/msword") {
    return buffer.subarray(0, 8).equals(
      Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]),
    );
  }

  if (
    mimeType ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return (
      buffer.length >= 4 &&
      buffer[0] === 0x50 &&
      buffer[1] === 0x4b &&
      [0x03, 0x05, 0x07].includes(buffer[2]) &&
      [0x04, 0x06, 0x08].includes(buffer[3])
    );
  }

  return false;
}
