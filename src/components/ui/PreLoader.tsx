"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = [
  { text: "DESIGNER", color: "#e7e6d9" },
  { text: "ARCHITECT", color: "#d9e7e5" },
  { text: "ENGINEER", color: "#d9dee7" },
  { text: "DEVELOPER", color: "#d9e7da" },
  { text: "CHENGO", color: "#e7e6d9" },
];

export default function MographPreloader() {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (index === WORDS.length - 1) {
      const finalTimeout = setTimeout(() => setLoading(false), 200);
      return () => clearTimeout(finalTimeout);
    }

    const timeout = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 900); 

    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="loader-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, backgroundColor: WORDS[index].color }}
          exit={{ 
            y: "-100%",
            transition: { duration: 1.2, ease: [0.85, 0, 0.15, 1] } 
          }}
          // Use 'fixed' and 'inset-0' to prevent the layout shift box
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden will-change-transform"
          style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
        >
          {/* 1. TYPOGRAPHY FIELD */}
          <div className="relative h-[20vh] flex items-center justify-center overflow-hidden w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                className="flex"
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {WORDS[index].text.split("").map((char, i) => (
                  <motion.span
                    key={`${index}-${i}`}
                    variants={{
                      initial: { y: 120, opacity: 0, rotateX: 90 },
                      animate: { 
                        y: 0, 
                        opacity: 1, 
                        rotateX: 0,
                        transition: {
                          type: "spring",
                          stiffness: 100,
                          damping: 15,
                          mass: 1,
                          delay: i * 0.03
                        }
                      },
                      exit: { 
                        y: -100, 
                        opacity: 0, 
                        rotateX: -90,
                        transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] }
                      }
                    }}
                    className="text-[14vw] md:text-[10vw] font-[900] text-[#050505] leading-none tracking-tighter uppercase inline-block select-none"
                    style={{ 
                        perspective: "1000px", 
                        transformStyle: "preserve-3d",
                        display: "inline-block"
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 2. PROGRESS BAR (MAGNETIC) */}
          <div className="mt-12 w-[40vw] max-w-[300px] h-[1px] bg-black/10 relative">
             <motion.div 
               className="absolute inset-y-0 left-0 bg-black"
               initial={{ width: "0%" }}
               animate={{ width: `${((index + 1) / WORDS.length) * 100}%` }}
               transition={{ type: "spring", stiffness: 40, damping: 20 }}
             />
          </div>

          {/* 3. HUD ELEMENTS (REDUCED OPACITY FOR SOFTNESS) */}
          <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between pointer-events-none font-mono text-[9px] uppercase tracking-[0.4em] text-black/25">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <span className="font-bold text-black/40">SYSTEM_BOOT</span>
                <span className="opacity-40 text-[7px]">SEQ_{index + 1}</span>
              </div>
              <span className="font-bold text-black/40">NBO // {new Date().getFullYear()}</span>
            </div>
            
            <div className="flex justify-between items-end">
                <div className="flex flex-col gap-2">
                    <div className="flex gap-1">
                        {[...Array(WORDS.length)].map((_, i) => (
                            <div 
                                key={i} 
                                className={`w-1 h-1 rounded-full transition-colors duration-500 ${i <= index ? 'bg-black/60' : 'bg-black/10'}`} 
                            />
                        ))}
                    </div>
                    <span>Initializing_Capabilities</span>
                </div>
                <div className="text-right">
                    <span>{((index + 1) / WORDS.length * 100).toFixed(0)}%</span>
                </div>
            </div>
          </div>

          {/* 4. GRAIN OVERLAY */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-noise-pattern mix-blend-multiply" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}