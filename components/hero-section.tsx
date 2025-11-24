import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"

export default function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-balance">Full Stack Developer</h1>
          <p className="text-xl md:text-2xl text-muted-foreground text-balance">
            Crafting innovative digital experiences with modern technologies
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Button size="lg" className="text-lg px-8">
            View My Work
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
            Get In Touch
          </Button>
        </div>

        <div className="pt-16 animate-bounce">
          <ArrowDown className="w-8 h-8 mx-auto text-muted-foreground" />
        </div>
      </div>
    </section>
  )
}
