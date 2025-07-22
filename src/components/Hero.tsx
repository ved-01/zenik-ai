import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

const animatedWords = ['Education', 'Business', 'Development'];

const wordAnimation: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.03,
      delayChildren: 0.1
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1,
    },
  },
};

const letterAnimation: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.4,
      ease: [0.4, 0.0, 0.2, 1]
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { 
      duration: 0.2,
      ease: [0.4, 0.0, 0.6, 1]
    },
  },
};

export function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % animatedWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentWord = animatedWords[currentWordIndex];

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="relative h-full max-w-screen-xl mx-auto px-4 flex items-center justify-center md:px-8">
        <div className="space-y-5 max-w-3xl mx-auto text-center">
          
          <div className="flex flex-col items-center">
            <span className="block text-6xl md:text-7xl lg:text-8xl text-gray-300 font-normal tracking-tight leading-tight">
              We are not an AI
            </span>
            
            <div className="h-20 md:h-24 lg:h-32 flex items-center justify-center my-4 md:my-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentWord}
                  variants={wordAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="text-6xl md:text-7xl lg:text-8xl text-emerald-400 font-normal tracking-tight italic"
                  style={{
                    fontFamily: '"DM Mono", monospace',
                    fontStyle: 'italic',
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    perspective: 1000,
                  }}
                >
                  {currentWord.split('').map((letter, idx) => (
                    <motion.span
                      key={`${currentWord}-${idx}`}
                      variants={letterAnimation}
                      className="inline-block"
                      style={{
                        willChange: 'transform',
                        backfaceVisibility: 'hidden',
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
            
            <span className="block text-6xl md:text-7xl lg:text-8xl text-gray-300 font-normal tracking-tight leading-tight mb-6 md:mb-8">
              Company
            </span>
            <span className="block text-xl md:text-2xl text-gray-400 font-normal tracking-tight leading-tight">
              We are all of the above.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
