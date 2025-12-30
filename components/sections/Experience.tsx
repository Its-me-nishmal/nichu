"use client";

import { Section } from "@/components/ui/Section";
import { experience } from "@/data/experience";

export function Experience() {
    return (
        <Section id="experience">
            <div className="mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Experience</h2>
            </div>

            <div className="relative border-l border-zinc-200 ml-3 space-y-12">
                {experience.map((item, index) => (
                    <div key={index} className="relative pl-8 md:pl-12">
                        {/* Timeline Dot */}
                        <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-zinc-400 ring-4 ring-zinc-50" />

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-zinc-900">{item.role}</h3>
                                <span className="text-base font-medium text-zinc-600">{item.company}</span>
                            </div>
                            <span className="text-sm font-medium text-zinc-500 font-mono tracking-wide">{item.duration}</span>
                        </div>

                        <ul className="mt-4 space-y-2 text-zinc-600">
                            {item.description.map((desc, i) => (
                                <li key={i} className="leading-relaxed">
                                    • {desc}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </Section>
    );
}
