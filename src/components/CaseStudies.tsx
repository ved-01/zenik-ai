import { ArrowRight, TrendingUp, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CaseStudies() {
  const caseStudies = [
    {
      company: "GlobalFinance Corp",
      industry: "Financial Services",
      challenge: "Reduce fraudulent transactions while maintaining customer experience",
      solution: "Implemented real-time AI fraud detection system with advanced ML algorithms",
      results: [
        { metric: "Fraud Detection", value: "95%", improvement: "accuracy" },
        { metric: "False Positives", value: "60%", improvement: "reduction" },
        { metric: "Processing Time", value: "300ms", improvement: "average response" }
      ],
      testimonial: "Zenik AI's solution transformed our fraud detection capabilities. We're now catching 95% of fraudulent transactions while significantly improving customer experience.",
      author: "David Park, CTO"
    },
    {
      company: "MediCare Plus",
      industry: "Healthcare",
      challenge: "Improve diagnostic accuracy for medical imaging analysis",
      solution: "Developed custom computer vision models for automated medical image analysis",
      results: [
        { metric: "Diagnostic Accuracy", value: "92%", improvement: "improvement" },
        { metric: "Analysis Time", value: "80%", improvement: "faster" },
        { metric: "Radiologist Efficiency", value: "150%", improvement: "increase" }
      ],
      testimonial: "The AI diagnostic assistant has revolutionized our radiology department. We're delivering faster, more accurate diagnoses while supporting our medical staff.",
      author: "Dr. Sarah Williams, Chief Medical Officer"
    },
    {
      company: "RetailMax",
      industry: "E-commerce",
      challenge: "Increase online sales through personalized customer experiences",
      solution: "Built AI-powered recommendation engine with real-time personalization",
      results: [
        { metric: "Conversion Rate", value: "35%", improvement: "increase" },
        { metric: "Average Order Value", value: "28%", improvement: "boost" },
        { metric: "Customer Engagement", value: "65%", improvement: "higher" }
      ],
      testimonial: "Our partnership with Zenik AI has been transformative. The personalization engine has become the backbone of our customer experience strategy.",
      author: "Michael Chen, VP of Digital Strategy"
    }
  ]

  return (
    <section id="case-studies" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-gradient-primary">Success Stories</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real results from real clients. See how our AI solutions have transformed 
              businesses across industries.
            </p>
          </div>

          {/* Case Studies */}
          <div className="space-y-16">
            {caseStudies.map((study, index) => (
              <div key={index} className="card-glow rounded-2xl overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Content Side */}
                  <div className="p-8 lg:p-12">
                    <div className="mb-6">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        {study.industry}
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">{study.company}</h3>
                      <p className="text-muted-foreground">{study.challenge}</p>
                    </div>

                    <div className="mb-8">
                      <h4 className="font-semibold text-foreground mb-3">Solution</h4>
                      <p className="text-muted-foreground">{study.solution}</p>
                    </div>

                    {/* Testimonial */}
                    <div className="bg-muted/30 rounded-lg p-6">
                      <blockquote className="text-foreground italic mb-4">
                        "{study.testimonial}"
                      </blockquote>
                      <div className="font-medium text-primary">— {study.author}</div>
                    </div>
                  </div>

                  {/* Results Side */}
                  <div className="bg-gradient-to-br from-primary/5 to-accent-violet/5 p-8 lg:p-12">
                    <h4 className="text-xl font-bold text-foreground mb-8 flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                      Key Results
                    </h4>
                    
                    <div className="space-y-6">
                      {study.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-muted-foreground">{result.metric}</div>
                            <div className="text-sm text-primary">{result.improvement}</div>
                          </div>
                          <div className="text-3xl font-bold text-gradient-primary">
                            {result.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Icons representing impact */}
                    <div className="flex justify-around mt-8 pt-8 border-t border-border/20">
                      <div className="text-center">
                        <Users className="h-8 w-8 text-accent-violet mx-auto mb-2" />
                        <div className="text-xs text-muted-foreground">Customer Impact</div>
                      </div>
                      <div className="text-center">
                        <TrendingUp className="h-8 w-8 text-accent-teal mx-auto mb-2" />
                        <div className="text-xs text-muted-foreground">Business Growth</div>
                      </div>
                      <div className="text-center">
                        <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                        <div className="text-xs text-muted-foreground">Efficiency Gains</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Create Your Success Story?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join the growing list of companies transforming their business with Zenik AI's expertise.
            </p>
            <Button size="lg" className="btn-hero">
              Start Your AI Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}