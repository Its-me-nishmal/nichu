"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is Muhammed Nishmal's primary tech stack?",
    answer: "I specialize in the MERN Stack (MongoDB, Express.js, React, Node.js), Next.js (App Router), TypeScript, and Python. I also design scalable cloud infrastructures using AWS and Vercel, and build automated systems like custom WhatsApp bots and AI agents.",
  },
  {
    question: "Is Muhammed Nishmal (Cipher Nichu) available for freelance or remote work?",
    answer: "Yes! I am fully available for freelance contracts, full-time remote engineering roles, or consulting. I specialize in backend API development, system integrations, and AI workflow automation. Feel free to contact me at dev.nishmal@gmail.com.",
  },
  {
    question: "Where is Muhammed Nishmal located?",
    answer: "I am based in Vadakara, Calicut, Kerala, India. I work remotely with clients and teams worldwide across various time zones.",
  },
  {
    question: "What kind of AI and automation services do you build?",
    answer: "I engineer custom autonomous AI workflows using LangChain, OpenAI, and LlamaIndex. My automation projects include high-concurrency WhatsApp API engines, data scrapers, custom load balancers, and intelligent business process automation bots.",
  },
];

export function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  // Generate FAQPage JSON-LD schema dynamically
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return (
    <section id="faq" className="relative py-32 overflow-hidden">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Background glow */}
      <div className="absolute right-0 bottom-1/4 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[120px]" />
      <div className="absolute left-0 top-1/4 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px]" />

      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-violet-400 uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Quick answers about my expertise, availability, location, and services.
          </p>
        </motion.div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqData.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="glass rounded-2xl border border-white/8 overflow-hidden transition-all duration-300 hover:border-violet-500/20"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 text-white hover:text-violet-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-violet-400 flex-shrink-0" />
                    <span className="font-semibold text-lg">{item.question}</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 flex-shrink-0">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-white" />
                    ) : (
                      <Plus className="w-4 h-4 text-white" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-white/5 text-slate-300 leading-relaxed text-base">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
