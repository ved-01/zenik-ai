import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  speed?: number
  direction?: 'up' | 'down'
  offset?: ["start end", "end start"] | ["start start", "end end"] | ["start center", "end center"]
}

export function ParallaxSection({
  children,
  className,
  speed = 0.5,
  direction = 'up',
  offset = ["start end", "end start"] as const
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset
  })

  // Reduce the range of movement to make sure content stays more visible with snap
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' 
      ? [`${speed * 50}px`, `-${speed * 50}px`] 
      : [`-${speed * 50}px`, `${speed * 50}px`]
  )

  // Adjust the scale and opacity changes to be more subtle for snap scrolling
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98])
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.9, 1, 1, 0.9])

  return (
    <motion.div
      ref={ref}
      style={{ y, scale, opacity }}
      className={cn("will-change-transform h-full w-full flex items-center justify-center", className)}
    >
      {children}
    </motion.div>
  )
}
