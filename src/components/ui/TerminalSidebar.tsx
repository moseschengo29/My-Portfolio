"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { PROJECTS_DB } from "@/src/utils/constants";

// --- DATA: Project Registry ---


// --- TYPES ---
type LogType = "info" | "success" | "error" | "warning" | "command" | "link";
interface LogEntry {
  id: string;
  text: string;
  type: LogType;
  timestamp: string;
  action?: () => void;
}

// --- CONFIG: Boot & Commands ---
const BOOT_SEQUENCE = [
  { text: `Session ID: moses-dev-${new Date().getFullYear()}-root`, type: "info" },
  { text: "Agent handshake initialized...", type: "success" },
  { text: "Human session detected (Nairobi_Node)", type: "success" },
  { text: "Primary CTA detected - 'Hire Developer'", type: "success" },
  { text: "Type '/help' to see available commands.", type: "warning" },
];

const AVAILABLE_COMMANDS = [
  { cmd: "/help", desc: "List all commands" },
  { cmd: "/projects", desc: "View project directory" },
  { cmd: "/cv", desc: "Download Resume" },
  { cmd: "/contact", desc: "Get contact details" },
  { cmd: "/whatsapp", desc: "Open WhatsApp Chat" },
  { cmd: "/call", desc: "Initiate Phone Call" },
  { cmd: "/clear", desc: "Clear terminal history" },
  { cmd: "/home", desc: "Navigate to home" },
];

