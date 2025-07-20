import { Building2, Heart, ShoppingCart, GraduationCap, Truck, Banknote } from "lucide-react"

export function Industries() {
  const industries = [
    {
      icon: Banknote,
      title: "Finance",
      description: "Risk assessment, fraud detection, algorithmic trading, and regulatory compliance solutions.",
      stats: "40% reduction in fraud detection time",
      gradient: "from-accent-violet to-accent-violet/80"
    },
    {
      icon: Heart,
      title: "Healthcare",
      description: "Medical imaging analysis, drug discovery, patient care optimization, and diagnostic assistance.",
      stats: "85% improvement in diagnostic accuracy",
      gradient: "from-accent-teal to-accent-teal/80"
    },
    {
      icon: ShoppingCart,
      title: "Retail",
      description: "Personalized recommendations, inventory optimization, demand forecasting, and customer analytics.",
      stats: "25% increase in conversion rates",
      gradient: "from-primary to-primary-glow"
    },
    {
      icon: GraduationCap,
      title: "Education",
      description: "Personalized learning, automated grading, content generation, and student performance analytics.",
      stats: "60% improvement in learning outcomes",
      gradient: "from-accent-violet to-primary"
    },
    {
      icon: Truck,
      title: "Logistics",
      description: "Route optimization, predictive maintenance, supply chain analytics, and warehouse automation.",
      stats: "30% reduction in operational costs",
      gradient: "from-accent-teal to-primary"
    },
    {
      icon: Building2,
      title: "Manufacturing",
      description: "Quality control, predictive maintenance, production optimization, and smart factory solutions.",
      stats: "45% decrease in downtime",
      gradient: "from-primary to-accent-teal"
    }
  ]

  return (
    <section id="industries" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-gradient-primary">Industries</span> We Serve
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Delivering specialized AI solutions across diverse sectors, with deep understanding 
              of industry-specific challenges and opportunities.
            </p>
          </div>

          {/* Industries Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="group card-glow p-8 rounded-lg hover:scale-105 transition-all duration-300">
                {/* Icon with gradient background */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${industry.gradient} rounded-full mb-6 group-hover:shadow-lg transition-all duration-300`}>
                  <industry.icon className="h-8 w-8 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {industry.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {industry.description}
                </p>
                
                {/* Stats */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="text-sm text-muted-foreground mb-1">Impact</div>
                  <div className="font-semibold text-primary">{industry.stats}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-lg text-muted-foreground mb-6">
              Don't see your industry? We work across all sectors to deliver custom AI solutions.
            </p>
            <div className="inline-flex items-center px-6 py-3 rounded-full border border-primary/20 bg-primary/5 text-primary font-medium">
              <span className="w-2 h-2 bg-accent-violet rounded-full mr-3 animate-pulse" />
              Get Industry-Specific Consultation
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}