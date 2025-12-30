import { Section } from "@/components/ui/Section";

export function AI() {
    return (
        <Section id="ai-automation">
            <h2 className="mb-8 text-3xl font-bold tracking-tight text-stone-900">AI-Assisted Development</h2>
            <div className="prose prose-stone max-w-none text-stone-600">
                <p className="text-lg leading-relaxed">
                    I leverage AI not just for code generation, but as a core part of my engineering workflow. This "Vibe Coding" methodology allows me to execute complex system designs faster and with higher reliability.
                </p>
                <ul className="mt-6 space-y-3 list-disc pl-5 text-lg">
                    <li><strong>Accelerated Execution:</strong> Using agents and LLMs to scaffold boilerplate and solve routine problems instantly.</li>
                    <li><strong>Better System Design:</strong> AI acts as a sophisticated rubber duck for architectural decisions and edge-case discovery.</li>
                    <li><strong>Reliable Outputs:</strong> rigorous testing and verification loops ensure AI-generated code meets production standards.</li>
                </ul>
            </div>
        </Section>
    );
}
