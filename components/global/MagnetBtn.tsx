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
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const xTo = gsap.quickTo(element, "x", {
      duration: 0.8,
      ease: "elastic.out(1, 0.35)",
    });
    const yTo = gsap.quickTo(element, "y", {
      duration: 0.8,
      ease: "elastic.out(1, 0.35)",
    });

    const handleMouseMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);

      xTo(x * strength);
      yTo(y * strength);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
      xTo(0);
      yTo(0);
    };
  }, [strength]);

  return (
    <div ref={ref} className={cn("inline-flex", className)}>
      {children}
    </div>
  );
}
