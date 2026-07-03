"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Building2, ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = ["All", "Ecommerces", "Mobile Apps", "Portfolio"];
const PROJECTS_PER_PAGE = 8;

const projectImages: Record<string, string> = {
  "MTL Express E-commerce": "/assets/projects/MTLExpressE-commerce.webp",
  "Lori Gaming Store": "/assets/projects/LoriGamingStore.webp",
  Nawaratt: "/assets/projects/NawarattMedical.webp",
  "Nawaratt Online Shopping": "/assets/projects/NawarattOnlineShopping.webp",
  "Myat Taw Win": "/assets/projects/MyatTawWin.webp",
  "Quan Zhu Fuan": "/assets/projects/QuanZhuFuan.webp",
  "Power Nine Group": "/assets/projects/PowerNineGroup.webp",
  "Golden Eugenia Myanmar": "/assets/projects/GoldenEugeniaMyanmar.webp",
  "City Hospital Mandalay": "/assets/projects/CityHospitalMandalay.webp",
  RoyalAlpha: "/assets/projects/RoyalAlpha.webp",
  "Royal Shambella": "/assets/projects/RoyalShambella.webp",
  "Asia Beauty Paradise": "/assets/projects/AsiaBeautyParadise.webp",
  "Beta Alliance Engineering": "/assets/projects/BetaAllianceEngineering.webp",
  "Peace Brothers": "/assets/projects/PeaceBrothers.webp",
  "Digital Link": "/assets/projects/DigitalLink.webp",
  "Zay Yar Lin Photography": "/assets/projects/ZayYarLinPhotography.webp",
  "Pao Youth Organization": "/assets/projects/PaoYouthOrganization.webp",
  "India Myanmar Chamber of Commerce":
    "/assets/projects/India MyanmarChamberofCommerce.webp",
  "International Buddhist Education Center":
    "/assets/projects/InternationalBuddhistEducationCenter.webp",
  "The North Creators": "/assets/projects/TheNorthCreators.webp",
  "Htoo Dana Kyaw": "/assets/projects/HtooDanaKyaw.webp",
  AccentorCoaching: "/assets/projects/AccentorCoaching.webp",
  "Fly Me Travel & Tours": "/assets/projects/FlyMeTravel&Tours.webp",
  "Kyaw Sofa": "/assets/projects/KyawSofa.webp",
  "Miyama Kuruma": "/assets/projects/MiyamaKuruma.webp",
  "Pan Khone Taw Restaurant": "/assets/projects/PanKhoneThaw.webp",
  "Nyan Lin Htet Portfolio": "/assets/projects/NyanLinHtetPortfolio.webp",
  "Z Land Development": "/assets/projects/ZLandDevelopment.webp",
  "Hswe Lee Hint Se Portfolio": "/assets/projects/HswelePortfolio.webp",
  "Iku Team": "/assets/projects/IkuTeam.webp",
};

function getProjectSource(project: (typeof projects)[number]) {
  if (
    project.title === "Nawaratt" ||
    project.title === "Nawaratt Online Shopping" ||
    project.title === "Lori Gaming Store"
  ) {
    return "Freelance";
  }

  if (
    project.title === "Hswe Lee Hint Se Portfolio" ||
    project.title === "Nyan Lin Htet Portfolio"
  ) {
    return "Freelance / Personal";
  }

  if (project.title === "Iku Team") {
    return "Event Hub";
  }

  if (project.title === "MTL Express E-commerce") {
    return "Netscriper Co., Ltd.";
  }

  if (
    project.category === "Portfolio" ||
    project.category === "Internal Template"
  ) {
    return "Netscriper Co., Ltd.";
  }

  return null;
}

