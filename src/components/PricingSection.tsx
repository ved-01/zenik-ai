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
    backdrop-blur-[14px] bg-gradient-to-br rounded-2xl shadow-xl flex-1 max-w-xs px-7 py-8 flex flex-col transition-all duration-300
    from-black/5 to-black/0 border border-black/10
    dark:from-white/10 dark:to-white/5 dark:border-white/10 dark:backdrop-brightness-[0.91]
    ${isPopular ? 'scale-105 relative ring-2 ring-cyan-400/20 dark:from-white/20 dark:to-white/10 dark:border-cyan-400/30 shadow-2xl' : ''}
  `;
  const buttonClasses = `
    mt-auto w-full py-2.5 rounded-xl font-semibold text-[14px] transition font-sans
    ${buttonVariant === 'primary' 
      ? 'bg-cyan-400 hover:bg-cyan-300 text-foreground' 
      : 'bg-black/10 hover:bg-black/20 text-foreground border border-black/20 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:border-white/20'
    }
  `;

  return (
    <div className={cardClasses.trim()}>
      {isPopular && (
        <div className="absolute -top-4 right-4 px-3 py-1 text-[12px] font-semibold rounded-full bg-cyan-400 text-foreground dark:text-black">
          Most Popular
        </div>
      )}
      <div className="mb-3">
        <h2 className="text-[48px] font-extralight tracking-[-0.03em] text-foreground font-display">{planName}</h2>
        <p className="text-[16px] text-foreground/70 mt-1 font-sans">{description}</p>
      </div>
      <div className="my-6 flex items-baseline gap-2">
        <span className="text-[48px] font-extralight text-foreground font-display">${price}</span>
        {price !== 'Custom' && <span className="text-[14px] text-foreground/70 font-sans">/mo</span>}
      </div>
      <div className="card-divider w-full mb-5 h-px bg-[linear-gradient(90deg,transparent,rgba(0,0,0,0.1)_50%,transparent)] dark:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.09)_20%,rgba(255,255,255,0.22)_50%,rgba(255,255,255,0.09)_80%,transparent)]"></div>
      <ul className="flex flex-col gap-2 text-[14px] text-foreground/90 mb-6 font-sans">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <CheckIcon className="text-cyan-400 w-4 h-4" /> {feature}
          </li>
        ))}
      </ul>
      <RippleButton className={buttonClasses.trim()}>{buttonText}</RippleButton>
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
      'Includes all Business Partner features, plus:',
      'Dedicated Project Manager',
      'Weekly 60 minute meetings with our executive team',
      'Strategic roadmap review',
      'Team training and enablement sessions',
      'Documentation of all completed work',
      'Quarterly executive briefing',
      'Everything customized for you and your business'
    ], 
    buttonText: 'Contact Sales', 
    buttonVariant: 'primary' 
  },
];

export const PricingSection = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative bg-background text-foreground overflow-hidden">
      <style>{`
        :root {
          --button-ripple-color: oklch(0.145 0 0 / 0.3);
        }
        .dark {
          --button-ripple-color: oklch(0.985 0 0 / 0.5);
        }
      `}</style>
      
      <main className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-5xl mx-auto text-center mb-14">
          <h1 className="text-[48px] md:text-[64px] font-extralight leading-tight tracking-[-0.03em] bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-cyan-500 to-blue-600 dark:from-white dark:via-cyan-300 dark:to-blue-400 font-display">
            Choose Your <span className="text-cyan-400">Partnership</span> Level
          </h1>
          <p className="mt-3 text-[16px] md:text-[20px] text-foreground/80 max-w-2xl mx-auto font-sans">
            Tailored solutions for businesses ready to transform with AI
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-6 justify-center items-center w-full max-w-4xl">
          {pricingPlans.map((plan) => <PricingCard key={plan.planName} {...plan} />)}
        </div>
      </main>
    </div>
  );
};