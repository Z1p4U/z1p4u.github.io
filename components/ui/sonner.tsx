"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

export function Toaster(props: ToasterProps) {
  return (
    <Sonner
      closeButton
      richColors
      position="bottom-right"
      theme="dark"
      toastOptions={{
        classNames: {
          toast:
            "border border-border bg-popover text-popover-foreground shadow-lg",
          title: "text-foreground",
          description: "text-muted-foreground",
          actionButton: "bg-primary text-primary-foreground",
          cancelButton: "bg-muted text-muted-foreground",
        },
      }}
      {...props}
    />
  );
}
