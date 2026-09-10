"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { ProjectDetailClient } from "@/page/website/project/detail-page";

export function ProjectDetailByQuery() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") ?? "";

  if (!slug) {
    return (
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.24em] text-primary">
            Project Detail
          </p>
          <h1 className="mt-3 text-3xl font-semibold">Missing project slug</h1>
          <Link
            href="/project"
            className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ProjectDetailClient
      key={slug}
      slug={slug}
    />
  );
}
