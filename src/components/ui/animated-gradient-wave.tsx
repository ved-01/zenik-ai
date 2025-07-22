import React from "react";
import { motion } from "framer-motion";

export const GradientWave = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Large sweeping wave */}
      <motion.div
        className="absolute w-[200vw] h-[200vh] opacity-[0.16]"
        style={{
          background: "radial-gradient(circle at 60% 40%, rgba(37, 197, 34, 0.7) 0%, rgba(22, 163, 74, 0.51) 30%, rgba(0,0,0,0.8) 70%)",
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
        className="absolute w-[150vw] h-[150vh] opacity-[0.11]"
        style={{
          background: "conic-gradient(from 180deg at 30% 70%, rgba(16,185,129,0.6) 0%, rgba(5,150,105,0.3) 45%, rgba(17,24,39,0.8) 75%)",
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
        className="absolute w-[100vw] h-[100vh] opacity-[0.06]"
        style={{
          background: "linear-gradient(45deg, rgba(34,197,94,0.8) 0%, rgba(16,185,129,0.6) 25%, rgba(74,222,128,0.7) 0%, rgba(34,197,94,0.3) 35%, rgba(31,41,55,0.8) 60%)",
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
