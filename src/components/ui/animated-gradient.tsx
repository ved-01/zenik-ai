import { motion } from "framer-motion";

export const AnimatedGradient = () => {
  return (
    <motion.div
      className="absolute inset-0 z-0"
      style={{
        background: 'radial-gradient(circle at center, rgba(120,119,198,0.15) 0%, rgba(30,30,50,0.15) 25%, transparent 50%)',
        filter: 'blur(100px)',
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
        x: ['-25%', '25%', '-25%'],
        y: ['-15%', '15%', '-15%'],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
};

export const AnimatedGradientTwo = () => {
  return (
    <motion.div
      className="absolute inset-0 z-0"
      style={{
        background: 'radial-gradient(circle at center, rgba(147,51,234,0.15) 0%, rgba(79,70,229,0.15) 25%, transparent 50%)',
        filter: 'blur(100px)',
      }}
      animate={{
        scale: [1.2, 1, 1.2],
        opacity: [0.3, 0.5, 0.3],
        x: ['25%', '-25%', '25%'],
        y: ['15%', '-15%', '15%'],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
}; 