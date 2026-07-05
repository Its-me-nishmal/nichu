"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, Mail, Send, MessageSquare, Phone, Linkedin } from "lucide-react";

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formState;
    const mailtoLink = `mailto:dev.nishmal@gmail.com?subject=Portfolio Contact from ${name}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    window.location.href = mailtoLink;
    setSent(true);
  };

  const socials = [
    { icon: Github, label: "GitHub", href: "https://github.com/Its-me-nishmal", handle: "@Its-me-nishmal" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/muhammed-nishmalp/", handle: "muhammed-nishmalp" },
    { icon: Mail, label: "Email", href: "mailto:dev.nishmal@gmail.com", handle: "dev.nishmal@gmail.com" },
    { icon: Phone, label: "Phone", href: "tel:+917994107442", handle: "+91 7994107442" },
  ];

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-violet-950/10 to-transparent" />
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[800px] h-[400px] bg-violet-600/8 rounded-full blur-[120px]" />

      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-violet-400 uppercase tracking-widest mb-3">
            Contact
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Let&apos;s{" "}
            <span className="gradient-text">build together</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            Have a project in mind? I&apos;m available for freelance work and open to new opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            {socials.map(({ icon: Icon, label, href, handle }) => (
              <a
                key={label}
                href={href}
                target={label === "GitHub" ? "_blank" : undefined}
                rel={label === "GitHub" ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 p-5 glass rounded-2xl border border-white/8 glass-hover transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600/30 to-cyan-500/20 border border-violet-500/20 flex items-center justify-center group-hover:border-violet-400/40 transition-all">
                  <Icon className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">{label}</p>
                  <p className="text-white/50 text-sm">{handle}</p>
                </div>
              </a>
            ))}

            <div className="p-5 glass rounded-2xl border border-white/8">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-sm text-white font-medium">Available now</span>
              </div>
              <p className="text-white/50 text-sm">Usually responds within 24 hours</p>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="glass rounded-3xl border border-white/8 p-8 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-white/50 uppercase tracking-wider">Name</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                    placeholder="Your name"
                    className="w-full px-4 py-3 glass rounded-xl border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-violet-400/50 focus:bg-violet-500/5 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-white/50 uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 glass rounded-xl border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-violet-400/50 focus:bg-violet-500/5 transition-all duration-300"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-white/50 uppercase tracking-wider">Message</label>
                <textarea
                  required
                  rows={5}
                  value={formState.message}
                  onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 glass rounded-xl border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-violet-400/50 focus:bg-violet-500/5 transition-all duration-300 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold text-sm hover:opacity-90 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20"
              >
                {sent ? (
                  <><MessageSquare className="w-4 h-4" /> Message Sent!</>
                ) : (
                  <><Send className="w-4 h-4" /> Send Message</>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
