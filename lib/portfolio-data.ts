import type {
  PortfolioExperience,
  PortfolioProfile,
  PortfolioProject,
  PortfolioService,
  PortfolioSkill,
  ProjectDetailSection,
} from "@/constants/types";
import { API_BASE_URL } from "@/constants/endpoints";

export const portfolioApiBaseUrl = API_BASE_URL;

export const fallbackProfile: PortfolioProfile = {
  name: "Thant Zin Htet",
  headline: "Full-Stack Web Developer",
  summary:
    "Full-Stack Developer with 3+ years of experience building web applications, mobile apps, e-commerce platforms, CMS solutions, and custom business systems using React, Laravel, Node.js, and React Native.",
  bio: "I build e-commerce platforms, POS systems, custom CMS websites, and mobile apps with a focus on clean code and reliable product delivery.",
  email: "zipshigoto310801@gmail.com",
  phone: "+95 979 164 3043 / +84 39 975 4064",
  location: "Bangkok, Thailand",
  availability: "Available for freelance and part-time remote projects",
  github_url: "https://github.com/Z1p4U",
  linkedin_url: null,
  cv_url: "/assets/cv/CV.pdf",
  stats: {
    years_experience: 3,
    clients_count: 20,
    projects_count: 30,
  },
};

export const fallbackProjects: PortfolioProject[] = [
  {
    title: "Iku Team",
    slug: "iku-team",
    description:
      "Company portfolio website built with HubSpot CMS for services, resources, and brand presentation.",
    tech_stack: ["HubSpot CMS", "HubL"],
    category: "Portfolio",
    source: "Event Hub",
    year: "2025",
    project_url: "https://ikuteam.com/",
    image_url: "/assets/projects/IkuTeam.webp",
    is_featured: true,
  },
  {
    title: "MTL Express E-commerce",
    slug: "mtl-express-e-commerce",
    description:
      "Marketplace-style e-commerce website for product browsing and online shopping flows.",
    tech_stack: ["React", "Redux", "shadcn/ui"],
    category: "Ecommerces",
    source: "Netscriper Co., Ltd.",
    year: "2025",
    project_url: "https://minthilaexpress.com",
    image_url: "/assets/projects/MTLExpressE-commerce.webp",
    is_featured: true,
  },
  {
    title: "Zay Yar Lin Photography",
    slug: "zay-yar-lin-photography",
    description:
      "Personal photography portfolio CMS website built with WordPress CMS, ACF, and PHP.",
    tech_stack: ["WordPress CMS", "PHP", "ACF"],
    category: "Portfolio",
    source: "Netscriper Co., Ltd.",
    year: "2025",
    project_url: "https://www.zayyarlinphotography.com/",
    image_url: "/assets/projects/ZayYarLinPhotography.webp",
    is_featured: true,
  },
  {
    title: "Nawaratt Online Shopping",
    slug: "nawaratt-online-shopping",
    description:
      "Marketplace-style mobile shopping app for product discovery, cart, and order flows.",
    tech_stack: ["React Native", "Expo", "Redux", "Laravel"],
    category: "Mobile Apps",
    source: "Freelance",
    year: "2026",
    project_url:
      "https://play.google.com/store/apps/details?id=com.nawaratt.NawarattOnlineShoppingApp",
    image_url: "/assets/projects/NawarattOnlineShopping.webp",
    linkKind: "android",
    is_featured: true,
  },
  {
    title: "EIKA Marine",
    slug: "eika-marine",
    description:
      "Static cargo and marine logistics website for company profile and service presentation.",
    tech_stack: ["HTML", "CSS", "JavaScript", "PHP"],
    category: "Portfolio",
    source: "Netscriper Co., Ltd.",
    project_url: "https://www.eikamarinesolutions.com/",
  },
  {
    title: "Royal Immigrate",
    slug: "royal-immigrate",
    description:
      "Static visa service website for immigration support and consultation.",
    tech_stack: ["HTML", "CSS", "JavaScript", "PHP"],
    category: "Portfolio",
    source: "Netscriper Co., Ltd.",
    project_url: "https://royalimmigrate.com",
  },
  {
    title: "OMUK Myanmar",
    slug: "omuk-myanmar",
    description:
      "Restaurant CMS website built with WordPress CMS, ACF, and PHP for menu and brand content.",
    tech_stack: ["WordPress CMS", "PHP", "ACF"],
    category: "Portfolio",
    source: "Netscriper Co., Ltd.",
    project_url: "https://www.omukmyanmar.com/",
  },
  {
    title: "Lori Gaming Store",
    slug: "lori-gaming-store",
    description:
      "Gaming item e-commerce storefront for top-up and digital product purchasing flows.",
    tech_stack: ["React", "Redux", "shadcn/ui"],
    category: "Ecommerces",
    source: "Freelance",
    project_url: "http://lorigamingstore.com/",
    image_url: "/assets/projects/LoriGamingStore.webp",
  },
  {
    title: "Nawaratt",
    slug: "nawaratt",
    description:
      "Medical e-commerce mobile app for browsing and purchasing healthcare products.",
    tech_stack: ["React Native", "Expo", "Redux", "Laravel"],
    category: "Mobile Apps",
    source: "Freelance",
    image_url: "/assets/projects/NawarattMedical.webp",
  },
  {
    title: "Myat Taw Win",
    slug: "myat-taw-win",
    description:
      "Hospital CMS website built with WordPress CMS, ACF, and PHP for healthcare information.",
    tech_stack: ["WordPress CMS", "PHP", "ACF"],
    category: "Portfolio",
    source: "Netscriper Co., Ltd.",
    project_url: "https://myattawwin.hospital",
    image_url: "/assets/projects/MyatTawWin.webp",
  },
  {
    title: "Power Nine Group",
    slug: "power-nine-group",
    description:
      "Group company CMS website built with WordPress CMS, ACF, and PHP for corporate content.",
    tech_stack: ["WordPress CMS", "PHP", "ACF"],
    category: "Portfolio",
    source: "Netscriper Co., Ltd.",
    project_url: "https://www.powerninegroup.com",
    image_url: "/assets/projects/PowerNineGroup.webp",
  },
  {
    title: "Golden Eugenia Myanmar",
    slug: "golden-eugenia-myanmar",
    description:
      "Travel and tour CMS website built with WordPress CMS, ACF, and PHP for packages and enquiries.",
    tech_stack: ["WordPress CMS", "PHP", "ACF"],
    category: "Portfolio",
    source: "Netscriper Co., Ltd.",
    project_url: "https://gemtravelandtours.com",
    image_url: "/assets/projects/GoldenEugeniaMyanmar.webp",
  },
  {
    title: "City Hospital Mandalay",
    slug: "city-hospital-mandalay",
    description:
      "Hospital CMS website built with WordPress CMS, ACF, and PHP for services and patient information.",
    tech_stack: ["WordPress CMS", "PHP", "ACF"],
    category: "Portfolio",
    source: "Netscriper Co., Ltd.",
    project_url: "https://www.cityhospitalmandalay.com/",
    image_url: "/assets/projects/CityHospitalMandalay.webp",
  },
  {
    title: "RoyalAlpha",
    slug: "royalalpha",
    description:
      "Group company CMS website built with WordPress CMS, ACF, and PHP for corporate presentation.",
    tech_stack: ["WordPress CMS", "PHP", "ACF"],
    category: "Portfolio",
    source: "Netscriper Co., Ltd.",
    project_url: "https://www.royalalpha.com.mm/",
    image_url: "/assets/projects/RoyalAlpha.webp",
  },
  {
    title: "Royal Shambella",
    slug: "royal-shambella",
    description:
      "Group company CMS website built with WordPress CMS, ACF, and PHP for brand and company content.",
    tech_stack: ["WordPress CMS", "PHP", "ACF"],
    category: "Portfolio",
    source: "Netscriper Co., Ltd.",
    project_url: "https://www.rsfamilyholding.com/",
    image_url: "/assets/projects/RoyalShambella.webp",
  },
  {
    title: "Asia Beauty Paradise",
    slug: "asia-beauty-paradise",
    description:
      "Beauty and cosmetics CMS website built with WordPress CMS, ACF, and PHP for product branding.",
    tech_stack: ["WordPress CMS", "PHP", "ACF"],
    category: "Portfolio",
    source: "Netscriper Co., Ltd.",
    project_url: "https://www.asiabeautyparadise.com/",
    image_url: "/assets/projects/AsiaBeautyParadise.webp",
  },
  {
    title: "Beta Alliance Engineering",
    slug: "beta-alliance-engineering",
    description:
      "Engineering company CMS website built with WordPress CMS, ACF, and PHP for service profiles.",
    tech_stack: ["WordPress CMS", "PHP", "ACF"],
    category: "Portfolio",
    source: "Netscriper Co., Ltd.",
    project_url: "https://www.betaallianceengineering.com/",
    image_url: "/assets/projects/BetaAllianceEngineering.webp",
  },
  {
    title: "Peace Brothers",
    slug: "peace-brothers",
    description:
      "Industrial company CMS website built with WordPress CMS, ACF, and PHP for company information.",
    tech_stack: ["WordPress CMS", "PHP", "ACF"],
    category: "Portfolio",
    source: "Netscriper Co., Ltd.",
    project_url: "https://www.peacebrothers.com.mm/",
    image_url: "/assets/projects/PeaceBrothers.webp",
  },
  {
    title: "Digital Link",
    slug: "digital-link",
    description:
      "Technology company CMS website built with WordPress CMS, ACF, and PHP for services and content.",
    tech_stack: ["WordPress CMS", "PHP", "ACF"],
    category: "Portfolio",
    source: "Netscriper Co., Ltd.",
    project_url: "https://www.digitallink-it.com/",
    image_url: "/assets/projects/DigitalLink.webp",
  },
  {
    title: "Pao Youth Organization",
    slug: "pao-youth-organization",
    description:
      "Youth organization CMS website built with WordPress CMS, ACF, and PHP for programs and updates.",
    tech_stack: ["WordPress CMS", "PHP", "ACF"],
    category: "Portfolio",
    source: "Netscriper Co., Ltd.",
    project_url: "https://www.pao-youth.org/",
    image_url: "/assets/projects/PaoYouthOrganization.webp",
  },
  {
    title: "India Myanmar Chamber of Commerce",
    slug: "india-myanmar-chamber-of-commerce",
    description:
      "Chamber of commerce CMS website built with WordPress CMS, ACF, and PHP for member information.",
    tech_stack: ["WordPress CMS", "PHP", "ACF"],
    category: "Portfolio",
    source: "Netscriper Co., Ltd.",
    project_url: "https://www.imccmyanmar.org/",
    image_url: "/assets/projects/India MyanmarChamberofCommerce.webp",
  },
  {
    title: "International Buddhist Education Center",
    slug: "international-buddhist-education-center",
    description:
      "Buddhist education center CMS website built with WordPress CMS, ACF, and PHP for institutional content.",
    tech_stack: ["WordPress CMS", "PHP", "ACF"],
    category: "Portfolio",
    source: "Netscriper Co., Ltd.",
    project_url: "https://ibecmyanmar.org/",
    image_url: "/assets/projects/InternationalBuddhistEducationCenter.webp",
  },
  {
    title: "Quan Zhu Fuan",
    slug: "quan-zhu-fuan",
    description:
      "Group company CMS website built with WordPress CMS, ACF, and PHP for business profiles.",
    tech_stack: ["WordPress CMS", "PHP", "ACF"],
    category: "Portfolio",
    source: "Netscriper Co., Ltd.",
    project_url: "https://quanzhufuan.com",
    image_url: "/assets/projects/QuanZhuFuan.webp",
  },
  {
    title: "Hswe Lee Hint Se Portfolio",
    slug: "hswe-lee-hint-se-portfolio",
    description:
      "UI/UX designer portfolio website built with Next.js for case studies and personal branding.",
    tech_stack: ["Next.js", "shadcn/ui"],
    category: "Portfolio",
    source: "Freelance / Personal",
    project_url: "https://hsweleehintse.netlify.app/",
    image_url: "/assets/projects/HswelePortfolio.webp",
  },
  {
    title: "Nyan Lin Htet Portfolio",
    slug: "nyan-lin-htet-portfolio",
    description:
      "UI/UX designer portfolio website built with React for case studies and personal branding.",
    tech_stack: ["React", "shadcn/ui"],
    category: "Portfolio",
    source: "Freelance / Personal",
    project_url: "https://nyan-lin-htet.netlify.app/",
    image_url: "/assets/projects/NyanLinHtetPortfolio.webp",
  },
  {
    title: "The North Creators",
    slug: "the-north-creators",
    description: "Static company portfolio website built in early-career period.",
    tech_stack: ["HTML", "CSS", "JavaScript", "PHP"],
    category: "Portfolio",
    source: "Netscriper Co., Ltd.",
    project_url: "https://www.thenorthcreators.com/",
    image_url: "/assets/projects/TheNorthCreators.webp",
  },
  {
    title: "Htoo Dana Kyaw",
    slug: "htoo-dana-kyaw",
    description:
      "Static construction and real estate website for company profile and project presentation.",
    tech_stack: ["HTML", "CSS", "JavaScript", "PHP"],
    category: "Portfolio",
    source: "Netscriper Co., Ltd.",
    project_url: "https://www.htoodanakyaw.com/",
    image_url: "/assets/projects/HtooDanaKyaw.webp",
  },
  {
    title: "AccentorCoaching",
    slug: "accentorcoaching",
    description: "Static website for coaching/business presence.",
    tech_stack: ["HTML", "CSS", "JavaScript", "PHP"],
    category: "Portfolio",
    source: "Netscriper Co., Ltd.",
    project_url: "https://www.accentorcoaching.uk/",
    image_url: "/assets/projects/AccentorCoaching.webp",
  },
  {
    title: "Fly Me Travel & Tours",
    slug: "fly-me-travel-tours",
    description: "Static travel and tours website from early project phase.",
    tech_stack: ["HTML", "CSS", "JavaScript", "PHP"],
    category: "Portfolio",
    source: "Netscriper Co., Ltd.",
    project_url: "https://flymetravelandtours.com",
    image_url: "/assets/projects/FlyMeTravel&Tours.webp",
  },
  {
    title: "Kyaw Sofa",
    slug: "kyaw-sofa",
    description: "Static furniture/business profile website.",
    tech_stack: ["HTML", "CSS", "JavaScript", "PHP"],
    category: "Portfolio",
    source: "Netscriper Co., Ltd.",
    project_url: "https://kyawsofa.com/",
    image_url: "/assets/projects/KyawSofa.webp",
  },
  {
    title: "Miyama Kuruma",
    slug: "miyama-kuruma",
    description:
      "Static car business website for vehicle information and company presentation.",
    tech_stack: ["HTML", "CSS", "JavaScript", "PHP"],
    category: "Portfolio",
    source: "Netscriper Co., Ltd.",
    project_url: "https://miyamakuruma.com/",
    image_url: "/assets/projects/MiyamaKuruma.webp",
  },
  {
    title: "Pan Khone Taw Restaurant",
    slug: "pan-khone-taw-restaurant",
    description:
      "Static restaurant website for brand presentation, menu browsing, and customer contact.",
    tech_stack: ["HTML", "CSS", "JavaScript"],
    category: "Portfolio",
    source: "Netscriper Co., Ltd.",
    project_url: "https://www.pan-khone-taw.com/",
    image_url: "/assets/projects/PanKhoneThaw.webp",
  },
  {
    title: "Z Land Development",
    slug: "z-land-development",
    description:
      "Static company website for real estate and land development business presentation.",
    tech_stack: ["HTML", "CSS", "JavaScript"],
    category: "Portfolio",
    source: "Netscriper Co., Ltd.",
    project_url: "https://www.zlanddevelopment.com/",
    image_url: "/assets/projects/ZLandDevelopment.webp",
  },
  {
    title: "Internal Revenue Department (UI Template)",
    slug: "internal-revenue-department-ui-template",
    description:
      "UI template contribution for the Internal Revenue Department payment hub interface.",
    tech_stack: ["HTML", "CSS"],
    category: "Internal Template",
    source: "Netscriper Co., Ltd.",
    project_url: "https://uat-paymenthub.ird.gov.mm",
    lowVisibility: true,
  },
];

