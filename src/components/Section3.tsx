"use client";
import * as React from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Single circle component that morphs position and size
const MorphingCircle = ({ 
  id,
  scrollProgress,
  configurations
}: { 
  id: string;
  scrollProgress: any;
  configurations: Array<{ x: number; y: number; size: number; opacity: number }>;
}) => {
  // Adjusted timing to match text visibility - morphing happens earlier
  const x = useTransform(scrollProgress, [0, 0.33, 0.66, 1], [
    configurations[0].x,
    configurations[1].x,
    configurations[1].x,
    configurations[2].x
  ]);
  
  const y = useTransform(scrollProgress, [0, 0.33, 0.66, 1], [
    configurations[0].y,
    configurations[1].y,
    configurations[1].y,
    configurations[2].y
  ]);
  
  const size = useTransform(scrollProgress, [0, 0.33, 0.66, 1], [
    configurations[0].size,
    configurations[1].size,
    configurations[1].size,
    configurations[2].size
  ]);
  
  const opacity = useTransform(scrollProgress, [0, 0.33, 0.66, 1], [
    configurations[0].opacity,
    configurations[1].opacity,
    configurations[1].opacity,
    configurations[2].opacity
  ]);

  return (
    <motion.div
      className="absolute rounded-full bg-gradient-to-br from-emerald-300/20 to-teal-500/30 backdrop-blur-md border border-emerald-400/30 shadow-2xl"
      style={{
        x,
        y,
        width: size,
        height: size,
        opacity,
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      transition={{ 
        type: "spring",
        stiffness: 120,
        damping: 30
      }}
    />
  );
};

type JourneyStep = "identify" | "educate" | "develop";

const sections: JourneyStep[] = ["identify", "educate", "develop"];

const content = {
  identify: {
    title: "Identify",
    description:
      "We help you identify high-impact AI opportunities and build a step-by-step AI Transformation strategy to bring them to life.",
  },
  educate: {
    title: "Educate",
    description:
      "We train and support your team with the right tools and know-how to embed AI across your entire organization.",
  },
  develop: {
    title: "Develop",
    description:
      "We leverage our extensive experience and network to develop custom AI systems that are proven to move the needle inside your business.",
  },
};

export const AIJourneySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Text slide transform - matches circle timing exactly
  const x = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], ["0%", "-100%", "-100%", "-200%"]);

  // Circle configurations for each section [identify, educate, develop]
  const circleConfigurations = {
    circle1: [
      { x: 0, y: 0, size: 128, opacity: 1 },      // identify: center large
      { x: -160, y: 0, size: 80, opacity: 1 },   // educate: first in line
      { x: 0, y: 0, size: 72, opacity: 1 }       // develop: center
    ],
    circle2: [
      { x: 0, y: -100, size: 80, opacity: 1 },   // identify: top smaller
      { x: -80, y: 0, size: 80, opacity: 1 },    // educate: second in line
      { x: 0, y: -80, size: 72, opacity: 1 }     // develop: top
    ],
    circle3: [
      { x: 0, y: 0, size: 0, opacity: 0 },       // identify: hidden
      { x: 0, y: 0, size: 80, opacity: 1 },      // educate: third in line
      { x: -80, y: -40, size: 72, opacity: 1 }   // develop: top-left
    ],
    circle4: [
      { x: 0, y: 0, size: 0, opacity: 0 },       // identify: hidden
      { x: 80, y: 0, size: 80, opacity: 1 },     // educate: fourth in line
      { x: 80, y: -40, size: 72, opacity: 1 }    // develop: top-right
    ],
    circle5: [
      { x: 0, y: 0, size: 0, opacity: 0 },       // identify: hidden
      { x: 160, y: 0, size: 80, opacity: 1 },    // educate: fifth in line
      { x: -60, y: 60, size: 72, opacity: 1 }    // develop: bottom-left
    ],
    circle6: [
      { x: 0, y: 0, size: 0, opacity: 0 },       // identify: hidden
      { x: 0, y: 0, size: 0, opacity: 0 },       // educate: hidden
      { x: 60, y: 60, size: 72, opacity: 1 }     // develop: bottom-right
    ]
  };

  return (
    <section ref={containerRef} className="h-[350vh] relative w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 to-teal-900/10 pointer-events-none" />
        
        {/* Fixed morphing circles container */}
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Background glow */}
            <div className="absolute w-[500px] h-[500px] bg-gradient-radial from-emerald-400/8 via-teal-400/4 to-transparent rounded-full blur-3xl" />
            
            {/* Morphing circles */}
            <div className="relative w-96 h-96">
              <MorphingCircle 
                id="circle1" 
                scrollProgress={scrollYProgress} 
                configurations={circleConfigurations.circle1} 
              />
              <MorphingCircle 
                id="circle2" 
                scrollProgress={scrollYProgress} 
                configurations={circleConfigurations.circle2} 
              />
              <MorphingCircle 
                id="circle3" 
                scrollProgress={scrollYProgress} 
                configurations={circleConfigurations.circle3} 
              />
              <MorphingCircle 
                id="circle4" 
                scrollProgress={scrollYProgress} 
                configurations={circleConfigurations.circle4} 
              />
              <MorphingCircle 
                id="circle5" 
                scrollProgress={scrollYProgress} 
                configurations={circleConfigurations.circle5} 
              />
              <MorphingCircle 
                id="circle6" 
                scrollProgress={scrollYProgress} 
                configurations={circleConfigurations.circle6} 
              />
            </div>
          </div>
        </div>

        {/* Sliding text content */}
        <motion.div
          style={{ x }}
          className="flex h-full w-[300vw] relative z-20"
        >
          {sections.map((step, index) => (
            <div
              key={step}
              className="w-screen h-full flex flex-col items-center justify-center space-y-12 px-4"
            >
              {/* Text content */}
              <motion.div
                className="text-center space-y-6 mt-40"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
              >
                <h2 className="text-5xl md:text-6xl font-bold text-gray-300 tracking-tight">
                  {content[step].title}
                </h2>
                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                  {content[step].description}
                </p>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
