"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/footer";
import { GoogleAnalyticsPageView } from "@/components/google-analytics-page-view";
import { Navbar } from "@/components/navbar";
import { PageTransition } from "@/components/page-transition";
import { StarField } from "@/components/star-field";

const GA_MEASUREMENT_ID = "G-RC2J8C15WC";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      <GoogleAnalyticsPageView measurementId={GA_MEASUREMENT_ID} />
      <StarField />
      <Navbar />
      <main className="site-motion-shell">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </>
  );
}
