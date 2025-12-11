interface SkillsSectionProps {
  color?: string;
}

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
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground text-sm">Frontend</h3>
          <div className="flex flex-wrap gap-2">
            {["React", "Next.js", "Three.js", "TypeScript"].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground text-sm">Backend</h3>
          <div className="flex flex-wrap gap-2">
            {["Node.js", "PostgreSQL", "MongoDB", "Redis", "Go", "Java", "C", "Python"].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground text-sm">3D & Graphics</h3>
          <div className="flex flex-wrap gap-2">
            {["Three.js", "R3F", "WebGL", "Blender"].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground text-sm">Tools</h3>
          <div className="flex flex-wrap gap-2">
            {["Git", "Docker", "AWS", "Vercel"].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
