"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { skills } from "@/data/skills";
import { Layout, Server, Database, Cloud, Bot, Wrench } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  Frontend: <Layout className="w-5 h-5" />,
  Backend: <Server className="w-5 h-5" />,
  Databases: <Database className="w-5 h-5" />,
  "Cloud & DevOps": <Cloud className="w-5 h-5" />,
  "AI & Automation": <Bot className="w-5 h-5" />,
  Tools: <Wrench className="w-5 h-5" />,
};

const categoryColors: Record<string, string> = {
  Frontend: "from-violet-600/30 to-pink-500/20 border-violet-500/20 text-violet-400",
  Backend: "from-cyan-600/30 to-blue-500/20 border-cyan-500/20 text-cyan-400",
  Databases: "from-emerald-600/30 to-teal-500/20 border-emerald-500/20 text-emerald-400",
  "Cloud & DevOps": "from-orange-600/30 to-amber-500/20 border-orange-500/20 text-orange-400",
  "AI & Automation": "from-pink-600/30 to-rose-500/20 border-pink-500/20 text-pink-400",
  Tools: "from-indigo-600/30 to-violet-500/20 border-indigo-500/20 text-indigo-400",
};

export function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[800px] h-[300px] bg-violet-600/5 rounded-full blur-[100px]" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-violet-400 uppercase tracking-widest mb-3">
            Tech Stack
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Tools I{" "}
            <span className="gradient-text">work with</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            A curated set of technologies I use to build fast, scalable, and intelligent systems.
          </p>
        </motion.div>

        {/* Skill cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((group, gi) => {
            const colorClass = categoryColors[group.category] || "from-violet-600/30 to-cyan-500/20 border-violet-500/20 text-violet-400";
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: gi * 0.1, duration: 0.6 }}
                className="card-3d glass rounded-3xl border border-white/8 p-6 space-y-4"
              >
                {/* Category header */}
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center border`}>
                    {categoryIcons[group.category]}
                  </div>
                  <h3 className="font-bold text-white">{group.category}</h3>
                </div>

                {/* Skill badges */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, si) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: gi * 0.1 + si * 0.04, duration: 0.3 }}
                      className="px-3 py-1.5 glass rounded-full text-xs font-medium text-white/70 border border-white/10 hover:border-violet-400/40 hover:text-white hover:bg-violet-500/10 transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
