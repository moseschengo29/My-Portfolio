"use client";

import StackedSection from "../layout/StackedSection";

export default function Footer() {
  return (
   
    <StackedSection id="contact" className="z-50 bg-transparent border-none shadow-none">
      

      <div className="bg-[#0a0a0a] max-h-screen w-full rounded-t-[3rem] px-6 md:px-20 py-20 flex flex-col justify-between border-t border-white/10">
        
        <div className="max-w-[1800px] mx-auto w-full">
          
          {/* Top Row */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-24">
            
            {/* CTA */}
            <div className="max-w-3xl">
              <h2 className="reveal-text text-[80px] md:text-8xl font-bold tracking-tighter mb-12 leading-[0.9]">
                Let&apos;s make something <span className="text-gray-600">impossible.</span>
              </h2>
              <a 
                href="mailto:hello@moseschengo.com" 
                className="reveal-text inline-block border border-white/20 px-8 py-4 rounded-full text-xl md:text-2xl font-mono hover:bg-[#e7e6d9] hover:text-black hover:border-gray-400 transition-all duration-300 group"
              >
                hello@moseschengo.com
                <span className="inline-block ml-3 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
              </a>
            </div>
            
            {/* Links */}
            <div className="mt-16 md:mt-0 flex gap-20 font-mono text-sm uppercase tracking-widest">
              <div className="flex flex-col gap-6 ">
                <span className="text-green-500">{'// Socials'}</span>
                <a href="#" className="hover:text-green-500 transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-green-500 transition-colors">GitHub</a>
                <a href="#" className="hover:text-green-500 transition-colors">Instagram</a>
              </div>
              <div className="flex flex-col gap-6">
                <span className="text-green-500">{'// Menu'}</span>
                <a href="#work" className="hover:text-green-500 transition-colors">Work</a>
                <a href="#about" className="hover:text-green-500 transition-colors">About</a>
                <a href="#contact" className="hover:text-green-500 transition-colors">Contact</a>
              </div>
            </div>
          </div>
  
          {/* Bottom Row */}
          <div className="flex justify-between items-end border-t border-white/10 pt-10">
            {/* Massive Footer Brand Name */}
            <h1 className="text-[12vw] leading-[0.7] font-bold tracking-tighter text-[#1a1a1a] select-none mix-blend-difference">
              CHENGO
            </h1>
            
            <div className="hidden md:block text-right font-mono text-xs text-white/40">
              <p>Code by Moses Chengo</p>
              <p>Nairobi, Kenya</p>
              <p>© {new Date().getFullYear()}</p>
            </div>
          </div>

        </div>
      </div>
    </StackedSection>
  );
}