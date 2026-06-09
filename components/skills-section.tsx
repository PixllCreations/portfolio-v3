interface SkillsSectionProps {
  color?: string;
}

const skillGroups = [
  {
    title: "Languages",
    skills: ["TypeScript", "JavaScript", "Go", "SQL", "Java", "Python"],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Vite", "Tailwind CSS", "shadcn/ui", "Radix UI", "TanStack Query"],
  },
  {
    title: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "WebSockets",
      "Discord.js",
      "DiscordGo",
      "Drizzle ORM",
      "MikroORM",
    ],
  },
  {
    title: "Infrastructure",
    skills: [
      "PostgreSQL",
      "SQLite",
      "Redis",
      "Docker",
      "Docker Compose",
      "NATS",
      "BullMQ",
      "GitHub Actions",
    ],
  },
  {
    title: "Integrations",
    skills: ["Discord APIs", "Google Sheets API", "ESPN APIs", "Clerk", "Pinecone"],
  },
];

export default function SkillsSection({ color = "#10b981" }: SkillsSectionProps) {
  return (
    <div className="space-y-4">
      <h2
        className="text-2xl sm:text-3xl font-bold"
        style={{ color }}
      >
        Technical Skills
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className="space-y-2"
          >
            <h3 className="font-semibold text-foreground text-sm">{group.title}</h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
