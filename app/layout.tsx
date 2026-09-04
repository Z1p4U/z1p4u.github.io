import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import { SiteChrome } from "@/components/site-chrome";
import { AppProviders } from "@/components/app-providers";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-RC2J8C15WC";

export const metadata: Metadata = {
  metadataBase: new URL("https://z1p4u.github.io"),

  title: "Thant Zin Htet | Full Stack Developer",
  description:
    "Portfolio of Thant Zin Htet, a Full Stack Developer with 3+ years of experience building web applications, mobile apps, POS systems, E-commerce platforms, CMS solutions, and custom business systems using React, Next.js, React Native, Laravel, Node.js, NestJS, FastAPI, and TypeScript.",

  keywords: [
    "Thant Zin Htet",
    "Full Stack Developer",
    "Freelance Developer",
    "Remote Developer",
    "React Developer",
    "Next.js Developer",
    "React Native Developer",
    "Laravel Developer",
    "Node.js Developer",
    "NestJS",
    "FastAPI",
    "TypeScript",
    "Thailand Developer",
    "Vietnam Developer",
  ],

  authors: [{ name: "Thant Zin Htet" }],
  creator: "Thant Zin Htet",

  openGraph: {
    title: "Thant Zin Htet | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, React Native, Laravel, Node.js, NestJS, FastAPI, and TypeScript. Available for freelance and part-time remote opportunities.",
    url: "https://z1p4u.github.io/",
    siteName: "Thant Zin Htet Portfolio",
    type: "website",
    images: [
      {
        url: "/portfolio-preview.png",
        width: 1200,
        height: 630,
        alt: "Thant Zin Htet Full Stack Developer Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Thant Zin Htet | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, React Native, Laravel, Node.js, NestJS, FastAPI, and TypeScript.",
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
        <Suspense fallback={null}>
          <AppProviders>
            <SiteChrome>{children}</SiteChrome>
          </AppProviders>
        </Suspense>
      </body>
    </html>
  );
}
