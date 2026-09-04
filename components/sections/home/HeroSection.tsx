"use client";

import { useEffect, useState } from "react";
import {
  Download,
  Github,
  Mail,
  Phone,
  ArrowDown,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePortfolioOverview } from "@/hooks/use-public-portfolio";
import { setOutlineButtonPosition } from "@/lib/outline-button";

const roles = [
  "Full-Stack Web Developer",
  "React / Next.js Developer",
  "Laravel / Node.js Developer",
  "React Native Developer",
];

export function HeroSection() {
  const { profile } = usePortfolioOverview();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const firstName = profile.name.split(" ").slice(0, 2).join(" ");
  const lastName = profile.name.split(" ").slice(2).join(" ") || profile.name;
  const phoneHref = profile.phone
    ? `tel:${profile.phone.replace(/[^\d+]/g, "")}`
    : null;
  const socialLinks = [
    profile.github_url
      ? { href: profile.github_url, icon: Github, label: "GitHub" }
      : null,
    { href: `mailto:${profile.email}`, icon: Mail, label: "Email" },
    phoneHref ? { href: phoneHref, icon: Phone, label: "Phone" } : null,
  ].filter(Boolean) as Array<{
    href: string;
    icon: LucideIcon;
    label: string;
  }>;

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
    <section className="relative z-10 min-h-screen flex flex-col justify-center px-6 lg:px-16 pt-30 lg:pt-44">
      <div className="max-w-7xl mx-auto w-full">
        {/* Overline */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px w-12 bg-primary" />
          <span className="text-xs font-mono text-primary uppercase leading-relaxed">
            {profile.availability ?? "Available for freelance & part-time"}
          </span>
        </div>

        {/* Giant name */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.92] text-foreground">
          {firstName}
          <br />
          <span className="text-primary">{lastName}</span>
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
          {profile.summary}
        </p>

        {/* CTA + Socials row */}
        <div className="mt-10 flex flex-col items-start gap-6">
          <div className="flex items-center gap-3">
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

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="site-filled-button group px-8 py-3.5 font-medium rounded-lg"
              onPointerEnter={setOutlineButtonPosition}
              onPointerMove={setOutlineButtonPosition}
            >
              <span>{"Let's Talk"}</span>
            </Link>
            <Link
              href="/project"
              className="!hidden site-outline-button px-8 py-3.5 border border-border text-foreground font-medium rounded-lg"
              onPointerEnter={setOutlineButtonPosition}
              onPointerMove={setOutlineButtonPosition}
            >
              <span>View Work</span>
            </Link>
            {profile.cv_url ? (
              <a
                href={profile.cv_url}
                download
                className="site-outline-button inline-flex items-center gap-2 px-8 py-3.5 border border-border text-foreground font-medium rounded-lg"
                onPointerEnter={setOutlineButtonPosition}
                onPointerMove={setOutlineButtonPosition}
              >
                <Download className="h-4 w-4" />
                <span>Download CV</span>
              </a>
            ) : null}
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-16 flex flex-wrap items-center gap-8 md:gap-16 border-t border-border/50 pt-8">
          <div>
            <p className="text-3xl md:text-4xl font-bold text-foreground">
              {profile.stats.years_experience}+
            </p>
            <p className="text-xs font-mono text-muted-foreground mt-1 uppercase tracking-wider">
              Years Exp.
            </p>
          </div>
          <div className="h-8 w-px bg-border/50 hidden md:block" />
          <div>
            <p className="text-3xl md:text-4xl font-bold text-foreground">
              {profile.stats.clients_count}+
            </p>
            <p className="text-xs font-mono text-muted-foreground mt-1 uppercase tracking-wider">
              Clients
            </p>
          </div>
          <div className="h-8 w-px bg-border/50 hidden md:block" />
          <div>
            <p className="text-3xl md:text-4xl font-bold text-foreground">
              {profile.stats.projects_count}+
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
