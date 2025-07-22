import { Hero } from "@/components/Hero"
import { Section2 } from "@/components/Section2"
import { Section3 } from "@/components/Section3"
import { Section4 } from "@/components/Section4"
import { Section5 } from "@/components/Section5"
import { Section6 } from "@/components/Section6"
import { Footer } from "@/components/Footer"
import { NavLogo } from "@/components/NavLogo"
import { IntroAnimation } from "@/components/IntroAnimation"
import { GradientWave } from "@/components/ui/animated-gradient-wave"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const Index = () => {
  const [showMainContent, setShowMainContent] = useState(false);
  const [showNavLogo, setShowNavLogo] = useState(false);

  const handleAnimationComplete = () => {
    console.log("Animation completed - showing main content");
    setShowMainContent(true);
    setShowNavLogo(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <IntroAnimation onAnimationComplete={handleAnimationComplete} />
      
      {showNavLogo && <NavLogo />}
      
      <AnimatePresence>
        {showMainContent && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Single GradientWave for all sections */}
            <GradientWave />
            
            {/* Sections without their own backgrounds */}
            <div className="relative z-10">
              <Hero />
              <Section2 />
            </div>
          </motion.main>
        )}
      </AnimatePresence>
      
      {showMainContent && <Footer />}
    </div>
  );
};

export default Index;
