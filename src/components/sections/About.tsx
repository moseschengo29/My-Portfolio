"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StackedSection from "../layout/StackedSection";
import Image from "next/image"; // Ensure you have an image in /public/profile.jpg or similar
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { label: "Years Experience", value: 4, suffix: "+" },
  { label: "Projects Shipped", value: 15, suffix: "+" },
  { label: "Stack Mastery", value: 12, suffix: "+" },
];

export default function About() {
  const container = useRef(null);

  // --- Counter Animation ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate numbers counting up
      gsap.from(".stat-number", {
        textContent: 0,
        duration: 2,
        ease: "power2.out",
        snap: { textContent: 1 },
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".stats-container",
          start: "top 70%",
        }
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <StackedSection id="about" className="py-20 md:py-32">
      <div className="max-w-[85vw] mx-auto w-full">

        {/* --- Header --- */}
        <div className="mb-20 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-8">
          <div>
            <h2 className="reveal-text text-sm font-mono text-white/40 uppercase tracking-widest mb-4">
              {'// Profile_Data'}
            </h2>
            <h2 className="reveal-group text-6xl md:text-8xl font-bold uppercase tracking-tighter text-[#e7e6d9]">
              <span className="reveal-text block">Beyond</span>
              <span className="reveal-text block">The Code</span>
            </h2>
            <span className="font-mono text-sm">(01)</span>

          </div>
          <div className="hidden md:block reveal-text font-mono text-xs text-white/40 text-right mb-2">
            <p>ID: MOSES_CHENGO</p>
            <p>STATUS: ONLINE</p>
          </div>
        </div>

        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* LEFT: The Narrative (Text) */}
          <div className="lg:col-span-7 space-y-8">
             <div className="reveal-group">
                <p className="reveal-text text-2xl md:text-4xl font-light leading-snug text-[#e7e6d9]">
                  I am a Full Stack Engineer who treats software like <span className="text-white/40">architecture</span>.
                </p>
                <br />
                <p className="reveal-text text-lg text-white/60 leading-relaxed max-w-2xl">
                  My background isn&apos;t just in writing functions; it&apos;s in solving complex logical problems with elegant, scalable solutions. I bridge the gap between &quot;It works&quot; and &quot;It feels magic.&quot;
                </p>
                <p className="reveal-text text-lg text-white/60 leading-relaxed max-w-2xl mt-4">
                  Currently based in Nairobi, I specialize in the <strong>Next.js ecosystem</strong>, pushing the boundaries of what the web can do—from high-performance APIs to cinematic frontend interactions.
                </p>
             </div>

             <div className="reveal-text pt-4">
                    <Link 
                        href="#contact" 
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 hover:border-green-500/50 transition-all duration-300 overflow-hidden"
                    >
                        {/* Hover Fill Effect */}
                        <div className="absolute inset-0 bg-[#e7e6d9] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        
                        <span className="relative z-10 font-mono text-sm uppercase tracking-widest text-[#e7e6d9] group-hover:text-black transition-colors">
                            Initialize Project
                        </span>
                        <span className="relative z-10 text-[#e7e6d9] group-hover:text-black transition-colors group-hover:translate-x-1 duration-300">
                            →
                        </span>
                    </Link>
                </div>

             {/* The Stats Grid */}
             <div className="stats-container grid grid-cols-2 md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
               {STATS.map((stat, i) => (
                 <div key={i}>
                   <div className="flex items-baseline text-green-500 font-bold text-4xl md:text-5xl font-mono">
                     <span className="stat-number">{stat.value}</span>
                     <span>{stat.suffix}</span>
                   </div>
                   <p className="text-xs uppercase tracking-widest text-white/40 mt-2">
                     {stat.label}
                   </p>
                 </div>
               ))}
             </div>
          </div>

          {/* RIGHT: The Tech-Frame Image */}
          <div className="lg:col-span-5 relative group">
             {/* 1. The Image Container */}
             <div className="relative aspect-[3/4] w-full bg-[#111] overflow-hidden rounded-sm border border-white/10">
                
                {/* Placeholder / Actual Image */}
                {/* Replace src with your photo. If no photo, this div acts as a cool placeholder */}
                <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                   <p className="font-mono text-xs text-white/20">[ INSERT_PROFILE_IMG ]</p>
                   <Image 
                     src="/image.jpg" 
                     alt="Moses Chengo" 
                     fill 
                     className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
                   />
                  
                </div>

                {/* 2. Scanning Overlay (Scanline animation) */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/10 to-transparent h-[20%] w-full animate-scan pointer-events-none" />
                
                {/* 3. HUD Elements */}
                <div className="absolute top-4 left-4 w-2 h-2 bg-green-500 rounded-full" />
                <div className="absolute top-4 right-4 font-mono text-[10px] text-green-500">
                  REC •
                </div>
                
                {/* Corner Brackets */}
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-white/30" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-white/30" />
             </div>

             {/* 4. Background Decorative Box (Offset) */}
             <div className="absolute -inset-4 border border-white/5 -z-10 rounded-sm" />
          </div>

        </div>

      </div>
    </StackedSection>
  );
}