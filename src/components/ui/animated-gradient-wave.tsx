import React from "react";
import { motion } from "framer-motion";

export const GradientWave = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Large sweeping wave */}
      <motion.div
        className="absolute w-[200vw] h-[200vh] opacity-[0.08]"
        style={{
          background: "radial-gradient(circle at 60% 40%, rgba(34,197,94,0.7) 0%, rgba(22,163,74,0.35) 30%, rgba(0,0,0,0.8) 70%)",
          filter: "blur(80px)",
          top: "-50%",
          left: "-50%",
        }}
        animate={{
          x: ["0%", "25%", "-25%", "0%"],
          y: ["0%", "-25%", "25%", "0%"],
          scale: [1, 1.2, 0.9, 1],
          rotate: [0, 90, 180, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Slower moving larger wave */}
      <motion.div
        className="absolute w-[200vw] h-[200vh] opacity-[0.04]"
        style={{
          background: "radial-gradient(circle at 30% 70%, rgba(16,185,129,0.6) 0%, rgba(5,150,105,0.3) 45%, rgba(17,24,39,0.8) 75%)",
          filter: "blur(100px)",
          top: "-50%",
          left: "-50%",
        }}
        animate={{
          x: ["25%", "-25%", "25%"],
          y: ["-15%", "15%", "-15%"],
          scale: [1.1, 0.9, 1.1],
          rotate: [45, 225, 405],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Fast moving accent wave */}
      <motion.div
        className="absolute w-[200vw] h-[200vh] opacity-[0.02]"
        style={{
          background: "radial-gradient(circle at 80% 80%, rgba(74,222,128,0.7) 0%, rgba(34,197,94,0.3) 35%, rgba(31,41,55,0.8) 60%)",
          filter: "blur(60px)",
          top: "-50%",
          left: "-50%",
        }}
        animate={{
          x: ["-25%", "25%", "-25%"],
          y: ["15%", "-15%", "15%"],
          scale: [0.9, 1.1, 0.9],
          rotate: [-45, -225, -405],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};
