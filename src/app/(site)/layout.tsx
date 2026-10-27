import type { Metadata } from "next";
import localFont from "next/font/local";
import { siteConfig } from "@/config/site";
import { Footer } from "@/presentation/components/layout/Footer";
import { Header } from "@/presentation/components/layout/Header";
import "./globals.css";

const display = localFont({
  src: [
    { path: "../../../public/fonts/F37Caslon-Regular.woff2", weight: "400" },
    { path: "../../../public/fonts/F37Caslon-Bold.woff2", weight: "700" },
  ],
  variable: "--font-display",
  display: "swap",
});

const sans = localFont({
  src: "../../../public/fonts/AHAMONO-Regular.otf",
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${sans.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
