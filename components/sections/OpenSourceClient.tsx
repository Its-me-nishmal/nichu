"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import type { GitHubUser, GitHubRepo } from "@/lib/github";
import { LANG_COLORS, timeAgo } from "@/lib/github";
import {
  Github, Star, GitFork, MapPin, Users, BookOpen,
  ExternalLink, Clock, Calendar, Code2
} from "lucide-react";

interface Props {
  user: GitHubUser | null;
  repos: GitHubRepo[];
}

export default function OpenSourceClient({ user, repos }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const joinYear = user ? new Date(user.created_at).getFullYear() : "2023";

  const statCards = user
    ? [
        { label: "Public Repos", value: user.public_repos, icon: BookOpen },
        { label: "Followers", value: user.followers, icon: Users },
        { label: "Following", value: user.following, icon: Users },
        { label: "On GitHub Since", value: joinYear, icon: Calendar },
      ]
    : [];

  return (
    <section id="opensource" className="relative py-32 overflow-hidden">
      <div className="absolute right-0 top-0 w-[400px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
      <div className="absolute left-0 bottom-0 w-[300px] h-[400px] bg-violet-500/5 rounded-full blur-[100px]" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-cyan-400 uppercase tracking-widest mb-3">
            Open Source
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Code in the{" "}
            <span className="gradient-text">wild</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            {user?.bio || "AI + MERN stack developer"} · {user?.location || "Calicut, India"}
          </p>
        </motion.div>

        {/* GitHub Profile Card */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="glass rounded-3xl border border-white/8 p-6 mb-10"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.avatar_url}
                  alt={user.name}
                  width={72}
                  height={72}
                  className="relative w-18 h-18 rounded-full border-2 border-white/10 object-cover"
                  style={{ width: 72, height: 72 }}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-xl font-bold text-white">{user.name}</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {user.hireable ? "Open to work" : "Not looking"}
                  </span>
                </div>
                <p className="text-white/50 text-sm mt-1">@{user.login}</p>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-white/40">
                  {user.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {user.location}
                    </span>
                  )}
                  {user.company && (
                    <span className="flex items-center gap-1">
                      <Code2 className="w-3.5 h-3.5" />
                      {user.company}
                    </span>
                  )}
                </div>
              </div>

              {/* GitHub link */}
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-violet-400/40 text-sm font-medium transition-all"
              >
                <Github className="w-4 h-4" />
                View Profile
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/5">
              {statCards.map(({ label, value, icon: Icon }) => (
                <div key={label} className="text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Icon className="w-3.5 h-3.5 text-violet-400" />
                    <span className="text-xl font-bold text-white">{value}</span>
                  </div>
                  <p className="text-xs text-white/40">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* GitHub contribution-style activity bar (decorative) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-10 p-5 glass rounded-2xl border border-white/5"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-white/40 font-medium uppercase tracking-wider">Recent Activity</p>
            <p className="text-xs text-white/30">{repos.length} repositories active</p>
          </div>
          <div className="flex gap-1 flex-wrap">
            {repos.map((repo, i) => {
              const intensity = Math.min(1, (repos.length - i) / repos.length);
              return (
                <div
                  key={repo.id}
                  title={`${repo.name} · ${timeAgo(repo.pushed_at)}`}
                  className="w-4 h-4 rounded-sm cursor-pointer hover:scale-125 transition-transform"
                  style={{
                    backgroundColor: `rgba(168, 85, 247, ${0.15 + intensity * 0.6})`,
                  }}
                />
              );
            })}
          </div>
        </motion.div>

        {/* Repos grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo, i) => {
            const langColor = repo.language
              ? LANG_COLORS[repo.language] || "#94a3b8"
              : "#94a3b8";
            return (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.05, duration: 0.5 }}
                className="card-3d glass rounded-2xl border border-white/8 p-4 space-y-3 glass-hover block"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Github className="w-3.5 h-3.5 text-white/40 flex-shrink-0" />
                    <span className="text-white font-semibold text-sm truncate">{repo.name}</span>
                  </div>
                  {repo.homepage && (
                    <ExternalLink className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                  )}
                </div>

                <p className="text-white/45 text-xs leading-relaxed line-clamp-2 min-h-[2rem]">
                  {repo.description || "No description."}
                </p>

                <div className="flex items-center justify-between text-[10px] text-white/35">
                  <div className="flex items-center gap-2.5">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: langColor }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star className="w-2.5 h-2.5" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-2.5 h-2.5" />
                      {repo.forks_count}
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    {timeAgo(repo.pushed_at)}
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-10"
        >
          <a
            href="https://github.com/Its-me-nishmal?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass border border-white/15 text-white/70 hover:text-white hover:border-cyan-400/40 font-medium text-sm transition-all duration-300"
          >
            <Github className="w-4 h-4" />
            See all repositories
            <ExternalLink className="w-3 h-3" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
