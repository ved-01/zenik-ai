// components/ui/ai-journey-intro.tsx
import React from "react";
import { motion } from "framer-motion";

export const AIJourneyIntroSection: React.FC = () => {
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
