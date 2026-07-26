import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jeffrey JJ Jewell | IT Professional",
  description:
    "Professional portfolio of Jeffrey JJ Jewell - IT Professional specializing in networking, systems administration, cloud, and DevOps.",
  keywords: [
    "IT",
    "sysadmin",
    "networking",
    "Docker",
    "Linux",
    "Windows Server",
    "homelab",
  ],
  openGraph: {
    title: "Jeffrey JJ Jewell | IT Professional",
    description:
      "Professional portfolio of Jeffrey JJ Jewell - IT Professional specializing in networking, systems administration, cloud, and DevOps.",
    url: "https://jj.jewellcore.com",
    siteName: "JJ Jewell",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
