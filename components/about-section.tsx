import { Card } from "@/components/ui/card"
import { Code2, Rocket, Users } from "lucide-react"

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            I'm a passionate full-stack developer specializing in building exceptional digital experiences that combine
            beautiful design with robust engineering.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-4 bg-card/50 backdrop-blur-sm border-primary/20">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Code2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Clean Code</h3>
            <p className="text-muted-foreground leading-relaxed">
              Writing maintainable, scalable code following best practices and modern design patterns.
            </p>
          </Card>

          <Card className="p-6 space-y-4 bg-card/50 backdrop-blur-sm border-accent/20">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <Rocket className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold">Fast Performance</h3>
            <p className="text-muted-foreground leading-relaxed">
              Optimizing applications for speed and efficiency to deliver the best user experience.
            </p>
          </Card>

          <Card className="p-6 space-y-4 bg-card/50 backdrop-blur-sm border-chart-3/20">
            <div className="w-12 h-12 rounded-lg bg-chart-3/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-chart-3" />
            </div>
            <h3 className="text-xl font-semibold">User Focused</h3>
            <p className="text-muted-foreground leading-relaxed">
              Creating intuitive interfaces that prioritize user needs and accessibility.
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
