import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import { GradientWave } from "./animated-gradient-wave"

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: {
    regular: string
    gradient: string
  }
  subtitleNode?: React.ReactNode
  description?: string
  ctaText?: string
  ctaHref?: string
  gridOptions?: {
    angle?: number
    cellSize?: number
    opacity?: number
    lightLineColor?: string
    darkLineColor?: string
  }
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    {
      className,
      title = "Build products for everyone",
      subtitle = {
        regular: "Designing your projects faster with ",
        gradient: "the largest figma UI kit.",
      },
      subtitleNode,
      description = "Sed ut perspiciatis unde omnis iste natus voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.",
      ctaText = "Browse courses",
      ctaHref = "#",
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn("relative h-screen overflow-hidden bg-background", className)} ref={ref} {...props}>
        <GradientWave />
        <div className="relative h-full max-w-screen-xl mx-auto px-4 flex items-center justify-center md:px-8">
          <div className="space-y-5 max-w-3xl mx-auto text-center">
            <h1 className="text-sm text-gray-400 group font-geist mx-auto px-5 py-2 bg-black/20 border-[2px] border-white/5 rounded-3xl w-fit">
              {title}
              <ChevronRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" />
            </h1>
            <h2 className="text-4xl tracking-tighter font-geist text-white/90 mx-auto md:text-6xl">
              {subtitleNode ? (
                subtitleNode
              ) : (
                <>
                  {subtitle.regular}
                  <span className="bg-gradient-to-r from-purple-400 to-orange-300 bg-clip-text text-transparent">
                    {subtitle.gradient}
                  </span>
                </>
              )}
            </h2>
            <p className="max-w-2xl mx-auto text-gray-400">
              {description}
            </p>
          </div>
        </div>
      </div>
    )
  },
)
HeroSection.displayName = "HeroSection"

export { HeroSection }
