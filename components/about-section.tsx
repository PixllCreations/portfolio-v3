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
          <img
            src="/hero.png"
            alt="Profile"
            className="relative w-32 h-32 rounded-full object-cover border-4 border-primary/50 shadow-2xl"
          />
        </div>
        <h2
          className="text-2xl sm:text-3xl font-bold"
          style={{ color }}
        >
          About Me
        </h2>
      </div>
      <p className="text-muted-foreground leading-relaxed">
        Passionate developer with expertise in React, Next.js, Three.js, and modern web technologies. I create immersive
        digital experiences that push the boundaries of what's possible on the web.
      </p>
    </div>
  );
}
