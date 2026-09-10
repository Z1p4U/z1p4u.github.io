"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import MagnetBtn from "@/components/global/MagnetBtn";
import { usePortfolioOverview } from "@/hooks/use-public-portfolio";
import { setOutlineButtonPosition } from "@/lib/outline-button";
import Image from "next/image";

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
  const { profile } = usePortfolioOverview();

  const visibleNavLinks = navLinks.filter((link) => link.visible);
  const logoLabel = profile?.name ? `${profile.name} home` : "Home";

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

  const renderDesktopLinks = () => (
    <div className="hidden md:flex items-center gap-2">
      {visibleNavLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <MagnetBtn key={link.href} strength={0.34}>
            <Link
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "site-nav-link relative inline-flex h-10 items-center px-4 text-[15px] font-medium transition-colors duration-200",
                isActive
                  ? "is-active text-primary"
                  : "text-muted-foreground hover:text-foreground",
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
      <header className="site-nav fixed left-0 top-0 z-50 w-full px-4 pt-4">
        <div
          className={cn(
            "site-nav-shell relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between rounded-full border px-5 lg:px-8",
            showScrolledNav
              ? "site-nav-scrolled bg-linear-to-b from-secondary/50 to-background/90 backdrop-blur-sm"
              : "site-nav-top",
          )}
        >
          <Link
            href="/"
            className="inline-flex min-w-21.5 items-center"
            onClick={() => setMenuOpen(false)}
            aria-label={logoLabel}
          >
            <Image
              src="/assets/logo/logo.png"
              alt={profile?.name ? `${profile.name} logo` : "Site logo"}
              width={70}
              height={70}
              priority
              className="h-16 w-16 object-contain"
            />
          </Link>

          {renderDesktopLinks()}

          <div className="hidden min-w-21.5 justify-end md:flex">
            <MagnetBtn strength={0.3}>
              <Link
                href="/contact"
                className="site-outline-button rounded-full border border-border/50 px-4 py-2 text-sm font-medium text-muted-foreground"
                onPointerEnter={setOutlineButtonPosition}
                onPointerMove={setOutlineButtonPosition}
              >
                <span>Hire Me</span>
              </Link>
            </MagnetBtn>
          </div>

          <button
            className="burger p-2 flex md:!hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

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
