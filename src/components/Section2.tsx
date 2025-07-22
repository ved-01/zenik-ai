import * as React from "react"
import { GradientWave } from "./ui/animated-gradient-wave" // Adjust path if needed

interface Section2Props extends React.HTMLAttributes<HTMLDivElement> {
  gridOptions?: {
    angle?: number
    cellSize?: number
    opacity?: number
    lightLineColor?: string
    darkLineColor?: string
  }
}

export const Section2: React.FC<Section2Props> = ({ 
  className,
  gridOptions = {
    angle: 65,
    opacity: 0.4,
    cellSize: 50,
    lightLineColor: '#4a4a4a',
    darkLineColor: '#2a2a2a',
  },
  ...props 
}) => {
  return (
    <div 
      className={`relative h-screen overflow-hidden bg-background ${className || ''}`}
      {...props}
    >
      {/* Same GradientWave background as Hero */}
      <GradientWave />
      
      <div className="relative h-full max-w-screen-xl mx-auto px-4 flex items-center justify-center md:px-8">
        <div className="space-y-5 max-w-3xl mx-auto text-center">
          <div className="space-y-4">
            <h2 className="text-6xl md:text-7xl lg:text-8xl text-gray-300 font-normal tracking-tight leading-tight">
              We put AI at the center
            </h2>
            
            <div className="space-y-2">
              <p className="text-6xl md:text-7xl lg:text-8xl text-gray-300 font-normal tracking-tight leading-tight">
                of{' '}
                <span className="text-emerald-400">everything</span>
                {' '}we do.
              </p>
            </div>
            
            <div className="mt-8 md:mt-12">
              <p className="text-xl md:text-2xl text-gray-400 font-normal tracking-tight leading-tight">
                Your trusted partner in becoming an AI-first company.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