const projects = [
  {
    title: "EIKA Marine",
    description:
      "Static cargo and marine logistics website for company profile and service presentation.",
    tech: ["HTML", "CSS", "JavaScript", "PHP"],
    category: "Portfolio",
    href: "https://www.eikamarinesolutions.com/",
  },
  {
    title: "Royal Immigrate",
    description:
      "Static visa service website for immigration support and consultation.",
    tech: ["HTML", "CSS", "JavaScript", "PHP"],
    category: "Portfolio",
    href: "https://royalimmigrate.com",
  },
  {
    title: "OMUK Myanmar",
    description:
      "Restaurant CMS website built with WordPress CMS, ACF, and PHP for menu and brand content.",
    tech: ["WordPress CMS", "PHP", "ACF"],
    category: "Portfolio",
    href: "https://www.omukmyanmar.com/",
  },
  {
    title: "MTL Express E-commerce",
    description:
      "Marketplace-style e-commerce website for product browsing and online shopping flows.",
    tech: ["React", "Redux", "shadcn/ui"],
    category: "Ecommerces",
    href: "https://minthilaexpress.com",
  },
  {
    title: "Lori Gaming Store",
    description:
      "Gaming item e-commerce storefront for top-up and digital product purchasing flows.",
    tech: ["React", "shadcn/ui"],
    category: "Ecommerces",
    href: "http://lorigamingstore.com/",
  },
  {
    title: "Nawaratt",
    description:
      "Medical e-commerce mobile app for browsing and purchasing healthcare products.",
    tech: ["React Native", "Expo", "Redux", "Laravel"],
    category: "Mobile Apps",
    href: "https://expo.dev/artifacts/eas/aJC4aDHQFL5QAorxfFHZkN.apk",
  },
  {
    title: "Nawaratt Online Shopping",
    description:
      "Marketplace-style mobile shopping app for product discovery, cart, and order flows.",
    tech: ["React Native", "Expo", "Redux", "Laravel"],
    category: "Mobile Apps",
  },
  {
    title: "Myat Taw Win",
    description:
      "Hospital CMS website built with WordPress CMS, ACF, and PHP for healthcare information.",
    tech: ["WordPress CMS", "PHP", "ACF"],
    category: "Portfolio",
    href: "https://myattawwin.hospital",
  },
  {
    title: "Power Nine Group",
    description:
      "Group company CMS website built with WordPress CMS, ACF, and PHP for corporate content.",
    tech: ["WordPress CMS", "PHP", "ACF"],
    category: "Portfolio",
    href: "https://www.powerninegroup.com",
  },
  {
    title: "Golden Eugenia Myanmar",
    description:
      "Travel and tour CMS website built with WordPress CMS, ACF, and PHP for packages and enquiries.",
    tech: ["WordPress CMS", "PHP", "ACF"],
    category: "Portfolio",
    href: "https://gemtravelandtours.com",
  },
  {
    title: "City Hospital Mandalay",
    description:
      "Hospital CMS website built with WordPress CMS, ACF, and PHP for services and patient information.",
    tech: ["WordPress CMS", "PHP", "ACF"],
    category: "Portfolio",
    href: "https://www.cityhospitalmandalay.com/",
  },
  {
    title: "RoyalAlpha",
    description:
      "Group company CMS website built with WordPress CMS, ACF, and PHP for corporate presentation.",
    tech: ["WordPress CMS", "PHP", "ACF"],
    category: "Portfolio",
    href: "https://www.royalalpha.com.mm/",
  },
  {
    title: "Royal Shambella",
    description:
      "Group company CMS website built with WordPress CMS, ACF, and PHP for brand and company content.",
    tech: ["WordPress CMS", "PHP", "ACF"],
    category: "Portfolio",
    href: "https://www.rsfamilyholding.com/",
  },
  {
    title: "Asia Beauty Paradise",
    description:
      "Beauty and cosmetics CMS website built with WordPress CMS, ACF, and PHP for product branding.",
    tech: ["WordPress CMS", "PHP", "ACF"],
    category: "Portfolio",
    href: "https://www.asiabeautyparadise.com/",
  },
  {
    title: "Beta Alliance Engineering",
    description:
      "Engineering company CMS website built with WordPress CMS, ACF, and PHP for service profiles.",
    tech: ["WordPress CMS", "PHP", "ACF"],
    category: "Portfolio",
    href: "https://www.betaallianceengineering.com/",
  },
  {
    title: "Peace Brothers",
    description:
      "Industrial company CMS website built with WordPress CMS, ACF, and PHP for company information.",
    tech: ["WordPress CMS", "PHP", "ACF"],
    category: "Portfolio",
    href: "https://www.peacebrothers.com.mm/",
  },
  {
    title: "Digital Link",
    description:
      "Technology company CMS website built with WordPress CMS, ACF, and PHP for services and content.",
    tech: ["WordPress CMS", "PHP", "ACF"],
    category: "Portfolio",
    href: "https://www.digitallink-it.com/",
  },
  {
    title: "Zay Yar Lin Photography",
    description:
      "Personal photography portfolio CMS website built with WordPress CMS, ACF, and PHP.",
    tech: ["WordPress CMS", "PHP", "ACF"],
    category: "Portfolio",
    href: "https://www.zayyarlinphotography.com/",
  },
  {
    title: "Pao Youth Organization",
    description:
      "Youth organization CMS website built with WordPress CMS, ACF, and PHP for programs and updates.",
    tech: ["WordPress CMS", "PHP", "ACF"],
    category: "Portfolio",
    href: "https://www.pao-youth.org/",
  },
  {
    title: "India Myanmar Chamber of Commerce",
    description:
      "Chamber of commerce CMS website built with WordPress CMS, ACF, and PHP for member information.",
    tech: ["WordPress CMS", "PHP", "ACF"],
    category: "Portfolio",
    href: "https://www.imccmyanmar.org/",
  },
  {
    title: "International Buddhist Education Center",
    description:
      "Buddhist education center CMS website built with WordPress CMS, ACF, and PHP for institutional content.",
    tech: ["WordPress CMS", "PHP", "ACF"],
    category: "Portfolio",
    href: "https://ibecmyanmar.org/",
  },
  {
    title: "Quan Zhu Fuan",
    description:
      "Group company CMS website built with WordPress CMS, ACF, and PHP for business profiles.",
    tech: ["WordPress CMS", "PHP", "ACF"],
    category: "Portfolio",
    href: "https://quanzhufuan.com",
  },
  {
    title: "Hswe Lee Hint Se Portfolio",
    description:
      "UI/UX designer portfolio website built with Next.js for case studies and personal branding.",
    tech: ["Next.js", "shadcn/ui"],
    category: "Portfolio",
    href: "https://hsweleehintse.netlify.app/",
  },
  {
    title: "Nyan Lin Htet Portfolio",
    description:
      "UI/UX designer portfolio website built with React for case studies and personal branding.",
    tech: ["React", "shadcn/ui"],
    category: "Portfolio",
    href: "https://nyan-lin-htet.netlify.app/",
  },
  {
    title: "The North Creators",
    description:
      "Static company portfolio website built in early-career period.",
    tech: ["HTML", "CSS", "JavaScript", "PHP"],
    category: "Portfolio",
    href: "https://www.thenorthcreators.com/",
  },
  {
    title: "Htoo Dana Kyaw",
    description:
      "Static construction and real estate website for company profile and project presentation.",
    tech: ["HTML", "CSS", "JavaScript", "PHP"],
    category: "Portfolio",
    href: "https://www.htoodanakyaw.com/",
  },
  {
    title: "AccentorCoaching",
    description: "Static website for coaching/business presence.",
    tech: ["HTML", "CSS", "JavaScript", "PHP"],
    category: "Portfolio",
    href: "https://www.accentorcoaching.uk/",
  },
  {
    title: "Fly Me Travel & Tours",
    description: "Static travel and tours website from early project phase.",
    tech: ["HTML", "CSS", "JavaScript", "PHP"],
    category: "Portfolio",
    href: "https://flymetravelandtours.com",
  },
  {
    title: "Kyaw Sofa",
    description: "Static furniture/business profile website.",
    tech: ["HTML", "CSS", "JavaScript", "PHP"],
    category: "Portfolio",
    href: "https://kyawsofa.com/",
  },
  {
    title: "Miyama Kuruma",
    description:
      "Static car business website for vehicle information and company presentation.",
    tech: ["HTML", "CSS", "JavaScript", "PHP"],
    category: "Portfolio",
    href: "https://miyamakuruma.com/",
  },
  {
    title: "Pan Khone Taw Restaurant",
    description:
      "Static restaurant website for brand presentation, menu browsing, and customer contact.",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "Portfolio",
    href: "https://www.pan-khone-taw.com/",
  },
  {
    title: "Z Land Development",
    description:
      "Static company website for real estate and land development business presentation.",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "Portfolio",
    href: "https://www.zlanddevelopment.com/",
  },
  {
    title: "Iku Team",
    description:
      "Company portfolio website built with HubSpot CMS for services, resources, and brand presentation.",
    tech: ["HubSpot CMS", "HubL"],
    category: "Portfolio",
    href: "https://ikuteam.com/",
  },
  {
    title: "Internal Revenue Department (UI Template)",
    description:
      "UI template contribution for the Internal Revenue Department payment hub interface.",
    tech: ["HTML", "CSS"],
    category: "Internal Template",
    href: "https://uat-paymenthub.ird.gov.mm",
    lowVisibility: true,
  },
];

