import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import { SiteChrome } from "@/components/site-chrome";
import { AppProviders } from "@/components/app-providers";
import "./globals.css";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: "Portfolio",
  description: "Portfolio website.",

  openGraph: {
    title: "Portfolio",
    description: "Portfolio website.",
    url: siteUrl,
    siteName: "Portfolio",
    type: "website",
    images: [
      {
        url: "/portfolio-preview.png",
        width: 1200,
        height: 630,
        alt: "Portfolio preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Portfolio",
    description: "Portfolio website.",
    images: ["/portfolio-preview.png"],
  },

  icons: {
    icon: [{ url: "/assets/logo/logo.png", type: "image/png" }],
    shortcut: "/assets/logo/logo.png",
    apple: "/assets/logo/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {GA_MEASUREMENT_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
          `}
            </Script>
          </>
        ) : null}
        <Suspense fallback={null}>
          <AppProviders>
            <SiteChrome>{children}</SiteChrome>
          </AppProviders>
        </Suspense>
      </body>
    </html>
  );
}
