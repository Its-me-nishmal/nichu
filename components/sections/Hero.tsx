"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, Mail, Phone, Linkedin, ArrowRight, Code, Cpu, Zap } from "lucide-react";
import Image from "next/image";

/* ── Particles (from @21st-dev/magic) ──────────────────────────── */
interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
}

const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 120,
  staticity = 50,
  ease = 50,
  size = 0.5,
  refresh = false,
  color = "#a855f7",
  vx = 0,
  vy = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<any[]>([]);
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const animFrameRef = useRef<number>(0);

  const hexToRgb = (hex: string): number[] => {
    hex = hex.replace("#", "");
    const hexInt = parseInt(hex, 16);
    return [(hexInt >> 16) & 255, (hexInt >> 8) & 255, hexInt & 255];
  };
  const rgb = hexToRgb(color);

  type Circle = {
    x: number; y: number; translateX: number; translateY: number;
    size: number; alpha: number; targetAlpha: number;
    dx: number; dy: number; magnetism: number;
  };

  const circleParams = (): Circle => ({
    x: Math.floor(Math.random() * canvasSize.current.w),
    y: Math.floor(Math.random() * canvasSize.current.h),
    translateX: 0, translateY: 0,
    size: Math.floor(Math.random() * 2) + size,
    alpha: 0,
    targetAlpha: parseFloat((Math.random() * 0.5 + 0.1).toFixed(1)),
    dx: (Math.random() - 0.5) * 0.1,
    dy: (Math.random() - 0.5) * 0.1,
    magnetism: 0.1 + Math.random() * 4,
  });

  const resizeCanvas = () => {
    if (!canvasContainerRef.current || !canvasRef.current || !context.current) return;
    circles.current.length = 0;
    canvasSize.current.w = canvasContainerRef.current.offsetWidth;
    canvasSize.current.h = canvasContainerRef.current.offsetHeight;
    canvasRef.current.width = canvasSize.current.w * dpr;
    canvasRef.current.height = canvasSize.current.h * dpr;
    canvasRef.current.style.width = `${canvasSize.current.w}px`;
    canvasRef.current.style.height = `${canvasSize.current.h}px`;
    context.current.scale(dpr, dpr);
  };

  const clearContext = () => {
    if (context.current)
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
  };

  const drawCircle = (circle: Circle, update = false) => {
    if (!context.current) return;
    const { x, y, translateX, translateY, size: s, alpha } = circle;
    context.current.translate(translateX, translateY);
    context.current.beginPath();
    context.current.arc(x, y, s, 0, 2 * Math.PI);
    context.current.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`;
    context.current.fill();
    context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!update) circles.current.push(circle);
  };

  const drawParticles = () => {
    clearContext();
    for (let i = 0; i < quantity; i++) drawCircle(circleParams());
  };

  const remapValue = (v: number, s1: number, e1: number, s2: number, e2: number) =>
    Math.max(0, ((v - s1) * (e2 - s2)) / (e1 - s1) + s2);

  const animate = () => {
    clearContext();
    circles.current.forEach((circle: Circle, i: number) => {
      const edge = [
        circle.x + circle.translateX - circle.size,
        canvasSize.current.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        canvasSize.current.h - circle.y - circle.translateY - circle.size,
      ];
      const closest = parseFloat(remapValue(Math.min(...edge), 0, 20, 0, 1).toFixed(2));
      if (closest > 1) { circle.alpha = Math.min(circle.alpha + 0.02, circle.targetAlpha); }
      else { circle.alpha = circle.targetAlpha * closest; }
      circle.x += circle.dx + vx;
      circle.y += circle.dy + vy;
      circle.translateX += (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) / ease;
      circle.translateY += (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) / ease;
      drawCircle(circle, true);
      if (circle.x < -circle.size || circle.x > canvasSize.current.w + circle.size ||
          circle.y < -circle.size || circle.y > canvasSize.current.h + circle.size) {
        circles.current.splice(i, 1);
        drawCircle(circleParams());
      }
    });
    animFrameRef.current = window.requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (canvasRef.current) context.current = canvasRef.current.getContext("2d");
    resizeCanvas();
    drawParticles();
    animFrameRef.current = window.requestAnimationFrame(animate);
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [color]);

  useEffect(() => { resizeCanvas(); drawParticles(); }, [refresh]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - canvasSize.current.w / 2;
      const y = e.clientY - rect.top - canvasSize.current.h / 2;
      if (Math.abs(x) < canvasSize.current.w / 2 && Math.abs(y) < canvasSize.current.h / 2) {
        mouse.current.x = x;
        mouse.current.y = y;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={className} ref={canvasContainerRef} aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
};

/* ── TypeWriter ──────────────────────────────────────────────────── */
const TypeWriter: React.FC<{ strings: string[]; className?: string }> = ({
  strings, className = "",
}) => {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const cur = strings[idx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (text.length < cur.length) setText(cur.slice(0, text.length + 1));
        else setTimeout(() => setDeleting(true), 2000);
      } else {
        if (text.length > 0) setText(text.slice(0, -1));
        else { setDeleting(false); setIdx((idx + 1) % strings.length); }
      }
    }, deleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [text, deleting, idx, strings]);

  return (
    <span className={className}>
      {text}
      <span className="animate-pulse text-violet-400">|</span>
    </span>
  );
};

/* ── Hero ────────────────────────────────────────────────────────── */
export function Hero({ repoCount = 172 }: { repoCount?: number }) {
  const roles = [
    "Full-Stack Developer",
    "Backend Engineer",
    "Cloud Architect",
    "AI Automation Builder",
  ];

  const stats = [
    { icon: Code, label: "Repositories", value: `${repoCount}` },
    { icon: Cpu, label: "Technologies", value: "20+" },
    { icon: Zap, label: "Since", value: "2023" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden flex items-center"
    >
      {/* Particle background */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={120}
        ease={80}
        color="#a855f7"
        size={0.6}
      />
      {/* Secondary cyan particles */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={60}
        ease={60}
        color="#06b6d4"
        size={0.4}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050714]/60 to-[#050714] z-[1]" />
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] z-[1]" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[100px] z-[1]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Text ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-sm text-white/80 font-medium">Available for new projects</span>
            </motion.div>

            {/* Heading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight"
              >
                Hi, I&apos;m{" "}
                <span className="gradient-text">Nishmal</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-xl sm:text-2xl font-semibold text-white/70 h-8"
              >
                <TypeWriter strings={roles} />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-base sm:text-lg text-white/60 max-w-lg leading-relaxed"
              >
                AI + MERN developer (online as <strong className="text-violet-400 font-semibold">Cipher Nichu</strong>) building reliable backend systems, cloud infrastructure, and intelligent automation from Vadakara, Calicut.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold text-sm hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg shadow-violet-500/20"
              >
                View Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://github.com/Its-me-nishmal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass border border-white/15 text-white font-semibold text-sm hover:bg-white/10 hover:border-violet-400/40 transition-all duration-300"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="flex gap-3"
            >
              {[
                { icon: Github, href: "https://github.com/Its-me-nishmal", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/muhammed-nishmalp/", label: "LinkedIn" },
                { icon: Mail, href: "mailto:dev.nishmal@gmail.com", label: "Email" },
                { icon: Phone, href: "tel:+917994107442", label: "Phone" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-3 glass rounded-full border border-white/10 hover:border-violet-400/40 hover:bg-violet-500/10 transition-all duration-300 hover:scale-110"
                >
                  <Icon className="w-5 h-5 text-white/70" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Profile Card ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative flex justify-center"
          >
            {/* Glow blob */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-cyan-500/10 to-violet-600/20 rounded-3xl blur-3xl animate-pulse" />

            <div className="relative glass rounded-3xl border border-white/10 p-8 space-y-6 w-full max-w-sm">
              {/* Profile photo */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white/10">
                    <Image
                      src="/profilepic.png"
                      alt="Muhammed Nishmal (Cipher Nichu)"
                      fill
                      className="object-cover rounded-full"
                      priority
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Muhammed Nishmal (Cipher Nichu)</h3>
                  <div className="flex flex-col text-xs mt-0.5">
                    <span className="text-violet-400 font-medium">@its-me-nishmal · @ciphernichu</span>
                    <span className="text-white/50">AI + MERN Developer · Vadakara, Calicut</span>
                  </div>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-3">
                {stats.map(({ icon: Icon, label, value }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
                    className="glass rounded-2xl p-3 border border-white/8 text-center glass-hover cursor-default"
                  >
                    <Icon className="w-5 h-5 text-violet-400 mx-auto mb-1" />
                    <div className="text-lg font-bold text-white">{value}</div>
                    <div className="text-[10px] text-white/50">{label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Tech tags */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider">Core Stack</p>
                <div className="flex flex-wrap gap-2">
                  {["Next.js", "Node.js", "TypeScript", "AWS", "Python", "AI/LLMs"].map((s, i) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.5 + i * 0.05, duration: 0.3 }}
                      className="px-2.5 py-1 glass rounded-full text-xs text-white/70 border border-white/10 hover:border-violet-400/40 hover:text-white transition-all"
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Availability bar */}
              <div className="pt-2 border-t border-white/8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-white/50">Response Rate</span>
                  <span className="text-xs font-semibold text-emerald-400">98%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "98%" }}
                    transition={{ delay: 2, duration: 1.2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
