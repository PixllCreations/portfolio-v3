import Image from "next/image";

interface AboutSectionProps {
  color?: string;
}

export default function AboutSection({ color = "#8b5cf6" }: AboutSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-linear-to-br from-primary to-accent rounded-full blur-md opacity-50"></div>
          <div className="w-48 h-48">
            <Image
              src="/hero.png"
              alt="Profile"
              className="relative rounded-full object-cover border-4 border-primary/50 shadow-2xl"
              fill={true}
            />
          </div>
        </div>
        <h2
          className="text-2xl sm:text-3xl font-bold"
          style={{ color }}
        >
          About Me
        </h2>
      </div>
      <p className="text-muted-foreground leading-relaxed">
        I&apos;m a software developer focused on building practical, production-oriented systems
        with Go, TypeScript, React, and Node.js. My work spans Discord automation, backend services,
        full-stack dashboards, API integrations, and event-driven tools that solve real operational
        problems.
      </p>
      <p className="text-muted-foreground leading-relaxed">
        Recently, I built a Go-based Discord bot for CayPlay Studios that manages forum workflows,
        moderation utilities, staff reporting, SQLite persistence, Redis caching, and Google Sheets
        exports. I also build full-stack projects like Aegis, We Know Ball, and game systems that
        combine clean architecture with usable frontend experiences.
      </p>
    </div>
  );
}
