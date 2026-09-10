import { listPublishedSkills } from "@/lib/server/db-queries";
import { jsonOk, serverError } from "@/lib/server/http";
import { mapSkill } from "@/lib/server/portfolio";

export const runtime = "nodejs";

export async function GET() {
  try {
    const skills = await listPublishedSkills();

    return jsonOk("Skills retrieved.", skills.map(mapSkill));
  } catch (error) {
    return serverError(error);
  }
}
