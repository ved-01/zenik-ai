import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import logoSvg from "../assets/logo.svg";

// Your actual logo component using the SVG file
const Logo = ({ className, style }: { className: string; style?: React.CSSProperties }) => (
  <img
    src={logoSvg}
    alt="Zenik AI Logo"
    className={className}
    style={style}
  />
);

export const IntroAnimation = ({ onAnimationComplete }: { onAnimationComplete?: () => void }) => {
  const [animationStage, setAnimationStage] = useState(0);
  const [showAnimation, setShowAnimation] = useState(true);

  // Always show animation on page load
  useEffect(() => {
    // Prevent scrolling during the intro animation
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Variants for the main container that moves from center to top-left
  const containerVariants: Variants = {
    initial: {
      top: '50%',
      left: '50%',
      x: '-50%',
      y: '-50%',
      scale: 1, // Keep original size during text reveal
    },
    moveToTopLeft: {
      top: '-8px',
      left: '-8px',
      x: '0%',
      y: '0%',
      scale: 0.5, // Only scale down when moving to navbar
      transition: {
        duration: 1.6,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  // Variants for the text reveal animation
  const textRevealVariants: Variants = {
    hidden: {
      width: 0,
      opacity: 0,
    },
    visible: {
      width: "100%",
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.65, 0, 0.35, 1],
        delay: 1.0,
      },
    },
  };

  // Variants for the logo container to orchestrate the unfolding
  const logoContainerVariants: Variants = {
    hidden: {},
    visible: {
      scale: 1.35,
      transition: {
        staggerChildren: 0.35,
      },
    },
  };

  // Variants for the unfolding panels
  const panelVariants: Variants = {
    hidden: {
      rotateY: 180,
      opacity: 0,
    },
    visible: {
      rotateY: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeInOut',
      },
    },
  };

  // Handle text animation completion - this triggers the move to navbar
  const handleTextAnimationComplete = () => {
    setTimeout(() => {
      setAnimationStage(1); // Move to navbar position with scaling
    }, 300);
  };

  // Handle position animation completion - this triggers the final fade out
  const handlePositionAnimationComplete = () => {
    setTimeout(() => {
      setAnimationStage(2); // Start fade out
    }, 800);
  };

  // Handle final fade out completion
  const handleFinalFadeComplete = () => {
    // Re-enable scrolling
    document.body.style.overflow = "auto";
    if (onAnimationComplete) {
      onAnimationComplete();
    }
    setShowAnimation(false);
  };

  if (!showAnimation) return null;

  return (
    <AnimatePresence>
      {showAnimation && (
        <motion.div
          className="fixed inset-0 z-[100] bg-background"
          initial={{ opacity: 1 }}
          animate={{ opacity: animationStage === 2 ? 0 : 1 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={() => {
            if (animationStage === 2) {
              handleFinalFadeComplete();
            }
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut"
          }}
        >
          {/* 3D Unfolding Logo Structure - Stays large during text reveal */}
          <motion.div
            className="fixed z-50 flex items-center gap-8"
            variants={containerVariants}
            initial="initial"
            animate={animationStage >= 1 ? 'moveToTopLeft' : 'initial'}
            onAnimationComplete={(definition) => {
              if (definition === 'moveToTopLeft') {
                handlePositionAnimationComplete();
              }
            }}
          >
            <motion.div
              className="relative h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28"
              style={{ perspective: '800px' }}
              variants={logoContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Panel 1 (Left third) */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full"
                style={{ clipPath: 'polygon(0 0, 33.33% 0, 33.33% 100%, 0% 100%)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
              >
                <Logo className="h-full w-full object-contain" style={{}} />
              </motion.div>

              {/* Panel 2 (Middle third) */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  clipPath: 'polygon(33.33% 0, 66.66% 0, 66.66% 100%, 33.33% 100%)',
                  transformOrigin: '33.33% 50%',
                }}
                variants={panelVariants}
              >
                <Logo className="h-full w-full object-contain" style={{}} />
              </motion.div>

              {/* Panel 3 (Right third) */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  clipPath: 'polygon(66.66% 0, 100% 0, 100% 100%, 66.66% 100%)',
                  transformOrigin: '66.66% 50%',
                }}
                variants={panelVariants}
              >
                <Logo className="h-full w-full object-contain" style={{}} />
              </motion.div>
            </motion.div>

            <motion.div className="flex items-center justify-center gap-10">
              {/* Text reveal container - Appears while logo stays large */}
              <motion.div
                className="overflow-hidden"
                variants={textRevealVariants}
                initial="hidden"
                animate="visible"
                onAnimationComplete={handleTextAnimationComplete}
              >
                <h1 className="text-[32px] md:text-[48px] font-normal tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-green-400 animate-gradient whitespace-nowrap text-lg">
                  zenik
                </h1>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
