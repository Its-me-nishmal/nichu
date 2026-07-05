import { NavBar } from "@/components/ui/NavBar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { AI } from "@/components/sections/AI";
import { OpenSource } from "@/components/sections/OpenSource";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";
import { getGitHubUser } from "@/lib/github";

export default async function Home() {
  const user = await getGitHubUser();
  const repoCount = user?.public_repos ?? 172;

  return (
    <main className="relative min-h-screen bg-[#050714] overflow-x-hidden">
      <NavBar />
      <Hero repoCount={repoCount} />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <AI />
      <OpenSource />
      <Contact />
      <FAQ />

      <footer className="relative z-10 w-full py-8 text-center border-t border-white/5">
        <p className="text-sm text-white/30">
          © {new Date().getFullYear()}{" "}
          <span className="gradient-text font-medium">Muhammed Nishmal (Cipher Nichu)</span>. All rights reserved.
        </p>
        <p className="text-xs text-white/20 mt-1">Built with Next.js · Designed with ❤️</p>
      </footer>
    </main>
  );
}
