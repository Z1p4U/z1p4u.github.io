"use client";

import { Grid } from "ldrs/react";

import { cn } from "@/lib/utils";

type LoadingStateProps = {
  className?: string;
  compact?: boolean;
  label?: string;
};

export function LoadingState({
  className,
  compact = false,
  label = "Loading...",
}: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-border/50 bg-secondary/25 px-6 text-center",
        compact ? "min-h-32 py-6" : "min-h-64 py-10",
        className,
      )}
    >
      <Grid size={compact ? 36 : 48} speed={1.35} color="var(--primary)" />
      <p
        className={cn(
          "text-sm font-medium text-muted-foreground",
          compact ? "mt-3" : "mt-4",
        )}
      >
        {label}
      </p>
    </div>
  );
}
