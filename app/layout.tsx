import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Muhammad Nishmal P - Full-Stack Developer",
  description: "Full-Stack Developer specializing in Backend Systems, Cloud Infrastructure, and AI-Assisted Automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(inter.variable, "min-h-screen bg-[#fafafa] font-sans text-stone-900 antialiased selection:bg-stone-200")}>
        {children}
      </body>
    </html>
  );
}
