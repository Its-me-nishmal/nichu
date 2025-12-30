import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Mail, Linkedin, Github } from "lucide-react";

export function Contact() {
    return (
        <Section id="contact" className="pb-24">
            <h2 className="mb-8 text-3xl font-bold tracking-tight text-stone-900">Contact</h2>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <Button
                    href="mailto:contact@example.com"
                    className="h-12 px-6"
                >
                    <Mail className="mr-2 h-5 w-5" />
                    Email Me
                </Button>
                <div className="flex gap-4">
                    <Button href="https://github.com/Its-me-nishmal" variant="secondary" className="h-12 w-12 p-0" external aria-label="GitHub">
                        <Github className="h-5 w-5" />
                    </Button>
                    <Button href="https://linkedin.com/in/muhammadnishmal" variant="secondary" className="h-12 w-12 p-0" external aria-label="LinkedIn">
                        <Linkedin className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </Section>
    );
}
