import { Target, Users, Lightbulb, Shield } from "lucide-react"
import { ParallaxSection } from "@/components/ui/parallax-section"

export function About() {
  const values = [
    {
      icon: Target,
      title: "Strategic Focus",
      description: "We align AI initiatives with your business objectives to deliver measurable outcomes."
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Our team combines deep AI expertise with industry knowledge across multiple sectors."
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "We stay at the forefront of AI advancement to bring you cutting-edge solutions."
    },
    {
      icon: Shield,
      title: "Ethical AI",
      description: "We prioritize responsible AI development with robust governance and security measures."
    }
  ]

  return (
    <section id="about" className="pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ParallaxSection speed={0.3}>
          <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-gradient-primary">About</span> Zenik AI
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We are a pioneering AI consulting firm dedicated to transforming businesses through intelligent automation, 
              data-driven insights, and innovative AI solutions.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Text Content */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">
                Transforming Industries Through AI Excellence
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Founded by leading AI researchers and industry veterans, Zenik AI bridges the gap between 
                cutting-edge artificial intelligence research and practical business applications. We believe 
                that every organization, regardless of size or industry, should have access to the transformative 
                power of AI.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our methodology combines strategic consulting with hands-on implementation, ensuring that AI 
                initiatives not only deliver immediate value but also establish a foundation for long-term 
                competitive advantage.
              </p>
              
              {/* Founder Quote */}
              <div className="bg-card border border-border rounded-lg p-6 mt-8">
                <blockquote className="text-lg italic text-foreground mb-4">
                  "AI is not just about technology—it's about reimagining what's possible for your business. 
                  Our mission is to make that vision a reality."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full mr-4" />
                  <div>
                    <div className="font-semibold text-foreground">Dr. Sarah Chen</div>
                    <div className="text-muted-foreground">CEO & Founder, Zenik AI</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-card border border-border rounded-lg">
                  <div className="text-3xl font-bold text-gradient-primary mb-2">250+</div>
                  <div className="text-muted-foreground">AI Projects Delivered</div>
                </div>
                <div className="text-center p-6 bg-card border border-border rounded-lg">
                  <div className="text-3xl font-bold text-gradient-primary mb-2">95%</div>
                  <div className="text-muted-foreground">Client Success Rate</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-card border border-border rounded-lg">
                  <div className="text-3xl font-bold text-gradient-primary mb-2">50+</div>
                  <div className="text-muted-foreground">AI Experts</div>
                </div>
                <div className="text-center p-6 bg-card border border-border rounded-lg">
                  <div className="text-3xl font-bold text-gradient-primary mb-2">24/7</div>
                  <div className="text-muted-foreground">Support Available</div>
                </div>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card-glow p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4">
                  <value.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-3">{value.title}</h4>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
          </div>
        </ParallaxSection>
      </div>
    </section>
  )
}