import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Credits & Attributions | Thant Zin Htet",
  description:
    "Credits and attributions for tools, libraries, icons, and resources used in this portfolio.",
};

const attributions = [
  {
    name: "Next.js",
    description: "React framework used for routing, rendering, and deployment workflows.",
    href: "https://nextjs.org/",
  },
  {
    name: "React",
    description: "UI library used to build interactive components.",
    href: "https://react.dev/",
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first CSS framework for styling.",
    href: "https://tailwindcss.com/",
  },
  {
    name: "GSAP",
    description: "Animation library powering magnetic interactions.",
    href: "https://gsap.com/",
  },
  {
    name: "Lucide",
    description: "Icon set used across navigation and sections.",
    href: "https://lucide.dev/",
  },
  {
    name: "Radix UI",
    description: "Accessible primitives used by UI components.",
    href: "https://www.radix-ui.com/",
  },
  {
    name: "shadcn/ui",
    description: "Component patterns and base primitives.",
    href: "https://ui.shadcn.com/",
  },
  {
    name: "Codex",
    description: "AI coding assistant used for implementation support and iteration.",
    href: "https://openai.com/codex/",
  },
  {
    name: "v0.app",
    description: "UI generation assistant used for rapid design exploration.",
    href: "https://v0.app/",
  },
];

export default function CreditsPage() {
  return (
    <section className="relative z-10 pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-sm font-mono tracking-[0.3em] text-primary uppercase mb-4">
            Credits
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Credits &amp; Attributions
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            Libraries, frameworks, tools, and assets used to design and
            implement this portfolio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {attributions.map((item) => (
            <article
              key={item.name}
              className="p-6 rounded-2xl border border-border/50 bg-secondary/30"
            >
              <h2 className="text-lg font-semibold text-foreground mb-2">{item.name}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {item.description}
              </p>
              <Link
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Visit
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
