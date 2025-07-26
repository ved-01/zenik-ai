import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollIndicatorProps {
  sections: string[];
  currentSection: number;
  onSectionClick: (index: number) => void;
  className?: string;
}

export const ScrollIndicator = ({ 
  sections, 
  currentSection, 
  onSectionClick, 
  className 
}: ScrollIndicatorProps) => {
  return (
    <div className={cn(
      "fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-3",
      className
    )}>
      {sections.map((section, index) => (
        <motion.button
          key={section}
          onClick={() => onSectionClick(index)}
          className={cn(
            "w-3 h-3 rounded-full border-2 transition-all duration-300",
            "hover:scale-125 focus:outline-none focus:ring-2 focus:ring-primary/50",
            currentSection === index
              ? "bg-primary border-primary shadow-glow"
              : "bg-transparent border-muted-foreground/30 hover:border-primary/50"
          )}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <span className="sr-only">{section}</span>
        </motion.button>
      ))}
    </div>
  );
}; 