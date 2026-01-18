"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  SiNextdotjs, SiReact, SiTypescript, SiPython, 
  SiDjango, SiTailwindcss, SiPostgresql, SiWebflow, 
  SiFigma, SiCanva, SiAffinitydesigner, SiAdobepremierepro, 
  SiWordpress,
  SiFlutter
} from "react-icons/si";
import StackedSection from "../layout/StackedSection";

const TECH_STACK = [
  { id: "next", name: "Next.js 14", icon: SiNextdotjs, color: "#fff", cat: "Framework", desc: "Enterprise-grade SSR, Server Actions, and App Router architecture." },
  { id: "react", name: "React", icon: SiReact, color: "#61DAFB", cat: "Library", desc: "Dynamic UI development with Hook-based state synchronization." },
  { id: "ts", name: "TypeScript", icon: SiTypescript, color: "#3178C6", cat: "Language", desc: "Static typing for robust, self-documenting codebases." },
  { id: "tw", name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4", cat: "CSS", desc: "Utility-first styling for consistent, high-performance interfaces." },
  { id: "py", name: "Python", icon: SiPython, color: "#3776AB", cat: "Backend", desc: "Scalable logic, data manipulation, and automated workflows." },
  { id: "dj", name: "Django", icon: SiDjango, color: "#092E20", cat: "Framework", desc: "Rapid backend development with a focus on security and 'batteries-included' philosophy." },
  { id: "pg", name: "Postgres", icon: SiPostgresql, color: "#4169E1", cat: "Database", desc: "Relational data modeling with complex indexing and ACID compliance." },
  { id: "fl", name: "Flutter", icon: SiFlutter, color: "#02569B", cat: "Mobile", desc: "Multi-platform application development with Dart and high-performance Skia rendering." },
  { id: "rn", name: "React Native", icon: SiReact, color: "#61DAFB", cat: "Mobile", desc: "Building native mobile apps for iOS and Android using React primitives." },
  { id: "wp", name: "WordPress", icon: SiWordpress, color: "#21759B", cat: "CMS", desc: "Custom theme development and headless CMS implementations." },
  { id: "wf", name: "Webflow", icon: SiWebflow, color: "#4353FF", cat: "Low-Code", desc: "Bridging the gap between high-end design and rapid production deployment." },
  { id: "fig", name: "Figma", icon: SiFigma, color: "#F24E1E", cat: "Design", desc: "High-fidelity UI/UX prototyping and design system maintenance." },
  { id: "pr", name: "Premiere Pro", icon: SiAdobepremierepro, color: "#9999FF", cat: "Video", desc: "High-end post-production, motion sequences, and cinematic storytelling." },
  { id: "aff", name: "Affinity", icon: SiAffinitydesigner, color: "#1B72BA", cat: "Vector", desc: "Professional vector illustration and brand asset engineering." },
];

export default function TechStack() {
  const [activeTech, setActiveTech] = useState(TECH_STACK[0]);

  return (
    <StackedSection id="stack" className="py-32 bg-[#050505]">
      <div className="max-w-[85vw] mx-auto w-full">

      <div className="mb-20 border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between">
           <div>
               <h2 className="reveal-text text-sm font-mono text-green-500 uppercase tracking-widest mb-4">
                 {'// Skill_stack'}
               </h2>
               <h2 className="reveal-group text-6xl md:text-8xl font-bold uppercase tracking-tighter text-[#e7e6d9]">
                 <span className="reveal-text block">Technical</span>
                 <span className="reveal-text block">Arsenal</span>
               </h2>
               <span className="font-mono text-sm">(02)</span>
           </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT: THE FLOATING CLUSTER */}
            <div className="lg:col-span-7 grid grid-cols-3 sm:grid-cols-5 gap-4">
                {TECH_STACK.map((tech, index) => (
                    <motion.button
                        key={tech.id}
                        onMouseEnter={() => setActiveTech(tech)}
                        // Subtle floating animation
                        animate={{ 
                          y: [0, -5, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.2 // Stagger the float start
                        }}
                        className={`relative aspect-square flex flex-col items-center justify-center rounded-lg border transition-all duration-300 group
                        ${activeTech.id === tech.id ? "bg-white/5 border-green-500/50" : "bg-transparent border-white/5 hover:border-white/20"}`}
                    >
                        <tech.icon 
                            size={32} 
                            className={`transition-all duration-500 ${activeTech.id === tech.id ? "scale-110" : "opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0"}`}
                            style={{ color: activeTech.id === tech.id ? tech.color : 'inherit' }}
                        />
                        <span className={`mt-3 font-mono text-[9px] uppercase tracking-widest transition-opacity duration-300 ${activeTech.id === tech.id ? "opacity-100" : "opacity-0"}`}>
                            {tech.id}
                        </span>
                    </motion.button>
                ))}
            </div>

            {/* RIGHT: THE INSPECTOR BLADE */}
            <div className="lg:col-span-5">
                <div className="sticky top-32 bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden shadow-2xl">
                    {/* Header Bar */}
                    <div className="px-6 py-3 bg-[#111] border-b border-white/5 flex justify-between items-center">
                        <span className="font-mono text-[10px] text-green-500 tracking-widest">UNIT_INSPECTOR</span>
                        <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                            <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        </div>
                    </div>

                    <div className="p-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTech.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                        <activeTech.icon size={48} style={{ color: activeTech.color }} />
                                    </div>
                                    <div>
                                        <h4 className="text-3xl font-bold uppercase tracking-tighter text-white">
                                            {activeTech.name}
                                        </h4>
                                        <span className="font-mono text-xs text-green-500 uppercase tracking-widest">
                                            {activeTech.cat}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-white/60 font-mono text-sm leading-relaxed mb-8 border-l-2 border-white/10 pl-6">
                                    {activeTech.desc}
                                </p>

                                {/* System Stats Decor */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-end">
                                        <span className="font-mono text-[10px] text-white/30">INTEGRATION_LEVEL</span>
                                        <div className="flex-1 border-b border-dashed border-white/10 mx-4 mb-1" />
                                        <span className="font-mono text-[10px] text-green-500">98.2%</span>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <span className="font-mono text-[10px] text-white/30">RUNTIME_STATUS</span>
                                        <div className="flex-1 border-b border-dashed border-white/10 mx-4 mb-1" />
                                        <span className="font-mono text-[10px] text-green-500 uppercase">Stable</span>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Footer HUD */}
                    <div className="px-8 py-5 bg-[#0d0d0d] border-t border-white/10 relative overflow-hidden group/hud">
    
                    {/* Subtle animated background bar */}
                    <div className="absolute inset-y-0 left-0 w-1 bg-green-500/50 group-hover:h-full transition-all duration-700" />
                    
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <p className="font-mono text-[10px] text-green-500 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-1 h-1 bg-green-500 rounded-full animate-ping" />
                                Live_Capability_Report
                            </p>
                            <span className="font-mono text-[9px] text-white/20">VERIFIED_2026</span>
                        </div>

                        <p className="font-mono text-[10px] text-white/40 leading-relaxed uppercase">
                            Cross-platform integration enabled: <span className="text-white/70">Next.js Engine</span> linked // <span className="text-white/70">Django-REST</span> verified // <span className="text-white/70">Motion-Physics</span> optimized. 
                            Ready for high-load production deployment.
                        </p>
                    </div>

                    {/* Decorative bit-data (Right side) */}
                    <div className="absolute right-4 bottom-2 font-mono text-[8px] text-white/5 select-none hidden md:block">
                        1010110100101011
                    </div>
                </div>
                </div>
            </div>
        </div>
      </div>
    </StackedSection>
  );
}