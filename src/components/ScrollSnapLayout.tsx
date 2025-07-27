import React, { useRef, useEffect } from 'react';

interface ScrollSnapLayoutProps {
  children: React.ReactNode;
  sections?: string[];
  className?: string;
}

export const ScrollSnapLayout: React.FC<ScrollSnapLayoutProps> = ({ 
  children, 
  sections = ['content'],
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout>();

  // Prevent rapid scrolling that could cause multiple page jumps
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isScrolling.current) return;
      
      isScrolling.current = true;
      
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false;
      }, 150); // Debounce scroll events
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Scroll snap container - CSS only, no JavaScript interference */}
      <div 
        ref={containerRef}
        className={`snap-container relative z-10 ${className}`}
        style={{ 
          height: '100vh', 
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'smooth',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {children}
      </div>
    </div>
  );
}; 