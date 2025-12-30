"use client";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { ArrowRight, Terminal } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <Section className="flex min-h-[90vh] flex-col justify-center gap-8 md:gap-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-sm font-medium text-zinc-600 w-fit"
            >
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Available for new projects
            </motion.div>

            <div className="flex flex-col gap-6">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl font-extrabold tracking-tighter text-zinc-900 sm:text-6xl md:text-7xl lg:text-8xl"
                >
                    Building reliable <br className="hidden sm:block" />
                    <span className="text-zinc-400">backend systems.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-2xl text-lg text-zinc-600 sm:text-2xl leading-relaxed font-light"
                >
                    I am Muhammad Nishmal P. A Full-Stack Developer specializing in cloud infrastructure, AI agents, and high-performance automation.
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex gap-4"
            >
                <Button href="#projects" className="h-14 px-8 text-lg rounded-full">
                    View Work
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                    href="https://github.com/Its-me-nishmal"
                    variant="outline"
                    className="h-14 px-8 text-lg rounded-full"
                    external
                >
                    <Terminal className="mr-2 h-5 w-5" />
                    GitHub
                </Button>
            </motion.div>
        </Section>
    );
}
