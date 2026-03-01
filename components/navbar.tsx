"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import MagnetBtn from "@/components/global/MagnetBtn";

const navLinks = [
  { href: "/", label: "Home", visible: true },
  { href: "/about", label: "About", visible: true },
  { href: "/service", label: "Services", visible: true },
  { href: "/project", label: "Projects", visible: true },
  { href: "/pricing", label: "Pricing", visible: false },
  { href: "/contact", label: "Contact", visible: true },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrolledNav, setShowScrolledNav] = useState(false);
  const pathname = usePathname();

  const visibleNavLinks = navLinks.filter((link) => link.visible);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrolledNav(window.scrollY >= 110);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const renderDesktopLinks = (variant: "default" | "scrolled") => (
    <div className="hidden md:flex items-center gap-3">
      {visibleNavLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <MagnetBtn key={link.href} strength={variant === "scrolled" ? 0.52 : 0.45}>
            <Link
              href={link.href}
              className={cn(
                "inline-flex items-center px-3.5 py-1.5 text-[16px] font-medium transition-colors rounded-full",
                variant === "default" &&
                  (isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"),
                variant === "scrolled" &&
                  (isActive
                    ? "bg-primary/15 text-primary ring-1 ring-primary/35"
                    : "text-muted-foreground hover:text-foreground"),
              )}
            >
              {link.label}
            </Link>
          </MagnetBtn>
        );
      })}
    </div>
  );

  return (
    <>
      {!showScrolledNav && (
        <header className="absolute top-0 left-0 w-full z-50">
          <div className="mx-auto max-w-7xl h-[68px] px-6 lg:px-16 flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-foreground"
              onClick={() => setMenuOpen(false)}
            >
              TZH<span className="text-primary">.</span>
            </Link>

            {renderDesktopLinks("default")}

            <button
              className="burger p-2 flex md:!hidden"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </header>
      )}

      {showScrolledNav && (
        <header className="fixed top-0 left-0 w-full z-50 px-4 pt-3">
          <div className="relative nav2-shell mx-auto max-w-7xl h-[64px] px-5 lg:px-8 rounded-full border border-primary/20 bg-gradient-to-b from-secondary/50 to-background/90 backdrop-blur-sm shadow-[0_12px_35px_rgba(0,0,0,0.35)] flex items-center justify-between">
            {/* <span className="nav2-orb" aria-hidden /> */}

            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-foreground"
              onClick={() => setMenuOpen(false)}
            >
              TZH<span className="text-primary">.</span>
            </Link>

            {renderDesktopLinks("scrolled")}

            <button
              className="burger p-2 flex md:!hidden"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </header>
      )}

      <div
        className={cn("bg-clip-path md:hidden", menuOpen && "active")}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className="flex flex-col justify-center items-center gap-5"
          onClick={(event) => event.stopPropagation()}
        >
          {visibleNavLinks.map((link, index) => (
            <div
              key={link.href}
              className={cn(
                menuOpen
                  ? `ani_slide_down ani_delay_${index + 1}`
                  : `ani_slide_up ani_delay_${index + 1}`,
              )}
            >
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "nav_link hover:no-underline",
                  pathname === link.href && "active",
                )}
              >
                {link.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
