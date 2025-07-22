import { Hero } from "@/components/Hero"
import { Section2 } from "@/components/Section2"
import { Section3 } from "@/components/Section3"
import { Section4 } from "@/components/Section4"
import { Section5 } from "@/components/Section5"
import { Section6 } from "@/components/Section6"
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
            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 />
            <Section6 />
          </motion.main>
        )}
      </AnimatePresence>
      
      {/* Footer */}
      {showMainContent && <Footer />}
    </div>
  );
};

export default Index;
