import * as React from "react"

interface Section5Props extends React.HTMLAttributes<HTMLDivElement> {}

export const Section5: React.FC<Section5Props> = ({ 
  className,
  ...props 
}) => {
  return (
    <div 
      className={`relative h-screen overflow-hidden ${className || ''}`}
      {...props}
    >
      <div className="relative h-full max-w-screen-xl mx-auto px-4 flex items-center justify-center md:px-8">
        <div className="space-y-8 max-w-3xl mx-auto text-center">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-tight bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text animate-gradient">
              The best AI systems{' '}
            </h2>
            
            <div className="space-y-2">
              <p className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-tight bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text animate-gradient">
                are built{' '}
                <span className="text-green-400">side by side</span>.
              </p>
            </div>
          </div>
          
          {/* Button with white fill and black text on hover */}
          <div className="pt-8">
            <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-transparent border-2 border-white/30 rounded-full transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3),0_0_40px_rgba(255,255,255,0.2)]">
              <span className="relative z-10 flex items-center gap-2">
                Let's Partner Up
                <svg 
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M7 17l9.2-9.2M17 17V7H7"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
