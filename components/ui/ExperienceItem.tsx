export interface ExperienceProps {
    role: string;
    company: string;
    duration: string;
    description: string[];
}

export function ExperienceItem({
    role,
    company,
    duration,
    description,
}: ExperienceProps) {
    return (
        <div className="flex flex-col gap-2 border-l-2 border-stone-200 pl-6 relative pb-10 last:pb-0">
            <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-stone-200 ring-4 ring-white" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <div>
                    <h3 className="text-lg font-semibold text-stone-900">{role}</h3>
                    <span className="text-base font-medium text-stone-700">{company}</span>
                </div>
                <span className="text-sm font-medium text-stone-500 font-mono tracking-wide mt-1 sm:mt-0">{duration}</span>
            </div>
            <ul className="space-y-2 text-stone-600">
                {description.map((item, i) => (
                    <li key={i} className="leading-relaxed">
                        • {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}
