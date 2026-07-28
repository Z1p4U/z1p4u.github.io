"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import {
  type CSSProperties,
  type MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const featuredProjects = [
  {
    number: "01",
    title: "Iku Team",
    description:
      "Company portfolio website built with HubSpot CMS for services, resources, and brand presentation.",
    tech: ["HubSpot CMS", "HubL"],
    category: "Portfolio",
    year: "2025",
    href: "https://ikuteam.com/",
    preview: {
      eyebrow: "HubSpot",
      accent: "#f97316",
      image: "/assets/projects/IkuTeam.webp",
      gradient:
        "radial-gradient(circle at 24% 18%, rgba(249, 115, 22, 0.72), transparent 34%), linear-gradient(135deg, #1f1308 0%, #3b1d0f 48%, #020617 100%)",
    },
  },
  {
    number: "02",
    title: "MTL Express E-commerce",
    description:
      "Marketplace-style e-commerce website for product browsing and online shopping flows.",
    tech: ["React", "Redux", "shadcn/ui"],
    category: "Ecommerces",
    year: "2025",
    href: "https://minthilaexpress.com",
    preview: {
      eyebrow: "Storefront",
      accent: "#4ade80",
      image: "/assets/projects/MTLExpressE-commerce.webp",
      gradient:
        "radial-gradient(circle at 22% 18%, rgba(74, 222, 128, 0.7), transparent 34%), linear-gradient(135deg, #0f172a 0%, #1f2937 48%, #020617 100%)",
    },
  },
  {
    number: "03",
    title: "Zay Yar Lin Photography",
    description:
      "Personal photography portfolio CMS website built with WordPress CMS, ACF, and PHP.",
    tech: ["WordPress CMS", "PHP", "ACF"],
    category: "Portfolio",
    year: "2025",
    href: "https://www.zayyarlinphotography.com/",
    preview: {
      eyebrow: "Portfolio",
      accent: "#f59e0b",
      image: "/assets/projects/ZayYarLinPhotography.webp",
      gradient:
        "radial-gradient(circle at 75% 18%, rgba(245, 158, 11, 0.75), transparent 32%), linear-gradient(135deg, #211711 0%, #3f2d20 45%, #0c0a09 100%)",
    },
  },
  {
    number: "04",
    title: "Nawaratt Online Shopping",
    description:
      "Marketplace-style mobile shopping app launched on Google Play for product discovery, cart, and order flows.",
    tech: ["React Native", "Expo", "Redux", "Laravel"],
    category: "Mobile Apps",
    year: "2026",
    href: "https://play.google.com/store/apps/details?id=com.nawaratt.NawarattOnlineShoppingApp",
    preview: {
      eyebrow: "Application",
      accent: "#38bdf8",
      image: "/assets/projects/NawarattOnlineShopping.webp",
      gradient:
        "radial-gradient(circle at 28% 18%, rgba(56, 189, 248, 0.72), transparent 34%), linear-gradient(135deg, #082f49 0%, #0f172a 48%, #020617 100%)",
    },
  },
];

function isMobileProject(project: (typeof featuredProjects)[number]) {
  return project.category === "Mobile Apps";
}

function getFloatingPreviewSize(project: (typeof featuredProjects)[number]) {
  return isMobileProject(project)
    ? { width: 320, height: 660 }
    : { width: 430, height: 410 };
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [loadedPreviewImages, setLoadedPreviewImages] = useState<
    Record<string, boolean>
  >({});
  const activeProject = featuredProjects[activeIndex];
  const activePreviewSize = getFloatingPreviewSize(activeProject);
  const activeIsMobile = isMobileProject(activeProject);
  const activePreviewImage = activeProject.preview.image;
  const isActivePreviewImageLoaded =
    !activePreviewImage || loadedPreviewImages[activePreviewImage];

  const markPreviewImageLoaded = useCallback((src: string) => {
    setLoadedPreviewImages((current) =>
      current[src] ? current : { ...current, [src]: true },
    );
  }, []);

  useEffect(() => {
    let isMounted = true;

    featuredProjects.forEach((project) => {
      const src = project.preview.image;
      if (!src) return;

      const image = new window.Image();
      image.onload = () => {
        if (isMounted) {
          markPreviewImageLoaded(src);
        }
      };
      image.src = src;
    });

    return () => {
      isMounted = false;
    };
  }, [markPreviewImageLoaded]);

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

  const moveFloatingLayers = (
    event: MouseEvent<HTMLElement>,
    projectIndex = activeIndex,
  ) => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const { width: previewWidth, height: previewHeight } =
      getFloatingPreviewSize(featuredProjects[projectIndex]);
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
    moveFloatingLayers(event, index);

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
          className="pointer-events-none absolute left-0 top-0 z-20 hidden overflow-hidden rounded-[1.35rem] border border-primary/20 bg-secondary/90 shadow-[0_32px_90px_rgba(0,0,0,0.45)] transition-[width,height] duration-300 md:block"
          style={{
            width: activePreviewSize.width,
            height: activePreviewSize.height,
          }}
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
            <div
              className={`absolute top-16 overflow-hidden rounded-xl border border-white/10 bg-black/30 ${
                activeIsMobile
                  ? "left-1/2 w-[68%] -translate-x-1/2 aspect-[1/2.196]"
                  : "left-5 right-5 aspect-[2/1]"
              }`}
            >
              {activePreviewImage ? (
                <>
                  {!isActivePreviewImageLoaded ? (
                    <div className="absolute inset-0 overflow-hidden bg-white/[0.04]">
                      <div className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.14)_42%,transparent_72%)]" />
                      <div className="absolute inset-4 grid grid-cols-4 gap-2">
                        <span className="col-span-2 rounded bg-white/20" />
                        <span className="col-span-2 rounded bg-white/10" />
                        <span className="rounded bg-white/10" />
                        <span className="rounded bg-white/20" />
                        <span className="col-span-2 rounded bg-white/10" />
                      </div>
                    </div>
                  ) : null}
                  <Image
                    src={activePreviewImage}
                    alt={`${activeProject.title} preview`}
                    fill
                    unoptimized
                    sizes="430px"
                    onLoad={() => markPreviewImageLoaded(activePreviewImage)}
                    className={`object-cover object-top transition-opacity duration-300 ${
                      isActivePreviewImageLoaded ? "opacity-90" : "opacity-0"
                    }`}
                  />
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
            <div className="absolute bottom-5 left-5 right-5 pt-5">
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
                  isDimmed ? "opacity-45" : "opacity-100"
                }`}
                style={
                  {
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
