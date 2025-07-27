import React, { useRef, useEffect, useState, ReactNode, useMemo, MouseEvent, CSSProperties } from 'react';

// --- Internal Helper Components (Not exported) --- //

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="3"
    strokeLinecap="round" strokeLinejoin="round"
    className={className}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

interface RippleState {
  key: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

interface RippleButtonProps {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
  variant?: 'default' | 'hover' | 'ghost' | 'hoverborder';
  rippleColor?: string;
  rippleDuration?: number;
  hoverBaseColor?: string;
  hoverRippleColor?: string;
  hoverBorderEffectColor?: string;
  hoverBorderEffectThickness?: string;
}

const hexToRgba = (hex: string, alpha: number): string => {
  let hexValue = hex.startsWith('#') ? hex.slice(1) : hex;
  if (hexValue.length === 3) {
    hexValue = hexValue.split('').map(char => char + char).join('');
  }
  const r = parseInt(hexValue.slice(0, 2), 16);
  const g = parseInt(hexValue.slice(2, 4), 16);
  const b = parseInt(hexValue.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const GRID_HOVER_NUM_COLS = 36;
const GRID_HOVER_NUM_ROWS = 12;
const GRID_HOVER_TOTAL_CELLS = GRID_HOVER_NUM_COLS * GRID_HOVER_NUM_ROWS;
const GRID_HOVER_RIPPLE_EFFECT_SIZE = "18.973665961em";

const JS_RIPPLE_KEYFRAMES = `
  @keyframes js-ripple-animation {
    0% { transform: scale(0); opacity: 1; }
    100% { transform: scale(1); opacity: 0; }
  }
  .animate-js-ripple-effect {
    animation: js-ripple-animation var(--ripple-duration) ease-out forwards;
  }
`;

const RippleButton: React.FC<RippleButtonProps> = ({
  children,
  onClick,
  className = '',
  disabled = false,
  variant = 'default',
  rippleColor: userProvidedRippleColor,
  rippleDuration = 600,
  hoverBaseColor = '#6996e2',
  hoverRippleColor: customHoverRippleColor,
  hoverBorderEffectColor = '#6996e277',
  hoverBorderEffectThickness = '0.3em',
}) => {
  const [jsRipples, setJsRipples] = useState<RippleState[]>([]);

  const determinedJsRippleColor = useMemo(() => {
    if (userProvidedRippleColor) {
      return userProvidedRippleColor;
    }
    return 'var(--button-ripple-color, rgba(0, 0, 0, 0.1))';
  }, [userProvidedRippleColor]);

  const dynamicGridHoverStyles = useMemo(() => {
    let nthChildHoverRules = '';
    const cellDim = 0.25;
    const initialTopOffset = 0.125;
    const initialLeftOffset = 0.1875;
    const hoverEffectDuration = '0.9s';

    for (let r = 0; r < GRID_HOVER_NUM_ROWS; r++) {
      for (let c = 0; c < GRID_HOVER_NUM_COLS; c++) {
        const childIndex = r * GRID_HOVER_NUM_COLS + c + 1;
        const topPos = initialTopOffset + r * cellDim;
        const leftPos = initialLeftOffset + c * cellDim;

        if (variant === 'hover') {
          nthChildHoverRules += `
            .hover-variant-grid-cell:nth-child(${childIndex}):hover ~ .hover-variant-visual-ripple {
              top: ${topPos}em; left: ${leftPos}em;
              transition: width ${hoverEffectDuration} ease, height ${hoverEffectDuration} ease, top 0s linear, left 0s linear;
            }`;
        } else if (variant === 'hoverborder') {
          nthChildHoverRules += `
            .hoverborder-variant-grid-cell:nth-child(${childIndex}):hover ~ .hoverborder-variant-visual-ripple {
              top: ${topPos}em; left: ${leftPos}em;
              transition: width ${hoverEffectDuration} ease-out, height ${hoverEffectDuration} ease-out, top 0s linear, left 0s linear;
            }`;
        }
      }
    }

    if (variant === 'hover') {
      const actualHoverRippleColor = customHoverRippleColor
        ? customHoverRippleColor
        : hexToRgba(hoverBaseColor, 0.466);
      return `
        .hover-variant-visual-ripple {
          background-color: ${actualHoverRippleColor};
          transition: width ${hoverEffectDuration} ease, height ${hoverEffectDuration} ease, top 99999s linear, left 99999s linear;
        }
        .hover-variant-grid-cell:hover ~ .hover-variant-visual-ripple {
          width: ${GRID_HOVER_RIPPLE_EFFECT_SIZE}; height: ${GRID_HOVER_RIPPLE_EFFECT_SIZE};
        }
        ${nthChildHoverRules}
      `;
    } else if (variant === 'hoverborder') {
      return `
        .hoverborder-variant-ripple-container {
          padding: ${hoverBorderEffectThickness};
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
        }
        .hoverborder-variant-visual-ripple {
          background-color: ${hoverBorderEffectColor};
          transition: width ${hoverEffectDuration} ease-out, height ${hoverEffectDuration} ease-out, top 99999s linear, left 9999s linear;
        }
        .hoverborder-variant-grid-cell:hover ~ .hoverborder-variant-visual-ripple {
          width: ${GRID_HOVER_RIPPLE_EFFECT_SIZE}; height: ${GRID_HOVER_RIPPLE_EFFECT_SIZE};
        }
        ${nthChildHoverRules}
      `;
    }
    return '';
  }, [variant, hoverBaseColor, customHoverRippleColor, hoverBorderEffectColor, hoverBorderEffectThickness]);

  const createJsRipple = (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    const newRipple: RippleState = { key: Date.now(), x, y, size, color: determinedJsRippleColor };
    setJsRipples(prev => [...prev, newRipple]);
    setTimeout(() => {
      setJsRipples(currentRipples => currentRipples.filter(r => r.key !== newRipple.key));
    }, rippleDuration);
  };

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      createJsRipple(event);
      if (onClick) onClick(event);
    }
  };

  const jsRippleElements = (
    <div className="absolute inset-0 pointer-events-none z-[5]">
      {jsRipples.map(ripple => (
        <span
          key={ripple.key}
          className="absolute rounded-full animate-js-ripple-effect"
          style={{
            left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size,
            backgroundColor: ripple.color,
            ['--ripple-duration' as any]: `${rippleDuration}ms`,
          } as CSSProperties}
        />
      ))}
    </div>
  );

  if (variant === 'hover') {
    const hoverButtonFinalClassName = [
      "relative", "rounded-lg", "text-lg", "px-4", "py-2",
      "border-none", "bg-transparent", "isolate", "overflow-hidden", "cursor-pointer",
      disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "",
      className,
    ].filter(Boolean).join(" ");
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: JS_RIPPLE_KEYFRAMES }} />
        <style dangerouslySetInnerHTML={{ __html: dynamicGridHoverStyles }} />
        <button className={hoverButtonFinalClassName} onClick={handleButtonClick} disabled={disabled}>
          <span className="relative z-[10] pointer-events-none">{children}</span>
          {jsRippleElements}
          <div
            className="hover-variant-grid-container absolute inset-0 grid overflow-hidden pointer-events-none z-[0]"
            style={{ gridTemplateColumns: `repeat(${GRID_HOVER_NUM_COLS}, 0.25em)` }}
          >
            {Array.from({ length: GRID_HOVER_TOTAL_CELLS }, (_, index) => (
              <span key={index} className="hover-variant-grid-cell relative flex justify-center items-center pointer-events-auto" />
            ))}
            <div className="hover-variant-visual-ripple pointer-events-none absolute w-0 h-0 rounded-full transform -translate-x-1/2 -translate-y-1/2 top-0 left-0 z-[-1]" />
          </div>
        </button>
      </>
    );
  }

  if (variant === 'hoverborder') {
    const hoverBorderButtonFinalClassName = [
      "relative", "rounded-lg", "overflow-hidden", "text-lg", "px-4", "py-2",
      "border-none", "bg-transparent", "isolate", "cursor-pointer",
      disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "",
      className,
    ].filter(Boolean).join(" ");

    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: JS_RIPPLE_KEYFRAMES }} />
        <style dangerouslySetInnerHTML={{ __html: dynamicGridHoverStyles }} />
        <button
          className={hoverBorderButtonFinalClassName}
          onClick={handleButtonClick}
          disabled={disabled}
        >
          <span className="relative z-[10] pointer-events-none">{children}</span>
          {jsRippleElements}
          <div
            className="hoverborder-variant-ripple-container absolute inset-0 grid rounded-[0.8em] overflow-hidden pointer-events-none z-[0]"
            style={{ gridTemplateColumns: `repeat(${GRID_HOVER_NUM_COLS}, 0.25em)` }}
          >
            {Array.from({ length: GRID_HOVER_TOTAL_CELLS }, (_, index) => (
              <span
                key={index}
                className="hoverborder-variant-grid-cell relative flex justify-center items-center pointer-events-auto"
              />
            ))}
            <div className="hoverborder-variant-visual-ripple pointer-events-none absolute w-0 h-0 rounded-full transform -translate-x-1/2 -translate-y-1/2 top-0 left-0 z-[-1]" />
          </div>
        </button>
      </>
    );
  }

  if (variant === 'ghost') {
    const ghostButtonFinalClassName = [
      "relative", "border-none", "bg-transparent", "isolate", "overflow-hidden", "cursor-pointer",
      "px-4", "py-2", "rounded-lg", "text-lg",
      disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "",
      className,
    ].filter(Boolean).join(" ");
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: JS_RIPPLE_KEYFRAMES }} />
        <button className={ghostButtonFinalClassName} onClick={handleButtonClick} disabled={disabled}>
          <span className="relative z-10 pointer-events-none">{children}</span>
          {jsRippleElements}
        </button>
      </>
    );
  }

  // Default variant
  const baseClasses = "relative border-none overflow-hidden isolate transition-all duration-200 cursor-pointer px-4 py-2 bg-blue-600 hover:opacity-90 text-white rounded-lg";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";
  const buttonClasses = `${baseClasses} ${disabledClasses} ${className}`;
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: JS_RIPPLE_KEYFRAMES }} />
      <button className={buttonClasses} onClick={handleButtonClick} disabled={disabled}>
        <span className="relative z-[1] pointer-events-none">{children}</span>
        {jsRippleElements}
      </button>
    </>
  );
};