export const fallbackServices: PortfolioService[] = [
  {
    title: "Company Portfolios & Websites",
    slug: "company-portfolios-websites",
    summary:
      "Professional responsive websites for brand presence, services, and lead capture.",
    description:
      "From single-page landing pages to multi-page company sites, focused on speed, SEO, and maintainable implementation.",
    deliverables: [
      "Responsive design",
      "SEO basics",
      "Analytics setup",
      "Contact forms",
      "CMS integration",
    ],
    tech_stack: ["Next.js", "React", "WordPress", "Tailwind CSS"],
  },
  {
    title: "E-Commerce Platforms",
    slug: "e-commerce-platforms",
    summary:
      "Custom stores with catalog, cart, checkout, payment, and order-management flows.",
    description:
      "WooCommerce setups and custom Laravel/React commerce builds for product-driven businesses.",
    deliverables: [
      "Product catalog",
      "Cart and checkout",
      "Payment integration",
      "Order dashboard",
      "Inventory flows",
    ],
    tech_stack: ["WooCommerce", "Laravel", "React", "Stripe"],
  },
  {
    title: "POS Systems",
    slug: "pos-systems",
    summary: "Point-of-sale systems for retail or restaurant operations.",
    description:
      "Custom POS tools with inventory, reporting, role management, and daily operations support.",
    deliverables: [
      "Sales tracking",
      "Inventory management",
      "Employee access",
      "Reports",
      "Receipt flows",
    ],
    tech_stack: ["React", "Laravel", "Node.js", "MySQL"],
  },
];

