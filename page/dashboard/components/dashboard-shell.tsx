"use client";

import type { ReactNode } from "react";
import { Eye, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { dashboardTabs, type DashboardTab } from "../types";

type DashboardShellProps = {
  activeTab: DashboardTab;
  children: ReactNode;
  notice: string | null;
  user?: {
    name?: string;
    email?: string;
  } | null;
  onLogout: () => void;
  onTabChange: (tab: DashboardTab) => void;
};

export function DashboardShell({
  activeTab,
  children,
  notice,
  user,
  onLogout,
  onTabChange,
}: DashboardShellProps) {
  const activeLabel =
    dashboardTabs.find((tab) => tab.value === activeTab)?.label ?? "Dashboard";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="border-b border-border/50 bg-secondary/20 px-4 py-4 lg:border-b-0 lg:border-r">
          <div className="mb-6 flex h-14 items-center gap-3 rounded-lg px-2">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
              Z1
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Portfolio CMS</p>
              <p className="truncate text-xs text-muted-foreground">
                z1p4u.github.io
              </p>
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-2 lg:grid-cols-1">
            {dashboardTabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => onTabChange(tab.value)}
                className={cn(
                  "flex h-11 items-center gap-3 rounded-md px-3 text-left text-sm font-medium transition-colors",
                  activeTab === tab.value
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <tab.icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-6 rounded-lg border border-border/50 bg-background/45 p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">
              {user?.name ?? "Admin"}
            </p>
            <p className="mt-1 break-all text-xs">{user?.email}</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="mt-4 w-full justify-start"
            >
              <LogOut className="h-4 w-4" />
              Log Out
            </Button>
          </div>
        </aside>

        <section className="relative min-w-0 px-5 py-6 md:px-8">
          <header className="mb-6 flex flex-col justify-between gap-4 border-b border-border/50 pb-5 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.24em] text-primary">
                Dashboard
              </p>
              <h1 className="mt-1 text-2xl font-semibold">{activeLabel}</h1>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => window.open("/", "_blank", "noopener,noreferrer")}
              >
                <Eye className="h-4 w-4" />
                View Site
              </Button>
              {notice ? (
                <span className="inline-flex items-center rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary">
                  {notice}
                </span>
              ) : null}
            </div>
          </header>

          {children}
        </section>
      </div>
    </main>
  );
}
