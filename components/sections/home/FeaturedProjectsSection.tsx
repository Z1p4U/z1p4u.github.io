"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import {
  type CSSProperties,
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

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
    preview: {
      eyebrow: "Storefront",
      accent: "#4ade80",
      gradient:
        "radial-gradient(circle at 22% 18%, rgba(74, 222, 128, 0.7), transparent 34%), linear-gradient(135deg, #0f172a 0%, #1f2937 48%, #020617 100%)",
    },
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
    preview: {
      eyebrow: "Portfolio",
      accent: "#f59e0b",
      gradient:
        "radial-gradient(circle at 75% 18%, rgba(245, 158, 11, 0.75), transparent 32%), linear-gradient(135deg, #211711 0%, #3f2d20 45%, #0c0a09 100%)",
    },
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
    preview: {
      eyebrow: "Application",
      accent: "#38bdf8",
      gradient:
        "radial-gradient(circle at 28% 18%, rgba(56, 189, 248, 0.72), transparent 34%), linear-gradient(135deg, #082f49 0%, #0f172a 48%, #020617 100%)",
    },
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
    preview: {
      eyebrow: "Website",
      accent: "#fb7185",
      gradient:
        "radial-gradient(circle at 74% 22%, rgba(251, 113, 133, 0.75), transparent 34%), linear-gradient(135deg, #1f1020 0%, #312e81 48%, #020617 100%)",
    },
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
  const previewRef = useRef<HTMLDivElement>(null);
  const previewInnerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const previewXTo = useRef<((value: number) => void) | null>(null);
  const previewYTo = useRef<((value: number) => void) | null>(null);
  const cursorXTo = useRef<((value: number) => void) | null>(null);
  const cursorYTo = useRef<((value: number) => void) | null>(null);
  const innerXTo = useRef<((value: number) => void) | null>(null);
  const innerYTo = useRef<((value: number) => void) | null>(null);
  const inView = useInView(sectionRef);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const activeProject = featuredProjects[activeIndex];

  useEffect(() => {
    const preview = previewRef.current;
    const cursor = cursorRef.current;
    const previewInner = previewInnerRef.current;
    if (!preview || !cursor || !previewInner) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    gsap.set(preview, {
      autoAlpha: 0,
      scale: 0.92,
      xPercent: -50,
      yPercent: -50,
    });
    gsap.set(cursor, {
      autoAlpha: 0,
      scale: 0.25,
      xPercent: -50,
      yPercent: -50,
    });

    previewXTo.current = gsap.quickTo(preview, "x", {
      duration: 0.95,
      ease: "power4.out",
    });
    previewYTo.current = gsap.quickTo(preview, "y", {
      duration: 0.95,
      ease: "power4.out",
    });
    cursorXTo.current = gsap.quickTo(cursor, "x", {
      duration: 0.38,
      ease: "power3.out",
    });
    cursorYTo.current = gsap.quickTo(cursor, "y", {
      duration: 0.38,
      ease: "power3.out",
    });
    innerXTo.current = gsap.quickTo(previewInner, "x", {
      duration: 1.1,
      ease: "power4.out",
    });
    innerYTo.current = gsap.quickTo(previewInner, "y", {
      duration: 1.1,
      ease: "power4.out",
    });

    return () => {
      gsap.killTweensOf([preview, cursor, previewInner]);
    };
  }, []);

  const moveFloatingLayers = (event: MouseEvent<HTMLElement>) => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const previewWidth = 430;
    const previewHeight = 300;
    const clampedX = Math.min(
      Math.max(x - 72, previewWidth / 2),
      rect.width - previewWidth / 2,
    );
    const clampedY = Math.min(
      Math.max(y, previewHeight / 2),
      rect.height - previewHeight / 2,
    );

    previewXTo.current?.(clampedX);
    previewYTo.current?.(clampedY);
    cursorXTo.current?.(x);
    cursorYTo.current?.(y);
    innerXTo.current?.((x - rect.width / 2) * 0.025);
    innerYTo.current?.((y - rect.height / 2) * 0.035);
  };

  const showFloatingLayers = (index: number, event: MouseEvent<HTMLElement>) => {
    setActiveIndex(index);
    setIsHovering(true);
    moveFloatingLayers(event);

    if (!previewRef.current || !cursorRef.current) return;

    gsap.to(previewRef.current, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.42,
      ease: "power3.out",
    });
    gsap.to(cursorRef.current, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.34,
      ease: "back.out(1.7)",
    });
  };

  const hideFloatingLayers = () => {
    setIsHovering(false);

    if (!previewRef.current || !cursorRef.current) return;

    gsap.to(previewRef.current, {
      autoAlpha: 0,
      scale: 0.94,
      duration: 0.32,
      ease: "power2.out",
    });
    gsap.to(cursorRef.current, {
      autoAlpha: 0,
      scale: 0.32,
      duration: 0.26,
      ease: "power2.out",
    });
  };

  return (
    <section id="projects" className="relative z-10 py-24 px-6 lg:px-16">
      <div
        ref={sectionRef}
        onMouseLeave={hideFloatingLayers}
        className="relative max-w-7xl mx-auto"
      >
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

        <div
          ref={previewRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-20 hidden h-[300px] w-[430px] overflow-hidden rounded-[1.35rem] border border-primary/20 bg-secondary/90 shadow-[0_32px_90px_rgba(0,0,0,0.45)] md:block"
        >
          <div
            className="absolute inset-0 opacity-90 transition-[background] duration-500"
            style={{ background: activeProject.preview.gradient }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_42%)] opacity-50" />
          <div
            ref={previewInnerRef}
            className="absolute inset-6 overflow-hidden rounded-2xl border border-white/15 bg-background/55 backdrop-blur-sm"
          >
            <div className="absolute inset-x-5 top-5 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.22em] text-white/70">
              <span>{activeProject.preview.eyebrow}</span>
              <span>{activeProject.year}</span>
            </div>
            <div className="absolute left-5 right-5 top-16 h-24 overflow-hidden rounded-xl border border-white/10 bg-black/30">
              <div
                className="absolute inset-0 opacity-85"
                style={{ background: activeProject.preview.gradient }}
              />
              <div className="absolute inset-5 grid grid-cols-4 gap-2">
                <span className="rounded bg-white/70" />
                <span className="rounded bg-white/25" />
                <span className="rounded bg-white/40" />
                <span className="rounded bg-white/15" />
                <span className="col-span-2 rounded bg-black/30" />
                <span className="col-span-2 rounded bg-white/25" />
              </div>
            </div>
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-2xl font-semibold leading-none text-white">
                {activeProject.title}
              </p>
              <div className="mt-4 flex gap-2">
                {activeProject.tech.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-mono text-white/75"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          ref={cursorRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-30 hidden h-24 w-24 items-center justify-center rounded-full bg-[#4357f2] text-sm font-medium text-white shadow-[0_18px_38px_rgba(67,87,242,0.35)] md:flex"
        >
          View
        </div>

        <div className="relative flex flex-col">
          {featuredProjects.map((project, i) => {
            const isDimmed = isHovering && activeIndex !== i;

            return (
              <a
                key={project.number}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={(event) => showFloatingLayers(i, event)}
                onMouseMove={moveFloatingLayers}
                className={`group/project relative -mx-6 overflow-hidden border-t border-border/30 px-6 py-7 transition-all duration-700 last:border-b md:py-9 ${
                  inView
                    ? `${isDimmed ? "opacity-45" : "opacity-100"} translate-y-0`
                    : "opacity-0 translate-y-6"
                }`}
                style={
                  {
                    transitionDelay: inView && !isHovering ? `${i * 90}ms` : "0ms",
                    "--project-accent": project.preview.accent,
                  } as CSSProperties
                }
              >
                <span className="absolute inset-0 bg-secondary/20 opacity-0 transition-opacity duration-700 group-hover/project:opacity-100" />
                <span
                  className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 opacity-0 blur-2xl transition-opacity duration-700 group-hover/project:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${project.preview.accent}33, transparent 44%)`,
                  }}
                />

                <div className="relative z-10 grid gap-5 md:grid-cols-[110px_minmax(0,1fr)_minmax(210px,300px)_32px] md:items-center">
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="text-primary">{project.number}</span>
                    <span className="text-muted-foreground">{project.year}</span>
                  </div>

                  <div>
                    <h3 className="text-3xl font-semibold tracking-tight text-foreground transition-colors duration-500 group-hover/project:text-[var(--project-accent)] md:text-5xl">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:hidden">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <span className="text-sm font-medium text-muted-foreground transition-colors duration-500 group-hover/project:text-foreground">
                      {project.category}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-border/50 bg-muted/50 px-2.5 py-1 text-[11px] font-mono text-muted-foreground transition-colors duration-500 group-hover/project:border-primary/30 group-hover/project:text-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <ArrowUpRight className="hidden h-5 w-5 -rotate-45 text-muted-foreground transition-all duration-500 group-hover/project:rotate-0 group-hover/project:text-[var(--project-accent)] md:block" />
                </div>
              </a>
            );
          })}
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
