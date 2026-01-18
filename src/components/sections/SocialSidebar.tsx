"use client";
import { motion } from "framer-motion";
import { 
  SiGithub, 
  SiLinkedin, 
  SiInstagram, 
  SiX 
} from "react-icons/si";

const SOCIALS = [
  { id: 1, name: "GitHub", icon: SiGithub, url: "https://github.com/moseschengo29/" },
  { id: 2, name: "LinkedIn", icon: SiLinkedin, url: "https://linkedin.com/in/moses-chengo" },
  { id: 3, name: "Instagram", icon: SiInstagram, url: "http://instagram.com/chengoctrrl" },
  { id: 4, name: "X", icon: SiX, url: "https://x.com/ch5ngo" },
];

export default function SocialSidebar() {
  return (
    // Added 'hidden lg:flex' to hide on mobile/tablet and show only on Desktop
    <div className="fixed left-0 top-0 h-full w-14 z-40 hidden lg:flex flex-col items-center justify-end pb-12 pointer-events-none">
      
      {/* 1. Rotated System Label */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="-rotate-90 origin-center mb-40" // Adjusted rotation for left side
      >
        <span className="font-mono text-[10px] text-white/20 uppercase tracking-[0.4em] whitespace-nowrap">
          Connect_External_Nodes
        </span>
      </motion.div>

      {/* 2. Social Icons Container */}
      <div className="flex flex-col gap-9 pointer-events-auto">
        {SOCIALS.map((social, index) => (
          <motion.a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + index * 0.1 }}
            className="group relative flex items-center justify-center"
          >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-green-500/10 blur-xl rounded-full scale-0 group-hover:scale-[2.5] transition-transform duration-700" />
            
            {/* Icon Opacity Transition */}
            <social.icon 
              size={18} 
              className="relative z-10 text-white/20 group-hover:text-green-500 group-hover:opacity-100 transition-all duration-300" 
            />
            
            {/* Tooltip (Positioned to the right since sidebar is on the left) */}
            <span className="absolute left-10 font-mono text-[9px] text-green-500 opacity-0 group-hover:opacity-100 transition-all duration-300 uppercase tracking-[0.2em] whitespace-nowrap pointer-events-none translate-x-2 group-hover:translate-x-0">
              {social.name}
            </span>
          </motion.a>
        ))}
      </div>

      {/* 3. The Vertical Border/Line */}
      <motion.div 
        initial={{ height: 0 }}
        animate={{ height: "12vh" }}
        transition={{ delay: 0.8, duration: 1, ease: "circOut" }}
        className="w-[1px] bg-gradient-to-b from-white/40 to-transparent mt-12 pointer-events-none"
      />
    </div>
  );
}