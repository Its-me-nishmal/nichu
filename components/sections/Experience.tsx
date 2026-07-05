"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { experience } from "@/data/experience";
import { Briefcase, ChevronRight } from "lucide-react";

export function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative py-32 overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[500px] bg-violet-600/5 rounded-full blur-[120px]" />

      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-violet-400 uppercase tracking-widest mb-3">
            Journey
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Work{" "}
            <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-cyan-500/30 to-transparent" />

          <div className="space-y-10">
            {experience.map((exp, i) => (
              <motion.div
                key={`${exp.role}-${i}`}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="relative pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-gradient-to-br from-violet-600/30 to-cyan-500/20 border border-violet-500/30 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-violet-400" />
                </div>

                {/* Card */}
                <div className="glass rounded-3xl border border-white/8 p-6 space-y-4 glass-hover">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                      <p className="text-violet-400 font-medium">{exp.company}</p>
                    </div>
                    <span className="px-3 py-1 glass rounded-full text-xs font-medium text-white/50 border border-white/10">
                      {exp.duration}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {exp.description.map((desc, di) => (
                      <li key={di} className="flex items-start gap-2 text-sm text-white/60">
                        <ChevronRight className="w-3 h-3 mt-0.5 text-cyan-400 flex-shrink-0" />
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
