import { Calendar, ArrowRight, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Blog() {
  const articles = [
    {
      title: "The Future of Generative AI in Enterprise Applications",
      excerpt: "Exploring how large language models are reshaping business processes and creating new opportunities for innovation across industries.",
      author: "Dr. Sarah Chen",
      date: "Dec 15, 2024",
      readTime: "8 min read",
      category: "AI Strategy",
      featured: true
    },
    {
      title: "Building Ethical AI: A Framework for Responsible Development",
      excerpt: "Essential guidelines and best practices for developing AI systems that are fair, transparent, and beneficial for all stakeholders.",
      author: "Marcus Rodriguez",
      date: "Dec 12, 2024",
      readTime: "6 min read",
      category: "AI Ethics"
    },
    {
      title: "ROI Metrics for AI Projects: What Every Executive Should Know",
      excerpt: "Key performance indicators and measurement strategies to evaluate the success of your AI initiatives and demonstrate business value.",
      author: "Jennifer Liu",
      date: "Dec 10, 2024",
      readTime: "7 min read",
      category: "Business Strategy"
    }
  ]

  return (
    <section id="blog" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Latest <span className="text-gradient-primary">Insights</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay ahead of the AI curve with expert insights, industry trends, and strategic guidance 
              from our team of AI specialists.
            </p>
          </div>

          {/* Featured Article */}
          <div className="mb-12">
            <div className="card-glow rounded-2xl overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Featured Article Content */}
                <div className="p-8 lg:p-12">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent-violet/20 text-accent-violet text-sm font-medium mb-4">
                    Featured Article
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 leading-tight">
                    {articles[0].title}
                  </h3>
                  
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                    {articles[0].excerpt}
                  </p>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-6">
                    <User className="h-4 w-4 mr-2" />
                    <span className="mr-4">{articles[0].author}</span>
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="mr-4">{articles[0].date}</span>
                    <span>{articles[0].readTime}</span>
                  </div>
                  
                  <Button className="btn-hero">
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                {/* Featured Article Visual */}
                <div className="bg-gradient-to-br from-primary/20 to-accent-violet/20 p-8 lg:p-12 flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-hero rounded-full flex items-center justify-center">
                    <div className="text-4xl font-bold text-white">AI</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Other Articles */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {articles.slice(1).map((article, index) => (
              <div key={index} className="card-glow p-8 rounded-xl">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  {article.category}
                </div>
                
                <h4 className="text-xl font-semibold text-foreground mb-3 leading-tight">
                  {article.title}
                </h4>
                
                <p className="text-muted-foreground mb-6">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="h-4 w-4 mr-2" />
                    <span className="mr-3">{article.author}</span>
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{article.date}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                    Read More <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Blog CTA */}
          <div className="text-center">
            <Button variant="outline" size="lg" className="btn-outline-glow">
              View All Articles
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
