"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = ["All", "Ecommerces", "Mobile Apps", "CMS", "Company Portfolio"];
const PROJECTS_PER_PAGE = 8;

const projects = [
  {
    title: "MTL Express E-commerce",
    description: "React-based online store project for retail products.",
    tech: ["React JS", "JavaScript", "REST API"],
    category: "Ecommerces",
    href: "https://minthilaexpress.com",
  },
  {
    title: "Lori Gaming Store",
    description: "React e-commerce storefront for gaming-related products.",
    tech: ["React JS", "JavaScript", "E-commerce"],
    category: "Ecommerces",
    href: "http://lorigamingstore.com/",
  },
  {
    title: "Nawaratt",
    description: "React Native mobile app delivered for Android distribution.",
    tech: ["React Native", "Expo", "Mobile"],
    category: "Mobile Apps",
    href: "https://expo.dev/artifacts/eas/aJC4aDHQFL5QAorxfFHZkN.apk",
  },
  {
    title: "Nawaratt Online Shopping",
    description:
      "React Native shopping app project (private build and distribution).",
    tech: ["React Native", "Expo", "Mobile Commerce"],
    category: "Mobile Apps",
  },
  {
    title: "Myat Taw Win",
    description: "WordPress website for healthcare/business presentation.",
    tech: ["WordPress", "PHP", "ACF"],
    category: "CMS",
    href: "https://myattawwin.hospital",
  },
  {
    title: "Quan Zhu Fuan",
    description: "WordPress business site delivered with CMS workflow.",
    tech: ["WordPress", "PHP", "ACF"],
    category: "CMS",
    href: "https://quanzhufuan.com",
  },
  {
    title: "Power Nine Group",
    description: "Corporate WordPress website with custom content sections.",
    tech: ["WordPress", "PHP", "ACF"],
    category: "CMS",
    href: "https://www.powerninegroup.com",
  },
  {
    title: "Golden Eugenia Myanmar",
    description: "WordPress website for travel and tours business.",
    tech: ["WordPress", "PHP", "CMS"],
    category: "CMS",
    href: "https://gemtravelandtours.com",
  },
  {
    title: "City Hospital Mandalay",
    description: "WordPress healthcare website for hospital information and branding.",
    tech: ["WordPress", "PHP", "CMS"],
    category: "CMS",
    href: "https://www.cityhospitalmandalay.com/",
  },
  {
    title: "RoyalAlpha",
    description: "WordPress corporate website with custom page structure.",
    tech: ["WordPress", "PHP", "ACF"],
    category: "CMS",
    href: "https://www.royalalpha.com.mm/",
  },
  {
    title: "Royal Shambella",
    description: "WordPress company website for group profile and services.",
    tech: ["WordPress", "PHP", "CMS"],
    category: "CMS",
    href: "https://www.rsfamilyholding.com/",
  },
  {
    title: "Asia Beauty Paradise",
    description: "WordPress business website for beauty and wellness brand.",
    tech: ["WordPress", "PHP", "CMS"],
    category: "CMS",
    href: "https://www.asiabeautyparadise.com/",
  },
  {
    title: "Beta Alliance Engineering",
    description: "WordPress engineering company profile website.",
    tech: ["WordPress", "PHP", "CMS"],
    category: "CMS",
    href: "https://www.betaallianceengineering.com/",
  },
  {
    title: "Peace Brothers",
    description: "WordPress corporate/informational website project.",
    tech: ["WordPress", "PHP", "CMS"],
    category: "CMS",
    href: "https://www.peacebrothers.com.mm/",
  },
  {
    title: "Digital Link",
    description: "WordPress IT company website with editable CMS content.",
    tech: ["WordPress", "PHP", "ACF"],
    category: "CMS",
    href: "https://www.digitallink-it.com/",
  },
  {
    title: "Zay Yar Lin Photography",
    description: "WordPress portfolio website for photography showcase.",
    tech: ["WordPress", "PHP", "Portfolio"],
    category: "CMS",
    href: "https://www.zayyarlinphotography.com/",
  },
  {
    title: "Pao Youth Organization",
    description: "WordPress informational website for community organization.",
    tech: ["WordPress", "PHP", "CMS"],
    category: "CMS",
    href: "https://www.pao-youth.org/",
  },
  {
    title: "India Myanmar Chamber of Commerce",
    description: "WordPress organization website with structured information pages.",
    tech: ["WordPress", "PHP", "CMS"],
    category: "CMS",
    href: "https://www.imccmyanmar.org/",
  },
  {
    title: "International Buddhist Education Center",
    description: "WordPress website for institution profile and announcements.",
    tech: ["WordPress", "PHP", "CMS"],
    category: "CMS",
    href: "https://ibecmyanmar.org/",
  },
  {
    title: "OMUK Myanmar",
    description: "WordPress website for business/organization profile.",
    tech: ["WordPress", "PHP", "CMS"],
    category: "CMS",
    href: "https://www.omukmyanmar.com/",
  },
  {
    title: "The North Creators",
    description:
      "Static company portfolio website built in early-career period.",
    tech: ["HTML", "CSS", "JavaScript", "PHP"],
    category: "Company Portfolio",
    href: "https://www.thenorthcreators.com/",
  },
  {
    title: "Royal Immigrate",
    description:
      "Static business website from beginner era (portfolio-style build).",
    tech: ["HTML", "CSS", "JavaScript", "PHP"],
    category: "Company Portfolio",
    href: "https://royalimmigrate.com",
  },
  {
    title: "Htoo Dana Kyaw",
    description:
      "Static company website developed during foundational stage.",
    tech: ["HTML", "CSS", "JavaScript", "PHP"],
    category: "Company Portfolio",
    href: "https://www.htoodanakyaw.com/",
  },
  {
    title: "EIKA Marine",
    description: "Static website for marine solutions company profile.",
    tech: ["HTML", "CSS", "JavaScript", "PHP"],
    category: "Company Portfolio",
    href: "https://www.eikamarinesolutions.com/",
  },
  {
    title: "AccentorCoaching",
    description: "Static website for coaching/business presence.",
    tech: ["HTML", "CSS", "JavaScript", "PHP"],
    category: "Company Portfolio",
    href: "https://www.accentorcoaching.uk/",
  },
  {
    title: "Fly Me Travel & Tours",
    description: "Static travel and tours website from early project phase.",
    tech: ["HTML", "CSS", "JavaScript", "PHP"],
    category: "Company Portfolio",
    href: "https://flymetravelandtours.com",
  },
  {
    title: "Kyaw Sofa",
    description: "Static furniture/business profile website.",
    tech: ["HTML", "CSS", "JavaScript", "PHP"],
    category: "Company Portfolio",
    href: "https://kyawsofa.com/",
  },
  {
    title: "Miyama Kuruma",
    description: "Static business website project from early career stage.",
    tech: ["HTML", "CSS", "JavaScript", "PHP"],
    category: "Company Portfolio",
    href: "https://miyamakuruma.com/",
  },
  {
    title: "Internal Revenue Department (UI Template)",
    description:
      "UI template contribution project for payment hub interface (listed at end by request).",
    tech: ["UI Template", "Frontend"],
    category: "Internal Template",
    href: "https://uat-paymenthub.ird.gov.mm",
    lowVisibility: true,
  },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const orderedProjects = useMemo(() => {
    const reversed = [...projects].reverse();
    return [
      ...reversed.filter((project) => !project.lowVisibility),
      ...reversed.filter((project) => project.lowVisibility),
    ];
  }, []);

  const filtered =
    activeCategory === "All"
      ? orderedProjects
      : orderedProjects.filter((project) => project.category === activeCategory);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PROJECTS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedProjects = filtered.slice(
    (safeCurrentPage - 1) * PROJECTS_PER_PAGE,
    safeCurrentPage * PROJECTS_PER_PAGE
  );

  return (
    <div className="relative z-10 pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-sm font-mono tracking-[0.3em] text-primary uppercase mb-4">
            My Work
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Projects & Case Studies
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            Real client projects across WordPress, React, React Native, and
            business-focused website builds. Code samples are available on{" "}
            <a
              href="https://github.com/Z1p4U"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              GitHub
            </a>
            .
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setCurrentPage(1);
              }}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-muted border border-border/50"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {paginatedProjects.map((project) => (
            <div
              key={project.title}
              className={cn(
                "group p-6 rounded-2xl border border-border/50 bg-secondary/30 hover:border-primary/30 transition-all duration-300",
                project.lowVisibility && "opacity-80"
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-mono text-primary px-3 py-1 rounded-full bg-primary/10">
                  {project.category}
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://github.com/Z1p4U"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="View GitHub profile"
                    className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Visit ${project.title}`}
                      className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : null}
                </div>
              </div>

              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-mono rounded-full bg-muted text-muted-foreground border border-border/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) =>
                  Math.max(1, Math.min(page, totalPages) - 1)
                )
              }
              disabled={safeCurrentPage === 1}
              className="px-4 py-2 text-sm rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    "w-9 h-9 text-sm rounded-full border transition-colors",
                    safeCurrentPage === page
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/40"
                  )}
                >
                  {page}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(totalPages, Math.min(page, totalPages) + 1)
                )
              }
              disabled={safeCurrentPage === totalPages}
              className="px-4 py-2 text-sm rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}

        <div className="mt-12 p-6 rounded-2xl border border-primary/20 bg-primary/5">
          <p className="text-sm text-muted-foreground leading-relaxed">
            I also have in-house POS systems, HR software, and internal apps
            that are still in development or private by owner policy. If you
            want to review those examples,{" "}
            <Link href="/contact" className="text-primary hover:underline">
              contact me personally
            </Link>{" "}
            and I can share demos when owner permission is available.
          </p>
        </div>
      </div>
    </div>
  );
}
