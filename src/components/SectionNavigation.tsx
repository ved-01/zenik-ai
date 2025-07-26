import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionNavigationProps {
  sections: string[];
  currentSection: number;
  onSectionClick: (index: number) => void;
  className?: string;
}

export const SectionNavigation = ({ 
  sections, 
  currentSection, 
  onSectionClick, 
  className 
}: SectionNavigationProps) => {
  const canGoUp = currentSection > 0;
  const canGoDown = currentSection < sections.length - 1;

  return (
    <div className={cn(
      "fixed left-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center gap-4",
      className
    )}>
      {/* Current section indicator */}
      <motion.div
        className="text-sm text-muted-foreground font-medium"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <span className="block text-xs uppercase tracking-wider mb-1">
          Section
        </span>
        <span className="block text-primary font-semibold">
          {currentSection + 1} / {sections.length}
        </span>
      </motion.div>

      {/* Navigation arrows */}
      <div className="flex flex-col gap-2">
        <motion.button
          onClick={() => canGoUp && onSectionClick(currentSection - 1)}
          className={cn(
            "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300",
            "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50",
            canGoUp
              ? "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              : "border-muted-foreground/20 text-muted-foreground/20 cursor-not-allowed"
          )}
          whileHover={canGoUp ? { scale: 1.1 } : {}}
          whileTap={canGoUp ? { scale: 0.9 } : {}}
          disabled={!canGoUp}
        >
          <ChevronUp size={16} />
        </motion.button>

        <motion.button
          onClick={() => canGoDown && onSectionClick(currentSection + 1)}
          className={cn(
            "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300",
            "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50",
            canGoDown
              ? "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              : "border-muted-foreground/20 text-muted-foreground/20 cursor-not-allowed"
          )}
          whileHover={canGoDown ? { scale: 1.1 } : {}}
          whileTap={canGoDown ? { scale: 0.9 } : {}}
          disabled={!canGoDown}
        >
          <ChevronDown size={16} />
        </motion.button>
      </div>

      {/* Section name */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          className="text-xs text-muted-foreground max-w-24 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {sections[currentSection]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}; 