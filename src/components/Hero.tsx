import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { cn } from "@/lib/utils";
import { useContactForm } from '@/contexts/ContactFormContext';
import FloatingContactButton from './FloatingContactButton';


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

// Fade morph animation variants for the hero content
const fadeMorphVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    filter: 'blur(10px)',
    y: 20,
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Stagger animation for hero elements
const heroElementVariants: Variants = {
  initial: {
    opacity: 0,
    y: 30,
    filter: 'blur(5px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { openForm } = useContactForm();

  useEffect(() => {
    // Trigger the fade morph animation after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % animatedWords.length);
    }, 3000);

    return () => {
      clearTimeout(timer)
      clearTimeout(interval)
    };
  }, []);
  
  const currentWord = animatedWords[currentWordIndex];

  return (
    <>
      {/* Top-right fixed button */}
      <FloatingContactButton />

      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <motion.div
          className="relative h-full max-w-screen-xl mx-auto px-4 flex items-center justify-center md:px-8"
          variants={fadeMorphVariants}
          initial="initial"
          animate={isVisible ? "animate" : "initial"}
        >
          <div className="space-y-5 max-w-3xl mx-auto text-center">
            <motion.div
              className="flex flex-col items-center space-y-4"
              variants={heroElementVariants}
            >
              <motion.span
                className="block text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight leading-tight bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text animate-gradient"
                variants={heroElementVariants}
              >
                We are not an AI
              </motion.span>

              <motion.div
                className="h-20 md:h-24 lg:h-32 flex items-center justify-center my-4 md:my-6"
                variants={heroElementVariants}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentWord}
                    variants={wordAnimation}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="text-6xl md:text-7xl lg:text-8xl text-green-400 font-normal tracking-tight italic"
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
              </motion.div>

              <motion.span
                className="block text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight leading-tight mb-6 md:mb-8 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text animate-gradient"
                variants={heroElementVariants}
              >
                Company
              </motion.span>
              <motion.span
                className="block text-xl md:text-2xl font-normal tracking-tight leading-tight bg-gradient-to-r from-white to-gray-500 text-transparent bg-clip-text animate-gradient pt-10"
                variants={heroElementVariants}
              >
                We are all of the above.
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
