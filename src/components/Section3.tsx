import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Define the type for the different steps in the journey
type JourneyStep = 'identify' | 'educate' | 'develop';

// Store the text content for each step
const content = {
  identify: {
    title: "Identify",
    description: "We help you identify high-impact AI opportunities and build a step-by-step AI Transformation strategy to bring them to life."
  },
  educate: {
    title: "Educate",
    description: "We train and support your team with the right tools and know-how to embed AI across your entire organization."
  },
  develop: {
    title: "Develop",
    description: "We leverage our extensive experience and network to develop custom AI systems that are proven to move the needle inside your business."
  }
};

// A reusable component for the animated circles
const GlassCircle = ({ layoutId }: { layoutId: string }) => (
  <motion.div
    layoutId={layoutId}
    className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  />
);

// Individual step component
const JourneyStepSection = ({ 
  step, 
  isActive, 
  onInView 
}: { 
  step: JourneyStep; 
  isActive: boolean;
  onInView: () => void;
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onInView();
        }
      },
      { threshold: 0.6 } // When 60% of the element is visible
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [onInView]);
  
  const renderCircles = () => {
    switch (step) {
      case 'identify':
        return (
          <div className="relative w-48 h-48">
            <motion.div layoutId="container" className="absolute inset-0 flex items-center justify-center">
              <GlassCircle layoutId="circle-1" />
            </motion.div>
            <motion.div layoutId="container-inner" className="absolute inset-0 flex items-center justify-center scale-50">
              <GlassCircle layoutId="circle-2" />
            </motion.div>
          </div>
        );
      case 'educate':
        return (
          <motion.div layoutId="container" className="flex space-x-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-28 h-28">
                <GlassCircle layoutId={`circle-${i}`} />
              </div>
            ))}
          </motion.div>
        );
      case 'develop':
        return (
          <motion.div layoutId="container" className="relative w-96 h-64">
            {[
              { top: '0%', left: '33%', w: 'h-28 w-28', id: 1 },
              { top: '25%', left: '0%', w: 'h-28 w-28', id: 2 },
              { top: '25%', left: '66%', w: 'h-28 w-28', id: 3 },
              { top: '50%', left: '33%', w: 'h-28 w-28', id: 4 },
              { top: '50%', left: '0%', w: 'h-28 w-28', id: 5 },
              { top: '50%', left: '66%', w: 'h-28 w-28', id: 6 },
            ].map(item => (
              <motion.div key={item.id} className={`absolute ${item.w}`} style={{ top: item.top, left: item.left }}>
                <GlassCircle layoutId={`circle-${item.id > 5 ? 'new' : item.id}`} />
              </motion.div>
            ))}
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center"
      id={`journey-${step}`}
    >
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center space-y-16 px-4">
        {/* Animated Circles Area */}
        <div className="h-64 flex items-center justify-center">
          <AnimatePresence>
            {isActive && renderCircles()}
          </AnimatePresence>
        </div>
        
        {/* Text Area */}
        <div className="h-28 text-center">
          <AnimatePresence mode="wait">
            {isActive && (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <h2 className="text-5xl md:text-6xl text-white font-medium">
                  {content[step].title}
                </h2>
                <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto">
                  {content[step].description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// Intro section component
const IntroSection = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <motion.h2 
          className="text-2xl md:text-3xl lg:text-4xl text-white font-medium max-w-4xl mx-auto leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          We spend our days guiding companies 
          <br />
          through our 3-step{' '}
          <span className="text-green-400">AI Transformation</span>{' '}
          Journey.
        </motion.h2>
      </div>
    </div>
  );
};

export const AIJourneySection: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const [activeStep, setActiveStep] = useState<JourneyStep>('identify');
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Handle scrolling to specific sections
  const scrollToSection = (step: JourneyStep) => {
    const section = document.getElementById(`journey-${step}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Navigation sidebar - changed from fixed to sticky */}
      <div className="absolute left-10 md:left-20 top-1/2 -translate-y-1/2 space-y-4 text-gray-500 z-20">
        {(['identify', 'educate', 'develop'] as JourneyStep[]).map((step) => (
          <button
            key={step}
            onClick={() => {
              setActiveStep(step);
              scrollToSection(step);
            }}
            className={`block uppercase text-sm tracking-widest transition-colors duration-300 cursor-pointer ${activeStep === step ? 'text-white' : ''}`}
          >
            {step}
          </button>
        ))}
      </div>

      {/* Intro section */}
      <IntroSection />

      {/* Individual sections */}
      <JourneyStepSection 
        step="identify" 
        isActive={activeStep === 'identify'} 
        onInView={() => setActiveStep('identify')}
      />
      
      <JourneyStepSection 
        step="educate" 
        isActive={activeStep === 'educate'} 
        onInView={() => setActiveStep('educate')}
      />
      
      <JourneyStepSection 
        step="develop" 
        isActive={activeStep === 'develop'} 
        onInView={() => setActiveStep('develop')}
      />
    </div>
  );
};
