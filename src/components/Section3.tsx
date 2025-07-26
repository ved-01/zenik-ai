"use client";
import * as React from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

// A reusable component for the animated circles
const GlassCircle = ({ layoutId }: { layoutId: string }) => (
    <motion.div
      layoutId={layoutId}
      className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    />
  );

type JourneyStep = "identify" | "educate" | "develop";

const sections: JourneyStep[] = ["identify", "educate", "develop"];

const content = {
  identify: {
    title: "Identify",
    description:
      "We help you identify high-impact AI opportunities and build a step-by-step AI Transformation strategy to bring them to life.",
  },
  educate: {
    title: "Educate",
    description:
      "We train and support your team with the right tools and know-how to embed AI across your entire organization.",
  },
  develop: {
    title: "Develop",
    description:
      "We leverage our extensive experience and network to develop custom AI systems that are proven to move the needle inside your business.",
  },
};

// Reuse your original renderCircles function
const renderCircles = (step: JourneyStep) => {
  switch (step) {
    case "identify":
      return (
        <div className="relative w-48 h-48">
          <motion.div layoutId="container" className="absolute inset-0 flex items-center justify-center">
            <GlassCircle layoutId="circle-1" />
          </motion.div>
          <motion.div layoutId="container-inner" className="absolute inset-0 flex items-center justify-center scale-50">
            <GlassCircle layoutId="circle-2" />
          </motion.div>
        </div>
      );
    case "educate":
      return (
        <motion.div layoutId="container" className="flex space-x-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-28 h-28">
              <GlassCircle layoutId={`circle-${i}`} />
            </div>
          ))}
        </motion.div>
      );
    case "develop":
      return (
        <motion.div layoutId="container" className="relative w-96 h-64">
          {[
            { top: "0%", left: "33%", w: "h-28 w-28", id: 1 },
            { top: "25%", left: "0%", w: "h-28 w-28", id: 2 },
            { top: "25%", left: "66%", w: "h-28 w-28", id: 3 },
            { top: "50%", left: "33%", w: "h-28 w-28", id: 4 },
            { top: "50%", left: "0%", w: "h-28 w-28", id: 5 },
            { top: "50%", left: "66%", w: "h-28 w-28", id: 6 },
          ].map((item) => (
            <motion.div key={item.id} className={`absolute ${item.w}`} style={{ top: item.top, left: item.left }}>
              <GlassCircle layoutId={`circle-${item.id > 5 ? "new" : item.id}`} />
            </motion.div>
          ))}
        </motion.div>
      );
    default:
      return null;
  }
};

export const AIJourneySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-200%"]);

  return (
    <section ref={containerRef} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex h-full w-[300vw] transition-transform duration-500"
        >
          {sections.map((step) => (
            <div
              key={step}
              className="w-screen h-full flex flex-col items-center justify-center space-y-10 px-4"
            >
              {/* Circles */}
              <AnimatePresence mode="wait">{renderCircles(step)}</AnimatePresence>

              {/* Text content */}
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center space-y-4"
              >
                <h2 className="text-5xl md:text-6xl font-bold text-gray-300">{content[step].title}</h2>
                <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto">{content[step].description}</p>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