export const fallbackSkills: PortfolioSkill[] = [
  { name: "React", category: "Frontend", proficiency: 92 },
  { name: "Next.js", category: "Frontend", proficiency: 90 },
  { name: "TypeScript", category: "Frontend", proficiency: 88 },
  { name: "Tailwind CSS", category: "Frontend", proficiency: 90 },
  { name: "Laravel", category: "Backend", proficiency: 90 },
  { name: "Node.js", category: "Backend", proficiency: 84 },
  { name: "React Native", category: "Mobile", proficiency: 86 },
  { name: "WordPress", category: "CMS", proficiency: 88 },
];

export const fallbackExperiences: PortfolioExperience[] = [
  {
    period: "Jan 2026 - Present",
    title: "Full-Stack Web Developer",
    company: "Ravus Law Firm",
    description:
      "Working on internal and client-facing web systems while maintaining production-grade code quality and delivery.",
  },
  {
    period: "2023 - Present",
    title: "Freelance Full-Stack & Mobile Developer",
    company: null,
    description:
      "Delivering web and mobile projects for clients using React/Next.js, React Native, Laravel, and Node.js.",
  },
];

export function makeFallbackDetailSections(
  project: PortfolioProject,
): ProjectDetailSection[] {
  return [
    {
      block_type: "overview",
      layout: "image_right",
      title: "Project Context",
      body: `I worked on ${project.title} as a ${project.source ?? "portfolio"} project, focusing on a clean user experience, maintainable implementation, and practical delivery for the business goal.`,
      image_url: project.image_url,
      image_alt: `${project.title} preview`,
      caption: "Project preview and interface direction.",
    },
    {
      block_type: "contribution",
      layout: "image_left",
      title: "My Contribution",
      body:
        "I contributed to planning the structure, building the main UI flow, connecting content or data requirements, and preparing the project for production handoff.",
      image_url: project.image_url,
      image_alt: `${project.title} contribution screenshot`,
      caption: "Contribution notes and selected interface work.",
    },
    {
      block_type: "implementation",
      layout: "full_width",
      title: "Implementation Notes",
      body:
        "The implementation used the listed stack to keep the product easy to maintain and extend. This section can hold architecture, CMS setup, API, deployment, mobile flow, or performance notes.",
      image_url: project.image_url,
      image_alt: `${project.title} implementation screenshot`,
      metadata: {
        tech_stack: project.tech_stack,
      },
    },
  ];
}

export function getFallbackProject(slug: string) {
  const project = fallbackProjects.find((item) => item.slug === slug);
  if (!project) return null;

  return {
    ...project,
    detail_sections:
      project.detail_sections?.length ? project.detail_sections : makeFallbackDetailSections(project),
  };
}
