"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Bullet Heaven Game",
    description:
      "A high-performance bullet heaven roguelike game built with Go and Ebitengine. Features wave-based enemy spawning, player progression, auto-targeting weapons, and cross-platform support (Desktop, Web, iOS, Android).",
    tags: ["Go", "Ebitengine", "WebAssembly", "Game Development"],
    image: "",
    link: "/game",
    external: false,
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
      {projects.map((project) => {
        const cardContent = (
          <Card className="hover:bg-card/70 transition-colors cursor-pointer group">
            <div className="p-4 bg-card/50 rounded-lg">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-cyan-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-cyan-500 transition-colors shrink-0 mt-1" />
              </div>
            </div>
          </Card>
        );

        if (project.external) {
          return (
            <div
              key={project.title}
              onClick={() => window.open(project.link, "_blank", "noopener,noreferrer")}
            >
              {cardContent}
            </div>
          );
        }

        return (
          <Link
            key={project.title}
            href={project.link}
            className="block"
          >
            {cardContent}
          </Link>
        );
      })}
    </div>
  );
}