const featuredProjectOrder = [
  "Iku Team",
  "Golden Eugenia Myanmar",
  "Myat Taw Win",
  "City Hospital Mandalay",
  "Power Nine Group",
  "Zay Yar Lin Photography",
  "India Myanmar Chamber of Commerce",
  "Asia Beauty Paradise",
];

const pinnedLastProjectOrder = [
  "OMUK Myanmar",
  "Royal Immigrate",
  "EIKA Marine",
  "Internal Revenue Department (UI Template)",
];

function getProjectSortRank(project: (typeof projects)[number]) {
  const pinnedLastIndex = pinnedLastProjectOrder.indexOf(project.title);

  if (pinnedLastIndex >= 0) {
    return 100 + pinnedLastIndex;
  }

  const featuredIndex = featuredProjectOrder.indexOf(project.title);

  if (featuredIndex >= 0) {
    return featuredIndex;
  }

  if (project.tech.includes("WordPress CMS")) {
    return 20;
  }

  if (
    project.tech.some((tech) =>
      ["React", "Next.js", "React Native", "Redux"].includes(tech),
    )
  ) {
    return 40;
  }

  if (project.tech.includes("HTML")) {
    return 60;
  }

  return 80;
}

function ProjectPreview({ image, title }: { image?: string; title: string }) {
  return (
    <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-xl border border-border/40 bg-background/60">
      {image ? (
        <Image
          src={image}
          alt={`${title} website preview`}
          fill
          unoptimized
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover object-top transition duration-700 group-hover/card:scale-105"
        />
      ) : (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(124,58,237,0.35),transparent_34%),linear-gradient(135deg,rgba(15,23,42,0.88),rgba(8,7,11,0.96))]" />
          <div className="absolute inset-x-4 top-4 flex items-center justify-between">
            <span className="h-2 w-20 rounded-full bg-white/35" />
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary/70" />
              <span className="h-2 w-2 rounded-full bg-white/30" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
            </div>
          </div>
          <div className="absolute inset-x-4 top-12 grid grid-cols-4 gap-2">
            <span className="col-span-2 h-14 rounded-lg bg-white/20" />
            <span className="col-span-2 h-14 rounded-lg bg-primary/25" />
            <span className="h-10 rounded-lg bg-white/15" />
            <span className="h-10 rounded-lg bg-white/25" />
            <span className="col-span-2 h-10 rounded-lg bg-black/30" />
          </div>
          <div className="absolute bottom-4 left-4 right-4 space-y-2">
            <span className="block h-2.5 w-2/3 rounded-full bg-white/35" />
            <span className="block h-2 w-1/2 rounded-full bg-white/20" />
          </div>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
    </div>
  );
}

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const orderedProjects = useMemo(() => {
    return [...projects].sort(
      (a, b) => getProjectSortRank(a) - getProjectSortRank(b),
    );
  }, []);

  const filtered =
    activeCategory === "All"
      ? orderedProjects
      : orderedProjects.filter(
          (project) => project.category === activeCategory,
        );

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / PROJECTS_PER_PAGE),
  );
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedProjects = filtered.slice(
    (safeCurrentPage - 1) * PROJECTS_PER_PAGE,
    safeCurrentPage * PROJECTS_PER_PAGE,
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
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-muted border border-border/50",
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
                "group/card relative h-full overflow-hidden rounded-2xl border border-border/50 bg-secondary/30 p-5 transition-all duration-500 hover:border-primary/30 hover:bg-secondary/40 hover:shadow-[0_24px_70px_rgba(0,0,0,0.28)]",
                project.lowVisibility && "opacity-80",
              )}
            >
              <span className="pointer-events-none absolute inset-0 opacity-0 blur-2xl transition-opacity duration-700 group-hover/card:opacity-100 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.28),transparent_42%)]" />
              <div className="relative z-10 flex h-full flex-col">
                <ProjectPreview
                  image={projectImages[project.title]}
                  title={project.title}
                />
                <div className="flex items-start justify-between mb-4 gap-4">
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <span className="text-xs font-mono text-primary px-3 py-1 rounded-full bg-primary/10">
                      {project.category}
                    </span>
                    {getProjectSource(project) ? (
                      <span className="inline-flex min-w-0 items-center gap-1.5 rounded-full border border-border/40 bg-background/45 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors group-hover/card:border-primary/25 group-hover/card:text-foreground">
                        <Building2 className="h-3.5 w-3.5 shrink-0 text-primary/80" />
                        <span className="truncate">
                          {getProjectSource(project)}
                        </span>
                      </span>
                    ) : null}
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
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

                <h3 className="text-lg font-bold text-foreground group-hover/card:text-primary transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {project.description}
                </p>

                <div className="mt-auto flex flex-wrap gap-2 pt-1">
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
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) =>
                  Math.max(1, Math.min(page, totalPages) - 1),
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
                      : "border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/40",
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
                  Math.min(totalPages, Math.min(page, totalPages) + 1),
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
