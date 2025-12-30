import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Github } from "lucide-react";

export function OpenSource() {
    return (
        <Section id="open-source">
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-stone-900">Open Source</h2>
            <p className="mb-8 max-w-2xl text-lg text-stone-600">
                My GitHub is home to various experiments, automation bots, and utility libraries. I believe in learning by building and sharing knowledge with the community.
            </p>
            <Button
                href="https://github.com/Its-me-nishmal"
                variant="outline"
                className="h-12 px-6"
                external
            >
                <Github className="mr-2 h-5 w-5" />
                Visit GitHub Profile
            </Button>
        </Section>
    );
}
