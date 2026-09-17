import type { Metadata } from "next";
import "./globals.css";
import { AcademyProvider } from "@/components/skillsprout/provider";

export const metadata: Metadata = {
  title: "SkillSprout · Little steps. Big possibilities.",
  description: "Creative coding, AI discovery, and digital adventures for curious kids. Explore together with SkillSprout.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased"><AcademyProvider>{children}</AcademyProvider></body>
    </html>
  );
}
