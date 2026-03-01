import type { Metadata } from "next";
import {
  ArrowRight,
  Monitor,
  ShoppingCart,
  Server,
  Code2,
  Smartphone,
  Wrench,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services | Thant Zin Htet",
  description:
    "Full-stack development services including e-commerce, POS systems, custom CMS websites, and React Native mobile apps.",
};

const services = [
  {
    icon: Monitor,
    title: "Company Portfolios & Websites",
    description:
      "Professional websites that establish your digital presence and credibility. From single-page landing pages to full multi-page company websites, I build responsive, fast, and SEO-optimized sites that leave a lasting impression.",
    deliverables: [
      "Responsive design for all devices",
      "SEO optimization & analytics",
      "Contact forms & lead capture",
      "CMS integration for easy updates",
      "Social media integration",
    ],
    tech: ["Next.js", "React", "WordPress", "Tailwind CSS"],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Platforms",
    description:
      "Custom online stores with everything you need to sell online. Whether it's a WooCommerce setup or a fully custom-built platform, I handle product catalogs, payment gateways, shipping logic, and order management.",
    deliverables: [
      "Product catalog & search",
      "Secure payment integration (Stripe, PayPal, etc.)",
      "Shopping cart & checkout",
      "Order management dashboard",
      "Inventory tracking system",
    ],
    tech: ["WooCommerce", "Laravel", "React", "Stripe"],
  },
  {
    icon: Server,
    title: "POS Systems",
    description:
      "Point-of-sale solutions built to streamline your retail or restaurant operations. I develop custom POS systems with inventory management, sales reporting, employee tracking, and multi-device support.",
    deliverables: [
      "Real-time sales tracking",
      "Inventory management",
      "Employee access control",
      "Receipt printing & reports",
      "Multi-device synchronization",
    ],
    tech: ["React", "Laravel", "Node.js", "MySQL"],
  },
  {
    icon: Code2,
    title: "Custom Web Applications",
    description:
      "Full-stack web applications tailored to your specific business logic. Admin dashboards, SaaS products, internal tools, or any custom solution your business needs to operate more efficiently.",
    deliverables: [
      "Custom business logic & workflows",
      "Admin dashboard & reporting",
      "API development & integration",
      "Authentication & role management",
      "Database architecture & design",
    ],
    tech: ["Next.js", "Node.js", "Laravel", "PostgreSQL"],
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    description:
      "Cross-platform mobile apps using React Native. One codebase that runs on both iOS and Android with native-like performance, smooth animations, and seamless user experience.",
    deliverables: [
      "iOS & Android from one codebase",
      "Push notifications",
      "Offline support",
      "Native device features",
      "App store submission support",
    ],
    tech: ["React Native", "Expo", "Firebase"],
  },
  {
    icon: Wrench,
    title: "WordPress Development",
    description:
      "Custom WordPress themes and plugins, WooCommerce setups, performance optimization, and ongoing maintenance. If you already have a WordPress site, I can improve it or build exactly what you need from scratch.",
    deliverables: [
      "Custom theme development",
      "Plugin development & customization",
      "WooCommerce store setup",
      "Speed & performance optimization",
      "Security hardening & maintenance",
    ],
    tech: ["WordPress", "PHP", "WooCommerce", "Elementor"],
  },
];

const process = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We align scope, goals, timeline, and budget so we start with a clear technical direction.",
  },
  {
    step: "02",
    title: "Planning",
    description:
      "I map architecture, features, milestones, and handoff expectations before coding starts.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Development runs in iterations with regular updates, demos, and decision checkpoints.",
  },
  {
    step: "04",
    title: "Launch & Support",
    description:
      "After QA and approval, I deploy and support the project to keep it stable post-launch.",
  },
];

export default function ServicesPage() {
  return (
    <div className="relative z-10 pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-sm font-mono tracking-[0.3em] text-primary uppercase mb-4">
            Services
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Building Solutions That Work
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            From concept to deployment, I build practical products with React /
            Next.js, Laravel / Node.js, React Native, and WordPress. My recent
            work includes e-commerce systems, business websites, and in-house
            operational tools.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <div className="p-4 rounded-xl border border-border/50 bg-secondary/30">
            <p className="text-lg font-semibold text-primary">3+ Years</p>
            <p className="text-sm text-muted-foreground">Full-stack development experience</p>
          </div>
          <div className="p-4 rounded-xl border border-border/50 bg-secondary/30">
            <p className="text-lg font-semibold text-primary">React + Laravel</p>
            <p className="text-sm text-muted-foreground">Production apps and REST APIs</p>
          </div>
          <div className="p-4 rounded-xl border border-border/50 bg-secondary/30">
            <p className="text-lg font-semibold text-primary">WordPress + ACF</p>
            <p className="text-sm text-muted-foreground">CMS delivery and deployment support</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-24">
          {services.map((service) => (
            <article
              key={service.title}
              className="group relative overflow-hidden p-7 rounded-2xl border border-border/50 bg-secondary/30 hover:border-primary/40 transition-all duration-300"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

              <div className="flex items-start gap-4 mb-4">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h2>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {service.description}
              </p>

              <h3 className="text-xs font-mono tracking-[0.2em] text-muted-foreground uppercase mb-3">
                What You Get
              </h3>
              <ul className="grid gap-2 mb-5">
                {service.deliverables.slice(0, 4).map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-foreground"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {service.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-mono rounded-full bg-muted text-muted-foreground border border-border/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mb-24">
          <div className="mb-8">
            <p className="text-sm font-mono tracking-[0.3em] text-primary uppercase mb-3">
              Process
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              How I Work
            </h2>
          </div>
          <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item) => (
              <div
                key={item.step}
                className="relative p-6 rounded-2xl border border-border/50 bg-secondary/30 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full border border-primary/30 bg-primary/10 text-primary font-mono text-lg flex items-center justify-center mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center p-12 rounded-3xl border border-primary/20 bg-primary/5">
          <MessageCircle className="w-8 h-8 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-3 text-balance">
            Have a Project in Mind?
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto mb-6">
            {
              "Let's break down your idea and define a practical build plan with a clear estimate."
            }
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-colors"
          >
            {"Let's Talk"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
