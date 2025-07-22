import { Hero } from "@/components/Hero"
import { About } from "@/components/About"
import { Services } from "@/components/Services"
import { Industries } from "@/components/Industries"
import { CaseStudies } from "@/components/CaseStudies"
import { Blog } from "@/components/Blog"
import { Contact } from "@/components/Contact"
import { Footer } from "@/components/Footer"
import { NavLogo } from "@/components/NavLogo"
import { IntroAnimation } from "@/components/IntroAnimation"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const Index = () => {
  const [showMainContent, setShowMainContent] = useState(false);
  const [showNavLogo, setShowNavLogo] = useState(false);

  // Always start with animation on page load
  const handleAnimationComplete = () => {
    console.log("Animation completed - showing main content");
    setShowMainContent(true);
    setShowNavLogo(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Intro Animation - Always shows on page load */}
      <IntroAnimation onAnimationComplete={handleAnimationComplete} />
      
      {/* Navigation Logo */}
      {showNavLogo && <NavLogo />}
      
      {/* Main Content */}
      <AnimatePresence>
        {showMainContent && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Hero />
          </motion.main>
        )}
      </AnimatePresence>
      
      {/* Footer */}
      {showMainContent && <Footer />}
    </div>
  );
};

export default Index;
