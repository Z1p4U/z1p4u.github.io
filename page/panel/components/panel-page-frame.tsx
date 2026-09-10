"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearCredentials } from "@/redux/slices/authSlice";
import { LoadingState } from "@/components/ui/loading-state";

import { DashboardShell } from "./dashboard-shell";
import { getPanelHref, type DashboardTab } from "../types";

type PanelPageFrameProps = {
  activeTab: DashboardTab;
  children: ReactNode;
};

export function PanelPageFrame({
  activeTab,
  children,
}: PanelPageFrameProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuthHydrated = useAppSelector((state) => state.auth.isHydrated);
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (isAuthHydrated && !token) router.replace("/panel/login");
  }, [isAuthHydrated, router, token]);

  const handleLogout = () => {
    dispatch(clearCredentials());
    router.push("/panel/login");
  };

  const handleTabChange = (tab: DashboardTab) => {
    router.push(getPanelHref(tab));
  };

  if (!isAuthHydrated) {
    return (
      <main className="min-h-screen bg-background p-6 text-foreground">
        <LoadingState label="Loading panel..." />
      </main>
    );
  }

  if (!token) return null;

  return (
    <DashboardShell
      activeTab={activeTab}
      user={user}
      onLogout={handleLogout}
      onTabChange={handleTabChange}
    >
      {children}
    </DashboardShell>
  );
}
