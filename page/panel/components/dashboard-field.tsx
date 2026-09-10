import type { ReactNode } from "react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

export function SwitchField({
  label,
  checked,
  onCheckedChange,
  className,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}) {
  return (
    <label
      className={cn(
        "flex h-10 items-center justify-between gap-3 text-sm",
        className,
      )}
    >
      <span className="min-w-0 truncate">{label}</span>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </label>
  );
}
