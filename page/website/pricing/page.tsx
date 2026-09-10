import type { Metadata } from "next";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Project pricing and estimate requests.",
};

export default function PricingPage() {
  return (
    <div className="relative z-10 px-6 pb-24 pt-32">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12">
          <p className="mb-4 text-sm font-mono uppercase tracking-[0.3em] text-primary">
            Pricing
          </p>
          <h1 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">
            Request a Project Estimate
          </h1>
          <p className="max-w-2xl leading-relaxed text-muted-foreground">
            Pricing is scoped from the project details you submit, so this page
            stays accurate instead of relying on hardcoded packages.
          </p>
        </div>

        <div className="rounded-3xl border border-primary/20 bg-primary/5 p-12 text-center">
          <MessageCircle className="mx-auto mb-4 h-8 w-8 text-primary" />
          <h2 className="mb-3 text-balance text-2xl font-bold text-foreground">
            Start With a Brief
          </h2>
          <p className="mx-auto mb-6 max-w-lg leading-relaxed text-muted-foreground">
            Share your goals, timeline, and budget range. The estimate can then
            be based on the real project scope.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Contact
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
