"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import StackedSection from "../layout/StackedSection";

interface Project {
  name: string;
  type: string;
  year: string;
  img: string;
}

const projects = [
  { name: "Seaquest", type: "Web & Animation", year: "2026", img: "/SeaQuest/SeaQuest1.png" },
  { name: "Career Ecosystem", type: "Platform Architecture", year: "2026", img: "/career.jpg" },
  { name: "Mental Health AI", type: "Python & LLM", year: "2026", img: "/ai.jpg" },
  { name: "Nairobi Motion", type: "Video Editing", year: "2025", img: "/video.jpg" },
];

const GLITCH_CHARS = "!@#$%^&*()_+{}:<>?[];,./";

export default function WorkList() {
  const [activeImg, setActiveImg] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <StackedSection id="work" className="py-32">
      <div className="max-w-[85vw] mx-auto px-6 w-full" onMouseMove={handleMouseMove}>
        
        {/* Header */}
        <div className="mb-10 border-b border-white/10 pb-12 flex justify-between items-end">
          <div>

          <h2 className="reveal-text text-sm font-mono text-[#e7e6d9] uppercase tracking-widest mb-4">
                 {'// All_Projects'}
               </h2>
               <h2 className="reveal-group text-6xl md:text-8xl font-bold uppercase tracking-tighter text-[#e7e6d9]">
                 <span className="reveal-text block">Featured</span>
                 <span className="reveal-text block">Work</span>
               </h2>
              <span className="font-mono text-sm">(04)</span>
          </div>
        </div>

        {/* The Content */}
        <div className="flex flex-col relative">
          {projects.map((project, index) => (
            <ProjectItem 
              key={index} 
              project={project} 
              onEnter={() => setActiveImg(project.img)}
              onLeave={() => setActiveImg(null)}
            />
          ))}
        </div>

        {/* Floating Image Reveal (High-Performance Spring) */}
        <motion.div
          className="fixed top-0 left-0 w-[400px] h-[250px] pointer-events-none z-50 overflow-hidden hidden md:block rounded-sm border border-white/10 bg-black shadow-2xl"
          animate={{
            x: cursorPos.x + 20,
            y: cursorPos.y + 20,
            scale: activeImg ? 1 : 0.8,
            opacity: activeImg ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {activeImg && (
              <motion.div
                key={activeImg}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="relative w-full h-full"
              >
                <Image 
                  src={activeImg} 
                  alt="Project Preview" 
                  fill 
                  className="object-cover grayscale transition-all duration-700" 
                />
                {/* Overlay Scanline */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent h-[20%] w-full animate-scan pointer-events-none" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </StackedSection>
  );
}

// --- SUB-COMPONENT: Project Item with Scramble Effect ---
function ProjectItem({ project, onEnter, onLeave }: { project: Project, onEnter: () => void, onLeave: () => void }) {
  const [displayText, setDisplayText] = useState(project.name);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = () => {
    setIsHovered(true);
    onEnter();
    let iteration = 0;
    
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        project.name
          .split("")
          .map((char: string, index: number) => {
            if (index < iteration) return project.name[index];
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join("")
      );

      if (iteration >= project.name.length) {
        clearInterval(intervalRef.current!);
      }
      iteration += 1 / 3;
    }, 10);
  };

  const stopScramble = () => {
    setIsHovered(false);
    onLeave();
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(project.name);
  };

  return (
    <Link 
      href={`/work/${project.name.toLowerCase()}`} 
      onMouseEnter={startScramble}
      onMouseLeave={stopScramble}
      className="group flex flex-col md:flex-row justify-between items-baseline py-12 border-b border-white/10 transition-colors duration-500 relative overflow-hidden"
    >
      <h3 className="text-4xl md:text-5xl font-bold transition-all duration-500 group-hover:pl-4 z-10 text-[#e7e6d9]">
        {displayText}
      </h3>
      
      <div className="flex gap-12 mt-4 md:mt-0 font-mono text-xs tracking-widest uppercase items-center z-10">
        <span className={`${isHovered ? "text-green-500" : "text-white/30"} transition-colors`}>{project.type}</span>
        <span className="text-white/20">[{project.year}]</span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-green-500">→</span>
      </div>

      {/* Background Hover bar */}
      <motion.div 
        className="absolute inset-y-0 left-0 -z-0"
        initial={{ width: 0 }}
        animate={{ width: isHovered ? "100%" : 0 }}
        transition={{ duration: 0.4, ease: "circOut" }}
      />
    </Link>
  );
}

