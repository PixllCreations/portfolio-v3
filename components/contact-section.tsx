"use client";

import Image from "next/image";
import Link from "next/link";

interface ContactSectionProps {
  color?: string;
}

export default function ContactSection({ color = "#f59e0b" }: ContactSectionProps) {
  return (
    <div className="space-y-4">
      <h2
        className="text-2xl sm:text-3xl font-bold"
        style={{ color }}
      >
        Get In Touch
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        Interested in working together? Let's connect and discuss your next project.
      </p>
      <div className="space-y-3 pt-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white cursor-pointer hover:scale-110 hover:bg-primary/10 transition-all duration-200"
            onClick={() => window.open("mailto:eddie@edwardscott.dev", "_blank", "noopener,noreferrer")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                window.open("mailto:eddie@edwardscott.dev", "_blank", "noopener,noreferrer");
              }
            }}
          >
            <span className="text-primary">
              <Image
                src="/email.svg"
                alt="Email"
                width={32}
                height={32}
              />
            </span>
          </div>
          <div>
            <Link
              href="mailto:eddie@edwardscott.dev"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              eddie@edwardscott.dev{" "}
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white cursor-pointer hover:scale-110 hover:bg-primary/10 transition-all duration-200"
            onClick={() => window.open("https://www.linkedin.com/in/eddiscott", "_blank", "noopener,noreferrer")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                window.open("https://www.linkedin.com/in/eddiscott", "_blank", "noopener,noreferrer");
              }
            }}
          >
            <span className="text-primary">
              <Image
                src="/linkedin.svg"
                alt="LinkedIn"
                width={32}
                height={32}
                className="bg-transparent"
              />
            </span>
          </div>
          <div>
            <Link
              href="https://www.linkedin.com/in/eddiscott"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              linkedin.com/in/eddiscott
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white cursor-pointer hover:scale-110 hover:bg-primary/10 transition-all duration-200"
            onClick={() => window.open("https://github.com/pixllcreations", "_blank", "noopener,noreferrer")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                window.open("https://github.com/pixllcreations", "_blank", "noopener,noreferrer");
              }
            }}
          >
            <span className="text-primary">
              <Image
                src="/github.svg"
                alt="GitHub"
                width={32}
                height={32}
                className="bg-transparent"
              />
            </span>
          </div>
          <div>
            <Link
              href="https://github.com/pixllcreations"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              github.com/pixllcreations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
