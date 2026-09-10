"use client";

import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { usePortfolioOverview } from "@/hooks/use-public-portfolio";
import { setOutlineButtonPosition } from "@/lib/outline-button";

export function ContactSection() {
  const { profile } = usePortfolioOverview();

  return (
    <section className="relative z-10 py-32 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px w-12 bg-primary" />
          <span className="text-xs font-mono tracking-[0.3em] text-primary uppercase">
            Contact
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
          {"Have a project"}
          <br />
          {"in mind?"}
        </h2>

        <div className="mt-8 flex flex-col sm:flex-row items-start gap-6">
          <Link
            href="/contact"
            className="site-filled-button group gap-3 px-8 py-4 font-medium rounded-lg"
            onPointerEnter={setOutlineButtonPosition}
            onPointerMove={setOutlineButtonPosition}
          >
            <span>{"Let's discuss"}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          {profile?.email ? (
            <Link
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 px-8 py-4 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              {profile.email}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
