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
  metadataBase: new URL("https://nichu.dev"),
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://nichu.dev/#person",
        "name": "Muhammed Nishmal",
        "alternateName": "Cipher Nichu",
        "jobTitle": "Full-Stack Developer",
        "url": "https://nichu.dev",
        "image": "https://nichu.dev/profilepic.png",
        "sameAs": [
          "https://github.com/Its-me-nishmal",
          "https://www.linkedin.com/in/muhammed-nishmalp/",
          "mailto:dev.nishmal@gmail.com"
        ],
        "knowsAbout": [
          "MERN Stack",
          "MongoDB",
          "Express.js",
          "React",
          "Node.js",
          "Next.js",
          "TypeScript",
          "Python",
          "Cloud Infrastructure",
          "DevOps",
          "AI Agents",
          "LangChain",
          "WhatsApp Automation",
          "Systems Engineering"
        ],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Vadakara",
          "addressRegion": "Calicut, Kerala",
          "addressCountry": "India"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://nichu.dev/#website",
        "url": "https://nichu.dev",
        "name": "Muhammed Nishmal (Cipher Nichu) Portfolio",
        "description": "Developer portfolio highlighting high-performance backend, cloud architecture, and AI integrations.",
        "publisher": {
          "@id": "https://nichu.dev/#person"
        }
      },
      {
        "@type": "ProfilePage",
        "@id": "https://nichu.dev/#profilepage",
        "url": "https://nichu.dev",
        "name": "Muhammed Nishmal (Cipher Nichu) Professional Profile",
        "mainEntity": {
          "@id": "https://nichu.dev/#person"
        }
      }
    ]
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#050714] font-sans text-white antialiased overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
