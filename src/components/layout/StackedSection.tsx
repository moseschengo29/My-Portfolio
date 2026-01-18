"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function StackedSection({ children, className = "", id }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [stickyTop, setStickyTop] = useState("0px");

  // --- 1. Dynamic Sticky Calculation ---
  useEffect(() => {
    const calculateStickyOffset = () => {
      if (!sectionRef.current) return;
      
      const windowHeight = window.innerHeight;
      const sectionHeight = sectionRef.current.offsetHeight;

      if (sectionHeight > windowHeight) {
        // If section is taller than screen, stick it when the BOTTOM hits the screen bottom
        const diff = sectionHeight - windowHeight;
        setStickyTop(`-${diff}px`);
      } else {
        // If section fits, stick it at the top
        setStickyTop("0px");
      }
    };

    // Calculate on load and resize
    calculateStickyOffset();
    window.addEventListener("resize", calculateStickyOffset);
    return () => window.removeEventListener("resize", calculateStickyOffset);
  }, [children]); // Recalculate if children change


  useEffect(() => {
    const ctx = gsap.context(() => {
      const texts = gsap.utils.toArray(".reveal-text") as HTMLElement[];
      texts.forEach((text) => {
        gsap.fromTo(
          text,
          { 
            opacity: 0.1,       // Almost invisible initially
            color: "#333",      // Very dark gray
            y: 50,              // Starts 50px lower (more dramatic rise)
            filter: "blur(8px)" // Heavy blur initially
          },
          {
            opacity: 1, 
            color: "#e7e6d9", 
            y: 0,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power3.out", // Smoother ease
            scrollTrigger: {
              trigger: text,
              
              // NEW SETTINGS:
              // Start: When the top of the text hits 70% down the viewport (wait longer)
              start: "top 77%", 
              
              // End: When the top of the text hits 35% down the viewport (finish near center)
              end: "top 35%",   
              
              scrub: 1, // Smooth dragging effect
            }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      style={{ position: "sticky", top: stickyTop }}
      // REMOVED 'overflow-hidden' to prevent clipping tall content
      // ADDED 'z-0' to ensure natural stacking order
      className={`relative w-full bg-[#050505] border-t border-white/5 shadow-2xl ${className}`}
    >
      {/* Noise Texture */}
      <div className="absolute inset-0 bg-noise-pattern opacity-[0.03] pointer-events-none mix-blend-overlay" />
      
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}