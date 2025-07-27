import { Hero } from "@/components/Hero"
import { Section2 } from "@/components/Section2"
// import { AIJourneySection } from "@/components/Section3"
import { AIJourneyIntroSection } from "@/components/Section4"
import { AITransformationSteps } from "@/components/AITransformationSteps"
import { PricingSection } from "@/components/PricingSection"
import { Section5 } from "@/components/Section5"
import { InfiniteLogoCarousel } from "@/components/Section6"
import { Footer } from "@/components/Footer"
import { NavLogo } from "@/components/NavLogo"
import { IntroAnimation } from "@/components/IntroAnimation"
import { GradientWave } from "@/components/ui/animated-gradient-wave"
import { ParallaxSection } from "@/components/ui/parallax-section"
import { ContactForm } from "@/components/ContactForm"
import { ScrollSnapLayout } from "@/components/ScrollSnapLayout"
import React, { useState } from "react"
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
      
      <ScrollSnapLayout>
        <div className="snap-section" style={{ height: '100vh', scrollSnapAlign: 'start' }}>
          <ParallaxSection speed={0.3} direction="down">
            <Hero />
          </ParallaxSection>
          {showNavLogo && <NavLogo />}
        </div>
        
        <div className="snap-section" style={{ height: '100vh', scrollSnapAlign: 'start' }}>
          <ParallaxSection speed={0.5} direction="up">
            <Section2 />
          </ParallaxSection>
        </div>

        <div className="snap-section" style={{ height: '100vh', scrollSnapAlign: 'start' }}>
          <ParallaxSection speed={0.5} direction="up">
            <AIJourneyIntroSection />
          </ParallaxSection>
        </div>

        <div className="snap-section" style={{ height: '100vh', scrollSnapAlign: 'start' }}>
          <ParallaxSection speed={0.5} direction="up">
            <AITransformationSteps />
          </ParallaxSection>
        </div>

        <div className="snap-section" style={{ height: '100vh', scrollSnapAlign: 'start' }}>
          <ParallaxSection speed={0.5} direction="up">
            <Section5 />
          </ParallaxSection>
        </div>

        <div className="snap-section" style={{ height: '100vh', scrollSnapAlign: 'start' }}>
          <ParallaxSection speed={0.5} direction="up">
            <PricingSection />
          </ParallaxSection>
        </div>
        
        {/* <div className="snap-section" style={{ height: '100vh', scrollSnapAlign: 'start' }}>
          <InfiniteLogoCarousel />
        </div> */}

        <div className="snap-section" style={{ height: '100vh', scrollSnapAlign: 'start' }}>
          <Footer />
        </div>
      </ScrollSnapLayout>

      {/* Single GradientWave for all sections */}
      <GradientWave />

      {/* Global Contact Form */}
      <ContactForm />

      {/* Navigation components - only show after intro */}
      <AnimatePresence>
        {showMainContent && (
          <></>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
