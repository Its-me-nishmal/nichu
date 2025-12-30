import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string;
    variant?: "primary" | "secondary" | "outline" | "link";
    external?: boolean;
}

export function Button({
    children,
    className,
    href,
    variant = "primary",
    external,
    ...props
}: ButtonProps) {
    const baseStyles =
        "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-stone-900 text-white hover:bg-stone-800 rounded-md",
        secondary: "bg-stone-200 text-stone-900 hover:bg-stone-300 rounded-md",
        outline: "border border-stone-200 hover:bg-stone-100/50 rounded-md",
        link: "text-stone-600 hover:text-stone-900 underline-offset-4 hover:underline px-0 py-0",
    };

    const combinedClassName = cn(baseStyles, variants[variant], className);

    if (href) {
        if (external) {
            return (
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={combinedClassName}
                >
                    {children}
                    {variant !== "link" && <ArrowUpRight className="h-4 w-4 opacity-70" />}
                </a>
            );
        }
        return (
            <Link href={href} className={combinedClassName}>
                {children}
            </Link>
        );
    }

    return (
        <button className={combinedClassName} {...props}>
            {children}
        </button>
    );
}
