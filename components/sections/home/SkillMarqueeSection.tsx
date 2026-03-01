"use client";

import { useRef, useEffect, useState } from "react";

const techStack = [
  "React",
  "Next.js",
  "React Native",
  "TypeScript",
  "Tailwind CSS",
  "PHP",
  "Laravel",
  "Node.js",
  "Express.js",
  "WordPress",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "Firebase",
  "Git",
  "Docker",
  "REST APIs",
  "WooCommerce",
];

const specializations = [
  {
    number: "01",
    title: "Web Applications",
    description:
      "Full-stack web apps built with React, Next.js, and Laravel. From admin dashboards to customer-facing platforms.",
  },
  {
    number: "02",
    title: "POS Systems",
    description:
      "Complete point-of-sale solutions with inventory management, order tracking, and real-time reporting.",
  },
  {
    number: "03",
    title: "E-Commerce",
    description:
      "Online stores with product catalogs, payment integration, and order management. WooCommerce or custom-built.",
  },
  {
    number: "04",
    title: "Mobile Apps",
    description:
      "Cross-platform mobile applications using React Native with native-like performance and UX.",
  },
];

function TechMarquee() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationId: number;
    let position = 0;

    const animate = () => {
      position -= 0.5;
      if (position <= -(el.scrollWidth / 2)) {
        position = 0;
      }
      el.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="overflow-hidden py-8 border-y border-border/30">
      <div ref={scrollRef} className="flex gap-6 whitespace-nowrap w-max">
        {[...techStack, ...techStack].map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="text-sm font-mono text-muted-foreground px-4 py-2 rounded-full border border-border/30 bg-secondary/30 hover:border-primary/40 hover:text-foreground transition-colors flex-shrink-0"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return isInView;
}

export function SkillMarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);

  return (
    <section id="skills" className="relative z-10 py-24 px-6 lg:px-16">
      {/* Tech marquee ticker */}
      <TechMarquee />

      <div ref={sectionRef} className="max-w-7xl mx-auto mt-20">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px w-12 bg-primary" />
          <span className="text-xs font-mono tracking-[0.3em] text-primary uppercase">
            What I Do
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-16 text-balance">
          {"Specializations"}
        </h2>

        <div className="grid md:grid-cols-2 gap-px bg-border/30">
          {specializations.map((spec, i) => (
            <div
              key={spec.number}
              className={`bg-background p-8 md:p-10 group hover:bg-secondary/30 transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="text-xs font-mono text-primary">
                {spec.number}
              </span>
              <h3 className="text-xl font-bold text-foreground mt-3 mb-3 group-hover:text-primary transition-colors">
                {spec.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {spec.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
