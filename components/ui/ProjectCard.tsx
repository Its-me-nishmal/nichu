"use client";

import { Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export interface ProjectProps {
    title: string;
    description: string;
    features: string[];
    techStack: string[];
    githubUrl?: string;
    liveUrl?: string;
}

export function ProjectCard({
    title,
    description,
    features,
    techStack,
    githubUrl,
    liveUrl,
}: ProjectProps) {
    return (
        <div className="flex h-full flex-col gap-6 p-8 relative z-10">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                    <h3 className="text-xl font-bold tracking-tight text-zinc-900">
                        {title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-zinc-600">{description}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                    {githubUrl && (
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                            aria-label="View Source"
                        >
                            <Github className="h-5 w-5" />
                        </a>
                    )}
                    {liveUrl && (
                        <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                            aria-label="View Live Project"
                        >
                            <ExternalLink className="h-5 w-5" />
                        </a>
                    )}
                </div>
            </div>

            <ul className="list-inside list-disc space-y-2 text-sm text-zinc-600 marker:text-zinc-400">
                {features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                ))}
            </ul>

            <div className="mt-auto flex flex-wrap gap-2 pt-4">
                {techStack.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs border-zinc-200 text-zinc-500 bg-zinc-50/50">
                        {tech}
                    </Badge>
                ))}
            </div>
        </div>
    );
}
