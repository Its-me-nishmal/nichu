import { Badge } from "@/components/ui/Badge";

export interface SkillGroupProps {
    category: string;
    skills: string[];
}

export function SkillGroup({ category, skills }: SkillGroupProps) {
    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-400">
                {category}
            </h3>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <Badge key={skill} variant="default">
                        {skill}
                    </Badge>
                ))}
            </div>
        </div>
    );
}
