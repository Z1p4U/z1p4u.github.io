import { Suspense } from "react";

import { ProjectDetailByQuery } from "@/app/project/detail/project-detail-by-query";

export default function ProjectDetailQueryPage() {
  return (
    <Suspense fallback={null}>
      <ProjectDetailByQuery />
    </Suspense>
  );
}
