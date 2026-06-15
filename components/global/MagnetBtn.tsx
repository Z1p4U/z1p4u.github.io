"use client";

import { type ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

type MagnetBtnProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export default function MagnetBtn({
  children,
  className,
  strength = 0.35,
}: MagnetBtnProps) {
  // Magnetic pull intensity: increase `strength` for more movement, decrease for a subtler effect.
  const hitAreaRef = useRef<HTMLDivElement | null>(null);
  const magneticRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hitArea = hitAreaRef.current;
    const magneticElement = magneticRef.current;
    if (!hitArea || !magneticElement) return;

    const xTo = gsap.quickTo(magneticElement, "x", {
      duration: 0.8,
      ease: "elastic.out(1, 0.35)",
    });
    const yTo = gsap.quickTo(magneticElement, "y", {
      duration: 0.8,
      ease: "elastic.out(1, 0.35)",
    });

    const handleMouseMove = (event: MouseEvent) => {
      const rect = hitArea.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);

      xTo(x * strength);
      yTo(y * strength);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    hitArea.addEventListener("mousemove", handleMouseMove);
    hitArea.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      hitArea.removeEventListener("mousemove", handleMouseMove);
      hitArea.removeEventListener("mouseleave", handleMouseLeave);
      xTo(0);
      yTo(0);
    };
  }, [strength]);

  return (
    <div ref={hitAreaRef} className={cn("inline-flex", className)}>
      <div ref={magneticRef} className="inline-flex will-change-transform">
        {children}
      </div>
    </div>
  );
}
