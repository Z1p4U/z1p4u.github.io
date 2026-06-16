import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

export function ContactSection() {
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
            className="group flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20"
          >
            {"Let's discuss"}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="mailto:zipshigoto310801@gmail.com"
            className="flex items-center gap-3 px-8 py-4 text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail className="w-4 h-4" />
            zipshigoto310801@gmail.com
          </Link>
        </div>
      </div>
    </section>
  );
}