export interface PricingCardProps {
  planName: string;
  description: string;
  price: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  buttonVariant?: 'primary' | 'secondary';
}

export const PricingCard = ({
  planName, description, price, features, buttonText, isPopular = false, buttonVariant = 'primary'
}: PricingCardProps) => {
  const cardClasses = `
    backdrop-blur-[25px] bg-gradient-to-br rounded-3xl shadow-2xl flex-1 max-w-[280px] px-5 py-5 flex flex-col transition-all duration-500
    from-white/8 via-white/3 to-white/1
    dark:from-white/12 dark:via-white/5 dark:to-white/2
    hover:from-white/12 hover:via-white/5 hover:to-white/2
    dark:hover:from-white/15 dark:hover:via-white/8 dark:hover:to-white/3
    ${isPopular ? 'scale-105 relative shadow-green-400/15 animated-border' : 'border border-white/15 dark:border-white/20 hover:border-white/25 dark:hover:border-white/30'}
  `;
  const buttonClasses = `
    mt-auto w-full py-2 rounded-xl text-[12px] transition-all duration-300 font-sans backdrop-blur-[20px]
    ${buttonVariant === 'primary' 
      ? 'bg-gradient-to-r from-green-400/15 to-green-500/20 hover:from-green-400/25 hover:to-green-500/30 text-foreground border border-green-400/20 hover:border-green-400/30' 
      : 'bg-white/5 hover:bg-white/10 text-foreground border border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:text-white dark:border-white/10'
    }
  `;

  return (
    <div className={`${cardClasses.trim()} relative before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-white/3 before:to-transparent before:pointer-events-none`}>
      {isPopular && (
        <div className="absolute -top-4 right-4 px-3 py-1 text-[12px] font-semibold rounded-full bg-gradient-to-r from-green-400/75 to-green-500/75 text-foreground dark:text-black backdrop-blur-[15px] border border-white/15">
          Most Popular
        </div>
      )}
      <div className="mb-2">
        <h2 className="text-[24px] font-extralight tracking-[-0.03em] text-foreground font-display">{planName}</h2>
        <p className="text-[12px] text-foreground/70 mt-1 font-sans">{description}</p>
      </div>
      <div className="my-3 flex items-baseline gap-2">
        <span className="text-[24px] font-extralight text-foreground font-display">${price}</span>
        {price !== 'Custom' && <span className="text-[10px] text-foreground/70 font-sans">/mo</span>}
      </div>
      <div className="card-divider w-full mb-3 h-px bg-[linear-gradient(90deg,transparent,rgba(0,0,0,0.1)_50%,transparent)] dark:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.09)_20%,rgba(255,255,255,0.22)_50%,rgba(255,255,255,0.09)_80%,transparent)]"></div>
      <ul className="flex flex-col gap-1 text-[11px] text-foreground/90 mb-3 font-sans">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-1.5">
            <CheckIcon className="text-green-400 w-2.5 h-2.5" /> {feature}
          </li>
        ))}
      </ul>
      <RippleButton variant="ghost" className={buttonClasses.trim()}>{buttonText}</RippleButton>
    </div>
  );
};

