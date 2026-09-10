"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown, Eye, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  dashboardNavItems,
  dashboardTabs,
  type DashboardNavGroup,
  type DashboardTab,
} from "../types";

type DashboardShellProps = {
  activeTab: DashboardTab;
  children: ReactNode;
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
  user,
  onLogout,
  onTabChange,
}: DashboardShellProps) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const activeLabel =
    dashboardTabs.find((tab) => tab.value === activeTab)?.label ?? "Panel";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="flex flex-col border-b border-border/50 bg-secondary/20 px-4 py-4 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
          <div className="mb-6 flex h-14 items-center gap-3 rounded-lg px-2">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
              Z1
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Portfolio Panel</p>
              <p className="truncate text-xs text-muted-foreground">
                z1p4u.github.io
              </p>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {dashboardNavItems.map((item) => {
              if (isNavGroup(item)) {
                const groupIsActive = item.children.some(
                  (child) => child.value === activeTab,
                );
                const groupIsOpen = openGroups[item.value] ?? groupIsActive;

                return (
                  <div key={item.value} className="grid gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenGroups((current) => ({
                          ...current,
                          [item.value]: !groupIsOpen,
                        }))
                      }
                      className={cn(
                        "flex h-11 items-center gap-3 rounded-md px-3 text-left text-sm font-medium transition-colors",
                        groupIsActive
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="min-w-0 flex-1 truncate">
                        {item.label}
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                          groupIsOpen && "rotate-180",
                        )}
                      />
                    </button>

                    {groupIsOpen ? (
                      <div className="grid gap-1 pl-6">
                        {item.children.map((child) => (
                          <button
                            key={child.value}
                            type="button"
                            onClick={() => onTabChange(child.value)}
                            className={cn(
                              "flex h-10 items-center gap-3 rounded-md px-3 text-left text-sm font-medium transition-colors",
                              activeTab === child.value
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground",
                            )}
                          >
                            <child.icon className="h-4 w-4 shrink-0" />
                            <span className="truncate">{child.label}</span>
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              }

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => onTabChange(item.value)}
                  className={cn(
                    "flex h-11 items-center gap-3 rounded-md px-3 text-left text-sm font-medium transition-colors",
                    activeTab === item.value
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-4 rounded-lg border border-border/50 bg-background/45 p-4 text-sm text-muted-foreground lg:mt-auto">
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
                Panel
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
            </div>
          </header>

          {children}
        </section>
      </div>
    </main>
  );
}

function isNavGroup(item: (typeof dashboardNavItems)[number]): item is DashboardNavGroup {
  return "children" in item;
}
