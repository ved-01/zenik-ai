import React from 'react';



interface StepCardProps {
  stepNumber: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const StepCard = ({ stepNumber, title, description, icon }: StepCardProps) => {
  const cardClasses = `
    backdrop-blur-[30px] bg-gradient-to-br rounded-3xl shadow-2xl flex-1 max-w-[280px] px-5 py-5 flex flex-col transition-all duration-700
    from-white/6 via-white/2 to-white/1 border border-white/20
    dark:from-white/10 dark:via-white/4 dark:to-white/2 dark:border-white/25
    hover:from-white/10 hover:via-white/4 hover:to-white/2 hover:border-white/30
    dark:hover:from-white/15 dark:hover:via-white/8 dark:hover:to-white/4 dark:hover:border-white/35
    hover:scale-105 hover:shadow-2xl hover:-translate-y-2 hover:rotate-y-1
    shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]
    hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]
    relative before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-white/4 before:to-transparent before:pointer-events-none
    hover:before:from-white/6 hover:before:to-transparent
    before:shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]
    after:absolute after:inset-0 after:rounded-3xl after:pointer-events-none
    hover:after:bg-gradient-to-r hover:after:from-white/10 hover:after:via-white/15 hover:after:to-white/10
    hover:after:animate-pulse
    transform-gpu perspective-1000
  `;

  return (
    <div className={`${cardClasses.trim()} group`}>
      <div className="mb-3">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl font-bold text-white/90 transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">{stepNumber}</span>
          {icon && <div className="text-white/90 transition-all duration-300 group-hover:text-white">{icon}</div>}
        </div>
        <h3 className="text-[18px] font-semibold bg-gradient-to-r from-green-400 to-green-500 text-transparent bg-clip-text animate-gradient mb-2 transition-all duration-300 group-hover:from-green-300 group-hover:to-green-400">{title}</h3>
      </div>
      <p className="text-[13px] text-foreground/80 leading-relaxed">{description}</p>
    </div>
  );
};

const transformationSteps: StepCardProps[] = [
  {
    stepNumber: "01",
    title: "Identify",
    description: "We help you identify high-impact AI opportunities and build a step-by-step AI Transformation strategy to bring them to life."
  },
  {
    stepNumber: "02", 
    title: "Educate",
    description: "We train and support your team with the right tools and know-how to embed AI across your entire organization."
  },
  {
    stepNumber: "03",
    title: "Develop",
    description: "We leverage our extensive experience and network to develop custom AI systems that are proven to move the needle inside your business."
  }
];

export const AITransformationSteps = () => {
  return (
    <div className="h-full w-full flex items-center justify-center relative text-foreground overflow-hidden">
      <main className="relative w-full h-full flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-5xl mx-auto text-center mb-8">
          <h1 className="text-[32px] md:text-[48px] font-normal tracking-tight leading-tight bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text animate-gradient">
            Our <span className="text-green-400">3-Step</span> Process
          </h1>
          <p className="mt-2 text-[14px] md:text-[16px] font-normal tracking-tight leading-tight text-center bg-gradient-to-r from-white to-gray-500 text-transparent bg-clip-text animate-gradient max-w-2xl mx-auto">
            A proven methodology to transform your business with AI
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center w-full max-w-4xl">
          {transformationSteps.map((step) => (
            <StepCard key={step.stepNumber} {...step} />
          ))}
        </div>
      </main>
    </div>
  );
}; 