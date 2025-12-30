"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useScroll, motion, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Home, User, Code2, Briefcase, Mail } from "lucide-react";

export function NavBar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    const navItems = [
        { name: "Home", href: "#", icon: Home },
        { name: "About", href: "#about", icon: User },
        { name: "Projects", href: "#projects", icon: Code2 },
        { name: "Experience", href: "#experience", icon: Briefcase },
        { name: "Contact", href: "#contact", icon: Mail },
    ];

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: 100 },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed bottom-6 inset-x-0 mx-auto w-max z-50"
        >
            <div className="flex items-center gap-1 rounded-full border border-zinc-200 bg-white/80 p-2 shadow-lg backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                            "relative flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                        )}
                    >
                        <span className="hidden sm:inline">{item.name}</span>
                        <item.icon className="h-5 w-5 sm:hidden" />
                    </Link>
                ))}
            </div>
        </motion.nav>
    );
}