export default function TerminalSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasRunBoot = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      // Prevent background scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Restore scrolling
      document.body.style.overflow = "";
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // --- LOGGING ENGINE ---
  const addLog = useCallback((text: string, type: LogType, action?: () => void) => {
    setLogs(prev => [...prev, {
      id: Math.random().toString(36).substr(2, 9),
      text,
      type,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      action
    }]);
  }, []);

  // --- COMMAND PROCESSOR ---
  const processCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    
    // 1. Log the user's input
    addLog(`> ${cleanCmd}`, "command");

    // 2. Execute Logic
    switch (cleanCmd) {
      case "/help":
        addLog("AVAILABLE COMMANDS:", "info");
        AVAILABLE_COMMANDS.forEach(c => {
          addLog(`${c.cmd} - ${c.desc}`, "info");
        });
        break;

      case "/clear":
        setLogs([]);
        addLog("Console cleared.", "success");
        break;

        case "/projects":
          addLog("FETCHING PROJECT INDEX...", "warning");
          setTimeout(() => {
            addLog("--- PROJECT DIRECTORY ---", "info");
            PROJECTS_DB.forEach(p => {
              addLog(`[DIR] ${p.name} (/${p.id})`, "link", () => {
                addLog(`Opening ${p.name} in new sequence...`, "success");
                
                window.open(p.path, "_blank"); 

              });
            });
            addLog("Click a project to view details.", "info");
          }, 500);
          break;

      case "/cv":
        addLog("Initiating download sequence...", "warning");
        setTimeout(() => {
          const link = document.createElement('a');
          link.href = '/CV - Moses Chengo Mwapahe.pdf'; // Ensure this file exists in public/
          link.download = 'Moses_Chengo_CV.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          addLog("Download complete.", "success");
        }, 800);
        break;

      case "/contact":
        addLog("CONTACT DETAILS:", "info");
        addLog("Email: hello@moses.dev", "link", () => window.location.href = "mailto:hello@moses.dev");
        addLog("Phone: +254 115 824 803", "link", () => window.location.href = "tel:+254115824803");
        break;

      case "/whatsapp":
        addLog("Opening encrypted channel (WhatsApp)...", "success");
        setTimeout(() => window.open("https://wa.me/254115824803", "_blank"), 500);
        break;

      case "/call":
        addLog("Dialing secure line (+254)...", "success");
        setTimeout(() => window.location.href = "tel:+254115824803", 500);
        break;
        
      case "/home":
        router.push("/");
        setIsOpen(false);
        break;

      default:
        // Handle specific project commands (e.g. /fintech)
        const projectMatch = PROJECTS_DB.find(p => `/${p.id}` === cleanCmd);
        if (projectMatch) {
            addLog(`Navigating to ${projectMatch.name}...`, "success");
            router.push(projectMatch.path);
            setIsOpen(false);
        } else {
            addLog(`Command not found: '${cleanCmd}'`, "error");
            addLog("Type '/help' for a list of commands.", "warning");
        }
    }
  };

  // --- SUBMIT HANDLER ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    processCommand(input);
    setInput("");
    setShowSuggestions(false);
  };

  // --- BOOT SEQUENCE ---
  useEffect(() => {
    if (isOpen && !hasRunBoot.current) {
      hasRunBoot.current = true;
      let delay = 0;
      BOOT_SEQUENCE.forEach((line) => {
        setTimeout(() => addLog(line.text, line.type as LogType), delay);
        delay += 600;
      });
      setTimeout(() => inputRef.current?.focus(), delay + 500);
    }
  }, [isOpen, addLog]);

  // --- AUTO-SCROLL ---
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // --- FILTER SUGGESTIONS ---
  const filteredCommands = AVAILABLE_COMMANDS.filter(c => 
    c.cmd.startsWith(input.toLowerCase())
  );

  return (
    <>
      {/* 1. SIDEBAR TRIGGER */}
      <div 
        onClick={() => setIsOpen(true)}
        className={`fixed top-0 right-0 h-full w-14 bg-[#050505] border-l border-white/5 z-40 flex flex-col items-center justify-center cursor-pointer transition-transform duration-500 hover:bg-white/5 group ${isOpen ? 'translate-x-full' : 'translate-x-0'}`}
      >
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <div className="rotate-90 whitespace-nowrap font-mono text-[10px] text-white/40 tracking-[0.2em] uppercase flex items-center gap-4">
          <span className="animate-pulse text-green-500 text-xs">●</span>
          <span>{'// Click To Use Terminal Agent//'}</span>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </div>

      {/* 2. MAIN WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full md:w-[600px] bg-[#0c0c0c] border-l border-white/10 z-50 shadow-2xl flex flex-col font-mono"
            >
              
              {/* HEADER */}
              <div className="flex items-center justify-between px-6 py-4 bg-[#111] border-b border-white/5">
                <div className="flex items-center gap-2">
                  <button onClick={() => setIsOpen(false)} className="w-3 h-3 rounded-full bg-[#FF5F56] hover:brightness-75" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                <div className="text-white/20 text-xs tracking-widest uppercase">
                  guest@moses-portfolio: ~
                </div>
                <div className="w-10" />
              </div>

              {/* LOGS AREA */}
              <div 
                className="flex-1 p-6 overflow-y-auto text-sm space-y-2 scrollbar-hide"
                onClick={() => inputRef.current?.focus()} 
              >
                {logs.map((log) => (
                  <div 
                    key={log.id} 
                    className={`flex gap-3 font-mono leading-relaxed break-words ${
                        log.action ? "cursor-pointer hover:bg-white/5 p-1 rounded transition-colors" : ""
                    }`}
                    onClick={log.action}
                  >
                    <span className="opacity-30 select-none shrink-0 text-xs pt-1">{log.timestamp}</span>
                    <div className={`flex-1 ${
                      log.type === 'error' ? 'text-red-500' : 
                      log.type === 'success' ? 'text-green-400' : 
                      log.type === 'warning' ? 'text-yellow-400' : 
                      log.type === 'link' ? 'text-blue-400 underline decoration-blue-400/30 underline-offset-4' :
                      log.type === 'command' ? 'text-white font-bold opacity-50' :
                      'text-white/80'
                    }`}>
                      {log.type !== 'command' && log.type !== 'link' ? (
                          <Typewriter text={log.text} speed={5} />
                      ) : (
                          <span>{log.text}</span>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* INPUT AREA */}
              <div className="p-4 bg-[#0a0a0a] border-t border-white/10 relative z-20">
                {/* Suggestions Popup */}
                <AnimatePresence>
                  {showSuggestions && input.startsWith("/") && filteredCommands.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="fixed bottom-0 right-0 w-full h-[85vh] lg:h-full lg:w-[600px] bg-[#0c0c0c] border-t lg:border-t-0 lg:border-l border-white/10 z-[70] shadow-2xl flex flex-col font-mono rounded-t-3xl lg:rounded-none"
                        >
                        {filteredCommands.map((c) => (
                            <button
                                key={c.cmd}
                                onClick={() => {
                                    setInput(c.cmd);
                                    inputRef.current?.focus();
                                    setShowSuggestions(false);
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-green-500/10 hover:text-green-400 text-white/60 text-xs font-mono flex justify-between"
                            >
                                <span>{c.cmd}</span>
                                <span className="opacity-50">{c.desc}</span>
                            </button>
                        ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="flex gap-2 items-center">
                  <span className="text-green-500 font-bold">{">"}</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                        setShowSuggestions(e.target.value.startsWith("/"));
                    }}
                    placeholder="Type /help..."
                    className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm placeholder:text-white/20"
                    autoComplete="off"
                    autoFocus
                  />
                </form>
              </div>

              {/* QUICK ACTIONS FOOTER */}
              <div className="p-6 bg-[#0a0a0a] border-t border-white/5">
                <p className="text-white/30 text-[10px] uppercase tracking-widest mb-4">
                  {'// QUICK COMMANDS (PRESS KEY OR CLICK)'}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <TerminalButton 
                    label="Download CV" 
                    hotkey="D" 
                    onClick={() => processCommand("DOWNLOAD_CV")} 
                  />
                  <TerminalButton 
                    label="WhatsApp Chat" 
                    hotkey="W" 
                    onClick={() => processCommand("WHATSAPP")} 
                  />
                  <TerminalButton 
                    label="Phone Call" 
                    hotkey="P" 
                    onClick={() => processCommand("CALL_ME")} 
                  />
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// --- SUB-COMPONENTS ---
function Typewriter({ text, speed = 10 }: { text: string; speed?: number }) {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplay(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return <span>{display}</span>;
}

function TerminalButton({ label, hotkey, onClick }: { label: string, hotkey: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="group flex flex-col items-center justify-center p-3 bg-white/5 border border-white/5 rounded hover:border-green-500/30 hover:bg-green-500/5 transition-all"
    >
      <span className="text-[10px] font-mono text-white/20 bg-white/5 px-1.5 py-0.5 rounded group-hover:text-green-500 group-hover:bg-green-500/10 mb-1">
        [{hotkey}]
      </span>
      <span className="text-white/60 text-xs font-mono group-hover:text-green-400 transition-colors">
        {label}
      </span>
    </button>
  );
}