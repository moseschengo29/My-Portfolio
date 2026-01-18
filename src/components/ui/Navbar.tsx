"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const CHARS = "!@#$%^&*()_+-=[]{}|;':,./<>?";

// --- 1. Desktop Scramble Link (Small Font) ---
function ScrambleLink({ href, label }: { href: string; label: string }) {
  const [displayText, setDisplayText] = useState(label);
  
  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        label
          .split("")
          .map((letter, index) => {
            if (index < iteration) return label[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      if (iteration >= label.length) clearInterval(interval);
      iteration += 1 / 2;
    }, 30);
  };

  return (
    <Link 
      href={href} 
      onMouseEnter={scramble}
      className="group relative font-mono text-xs uppercase tracking-widest text-[#e7e6d9] hover:text-green-400 transition-colors"
    >
      <span className="relative z-10">
        <span className="text-green-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity">{">"}</span>
        {displayText}
      </span>
    </Link>
  );
}

// --- 2. Mobile Scramble Link (Massive Font + Green Hover) ---
function MobileScrambleLink({ href, label, index, onClick }: { href: string, label: string, index: number, onClick: () => void }) {
  const [displayText, setDisplayText] = useState(label);

  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        label
          .split("")
          .map((letter, index) => {
            if (index < iteration) return label[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      if (iteration >= label.length) clearInterval(interval);
      iteration += 1 / 2;
    }, 30);
  };

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 + (index * 0.1) }}
    >
      <Link 
        href={href}
        onClick={onClick}
        onMouseEnter={scramble} // Triggers on hover (desktop)
        onTouchStart={scramble} // Triggers on tap (mobile)
        className="block relative group"
      >
        {/* Numbering (01, 02...) */}
        <span className="text-sm font-mono text-green-500/50 absolute -left-8 top-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          0{index + 1}
        </span>

        {/* The Link Text */}
        <span className="text-5xl md:text-6xl font-bold uppercase tracking-tighter text-transparent text-outline transition-all duration-300 group-hover:text-green-500 group-hover:text-fill-green-500 selection:bg-green-500/30">
          {displayText}
        </span>
      </Link>
    </motion.div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          scrolled ? "py-4" : "py-6 md:py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Main Bar Container */}
          <div className={`relative flex justify-between items-center transition-all duration-500 ${
            scrolled 
              ? "bg-[#050505]/80 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full shadow-2xl" 
              : "bg-transparent border border-transparent px-0"
          }`}>
            
            {/* Brand Logo */}
            <Link href="/" className="relative z-50 flex items-center gap-2 group">
              <div className="w-2 h-2 bg-green-500 rounded-sm animate-pulse" />
              <span className="font-bold tracking-tighter text-lg md:text-xl text-[#e7e6d9]">
                CHENG0<span className="text-white/40 group-hover:text-green-500 transition-colors">.DEV</span>
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {["Work", "Services", "About", "Contact"].map((item) => (
                <ScrambleLink key={item} href={`#${item.toLowerCase()}`} label={item} />
              ))}
              <div className="h-4 w-[1px] bg-white/20 mx-2" />
              <button className="px-4 py-1.5 border border-green-500/30 text-green-500 text-xs font-mono uppercase tracking-widest hover:bg-green-500/10 transition-colors rounded-sm">
                Hire_Me
              </button>
            </div>

            {/* Hamburger Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative z-40 w-10 h-10 flex flex-col justify-center items-end gap-1.5 group"
            >
              <motion.span 
                animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }} 
                className={`w-8 h-[2px] block origin-center transition-colors ${isOpen ? 'bg-green-500' : 'bg-[#e7e6d9] group-hover:bg-green-500'}`}
              />
              <motion.span 
                animate={{ opacity: isOpen ? 0 : 1 }} 
                className="w-6 h-[2px] bg-[#e7e6d9] block transition-colors group-hover:bg-green-500"
              />
              <motion.span 
                animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0, width: isOpen ? 32 : 16 }} 
                className={`w-4 h-[2px] block origin-center transition-colors ${isOpen ? 'bg-green-500' : 'bg-[#e7e6d9] group-hover:bg-green-500'}`}
              />
            </button>

          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 bg-[#0b0b0b] flex flex-col justify-center px-6"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
            
            {/* Menu Items Container */}
            <div className="flex flex-col gap-6 relative z-10">
              {["Home", "Work", "Services", "About", "Contact"].map((item, i) => (
                <MobileScrambleLink 
                  key={item}
                  label={item}
                  href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
                  index={i}
                  onClick={() => setIsOpen(false)}
                />
              ))}
            </div>

            {/* Bottom Info */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-12 left-6 right-6 flex justify-between border-t border-white/10 pt-6 font-mono text-xs text-white/40 uppercase tracking-widest"
            >
              <div>
                <p>Nairobi, KE</p>
                <p className="text-green-500">System: Online</p>
              </div>
              <div className="text-right">
                <p>Moses Chengo</p>
                <p>© 2026</p>
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}