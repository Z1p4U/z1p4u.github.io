import {
  ArrowRight,
  Code2,
  Monitor,
  ShoppingCart,
  Smartphone,
  Server,
  Wrench,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Monitor,
    title: "Company Portfolios",
    description:
      "Business websites that showcase your brand and services with clean, maintainable code.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Platforms",
    description:
      "Online stores with catalog, checkout flow, payment integration, and admin management.",
  },
  {
    icon: Server,
    title: "POS Systems",
    description:
      "In-house POS solutions with inventory tracking, sales reporting, and staff workflows.",
  },
  {
    icon: Code2,
    title: "Custom Web Apps",
    description:
      "Full-stack applications built around your business process, reporting, and operations.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "React Native apps for Android/iOS with practical UX and API-connected functionality.",
  },
  {
    icon: Wrench,
    title: "WordPress Development",
    description:
      "WordPress CMS builds with ACF, custom themes, performance improvements, and maintenance.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="relative z-10 py-24 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px w-12 bg-primary" />
          <span className="text-xs font-mono tracking-[0.3em] text-primary uppercase">
            Services
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">
            {"What I can build"}
            <br />
            {"for you."}
          </h2>
          <Link
            href="/service"
            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
          >
            View all services
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/30 rounded-xl overflow-hidden">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-background p-8 group hover:bg-secondary/30 transition-all duration-300"
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary mb-5 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
