import React from 'react'
// import { HeroSection } from '@/components/ui/hero-section-dark'
import { motion } from 'framer-motion'

const partnerLogos = [
    { id: 1, name: "Google", logo: "src/assets/google.png" },
    { id: 2, name: "Amazon", logo: "src/assets/Amazon.png" }
  ]
export function InfiniteLogoCarousel() {
      const duplicatedLogos = [...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos]
  
  return (
    <div className="py-12 bg-dark overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          The best AI systems{' '}
          <span className="text-green-400">are built side by side.</span>
        </h2>
      </div>
      
      <motion.div
        className="flex"
        animate={{
          x: [0, -1920], // Adjust based on total width
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        }}
      >
        {duplicatedLogos.map((partner, index) => (
          <div
            key={`${partner.id}-${index}`}
            className="flex items-center justify-center mx-8 h-16 w-32 flex-shrink-0"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </motion.div>
      
      <div className="text-center mt-12">
        <button className="bg-transparent border border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300">
          Let's Partner Up →
        </button>
      </div>
    </div>
  )
}
