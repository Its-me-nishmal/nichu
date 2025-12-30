"use client";

import { Section } from "@/components/ui/Section";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { projects } from "@/data/projects";

export function Projects() {
    return (
        <Section id="projects">
            <div className="mb-12 flex flex-col gap-4">
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Selected Work</h2>
                <p className="max-w-xl text-lg text-zinc-600">
                    A diverse collection of projects ranging from production web apps to complex automation bots.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {projects.map((project) => (
                    <SpotlightCard key={project.title}>
                        <ProjectCard {...project} />
                    </SpotlightCard>
                ))}
            </div>
        </Section>
    );
}
