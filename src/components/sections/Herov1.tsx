"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Reveal Sequence (Tech Boot-up style)
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      tl.from(".hero-grid", { 
        opacity: 0, 
        duration: 2, 
        ease: "power2.inOut" 
      })
      .from(".hero-word-1", { 
        x: -100, 
        opacity: 0, 
        filter: "blur(10px)", 
        duration: 1 
      }, "-=1.5")
      .from(".hero-word-2", { 
        x: 100, 
        opacity: 0, 
        filter: "blur(10px)", 
        duration: 1 
      }, "-=0.8")
      .from(".tech-badge", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8
      }, "-=0.5");

      // 2. Scroll Parallax
      gsap.to(".hero-content", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={container} 
      className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-[#0b0b0b] perspective-1000"
    >
      
      {/* --- 1. THE 3D CYBER GRID (Background) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none perspective-[500px]">
        {/* The moving floor */}
        <div className="hero-grid absolute inset-[-100%] bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] [transform:rotateX(60deg)] animate-grid-flight opacity-20" />
        
        {/* Fade to black at top/bottom (Horizon line) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-[#0b0b0b]" />
      </div>

      {/* --- 2. NOISE & TEXTURE --- */}
      <div className="absolute inset-0 bg-noise-pattern opacity-15 pointer-events-none z-0 mix-blend-soft-light" />
      
      {/* --- 3. MAIN CONTENT --- */}
      <div className="hero-content relative z-10 w-full max-w-[1800px] px-6 md:px-12 flex flex-col justify-center h-full">
        
        {/* Top Tech Badges */}
        <div className="flex justify-between items-start mb-12 font-mono text-xs text-green-500/80 uppercase tracking-widest">
           <div className="tech-badge flex flex-col gap-1 border-l border-green-500/30 pl-3">
             <span>Sys_Status: Online</span>
             <span>Ping: 14ms (NBO)</span>
           </div>
           <div className="tech-badge flex items-center gap-2 border border-green-500/20 px-3 py-1 rounded-full bg-green-500/5 backdrop-blur-sm">
             <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
             <span>Available for Work</span>
           </div>
        </div>

        {/* MASSIVE TYPOGRAPHY ROW */}
        <div className="relative flex flex-col md:block" ref={textRef}>
          
          {/* First Name (Solid) */}
          <h1 className="hero-word-1 text-[16vw] md:text-[13vw] leading-[0.85] font-bold tracking-tighter text-[#e7e6d9] mix-blend-difference z-20 relative">
            MOSES
          </h1>

          {/* Central Media/Video Portal (Floating between words) */}
          <motion.div 
            className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[25vw] h-[15vw] z-10 bg-[#111] border border-white/10 overflow-hidden group"
            whileHover={{ scale: 1.05, rotate: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
             {/* Placeholder for Showreel Video */}
             <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-shine opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             <div className="absolute inset-0 flex items-center justify-center text-white/20 group-hover:text-green-400 font-mono text-xs uppercase tracking-widest transition-colors">
                [ Play Showreel ]
             </div>
             {/* Tech Corners */}
             <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-green-500" />
             <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-green-500" />
          </motion.div>

          {/* Last Name (Outlined/Hollow) */}
          <div className="hero-word-2 flex justify-end">
            <h1 className="text-[16vw] md:text-[13vw] leading-[0.85] font-bold tracking-tighter text-transparent uppercase relative group">
              {/* Stroke Text */}
              <span className="text-outline group-hover:text-green-500/20 transition-colors duration-500">
                CHENGO
              </span>
              
              {/* Glitch Overlay on Hover */}
              <span className="absolute inset-0 text-[#e7e6d9] opacity-0 group-hover:opacity-100 mix-blend-overlay animate-glitch-subtle pointer-events-none">
                CHENGO
              </span>
            </h1>
          </div>
        </div>

        {/* Bottom Tech Stats */}
        <div className="mt-12 md:mt-24 flex flex-col md:flex-row justify-between items-end border-t border-white/10 pt-6">
          
          {/* Stack Ticker */}
          <div className="tech-badge max-w-md overflow-hidden">
             <p className="font-mono text-xs text-[#e7e6d9]/60 uppercase tracking-widest mb-2">{'// Active_Stack'}</p>
             <div className="flex gap-4 font-bold text-lg md:text-xl text-[#e7e6d9]">
                <span>React</span>
                <span className="text-green-500">/</span>
                <span>Next.js</span>
                <span className="text-green-500">/</span>
                <span>Python</span>
                <span className="text-green-500">/</span>
                <span>GSAP</span>
             </div>
          </div>

          {/* Scroll Indicator */}
          <div className="tech-badge hidden md:flex flex-col items-center gap-2 opacity-50">
            <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-green-500 to-transparent animate-scroll-line" />
            <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
          </div>

          {/* Coordinates */}
          <div className="tech-badge text-right font-mono text-xs text-[#e7e6d9]/40">
             <p>LOC: 1.2921° S, 36.8219° E</p>
             <p>SERVER: NAIROBI-1</p>
          </div>

        </div>

      </div>
    </section>
  );
}