import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { cn } from "@/lib/utils";


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

// Custom wave animation styles
const waveTextStyle = {
  background: 'linear-gradient(90deg, #ffffff 0%, #e5e7eb 25%, #d1d5db 50%, #9ca3af 75%, #6b7280 100%)',
  backgroundSize: '400% 100%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: 'waveFlow 6s ease-in-out infinite',
};

// Add the keyframes to the document
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes waveFlow {
      0% {
        background-position: 0% 50%;
      }
      25% {
        background-position: 50% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      75% {
        background-position: 50% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
  `;
  document.head.appendChild(style);
}

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
    <>
      {/* Top-right fixed button */}
      <div className="fixed top-6 right-6 z-50">
        <button className="group relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-transparent border-2 border-white/30 rounded-full transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3),0_0_40px_rgba(255,255,255,0.2)]">
          <span className="relative z-10 flex items-center gap-2">
            Get In Touch
            <svg 
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M7 17l9.2-9.2M17 17V7H7"
              />
            </svg>
          </span>
        </button>
      </div>


      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <div className="relative h-full max-w-screen-xl mx-auto px-4 flex items-center justify-center md:px-8">
          <div className="space-y-5 max-w-3xl mx-auto text-center">
            <div className="flex flex-col items-center">
              <span
                className="block text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight leading-tight"
                style={waveTextStyle}
              >
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
              </div>

              <span
                className="block text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight leading-tight mb-6 md:mb-8"
                style={waveTextStyle}
              >
                Company
              </span>
              <span
                className="block text-xl md:text-2xl font-normal tracking-tight leading-tight"
                style={waveTextStyle}
              >
                We are all of the above.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
