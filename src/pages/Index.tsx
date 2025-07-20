import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { About } from "@/components/About"
import { Services } from "@/components/Services"
import { Industries } from "@/components/Industries"
import { CaseStudies } from "@/components/CaseStudies"
import { Blog } from "@/components/Blog"
import { Contact } from "@/components/Contact"
import { Footer } from "@/components/Footer"

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Industries />
        <CaseStudies />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
