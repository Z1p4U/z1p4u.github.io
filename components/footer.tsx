import { Github, Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  { href: "https://github.com/Z1p4U", icon: Github, label: "GitHub" },
  { href: "mailto:zipshigoto310801@gmail.com", icon: Mail, label: "Email" },
];

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/service", label: "Services" },
  { href: "/project", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative z-10 mt-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 lg:px-16 pt-12 pb-7 rounded-t-3xl border-t border-primary/20 bg-gradient-to-b from-secondary/50 to-background/90 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div>
            <Link
              href="/"
              className="inline-flex items-center text-2xl font-bold tracking-tight text-foreground"
            >
              TZH<span className="text-primary">.</span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Full-Stack Web Developer
            </p>
            <p className="text-xs text-muted-foreground/80">
              Bangkok, Thailand · Freelance & Part-time
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={social.label}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-border/60 bg-background/40 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
              >
                <social.icon className="w-4 h-4" />
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border/30 flex justify-end">
          <p className="text-[11px] font-mono text-muted-foreground/70 text-right">
            <span>Designed And Implemented By </span>
            <span className="text-foreground/90">Thant Zin Htet</span>
            <span> | © 2023 | </span>
            <Link href="/credits" className="text-primary hover:underline">
              Credits &amp; Attributions
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
