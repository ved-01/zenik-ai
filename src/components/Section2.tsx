import * as React from "react"

interface Section2Props extends React.HTMLAttributes<HTMLDivElement> {}

export const Section2: React.FC<Section2Props> = ({ 
  className,
  ...props 
}) => {
  return (
    <div 
      className={`relative h-screen overflow-hidden ${className || ''}`}
      {...props}
    >
      <div className="relative h-full max-w-screen-xl mx-auto px-4 flex items-center justify-center md:px-8">
        <div className="space-y-5 max-w-3xl mx-auto text-center">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-gray-400 font-normal tracking-tight leading-tight">
              We put AI at the center
            </h2>
            
            <div className="space-y-2">
              <p className="text-4xl md:text-5xl lg:text-6xl text-gray-400 font-normal tracking-tight leading-tight">
                of{' '}
                <span className="text-emerald-400">everything</span>
                {' '}we do.
              </p>
            </div>
            
            <div className="mt-12 md:mt-16 flex justify-center">
              <p className="text-xl md:text-2xl lg:text-2xl text-gray-500 font-normal tracking-tight leading-tight text-center">
                Your trusted partner in becoming an AI-first company.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
