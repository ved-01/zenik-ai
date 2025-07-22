import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  speed?: number
  direction?: 'up' | 'down'
}

export function ParallaxSection({ 
  children, 
  className, 
  speed = 0.5, 
  direction = 'up' 
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    direction === 'up' ? [`${speed * 100}px`, `-${speed * 100}px`] : [`-${speed * 100}px`, `${speed * 100}px`]
  )
  
  return (
    <motion.div 
      ref={ref}
      style={{ y }}
      className={cn("relative", className)}
    >
      {children}
    </motion.div>
  )
}