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
import type { PortfolioService } from "@/constants/types";
import {
  getFirstProfile,
  listPublishedServices,
} from "@/lib/server/db-queries";
import { mapProfile, mapService } from "@/lib/server/portfolio";

export const metadata: Metadata = {
  title: "Services",
  description: "Published portfolio services.",
};

const serviceIcons = [
  Monitor,
  ShoppingCart,
  Server,
  Code2,
  Smartphone,
  Wrench,
];

function getServiceIcon(service: PortfolioService, index: number) {
  const label = `${service.slug} ${service.title}`.toLowerCase();
  if (label.includes("mobile")) return Smartphone;
  if (label.includes("commerce") || label.includes("shop")) return ShoppingCart;
  if (label.includes("pos")) return Server;
  if (label.includes("wordpress") || label.includes("cms")) return Wrench;
  if (label.includes("app")) return Code2;
  return serviceIcons[index % serviceIcons.length];
}

export default async function ServicesPage() {
  const [profileRecord, serviceRecords] = await Promise.all([
    getFirstProfile(),
    listPublishedServices(),
  ]);
  const profile = profileRecord ? mapProfile(profileRecord) : null;
  const services = serviceRecords.map(mapService);
  const stats = profile
    ? [
        {
          label: "Development Experience",
          value: `${profile.stats.years_experience}+ Years`,
        },
        {
          label: "Client Projects",
          value: `${profile.stats.projects_count}+`,
        },
        {
          label: "Clients",
          value: `${profile.stats.clients_count}+`,
        },
      ]
    : [];

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
          {profile?.summary ? (
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              {profile.summary}
            </p>
          ) : null}
        </div>

        {stats.length ? (
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group relative overflow-hidden p-4 rounded-xl border border-border/50 bg-secondary/30 transition-all duration-300 hover:border-primary/30 hover:bg-secondary/45 hover:shadow-[0_18px_45px_rgba(124,58,237,0.12)]"
              >
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <p className="text-lg font-semibold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        ) : null}

        <div className="grid md:grid-cols-2 gap-6 mb-24">
          {services.length ? (
            services.map((service, index) => {
              const ServiceIcon = getServiceIcon(service, index);

              return (
                <article
                  key={service.slug}
                  className="group relative overflow-hidden p-7 rounded-2xl border border-border/50 bg-secondary/30 hover:border-primary/40 transition-all duration-300"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <ServiceIcon className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h2>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {service.description ?? service.summary}
                  </p>

                  {service.deliverables.length ? (
                    <>
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
                    </>
                  ) : null}

                  {service.tech_stack.length ? (
                    <div className="flex flex-wrap gap-2">
                      {service.tech_stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-mono rounded-full bg-muted text-muted-foreground border border-border/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </article>
              );
            })
          ) : (
            <div className="md:col-span-2 rounded-2xl border border-border/50 bg-secondary/25 p-8 text-center">
              <p className="text-sm text-muted-foreground">
                No published services yet.
              </p>
            </div>
          )}
        </div>

        <div className="text-center p-12 rounded-3xl border border-primary/20 bg-primary/5">
          <MessageCircle className="w-8 h-8 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-3 text-balance">
            Have a Project in Mind?
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto mb-6">
            Share your project goals and I will reply with the next practical
            step.
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
