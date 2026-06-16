"use client";

import { useRef, useEffect, useState } from "react";
import {
  Code2,
  Smartphone,
  Server,
  ShoppingCart,
  Database,
  Globe,
} from "lucide-react";

const skills = [
  {
    icon: Code2,
    title: "Frontend Development",
    description:
      "Building beautiful, responsive, and highly performant user interfaces with modern frameworks and type-safe code.",
    techs: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5/CSS3"],
  },
  {
    icon: Server,
    title: "Backend Development",
    description:
      "Designing robust server-side architectures, scalable database schemas, and secure, RESTful APIs.",
    techs: ["Node.js", "Laravel", "C#/.NET"],
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description:
      "Developing seamless, cross-platform mobile applications with native-like performance and custom device features.",
    techs: ["React Native", "Expo"],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    description:
      "Crafting high-converting online shops using custom full-stack solutions or headless architectures, alongside tailored CMS configurations.",
    techs: ["Laravel + React", "Node.js + Next.js", "WooCommerce"],
  },
  {
    icon: Database,
    title: "Database & DevOps",
    description:
      "Managing relational and non-relational data structures while ensuring smooth deployment and version control workflows.",
    techs: ["MySQL", "PostgreSQL", "MongoDB", "Firebase", "Git", "Docker"],
  },
  {
    icon: Globe,
    title: "WordPress & CMS",
    description:
      "Custom themes, plugins, and full WordPress site development. Fast, SEO-friendly, and easy to manage.",
    techs: ["WordPress", "ACF", "Custom Themes"],
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

export function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);

  return (
    <section id="skills" className="relative z-10 py-24 px-6 lg:px-16">
      <div ref={sectionRef} className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px w-12 bg-primary" />
          <span className="text-xs font-mono tracking-[0.3em] text-primary uppercase">
            Skills
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-16 text-balance">
          {"My Tech Stack"}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((skill, i) => (
            <div
              key={skill.title}
              className={`group relative rounded-2xl border border-border/40 bg-secondary/20 p-7 transition-all duration-300 hover:border-primary/20 hover:bg-secondary/25 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary mb-5 group-hover:bg-primary/15 transition-colors">
                <skill.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 transition-colors group-hover:text-foreground">
                {skill.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {skill.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {skill.techs.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-muted text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
