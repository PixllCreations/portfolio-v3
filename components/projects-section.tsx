import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Help Desk Application",
    description:
      "A modern help desk application with ticket management, automated email notifications, Gmail integration, and real-time analytics dashboard with SLA tracking.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    image: "/modern-ecommerce-dashboard.png",
    link: "https://github.com/pixllcreations/helpdesk",
  },
];

export default function ProjectsSection() {
  return (
    <div className="space-y-4">
      <h2
        className="text-3xl font-bold"
        style={{ color: "#06b6d4" }}
      >
        Featured Projects
      </h2>
      {projects.map((project) => (
        <div className="p-4 bg-card/50 rounded-lg border border-border">
          <h3 className="font-semibold text-foreground mb-1">{project.title}</h3>
          <p className="text-sm text-muted-foreground">{project.description}</p>
        </div>
      ))}
    </div>
  );
}