const pricingPlans: PricingCardProps[] = [
  { 
    planName: 'Business Partner', 
    description: 'Dedicated support for growing businesses', 
    price: '10,000', 
    features: [
      'Dedicated AI Engineer',
      'VIP support queue',
      'Documentation and user guides',
      'Live debugging and solution management',
      'Client portal'
    ], 
    buttonText: 'Get Started', 
    buttonVariant: 'secondary'
  },
  { 
    planName: 'Professional', 
    description: 'Advanced features for scaling teams', 
    price: '25,000', 
    features: [
      'Everything in Business Partner',
      'Priority technical support',
      'Custom integrations',
      'Advanced analytics dashboard',
      'Monthly strategy sessions'
    ], 
    buttonText: 'Choose Professional', 
    isPopular: true, 
    buttonVariant: 'primary' 
  },
  { 
    planName: 'Enterprise Partner', 
    description: 'Complete enterprise solution', 
    price: 'Custom', 
    features: [
      'Dedicated Project Manager',
      'Weekly executive meetings',
      'Strategic roadmap review',
      'Team training sessions',
      'Quarterly executive briefing'
    ], 
    buttonText: 'Contact Sales', 
    buttonVariant: 'primary' 
  },
];

export const PricingSection = () => {
  return (
    <div className="h-full w-full flex items-center justify-center relative text-foreground overflow-hidden">
      <style>{`
        :root {
          --button-ripple-color: oklch(0.145 0 0 / 0.3);
        }
        .dark {
          --button-ripple-color: oklch(0.985 0 0 / 0.5);
        }
        
        @keyframes borderRotate {
          0% {
            background: conic-gradient(from 0deg, transparent, #4ade80, transparent);
          }
          25% {
            background: conic-gradient(from 90deg, transparent, #4ade80, transparent);
          }
          50% {
            background: conic-gradient(from 180deg, transparent, #4ade80, transparent);
          }
          75% {
            background: conic-gradient(from 270deg, transparent, #4ade80, transparent);
          }
          100% {
            background: conic-gradient(from 360deg, transparent, #4ade80, transparent);
          }
        }
        
        @keyframes borderPulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.02);
          }
        }
        
        .animated-border {
          position: relative;
        }
        
        .animated-border::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 1.5rem;
          padding: 2px;
          background: conic-gradient(from 0deg, transparent, #4ade80, transparent);
          animation: borderRotate 3s linear infinite, borderPulse 2s ease-in-out infinite;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
        }
      `}</style>
      
      <main className="relative w-full h-full flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-5xl mx-auto text-center mb-12">
          <h1 className="text-[32px] md:text-[48px] font-normal tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-green-500 to-green-600 dark:from-white dark:via-green-300 dark:to-green-400 animate-gradient">
            Choose Your <span className="text-green-400">Partnership</span> Level
          </h1>
          <p className="mt-2 text-[14px] md:text-[16px] font-normal tracking-tight leading-tight text-center bg-gradient-to-r from-white to-gray-500 text-transparent bg-clip-text animate-gradient max-w-2xl mx-auto">
            Tailored solutions for businesses ready to transform with AI
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center w-full max-w-4xl">
          {pricingPlans.map((plan) => <PricingCard key={plan.planName} {...plan} />)}
        </div>
      </main>
    </div>
  );
};