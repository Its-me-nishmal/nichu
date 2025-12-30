import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { AI } from "@/components/sections/AI";
import { OpenSource } from "@/components/sections/OpenSource";
import { Contact } from "@/components/sections/Contact";
import { NavBar } from "@/components/ui/NavBar";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[#fafafa] selection:bg-zinc-200">
      <NavBar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <AI />
      <OpenSource />
      <Contact />

      <footer className="w-full py-6 text-center text-sm text-stone-400 border-t border-stone-100">
        © {new Date().getFullYear()} Muhammad Nishmal P. All rights reserved.
      </footer>
    </main>
  );
}
