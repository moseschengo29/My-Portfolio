"use client";
import { useState } from "react";
import StackedSection from "../layout/StackedSection";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SELECTED_PROJECTS } from "@/src/utils/constants";

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  repo: string;
  link: string;
  gallery: string[];
}

export default function SelectedWork() {
  const [activeId, setActiveId] = useState(SELECTED_PROJECTS[0].id);
  const activeProject = SELECTED_PROJECTS.find((p) => p.id === activeId) || SELECTED_PROJECTS[0];

  return (
    <StackedSection id="work" className="py-24 bg-[#080808]">
      <div className="max-w-[85vw] mx-auto w-full">
        
        {/* Header */}
        <div className="mb-20 border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between">
           <div>
               <h2 className="reveal-text text-sm font-mono uppercase tracking-widest mb-4">
                 {'// Deployment_Log'}
               </h2>
               <h2 className="reveal-group text-6xl md:text-8xl font-bold uppercase tracking-tighter text-[#e7e6d9]">
                 <span className="reveal-text block">Selected</span>
                 <span className="reveal-text block">Operations</span>
               </h2>
               <span className="font-mono text-sm">(03)</span>

           </div>
           <div className="hidden md:block text-right">
              <div className="flex items-center justify-end gap-2 text-xs font-mono text-green-500 mb-2">
                 <span className="relative flex h-2 w-2">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                 </span>
                 GALLERY ACTIVE
              </div>
           </div>
        </div>

        {/* --- THE SPLIT LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* LEFT: Project List */}
          <div className="lg:col-span-5 flex flex-col gap-4 relative z-10">
            {SELECTED_PROJECTS.map((project) => (
              <ProjectListItem 
                key={project.id} 
                project={project} 
                isActive={activeId === project.id}
                onHover={() => setActiveId(project.id)}
              />
            ))}
          </div>

          {/* RIGHT: The Mac Window Viewport */}
          <div className="hidden lg:block lg:col-span-7 relative h-[600px]">
            <div className="sticky top-10 w-full h-full">
               <MacWindowViewport project={activeProject} />
            </div>
          </div>

        </div>

      </div>
    </StackedSection>
  );
}

