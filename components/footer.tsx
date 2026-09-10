"use client";

import { Github, Mail, ArrowUpRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MagnetBtn from "@/components/global/MagnetBtn";
import { usePortfolioOverview } from "@/hooks/use-public-portfolio";
import { cn } from "@/lib/utils";
import { setOutlineButtonPosition } from "@/lib/outline-button";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/service", label: "Services" },
  { href: "/project", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const pathname = usePathname();
  const { profile } = usePortfolioOverview();
  const initials = profile?.name
    ? profile.name
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 3)
    : "Portfolio";
  const socialLinks = [
    profile?.github_url
      ? { href: profile.github_url, icon: Github, label: "GitHub" }
      : null,
    profile?.email
      ? { href: `mailto:${profile.email}`, icon: Mail, label: "Email" }
      : null,
  ].filter(Boolean) as Array<{
    href: string;
    icon: LucideIcon;
    label: string;
  }>;

  return (
    <footer className="relative z-10 mt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-16 pt-12 pb-7 rounded-t-3xl border-t border-primary/20 bg-gradient-to-b from-secondary/50 to-background/90 backdrop-blur-sm">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div>
            <Link
              href="/"
              className="inline-flex items-center text-2xl font-bold tracking-tight text-foreground"
            >
              {initials}
              <span className="text-primary">.</span>
            </Link>
            {profile?.headline ? (
              <p className="mt-2 text-sm text-muted-foreground">
                {profile.headline}
              </p>
            ) : null}
            {profile?.location || profile?.availability ? (
              <p className="text-xs text-muted-foreground/80">
                {[profile.location, profile.availability]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            ) : null}
          </div>

          <nav
            className="flex flex-wrap items-center gap-x-6 gap-y-3"
            aria-label="Footer navigation"
          >
            {footerLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <MagnetBtn key={link.href} strength={0.28}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "inline-flex items-center py-2 text-xs uppercase tracking-[0.2em] transition-colors duration-200",
                      isActive
                        ? "font-semibold text-primary"
                        : "text-muted-foreground hover:text-primary",
                    )}
                  >
                    {link.label}
                  </Link>
                </MagnetBtn>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <MagnetBtn key={social.label} strength={0.26}>
                <Link
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.href.startsWith("http") ? "noreferrer" : undefined
                  }
                  aria-label={social.label}
                  className="site-outline-button inline-flex items-center gap-2 px-3 py-2 rounded-full border border-border/60 bg-background/40 text-muted-foreground"
                  onPointerEnter={setOutlineButtonPosition}
                  onPointerMove={setOutlineButtonPosition}
                >
                  <social.icon className="w-4 h-4" />
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </MagnetBtn>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border/30 flex justify-end">
          <p className="text-[11px] font-mono text-muted-foreground/70 text-right">
            <span>Designed And Implemented By </span>
            <span className="text-foreground/90">
              {profile?.name ?? "Portfolio Owner"}
            </span>
            <span> | © {new Date().getFullYear()} | </span>
            <Link href="/credits" className="text-primary hover:underline">
              Credits &amp; Attributions
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
