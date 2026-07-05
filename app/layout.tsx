import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Muhammed Nishmal (Cipher Nichu) — Full-Stack Developer",
  description:
    "Muhammed Nishmal (Cipher Nichu) is a self-taught Full-Stack & Systems Developer from Vadakara, Calicut, Kerala. Specializing in high-performance backend engineering, cloud scalability, and custom AI agents.",
  keywords: [
    "Muhammed Nishmal",
    "Cipher Nichu",
    "ciphernichu",
    "its-me-nishmal",
    "Nishmal Vadakara",
    "Nishmal Calicut",
    "Full Stack Developer Kerala",
    "MERN Stack Developer India",
    "Backend Developer",
    "Node.js Systems Engineer",
    "Next.js Developer",
    "Cloud Architect",
    "AI Agent Builder",
  ],
  authors: [{ name: "Muhammed Nishmal (Cipher Nichu)" }],
  icons: {
    icon: "/profilepic.png",
    shortcut: "/profilepic.png",
    apple: "/profilepic.png",
  },
  openGraph: {
    title: "Muhammed Nishmal (Cipher Nichu) — Portfolio",
    description:
      "Self-taught Full-Stack Developer building scalable backend systems, WhatsApp automation, and custom AI workflows.",
    type: "website",
    url: "https://nichu.dev", // Using the domain from web search context
    siteName: "Nishmal Portfolio",
    images: [
      {
        url: "/profilepic.png",
        width: 800,
        height: 800,
        alt: "Muhammed Nishmal (Cipher Nichu)",
      },
    ],
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
      className={`${spaceGrotesk.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#050714] font-sans text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