// --- LEFT COLUMN ITEM (Unchanged) ---
function ProjectListItem({ project, isActive, onHover }: { project: Project, isActive: boolean, onHover: () => void }) {
  return (
    <div 
      onMouseEnter={onHover}
      className="group relative p-6 cursor-pointer isolate"
    >
      {isActive && (
        <motion.div
          layoutId="activeProjectBg"
          className="absolute inset-0 bg-white/5 border border-white/10 rounded-lg -z-10"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      <div className="flex items-center gap-3 mb-2">
         <span className={`font-mono text-xs transition-colors duration-300 ${isActive ? "text-green-500" : "text-white/30"}`}>
            {project.id}
         </span>
         {isActive && <motion.div layoutId="activeDot" className="w-1 h-1 bg-green-500 rounded-full" />}
      </div>
      
      <h3 className={`text-3xl font-bold uppercase mb-3 transition-colors duration-300 ${isActive ? "text-white" : "text-white/40 group-hover:text-white/60"}`}>
        {project.title.replace("_", " ")}
      </h3>

      <div className={`overflow-hidden transition-all duration-500 ${isActive ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
         <p className="text-sm text-white/70 leading-relaxed mb-4 max-w-sm">
            {project.description}
         </p>
         <div className="flex flex-wrap gap-2">
            {project.tags.map((tag: string) => (
              <span key={tag} className="text-[10px] font-mono border border-white/10 bg-black/20 px-2 py-1 rounded text-white/50">
                {tag}
              </span>
            ))}
         </div>
      </div>
    </div>
  );
}

// --- RIGHT COLUMN: INTERACTIVE MAC GALLERY ---
// --- RIGHT COLUMN: INTERACTIVE MAC GALLERY (Fixed Height) ---
function MacWindowViewport({ project }: { project: Project }) {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleNext = () => setSlideIndex((prev) => (prev + 1) % project.gallery.length);
  const handlePrev = () => setSlideIndex((prev) => (prev === 0 ? project.gallery.length - 1 : prev - 1));

  return (
    // CHANGE 1: Removed 'aspect-video', added 'h-full' to fill the 600px container
    <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/10 bg-[#0c0c0c] shadow-2xl flex flex-col group">
      
      {/* 1. MacOS Window Toolbar */}
      <div className="h-10 border-b border-white/10 bg-[#161616] flex items-center justify-between px-4 z-20 shrink-0">
         <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
         </div>
         <div className="flex items-center gap-2 bg-[#000] px-3 py-1 rounded text-[10px] font-mono text-white/40 border border-white/5 w-80 justify-center">
            <a href={`${project.repo}`} target='_blank'><span className="text-green-500">🔒 {' '}</span>
            {`${project.repo}`}</a>
         </div>
         <div className="w-10" /> 
      </div>

      {/* 2. Gallery Container */}
      <div className="relative flex-1 bg-[#050505] overflow-hidden">
         <AnimatePresence mode="wait">
            <motion.div
              key={`${project.id}-${slideIndex}`}
              initial={{ opacity: 0, scale: 1.05 }} // Slight zoom effect for drama
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative w-full h-full"
            >
               {/* ACTUAL IMAGE */}
               <div className="relative w-full h-full bg-[#111] flex items-center justify-center">
                 {/* NOTE: Ensure your images are high res since this window is now taller.
                    Use 'object-cover' to fill the space without stretching.
                 */}
                 <Image src={project.gallery[slideIndex]} alt="Project Slide" fill className="object-cover" />
                 
                 {/* Placeholder Pattern */}
                 <div className="absolute inset-0 opacity-20"
                      style={{ 
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: '32px 32px' 
                      }} 
                 />
                 
                 {/* <div className="text-center relative z-10">
                    <p className="font-mono text-xs text-green-500 mb-2 border border-green-500/20 bg-green-900/10 px-2 py-1 inline-block rounded">
                        ASSET_{slideIndex + 1}
                    </p>
                    <p className="font-bold text-white/10 text-6xl uppercase tracking-tighter">
                        {project.title.split('_')[0]}
                    </p>
                 </div> */}

                 {/* Vignette Overlay */}
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
               </div>
            </motion.div>
         </AnimatePresence>

         {/* 3. Navigation Controls */}
         <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <button onClick={handlePrev} className="pointer-events-auto w-12 h-12 rounded-full bg-black/50 backdrop-blur border border-white/10 flex items-center justify-center hover:bg-green-500 hover:text-black transition-all hover:scale-110">
               ←
            </button>
            <button onClick={handleNext} className="pointer-events-auto w-12 h-12 rounded-full bg-black/50 backdrop-blur border border-white/10 flex items-center justify-center hover:bg-green-500 hover:text-black transition-all hover:scale-110">
               →
            </button>
         </div>

         {/* 4. Pagination Dots */}
         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {project.gallery.map((_: string, idx: number) => (
               <button 
                 key={idx}
                 onClick={() => setSlideIndex(idx)}
                 className={`h-1.5 rounded-full transition-all duration-300 ${idx === slideIndex ? "bg-green-500 w-8" : "bg-white/20 w-1.5 hover:bg-white/50"}`}
               />
            ))}
         </div>
      </div>

      {/* 5. Bottom Link Bar */}
      <div className="h-12 border-t border-white/10 bg-[#111] flex items-center justify-between px-6 z-20 shrink-0">
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="font-mono text-[10px] text-white/40">Deployment: Stable</span>
         </div>
         <Link 
            href={project.link}
            className="flex items-center gap-4 group"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-white/50 group-hover:text-white transition-colors duration-300">
              View Project
            </span>

            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-green-500 group-hover:border-green-500 transition-all duration-300">
              <span className="text-white group-hover:text-black transition-colors duration-300 transform group-hover:-rotate-45">
                →
              </span>
            </div>
          </Link>
      </div>

    </div>
  );
}

