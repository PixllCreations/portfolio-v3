"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "Bullet Heaven Game",
    description:
      "A high-performance bullet heaven roguelike game built with Go and Ebitengine. Features wave-based enemy spawning, player progression, auto-targeting weapons, and cross-platform support (Desktop, Web, iOS, Android).",
    tags: ["Go", "Ebitengine", "WebAssembly", "Game Development"],
    image: "",
    demo: "/game",
    code: "https://github.com/PixllCreations/bullets-go",
  },
  {
    title: "Aegis",
    description:
      "Aegis is a modular Discord bot platform built to separate Discord gateway handling from feature-specific business logic. The system uses a distributed, event-driven architecture where a core service handles Discord events, command registration, and preflight checks, while feature modules execute domain logic through NATS-based dispatch.",
    tags: ["Event Driven Architecture", "Microservices", "NATS", "Docker"],
    image: "",
    demo: "",
    code: "https://github.com/PixllCreations/Aegis",
  },
  {
    title: "We Know Ball",
    description:
      "We Know Ball is a live NBA tracking web application that surfaces scores, standings, team details, rosters, schedules, game summaries, and box score data through a polished React frontend. The app uses ESPN’s public NBA endpoints through a reusable API layer, making the data layer easier to extend and maintain.",
    tags: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Go"],
    image: "",
    demo: "",
    code: "https://github.com/PixllCreations/we-know-ball",
  },
];

export default function ProjectsSection() {
  return (
    <div className="space-y-4">
      <h2
        className="text-2xl sm:text-3xl font-bold"
        style={{ color: "#06b6d4" }}
      >
        Featured Projects
      </h2>
      {projects.map((project) => (
        <Card
          key={project.title}
          className="hover:bg-card/70 transition-colors group"
        >
          <div className="p-4 bg-card/50 rounded-lg">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-cyan-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground">{project.description}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.demo && (
                <Button
                  asChild
                  size="sm"
                >
                  <Link href={project.demo}>
                    <ExternalLink />
                    Demo
                  </Link>
                </Button>
              )}
              {project.code && (
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                >
                  <a
                    href={project.code}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/github.svg"
                      alt="GitHub"
                      className="invert-100"
                      width={16}
                      height={16}
                    />
                    Code
                  </a>
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
