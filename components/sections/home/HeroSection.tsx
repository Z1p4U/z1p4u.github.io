"use client";

import { useEffect, useState } from "react";
import { Github, Mail, Phone, ArrowDown } from "lucide-react";
import Link from "next/link";

const roles = [
  "Full-Stack Web Developer",
  "React / Next.js Developer",
  "Laravel / Node.js Developer",
  "React Native Developer",
];

const socialLinks = [
  { href: "https://github.com/Z1p4U", icon: Github, label: "GitHub" },
  { href: "mailto:zipshigoto310801@gmail.com", icon: Mail, label: "Email" },
  { href: "tel:+66849920420", icon: Phone, label: "Phone" },
];

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < role.length) {
            setDisplayText(role.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(role.slice(0, displayText.length - 1));
          } else {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 30 : 70,
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section className="relative z-10 min-h-screen flex flex-col justify-center px-6 lg:px-16 pt-24">
      <div className="max-w-7xl mx-auto w-full">
        {/* Overline */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px w-12 bg-primary" />
          <span className="text-xs font-mono tracking-[0.3em] text-primary uppercase">
            Available for freelance & part-time
          </span>
        </div>

        {/* Giant name */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.92] text-foreground">
          {"Thant Zin"}
          <br />
          <span className="text-primary">{"Htet"}</span>
          <span className="text-primary">.</span>
        </h1>

        {/* Role ticker */}
        <div className="mt-8 h-8 flex items-center">
          <span className="text-lg md:text-xl font-mono text-muted-foreground">
            {"// "}
          </span>
          <span className="text-lg md:text-xl font-mono text-foreground ml-2">
            {displayText}
          </span>
          <span className="inline-block w-0.5 h-6 bg-primary ml-1 animate-pulse" />
        </div>

        {/* Description */}
        <p className="mt-6 text-muted-foreground leading-relaxed max-w-2xl text-base md:text-lg">
          {
            "Full-stack web developer with 3+ years of experience building e-commerce platforms, POS systems, CMS websites, and mobile apps. Currently working at Ravus Law Firm (since January 2026) and available for freelance and part-time work."
          }
        </p>

        {/* CTA + Socials row */}
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="group relative px-8 py-3.5 bg-primary text-primary-foreground font-medium rounded-lg overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/25"
            >
              <span className="relative z-10">{"Let's Talk"}</span>
            </Link>
            <Link
              href="/project"
              className="px-8 py-3.5 border border-border text-foreground font-medium rounded-lg hover:border-primary/50 hover:text-primary transition-all"
            >
              View Work
            </Link>
          </div>

          <div className="sm:ml-auto flex items-center gap-3">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={social.label}
                className="p-2.5 text-muted-foreground hover:text-primary transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-16 flex flex-wrap items-center gap-8 md:gap-16 border-t border-border/50 pt-8">
          <div>
            <p className="text-3xl md:text-4xl font-bold text-foreground">3+</p>
            <p className="text-xs font-mono text-muted-foreground mt-1 uppercase tracking-wider">
              Years Exp.
            </p>
          </div>
          <div className="h-8 w-px bg-border/50 hidden md:block" />
          <div>
            <p className="text-3xl md:text-4xl font-bold text-foreground">
              20+
            </p>
            <p className="text-xs font-mono text-muted-foreground mt-1 uppercase tracking-wider">
              Clients
            </p>
          </div>
          <div className="h-8 w-px bg-border/50 hidden md:block" />
          <div>
            <p className="text-3xl md:text-4xl font-bold text-foreground">
              30+
            </p>
            <p className="text-xs font-mono text-muted-foreground mt-1 uppercase tracking-wider">
              Projects
            </p>
          </div>
          <div className="h-8 w-px bg-border/50 hidden md:block" />
          <div>
            <p className="text-3xl md:text-4xl font-bold text-foreground">6+</p>
            <p className="text-xs font-mono text-muted-foreground mt-1 uppercase tracking-wider">
              Production Stacks
            </p>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50 animate-bounce">
        <ArrowDown className="w-4 h-4" />
      </div>
    </section>
  );
}
