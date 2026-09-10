import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Credits",
  description: "Credits and attributions for this portfolio.",
};

export default function CreditsPage() {
  return (
    <section className="relative z-10 px-6 pb-24 pt-32">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12">
          <p className="mb-4 text-sm font-mono uppercase tracking-[0.3em] text-primary">
            Credits
          </p>
          <h1 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">
            Credits &amp; Attributions
          </h1>
          <p className="max-w-2xl leading-relaxed text-muted-foreground">
            Runtime libraries and tooling are tracked in the project manifest
            so attribution stays aligned with the actual codebase.
          </p>
        </div>

        <div className="rounded-2xl border border-border/50 bg-secondary/30 p-8">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Review the current dependency list in{" "}
            <Link
              href="https://github.com/Z1p4U/z1p4u.github.io"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              the source repository
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
