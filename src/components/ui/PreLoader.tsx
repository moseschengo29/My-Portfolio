"use client";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SYMBOLS = "MXYZN#/+=";
const ACTIONS = ["INITIALIZING CORE", "COMPILING SHADERS", "RENDERING OPTICS", "SYNTHESIZING DATA", "DEPLOYING STAGE"];

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [percent, setPercent] = useState(0);
  const [scramble, setScramble] = useState("00");
  const [time, setTime] = useState("");

  // Memoize rings to prevent re-renders
  const rings = useMemo(() => [...Array(6)], []);

  // 1. Time Updater (Nairobi Specific)
  useEffect(() => {
    const updateTime = () => {
      const nairobiTime = new Date().toLocaleTimeString("en-US", {
        timeZone: "Africa/Nairobi",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(nairobiTime);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. Loading Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        const next = prev + Math.floor(Math.random() * 3) + 1; 
        
        if (next < 100) {
           // Scramble effect
           if (Math.random() > 0.3) {
             setScramble(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)] + SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
           } else {
             setScramble(next.toString().padStart(2, "0"));
           }
           return next;
        } else {
          clearInterval(interval);
          setScramble("100");
          setTimeout(() => setLoading(false), 1000); // Wait at 100%
          return 100;
        }
      });
    }, 30); // Speed of loader

    return () => clearInterval(interval);
  }, []);

  // Determine current action text
  const currentAction = ACTIONS[Math.min(Math.floor((percent / 100) * ACTIONS.length), ACTIONS.length - 1)];

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            scale: 1.1,
            opacity: 0,
            filter: "blur(20px)",
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col justify-between p-6 md:p-12 text-[#e7e6d9] font-mono overflow-hidden"
          style={{ backgroundImage: "radial-gradient(circle at center, #1a1a1a 0%, #050505 70%)" }}
        >

          {/* --- TOP HUD --- */}
          <div className="flex justify-between items-start z-30 relative">
            {/* Top Left: Identity */}
            <div className="flex flex-col gap-1">
              <h1 className="text-xs md:text-sm font-bold tracking-widest uppercase text-white mix-blend-difference">
                Moses Chengo
              </h1>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                 <span className="text-[10px] md:text-xs opacity-60 uppercase tracking-widest">
                   Full Stack Engineer
                 </span>
              </div>
            </div>

            {/* Top Right: Location & Time */}
            <div className="text-right flex flex-col items-end gap-1">
               <div className="flex items-center gap-2 text-xs md:text-sm font-bold tracking-widest">
                 <span className="hidden md:inline">NAIROBI, KE</span>
                 <span className="md:hidden">NBO</span>
                 <span className="text-green-500">::</span>
                 <span>{time}</span>
               </div>
               <span className="text-[10px] opacity-40 uppercase tracking-widest hidden md:block">
                 LAT: 1.2921° S / LON: 36.8219° E
               </span>
            </div>
          </div>
          
          {/* --- CENTER STAGE (Absolute Center) --- */}
          <div className="absolute inset-0 flex items-center justify-center">
            
            {/* 1. The Reactor Core (Background Rings) */}
            <div className="absolute flex items-center justify-center pointer-events-none mix-blend-screen opacity-50 md:opacity-100">
              {rings.map((_, i) => {
                const size = (i + 1) * 10; // Base size for mobile
                return (
                  <motion.div
                    key={i}
                    className={`absolute rounded-full border ${i % 2 === 0 ? 'border-green-500/20 border-dashed' : 'border-white/5'}`}
                    style={{ 
                      width: `${size}vw`, 
                      height: `${size}vw`,
                      // Min/Max caps for responsiveness
                      minWidth: `${(i + 1) * 60}px`,
                      minHeight: `${(i + 1) * 60}px`,
                    }}
                    animate={{ 
                      rotate: i % 2 === 0 ? 360 : -360,
                      scale: [1, 1.05 + (i * 0.01), 1],
                    }}
                    transition={{ 
                      rotate: { duration: 20 + i * 5, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }
                    }}
                  />
                )
              })}
              {/* Central Green Glow */}
              <motion.div 
                 animate={{ opacity: [0.1, 0.3, 0.1] }}
                 transition={{ duration: 2, repeat: Infinity }}
                 className="absolute w-[40vw] h-[40vw] bg-green-500/10 blur-[60px] rounded-full"
               />
            </div>

            {/* 2. Central Data Display (Foreground Text) */}
            <div className="relative z-20 flex flex-col items-center justify-center">
              
              {/* Glitchy Counter Container */}
              <div className="relative">
                 {/* Red Channel Glitch */}
                <h1 className="absolute top-0 left-0 text-[18vw] md:text-[12vw] font-bold leading-none tracking-tighter text-red-500/50 mix-blend-screen animate-glitch-subtle translate-x-[2px] opacity-70">
                   {percent === 100 ? "100" : scramble}
                </h1>
                 {/* Blue Channel Glitch */}
                 <h1 className="absolute top-0 left-0 text-[18vw] md:text-[12vw] font-bold leading-none tracking-tighter text-blue-500/50 mix-blend-screen animate-glitch-subtle -translate-x-[2px] opacity-70">
                   {percent === 100 ? "100" : scramble}
                </h1>
                
                {/* Main White Text */}
                <h1 className="relative text-[18vw] md:text-[12vw] font-bold leading-none tracking-tighter text-white tabular-nums flex items-start shadow-xl">
                  {percent === 100 ? "100" : scramble}
                  {/* Percentage Symbol */}
                  <span className="text-[4vw] md:text-[3vw] mt-2 md:mt-4 text-green-400 opacity-80">%</span>
                </h1>
              </div>

              {/* Dynamic Action Verb */}
              <motion.div 
                 key={currentAction}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="absolute top-[110%] mt-4 text-[10px] md:text-sm uppercase tracking-[0.3em] text-green-400/80 font-bold whitespace-nowrap bg-black/50 px-2 py-1 backdrop-blur-sm rounded"
              >
                [ {currentAction} ]
              </motion.div>
            </div>
            
          </div>

          {/* --- BOTTOM HUD --- */}
          <div className="flex justify-between items-end z-30 relative">
            <div className="hidden md:block">
              <p className="text-[10px] uppercase tracking-widest opacity-50">Engine: R3F / GSAP</p>
              <p className="text-[10px] uppercase tracking-widest opacity-50">Mode: Creative Dev</p>
            </div>
            
            {/* System Status Indicators */}
            <div className="flex flex-col items-end gap-2 w-full md:w-auto">
               <div className="flex gap-1 justify-end">
                  {[...Array(5)].map((_, i) => (
                      <motion.div 
                        key={i}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                        className="w-1.5 h-1.5 bg-green-500 rounded-sm" 
                      />
                  ))}
               </div>
              <p className="text-[10px] uppercase tracking-widest opacity-50 text-right">System Active</p>
            </div>
          </div>
          
        </motion.div>
      )}
    </AnimatePresence>
  );
}