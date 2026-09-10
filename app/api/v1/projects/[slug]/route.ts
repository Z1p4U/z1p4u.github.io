import { findPublishedProjectWithSections } from "@/lib/server/db-queries";
import { jsonOk, notFound, serverError } from "@/lib/server/http";
import { mapProject } from "@/lib/server/portfolio";

export const runtime = "nodejs";

type ProjectRouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_request: Request, { params }: ProjectRouteContext) {
  try {
    const { slug } = await params;
    const project = await findPublishedProjectWithSections(slug);

    if (!project) return notFound("Project");

    return jsonOk("Project retrieved.", mapProject(project));
  } catch (error) {
    return serverError(error);
  }
}
