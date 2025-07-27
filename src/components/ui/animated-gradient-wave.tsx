import React from "react";
import { motion } from "framer-motion";

export const GradientWave = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large sweeping wave */}
      <motion.div
        className="absolute w-[200vw] h-[200vh] opacity-[0.25]"
        style={{
          background: "radial-gradient(circle at 60% 40%, rgba(74, 222, 128, 0.4) 0%, rgba(34, 197, 94, 0.3) 30%, rgba(0,0,0,0.99) 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [-200, 200, -200],
          y: [-100, 100, -100],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Medium flowing elements */}
      <motion.div
        className="absolute w-[150vw] h-[150vh] opacity-[0.18]"
        style={{
          background: "conic-gradient(from 180deg at 30% 70%, rgba(74, 222, 128,0.3) 0%, rgba(34, 197, 94,0.2) 45%, rgba(0,0,0,0.99) 75%)",
          filter: "blur(60px)",
        }}
        animate={{
          rotate: [0, 360],
          x: [100, -100, 100],
          y: [50, -50, 50],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Small accent waves */}
      <motion.div
        className="absolute w-[100vw] h-[100vh] opacity-[0.12]"
        style={{
          background: "linear-gradient(45deg, rgba(74,222,128,0.4) 0%, rgba(34,197,94,0.3) 25%, rgba(74,222,128,0.4) 50%, rgba(34,197,94,0.2) 75%, rgba(0,0,0,0.99) 100%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};
