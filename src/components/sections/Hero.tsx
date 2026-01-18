"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion"; // Make sure framer-motion is installed
import Link from "next/link";
import Containter from "../layout/Containter";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  "Timeless Motion",
  "Robust Systems",
  "Fluid Interactions",
  "Digital Impact",
  "Scalable APIs"
];

export default function Hero() {
  const container = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [index, setIndex] = useState(0);

  // --- 1. Service Text Rotator Logic ---
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SERVICES.length);
    }, 1500); 
    return () => clearInterval(timer);
  }, []);

  // --- 2. GSAP Animations ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Reveal Name
      tl.from(".hero-char", {
        y: 200, opacity: 0, skewY: 10, duration: 1.2, stagger: 0.05, ease: "power4.out"
      })
      // Reveal Top Elements
      .from(".hero-top-anim", {
        y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out"
      }, "-=0.8");

      // Parallax Name
      gsap.to(".parallax-name", {
        yPercent: 30, ease: "none",
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

  // Ensure video plays
  useEffect(() => {
    if (videoRef.current) {
        videoRef.current.playbackRate = 0.8;
    }
  }, []);

  return (
      <section 
        ref={container} 
        // CHANGED: justify-between pushes content to edges (higher up)
        className="relative h-screen flex flex-col justify-between pt-32 pb-10 md:pt-32 md:pb-12 overflow-hidden"
      >
        {/* --- Background --- */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

        {/* --- TOP ROW (Pushed High) --- */}
        <div className="relative max-w-[85vw] mx-auto z-10 flex flex-col md:flex-row justify-between items-start w-full px-2">
          
          {/* Top Left: Animated Title */}
          <div className="hero-top-anim max-w-2xl mb-8 md:mb-0 relative z-20">
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-[0.9] text-[#e7e6d9]">
              Full Stack <br />
              Engineer For <br />
              
              <div className="h-[1.2em] relative overflow-hidden inline-block w-full text-white/40 align-bottom">
                <AnimatePresence mode="popLayout">
                    <motion.span
                    key={index}
                    initial={{ y: "100%", opacity: 0, filter: "blur(5px)" }} // Reduced blur for speed
                    animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: "-100%", opacity: 0, filter: "blur(5px)" }}
                    transition={{ 
                        // 2. Faster duration (0.5s) with a punchy ease
                        y: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }, 
                        opacity: { duration: 0.5 },
                        filter: { duration: 0.5 }
                    }}
                    className="block leading-none"
                    >
                    {SERVICES[index]}.
                    </motion.span>
                </AnimatePresence>
                </div>

            </h2>
          </div>


            <div className="hero-top-anim relative group w-full md:w-[380px] aspect-square bg-[#e7e6d9] border border-white/10 overflow-hidden rounded-sm shadow-2xl">
            
            {/* 1. Lightweight Placeholder Background (Visible if video is loading/missing) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-[#0a0a0a] to-[#0a0a0a] z-0" />
            
            {/* The Video */}
            <video 
                ref={videoRef}
                autoPlay muted loop playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0 z-10"
            >
                <source src="/showreel-placeholder.mp4" type="video/mp4" />
            </video>

            {/* Overlay: Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%] pointer-events-none" />

            {/* Overlay: UI Elements */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between z-30">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="font-mono text-[10px] text-red-500 tracking-widest font-bold">REC</span>
                    </div>
                    <span className="font-mono text-[10px] text-white/50 border border-white/20 px-1 rounded">1:1</span>
                </div>
                
                {/* Center Crosshair (Optional, adds to the square lens feel) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                
            </div>
            </div>

        </div>

        {/* --- BOTTOM ROW: Name & Meta --- */}
        <div className="parallax-name border-t border-[#21211f] py-8 relative z-10 w-full">
            <div className="max-w-[85vw] mx-auto flex items-end justify-between">
            <h1 className="flex flex-wrap gap-2 md:gap-6 text-[10vw] md:text-[9vw] leading-[0.8] font-bold tracking-tighter uppercase">
            <div className="overflow-hidden flex text-[#e7e6d9] mix-blend-difference">
              {"MOSES".split("").map((char, i) => (
                <span key={i} className="hero-char inline-block">{char}</span>
              ))}
            </div>
            <div className="overflow-hidden flex text-outline text-transparent">
              {"CHENGO".split("").map((char, i) => (
                <span key={i} className="hero-char inline-block">{char}</span>
              ))}
            </div>
          </h1>

          <div className="hero-top-anim  md:block mb-3 font-mono text-xs md:text-sm text-right opacity-50 uppercase tracking-widest shrink-0">
             <p className="text-[#e7e6d9]">Nairobi, KE</p>
             <p className="text-green-500">Est. 2026</p>
          </div>
            </div>
          
        </div>

      </section>
  );
}