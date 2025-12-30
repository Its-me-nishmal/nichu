import { Section } from "@/components/ui/Section";

export function About() {
    return (
        <Section id="about">
            <h2 className="mb-8 text-3xl font-bold tracking-tight text-stone-900">About</h2>
            <div className="prose prose-stone max-w-none text-stone-600">
                <p className="text-lg leading-relaxed">
                    I am a Full-Stack Developer with a backend-first mindset. My focus is not just on writing code, but on building reliable, scalable systems that solve real-world problems.
                </p>
                <p className="mt-6 text-lg leading-relaxed">
                    From architecting cloud infrastructure to implementing AI-assisted automation, I prioritize clarity, performance, and long-term maintainability. I have deployed multiple production applications and enjoy tackling complex challenges in distributed systems and data processing.
                </p>
            </div>
        </Section>
    );
}
