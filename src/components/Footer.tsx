import { useContactForm } from '@/contexts/ContactFormContext';

export function Footer() {
  const { openForm } = useContactForm();

  return (
    <footer className="h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Top left corner text */}
      <div className="absolute top-8 left-8 z-10 p-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal tracking-tight leading-tight bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text animate-gradient">
          Accelerate your <span className="text-green-400">AI adoption</span> journey.
        </h2>
      </div>
      
      {/* Bottom Bar - positioned at the very bottom */}
      <div className="absolute bottom-0 left-0 right-0 py-8">
        <div className="pl-12">
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-col items-start gap-2">
              <div className="text-sm text-white">
                CONTACT
              </div>
              <div className="text-sm text-white">
                ved@zenik.com
              </div>
            </div>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={openForm}
                className="group relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-transparent border-2 border-white/30 rounded-full transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3),0_0_40px_rgba(255,255,255,0.2)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get in Touch
                  <svg 
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
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
              
              <button className="group relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-transparent border-2 border-white/30 rounded-full transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3),0_0_40px_rgba(255,255,255,0.2)]">
                <span className="relative z-10 flex items-center gap-2">
                  Explore More
                  <svg 
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
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

      {/* Terms and Privacy - Bottom Center */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="text-sm text-white hover:text-green-400 transition-colors duration-200">
            TERMS AND CONDITIONS
          </button>
          <button className="text-sm text-white hover:text-green-400 transition-colors duration-200">
            PRIVACY POLICY
          </button>
        </div>
      </div>

      {/* Social Media - Bottom Right */}
      <div className="absolute bottom-8 right-12">
        <div className="flex flex-col gap-2 items-end">
          <div className="text-sm text-white">
            FOLLOW US ON
          </div>
          <button className="text-sm text-white hover:text-green-400 transition-colors duration-200">
            X
          </button>
          <button className="text-sm text-white hover:text-green-400 transition-colors duration-200">
            LINKEDIN
          </button>
          <button className="text-sm text-white hover:text-green-400 transition-colors duration-200">
            INSTAGRAM
          </button>
        </div>
      </div>
    </footer>
  )
}