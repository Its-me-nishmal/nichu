import { Section } from "@/components/ui/Section";
import { SkillGroup } from "@/components/ui/SkillGroup";
import { skills } from "@/data/skills";

export function Skills() {
    return (
        <Section id="skills">
            <h2 className="mb-12 text-3xl font-bold tracking-tight text-stone-900">Skills</h2>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                {skills.map((group) => (
                    <SkillGroup key={group.category} category={group.category} skills={group.skills} />
                ))}
            </div>
        </Section>
    );
}
