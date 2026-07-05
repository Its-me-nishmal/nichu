"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import type { GitHubRepo } from "@/lib/github";
import { LANG_COLORS, timeAgo } from "@/lib/github";
import { Github, ExternalLink, Star, GitFork, Clock, ChevronRight, Code2 } from "lucide-react";

const gradients = [
  "from-violet-600 to-purple-600",
  "from-cyan-500 to-blue-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-amber-600",
  "from-pink-500 to-rose-600",
  "from-indigo-500 to-violet-600",
  "from-sky-500 to-cyan-600",
  "from-fuchsia-500 to-pink-600",
];

export default function ProjectsClient({ repos }: { repos: GitHubRepo[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      {/* Background glows */}
      <div className="absolute left-0 top-1/3 w-[400px] h-[600px] bg-violet-600/5 rounded-full blur-[120px]" />
      <div className="absolute right-0 bottom-1/3 w-[300px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px]" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-violet-400 uppercase tracking-widest mb-3">
            GitHub Projects
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Featured{" "}
            <span className="gradient-text">Repositories</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            Live data from GitHub · {repos.length} repositories selected · Revalidates every 6h
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {repos.map((repo, i) => {
            const gradient = gradients[i % gradients.length];
            const langColor = repo.language ? (LANG_COLORS[repo.language] || "#94a3b8") : "#94a3b8";

            return (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="card-3d group glass rounded-3xl border border-white/8 overflow-hidden hover:border-violet-400/30 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-500"
              >
                {/* Gradient top bar */}
                <div className={`h-0.5 w-full bg-gradient-to-r ${gradient} opacity-60`} />

                <div className="p-6 space-y-4">
                  {/* Repo name + links */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <Code2 className="w-4 h-4 text-violet-400 flex-shrink-0" />
                      <h3 className="font-bold text-white text-base truncate group-hover:text-violet-300 transition-colors">
                        {repo.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 glass rounded-lg border border-white/10 text-white/50 hover:text-cyan-400 hover:border-cyan-400/40 transition-all"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 glass rounded-lg border border-white/10 text-white/50 hover:text-violet-400 hover:border-violet-400/40 transition-all"
                        title="View on GitHub"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/55 text-sm leading-relaxed line-clamp-2 min-h-[2.5rem]">
                    {repo.description || "No description provided."}
                  </p>

                  {/* Topics */}
                  {repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {repo.topics.slice(0, 4).map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-violet-500/10 text-violet-300 border border-violet-500/20"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer: language + stats */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <div className="flex items-center gap-3 text-xs text-white/40">
                      {repo.language && (
                        <span className="flex items-center gap-1.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: langColor }}
                          />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" />
                        {repo.forks_count}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-[10px] text-white/30">
                      <Clock className="w-2.5 h-2.5" />
                      {timeAgo(repo.pushed_at)}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/Its-me-nishmal?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass border border-white/15 text-white/70 hover:text-white hover:border-violet-400/40 font-medium text-sm transition-all duration-300 hover:scale-105"
          >
            <Github className="w-4 h-4" />
            View all 172+ repositories on GitHub
            <ExternalLink className="w-3 h-3" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
