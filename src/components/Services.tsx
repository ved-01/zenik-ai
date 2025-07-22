import { Brain, Cog, Sparkles, Settings, Database, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ParallaxSection } from "@/components/ui/parallax-section"

export function Services() {
  const services = [
    {
      icon: Brain,
      title: "AI Strategy & Roadmapping",
      description: "Develop comprehensive AI strategies aligned with your business goals. We assess your current capabilities, identify opportunities, and create actionable roadmaps for AI adoption.",
      features: ["Strategic Assessment", "Technology Roadmap", "ROI Planning", "Change Management"]
    },
    {
      icon: Cog,
      title: "Custom AI Solution Development",
      description: "Build bespoke AI solutions tailored to your specific needs. From machine learning models to intelligent automation systems.",
      features: ["Machine Learning Models", "Computer Vision", "Natural Language Processing", "Predictive Analytics"]
    },
    {
      icon: Sparkles,
      title: "Generative AI Integration",
      description: "Harness the power of generative AI to transform content creation, customer service, and business processes.",
      features: ["ChatGPT Integration", "Content Generation", "AI Assistants", "Workflow Automation"]
    },
    {
      icon: Settings,
      title: "LLM Fine-Tuning & Deployment",
      description: "Customize large language models for your domain-specific needs and deploy them securely in your environment.",
      features: ["Model Fine-Tuning", "Domain Adaptation", "Secure Deployment", "Performance Optimization"]
    },
    {
      icon: Database,
      title: "Data Strategy & Engineering",
      description: "Build robust data foundations that enable AI success. From data architecture to MLOps pipelines.",
      features: ["Data Architecture", "ETL Pipelines", "MLOps Setup", "Data Governance"]
    },
    {
      icon: ShieldCheck,
      title: "AI Ethics & Risk Advisory",
      description: "Ensure responsible AI deployment with comprehensive ethics frameworks, bias detection, and risk management.",
      features: ["Ethics Framework", "Bias Detection", "Risk Assessment", "Compliance Support"]
    }
  ]

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ParallaxSection speed={0.4} direction="down">
          <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Our <span className="text-gradient-primary">Services</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive AI solutions designed to accelerate your digital transformation 
              and unlock new possibilities for your business.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <div key={index} className="card-gradient p-8 rounded-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6">
                  <service.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent-violet rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-hero rounded-2xl p-12 text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Transform Your Business with AI?
            </h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Let's discuss how our AI expertise can drive innovation and growth for your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Schedule a Free Consultation
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white/20 text-white hover:bg-white/10">
                Download Service Guide
              </Button>
            </div>
          </div>
          </div>
        </ParallaxSection>
      </div>
    </section>
  )
}