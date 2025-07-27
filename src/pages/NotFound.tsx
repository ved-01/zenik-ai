import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search } from "lucide-react";
import { GradientWave } from "@/components/ui/animated-gradient-wave";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient wave */}
      <GradientWave />
      
      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* 404 Number */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
              404
            </h1>
          </motion.div>

          {/* Decorative line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 mx-auto mb-8 rounded-full"
          />

          {/* Main heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-semibold text-foreground mb-6"
          >
            Page Not Found
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            className="text-lg text-muted-foreground mb-8 leading-relaxed"
          >
            The page you're looking for doesn't exist or has been moved. 
            Don't worry, you can always find your way back to explore our AI solutions.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              size="lg"
              className="group bg-background/50 backdrop-blur-sm border-border hover:bg-background/80 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Go Back
            </Button>
            
            <Button
              onClick={() => window.location.href = '/'}
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </Button>
          </motion.div>

          {/* Additional help text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
            className="mt-12 p-6 bg-card/50 backdrop-blur-sm border border-border rounded-2xl"
          >
            <div className="flex items-center justify-center mb-3">
              <Search className="w-5 h-5 text-muted-foreground mr-2" />
              <span className="text-sm font-medium text-foreground">Need help finding something?</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Try navigating to our main sections: AI Education, Business Solutions, or Custom Development
            </p>
          </motion.div>

          {/* Keyboard shortcut hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
            className="mt-6"
          >
            <p className="text-xs text-muted-foreground">
              Press <kbd className="px-2 py-1 bg-muted border border-border rounded text-xs font-mono">⌘</kbd> + <kbd className="px-2 py-1 bg-muted border border-border rounded text-xs font-mono">R</kbd> to refresh or <kbd className="px-2 py-1 bg-muted border border-border rounded text-xs font-mono">⌘</kbd> + <kbd className="px-2 py-1 bg-muted border border-border rounded text-xs font-mono">L</kbd> to go home
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
