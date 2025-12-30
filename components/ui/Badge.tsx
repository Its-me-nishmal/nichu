import { cn } from "@/lib/utils";

interface BadgeProps {
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "outline";
}

export function Badge({ children, className, variant = "default" }: BadgeProps) {
    const variants = {
        default: "bg-stone-100 text-stone-800 hover:bg-stone-200/80",
        outline: "border border-stone-200 text-stone-600 hover:bg-stone-50",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-md px-2.5 py-1 text-sm font-medium transition-colors ring-1 ring-inset ring-transparent",
                variants[variant],
                className
            )}
        >
            {children}
        </span>
    );
}
