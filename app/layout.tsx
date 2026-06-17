import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { StarField } from "@/components/star-field";
import { PageTransition } from "@/components/page-transition";
import "./globals.css";

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const _geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

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
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${_inter.variable} ${_geistMono.variable} font-sans antialiased`}
      >
        <StarField />
        <Navbar />
        <main className="site-motion-shell">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
