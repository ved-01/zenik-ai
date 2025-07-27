import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ScrollSnapLayout } from "../components/ScrollSnapLayout";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <ScrollSnapLayout>
      {/* Error Section */}
      <div className="snap-section" style={{ height: '100vh', scrollSnapAlign: 'start' }}>
        <motion.div 
          className="flex items-center justify-center h-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-center">
            <motion.h1 
              className="text-9xl font-bold mb-4 text-primary"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              404
            </motion.h1>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8"
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
          </div>
        </motion.div>
      </div>

      {/* Message Section */}
      <div className="snap-section" style={{ height: '100vh', scrollSnapAlign: 'start' }}>
        <motion.div 
          className="flex items-center justify-center h-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-center max-w-2xl px-6">
            <motion.h2 
              className="text-4xl font-bold mb-6 text-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Oops! Page not found
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              The page you're looking for doesn't exist or has been moved. 
              Don't worry, you can always find your way back home.
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Action Section */}
      <div className="snap-section" style={{ height: '100vh', scrollSnapAlign: 'start' }}>
        <motion.div 
          className="flex items-center justify-center h-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-center">
            <motion.a 
              href="/" 
              className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg 
                className="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                />
              </svg>
              Return to Home
            </motion.a>
            <motion.p 
              className="text-sm text-muted-foreground mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Or use your keyboard: Press <kbd className="px-2 py-1 bg-muted rounded text-xs">Home</kbd> to go to the top
            </motion.p>
          </div>
        </motion.div>
      </div>
    </ScrollSnapLayout>
  );
};

export default NotFound;
