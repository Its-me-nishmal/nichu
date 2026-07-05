"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Bot, Brain, Zap, GitBranch } from "lucide-react";

const aiItems = [
  { icon: Brain, title: "LangChain Agents", desc: "Building autonomous AI agents with tool use, memory, and planning capabilities." },
  { icon: Bot, title: "OpenAI Integration", desc: "GPT-powered features including content generation, summarization, and chat." },
  { icon: Zap, title: "Workflow Automation", desc: "AI-assisted pipelines that reduce manual work and accelerate development cycles." },
  { icon: GitBranch, title: "Custom Model Pipelines", desc: "Fine-tuned Hugging Face models for domain-specific tasks and automation." },
];

export function AI() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="ai" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" />
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-600/8 rounded-full blur-[120px]" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-violet-400 uppercase tracking-widest mb-3">
            AI & Automation
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Building the{" "}
            <span className="gradient-text">intelligent layer</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            I integrate AI at every layer — from intelligent backend services to autonomous agent workflows.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiItems.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="card-3d glass rounded-3xl border border-white/8 p-6 space-y-4 glass-hover text-center"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-violet-600/30 to-pink-500/20 border border-violet-500/20 flex items-center justify-center">
                <Icon className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="font-bold text-white">{title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
