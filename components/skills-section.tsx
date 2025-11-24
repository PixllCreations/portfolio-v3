import { Card } from "@/components/ui/card"

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js", "Framer Motion"],
    color: "primary",
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Redis", "GraphQL"],
    color: "accent",
  },
  {
    title: "DevOps",
    skills: ["Docker", "AWS", "Vercel", "GitHub Actions", "Nginx", "Linux"],
    color: "chart-3",
  },
  {
    title: "Tools",
    skills: ["Git", "VS Code", "Figma", "Postman", "Jest", "Playwright"],
    color: "chart-4",
  },
]

export default function SkillsSection() {
  return (
    <section id="skills" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Skills & Technologies</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            A comprehensive toolkit for building modern web applications from concept to deployment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <Card key={index} className={`p-6 space-y-4 bg-card/50 backdrop-blur-sm border-${category.color}/20`}>
              <h3 className="text-2xl font-semibold">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className={`px-4 py-2 text-sm font-medium bg-${category.color}/10 text-${category.color} rounded-lg border border-${category.color}/20`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
