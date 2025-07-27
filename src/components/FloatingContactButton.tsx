import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useContactForm } from '../contexts/ContactFormContext';

const FloatingContactButton = () => {
  const { openForm } = useContactForm();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const heroElementVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, },
  };

  return (
    <motion.div
      className="fixed top-6 right-6 z-50"
      variants={heroElementVariants}
      initial="initial"
      animate={isVisible ? "animate" : "initial"}
      transition={{ duration: 0.1 }}
    >
      <button
        onClick={openForm}
        className="group relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-transparent border-2 border-white/30 rounded-full transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3),0_0_40px_rgba(255,255,255,0.2)]"
      >
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
    </motion.div>
  );
};

export default FloatingContactButton;
