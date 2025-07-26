import { Hero } from "@/components/Hero"
import { Section2 } from "@/components/Section2"
import { AIJourneySection } from "@/components/Section3"
import { AIJourneyIntroSection } from "@/components/Section4"
import { Section5 } from "@/components/Section5"
import { Section6 } from "@/components/Section6"
import { Footer } from "@/components/Footer"
import { NavLogo } from "@/components/NavLogo"
import { IntroAnimation } from "@/components/IntroAnimation"
import { GradientWave } from "@/components/ui/animated-gradient-wave"
import { ParallaxSection } from "@/components/ui/parallax-section"
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
            
            {/* Sections with scroll snap and parallax effects */}
            <div className="snap-container relative z-10">
              <div className="snap-section">
                <ParallaxSection speed={0.3} direction="down">
                  <Hero />
                </ParallaxSection>
              </div>
              
              <div className="snap-section">
                <ParallaxSection speed={0.5} direction="up">
                  <Section2 />
                </ParallaxSection>
              </div>

              <div className="snap-section">
                <ParallaxSection speed={0.5} direction="up">
                  <AIJourneyIntroSection />
                </ParallaxSection>
              </div>

              {/* AIJourneySection has its own internal animation logic, preserve it */}
              <div className="snap-section preserve-height">
                <AIJourneySection />
              </div>
              
              {/* Add additional sections if needed */}
              <div className="snap-section">
                <Footer />
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
