import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { StarField } from "@/components/star-field";
import "./globals.css";

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const _geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Thant Zin Htet | Full Stack Developer",
  description:
    "Full Stack Developer specializing in React, React Native, PHP, Laravel, Node.js & Next.js. 3+ years of experience building POS systems, ecommerce platforms, and company portfolios.",
  keywords: [
    "Full Stack Developer",
    "React",
    "React Native",
    "PHP",
    "Laravel",
    "Node.js",
    "Next.js",
    "Freelance Developer",
  ],
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
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
