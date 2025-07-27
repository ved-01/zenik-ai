import { useEffect, useRef, useState, useCallback } from 'react';

interface UseScrollSnapOptions {
  sections: string[];
  duration?: number;
  threshold?: number;
}

export const useScrollSnap = ({ 
  sections, 
  duration = 1200, // Increased from 800ms to 1200ms for slower scrolling
  threshold = 80   // Increased from 50px to 80px for less sensitive touch scrolling
}: UseScrollSnapOptions) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const lastScrollTime = useRef(0);

  // Debounced scroll handler to prevent rapid firing
  const debouncedScrollHandler = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
      if (containerRef.current) {
        containerRef.current.classList.remove('scrolling');
      }
    }, 200); // Increased from 100ms to 200ms for slower scroll recovery
  }, []);

  // Smooth scroll to specific section
  const scrollToSection = useCallback((sectionIndex: number) => {
    console.log("scrollToSection called with index:", sectionIndex);
    if (!containerRef.current || isScrolling) {
      console.log("Scroll blocked - container:", !!containerRef.current, "isScrolling:", isScrolling);
      return;
    }
    
    const targetSection = containerRef.current.children[sectionIndex] as HTMLElement;
    if (!targetSection) {
      console.log("Target section not found for index:", sectionIndex);
      return;
    }

    setIsScrolling(true);
    setCurrentSection(sectionIndex);
    
    if (containerRef.current) {
      containerRef.current.classList.add('scrolling');
    }

    const startPosition = containerRef.current.scrollTop;
    const targetPosition = targetSection.offsetTop;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeInOutCubic = (t: number) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };
      
      const easedProgress = easeInOutCubic(progress);
      const newPosition = startPosition + distance * easedProgress;
      
      if (containerRef.current) {
        containerRef.current.scrollTop = newPosition;
      }

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        setIsScrolling(false);
        if (containerRef.current) {
          containerRef.current.classList.remove('scrolling');
        }
        debouncedScrollHandler();
      }
    };

    requestAnimationFrame(animateScroll);
  }, [duration, isScrolling, debouncedScrollHandler]);

  // Handle wheel events for controlled scrolling
  const handleWheel = useCallback((e: WheelEvent) => {
    console.log("Wheel event detected:", e.deltaY);
    e.preventDefault();
    
    const now = Date.now();
    if (now - lastScrollTime.current < 200) { // Increased from 100ms to 200ms to slow down wheel scrolling
      console.log("Rapid scrolling prevented");
      return; // Prevent rapid scrolling
    }
    lastScrollTime.current = now;

    const direction = e.deltaY > 0 ? 1 : -1;
    const nextSection = Math.max(0, Math.min(sections.length - 1, currentSection + direction));
    
    console.log("Current section:", currentSection, "Next section:", nextSection, "Direction:", direction);
    
    if (nextSection !== currentSection) {
      console.log("Scrolling to section:", nextSection);
      scrollToSection(nextSection);
    }
  }, [currentSection, sections.length, scrollToSection]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isScrolling) return;
    
    let nextSection = currentSection;
    
    switch (e.key) {
      case 'ArrowDown':
      case 'PageDown':
      case ' ':
        e.preventDefault();
        nextSection = Math.min(sections.length - 1, currentSection + 1);
        break;
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault();
        nextSection = Math.max(0, currentSection - 1);
        break;
      case 'Home':
        e.preventDefault();
        nextSection = 0;
        break;
      case 'End':
        e.preventDefault();
        nextSection = sections.length - 1;
        break;
      default:
        return;
    }
    
    if (nextSection !== currentSection) {
      scrollToSection(nextSection);
    }
  }, [currentSection, sections.length, isScrolling, scrollToSection]);

  // Handle touch events for mobile
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    touchEndY.current = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY.current;
    
    if (Math.abs(diff) > threshold) {
      const direction = diff > 0 ? 1 : -1;
      const nextSection = Math.max(0, Math.min(sections.length - 1, currentSection + direction));
      
      if (nextSection !== currentSection) {
        scrollToSection(nextSection);
      }
    }
  }, [currentSection, sections.length, threshold, scrollToSection]);

  // Set up event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Prevent default scroll behavior
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('keydown', handleKeyDown);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('keydown', handleKeyDown);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleWheel, handleKeyDown, handleTouchStart, handleTouchEnd]);

  // Initialize scroll position
  useEffect(() => {
    if (containerRef.current && currentSection === 0) {
      containerRef.current.scrollTop = 0;
    }
  }, [currentSection]);

  return {
    containerRef,
    currentSection,
    isScrolling,
    scrollToSection,
    setCurrentSection
  };
}; 