"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { MapPin, Code2, Rocket } from "lucide-react";

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    { icon: Code2, label: "Backend Systems", desc: "Architecting scalable APIs and services with Node.js, Express, and Python." },
    { icon: Rocket, label: "Cloud & DevOps", desc: "Deploying to AWS and Vercel with CI/CD pipelines and Docker containerization." },
    { icon: MapPin, label: "AI Automation", desc: "Building intelligent workflows with LangChain, OpenAI, and custom AI agents." },
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[130px]" />
      <div className="absolute left-0 top-1/4 w-[300px] h-[300px] bg-violet-500/5 rounded-full blur-[100px]" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left: Profile image (col-span-5) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[4/5] sm:aspect-[3/4]">
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="/profilepic.png"
                  alt="Muhammed Nishmal (Cipher Nichu)"
                  fill
                  sizes="(max-w-768px) 100vw, 420px"
                  className="object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050714]/80 via-transparent to-transparent" />
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 glass rounded-2xl border border-white/10 p-3.5 flex items-center gap-2 shadow-lg"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs text-white font-semibold tracking-wide">Open to work</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Bio (col-span-7) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-4">
              <p className="text-xs font-bold text-violet-400 uppercase tracking-widest">About Me</p>
              <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
                Crafting software that{" "}
                <span className="gradient-text">scales & performs</span>
              </h2>
              <p className="text-slate-300 leading-relaxed text-lg">
                I&apos;m <strong className="text-white font-semibold">Muhammed Nishmal (Cipher Nichu)</strong>, a self-taught Full-Stack Developer and systems builder based in Vadakara, Calicut, Kerala.
              </p>
              <p className="text-slate-300 leading-relaxed">
                I specialize in engineering resilient backend systems, scalable cloud architectures, and custom automation.
                You can find my work and contributions under the developer handles:
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://github.com/Its-me-nishmal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-medium hover:bg-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300"
                >
                  <MapPin className="w-3 h-3" />
                  @its-me-nishmal
                </a>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20 text-xs font-mono font-medium">
                  <MapPin className="w-3 h-3" />
                  @ciphernichu
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {highlights.map(({ icon: Icon, label, desc }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="flex gap-4 p-5 glass rounded-2xl border border-white/8 glass-hover hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600/30 to-cyan-500/20 flex items-center justify-center flex-shrink-0 border border-violet-500/20">
                    <Icon className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base mb-1">{label}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
