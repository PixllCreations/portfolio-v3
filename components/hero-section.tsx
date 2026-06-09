import { Button } from "@/components/ui/button";

export interface HeroSectionProps {
  setActiveNode: (node: string) => void;
}

export default function HeroSection({ setActiveNode }: HeroSectionProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold text-primary">Welcome</h1>
      <p className="text-lg text-muted-foreground leading-relaxed">
        Full-Stack Software Developer specializing in building practical systems.
      </p>
      <p className="text-lg text-muted-foreground leading-relaxed">
        I build production-oriented software with Go, TypeScript, React, and Node.js — from Discord
        automation and backend services to full-stack dashboards, API integrations, and event-driven
        tools that solve real operational problems.{" "}
      </p>
      <div className="flex gap-3 pt-4">
        <Button
          variant="default"
          onClick={() => setActiveNode("projects")}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
        >
          View Projects
        </Button>
        <Button
          variant="outline"
          onClick={() => setActiveNode("contact")}
          className="px-6 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors cursor-pointer"
        >
          Get in Touch
        </Button>
      </div>
    </div>
  );
}
