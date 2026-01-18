"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StackedSection from "../layout/StackedSection";

type Step = {
  id: number | string,
  title: string,
  description: string,
  layer: string
}

// --- DATA: High-Level Engineering Workflow ---
const STEPS = [
  {
    id: "01",
    title: "System Architecture",
    description: "Before code, we build the blueprint. I map out database schemas, API endpoints, and server infrastructure to ensure the foundation can handle scale.",
    layer: "KERNEL_LEVEL"
  },
  {
    id: "02",
    title: "Backend Engine",
    description: "The logic layer. Developing robust APIs with Python/Django or Node.js. Implementation of secure authentication, data validation, and business logic.",
    layer: "SERVER_OPS"
  },
  {
    id: "03",
    title: "Frontend Interface",
    description: "The visual layer. Constructing pixel-perfect, responsive UIs with Next.js 14 and React. Focusing on component modularity and state management.",
    layer: "UI_SHELL"
  },
  {
    id: "04",
    title: "Performance & Polish",
    description: "The final elevation. Adding GSAP micro-interactions, optimizing Web Vitals, and configuring edge caching for sub-100ms load times.",
    layer: "OPTIMIZATION"
  }
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <StackedSection id="process" className="py-32">
      <div className="max-w-[85vw] mx-auto px-6 w-full"> 
        
        {/* Header */}
        <div className="mb-24">
          <h2 className="reveal-text text-sm font-mono text-white/40 uppercase tracking-widest mb-6">
            {'// How_I_Work'}
          </h2>
          <p className="reveal-text text-4xl md:text-6xl font-bold leading-[1.1] max-w-5xl text-[#e7e6d9]">
            I don&apos;t just write code. I engineer <span className="text-green-500">digital ecosystems</span> that scale with your ambition.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* --- LEFT COLUMN: Accordion --- */}
          <div className="flex flex-col relative z-20">
            {STEPS.map((step, index) => (
              <ProcessItem 
                key={step.id}
                step={step}
                isActive={activeStep === index}
                onClick={() => setActiveStep(index)}
              />
            ))}
          </div>

          {/* --- RIGHT COLUMN: The Fixed 3D Stack --- */}
          <div className="relative h-[600px] w-full flex items-center justify-center">
            
            {/* 1. Background Glow (Ambiance) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-green-500/10 blur-[100px] rounded-full pointer-events-none" />

            {/* 2. The Isometric Container */}
            {/* We use inline styles for the transform to guarantee 3D rendering */}
            <div 
              className="relative w-72 h-72"
              style={{ 
                transform: "rotateX(60deg) rotateZ(-45deg)", 
                transformStyle: "preserve-3d" 
              }}
            >
              {STEPS.map((step, index) => (
                <IsoLayer 
                  key={step.id} 
                  index={index} 
                  isActive={activeStep === index} 
                  label={step.layer}
                />
              ))}

              {/* Decor: Vertical Axis Line */}
              <div 
                className="absolute top-1/2 left-1/2 w-[1px] h-[400px] bg-gradient-to-b from-transparent via-green-500/50 to-transparent transform -translate-x-1/2 -translate-y-1/2"
                style={{ transform: "translateZ(-100px) rotateX(-90deg)" }} 
              />
            </div>
          </div>

        </div>

      </div>
    </StackedSection>
  );
}

// --- COMPONENT: Accordion Item ---
function ProcessItem({ step, isActive, onClick }: { step: Step, isActive: boolean, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`border-t border-white/10 py-8 cursor-pointer group transition-all duration-500 ${isActive ? "border-green-500/50" : "hover:border-white/30"}`}
    >
      <div className="flex justify-between items-baseline mb-4">
        <h3 className={`text-2xl md:text-3xl font-bold uppercase tracking-tighter transition-colors ${isActive ? "text-white" : "text-white/40 group-hover:text-white/70"}`}>
          <span className={`font-mono text-sm mr-4 tracking-widest ${isActive ? "text-green-500" : "text-white/20"}`}>
            {step.id}
          </span>
          {step.title}
        </h3>
        
        {/* Toggle Icon */}
        <span className={`font-mono text-xl transition-colors ${isActive ? "text-green-500" : "text-white/20"}`}>
          {isActive ? "—" : "+"}
        </span>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-xl pl-10 border-l border-green-500/20 ml-1">
              {step.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- COMPONENT: 3D Layer ---
function IsoLayer({ index, isActive, label }: { index: number, isActive: boolean, label: string }) {
  // Base spacing between layers
  const baseZ = index * 40; 
  // How high the active layer pops up
  const liftZ = isActive ? 60 : 0; 

  return (
    <motion.div
      // We animate the 'z' (translateZ) and colors
      animate={{ 
        z: baseZ + liftZ, 
        borderColor: isActive ? "rgba(34, 197, 94, 0.6)" : "rgba(255, 255, 255, 0.1)",
        backgroundColor: isActive ? "rgba(34, 197, 94, 0.05)" : "rgba(10, 10, 10, 0.8)",
        scale: isActive ? 1.05 : 1
      }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      style={{ 
        // Force absolute position so they stack on top of each other
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        // Use inline translateZ to ensure 3D stacking works
        transform: `translateZ(${baseZ}px)` 
      }}
      className="border rounded-xl backdrop-blur-sm shadow-2xl flex items-center justify-center"
    >
      
      {/* 1. Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] rounded-xl pointer-events-none" />

      {/* 2. Floating Label */}
      <motion.div
        animate={{ opacity: isActive ? 1 : 0.5 }}
        // Counter-rotate the text so it looks flat to the camera
        className="font-mono text-[10px] uppercase tracking-widest text-white transform -rotate-z-45 -rotate-x-60 bg-black/80 px-2 py-1 border border-white/10 rounded shadow-lg"
      >
        {label}
      </motion.div>

      {/* 3. Neon Corners (Only on Active) */}
      {isActive && (
        <>
          <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full shadow-[0_0_15px_#22c55e]" />
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-green-500 rounded-full shadow-[0_0_15px_#22c55e]" />
        </>
      )}

    </motion.div>
  );
}