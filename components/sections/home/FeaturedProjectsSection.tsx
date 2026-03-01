"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

const featuredProjects = [
  {
    number: "01",
    title: "MTL Express E-commerce",
    description:
      "React e-commerce build with product browsing, ordering flow, and practical storefront UX.",
    tech: ["React JS", "JavaScript", "REST API"],
    category: "Ecommerces",
    year: "2025",
    href: "https://minthilaexpress.com",
  },
  {
    number: "02",
    title: "Zay Yar Lin Photography",
    description:
      "WordPress portfolio website for photography showcase with editable CMS content.",
    tech: ["WordPress", "PHP", "Portfolio"],
    category: "CMS",
    year: "2025",
    href: "https://www.zayyarlinphotography.com/",
  },
  {
    number: "03",
    title: "Nawaratt",
    description:
      "React Native app build distributed for Android with production-ready mobile workflow.",
    tech: ["React Native", "Expo", "Mobile"],
    category: "Mobile Apps",
    year: "2024",
    href: "https://expo.dev/artifacts/eas/aJC4aDHQFL5QAorxfFHZkN.apk",
  },
  {
    number: "04",
    title: "Miyama Kuruma",
    description:
      "Static company portfolio website built in early-career period with HTML, CSS, JavaScript, and PHP.",
    tech: ["HTML", "CSS", "JavaScript", "PHP"],
    category: "Company Portfolio",
    year: "2024",
    href: "https://miyamakuruma.com/",
  },
];

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return isInView;
}

export function FeaturedProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);

  return (
    <section id="projects" className="relative z-10 py-24 px-6 lg:px-16">
      <div ref={sectionRef} className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12 bg-primary" />
              <span className="text-xs font-mono tracking-[0.3em] text-primary uppercase">
                Selected Work
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/project"
            className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex flex-col">
          {featuredProjects.map((project, i) => (
            <a
              key={project.number}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className={`group border-t border-border/30 last:border-b py-8 md:py-10 flex flex-col md:flex-row md:items-center gap-6 hover:bg-secondary/20 -mx-6 px-6 transition-all duration-500 cursor-pointer ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Number + Year */}
              <div className="flex items-center gap-4 md:w-24 flex-shrink-0">
                <span className="text-xs font-mono text-primary">
                  {project.number}
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  {project.year}
                </span>
              </div>

              {/* Title + Category */}
              <div className="md:w-64 flex-shrink-0">
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <span className="text-xs font-mono text-muted-foreground">
                  {project.category}
                </span>
              </div>

              {/* Description */}
              <p className="flex-1 text-sm text-muted-foreground leading-relaxed hidden lg:block">
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 md:w-56 flex-shrink-0">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 text-[11px] font-mono rounded bg-muted text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Arrow */}
              <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:rotate-0 -rotate-45 transition-all flex-shrink-0 hidden md:block" />
            </a>
          ))}
        </div>

        <Link
          href="/project"
          className="mt-8 md:hidden flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          View All Projects
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
