"use client";
import { createContext, useContext, useState } from "react";

type TerminalContextType = {
  isOpen: boolean;
  toggleTerminal: () => void;
};

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleTerminal = () => setIsOpen((prev) => !prev);

  return (
    <TerminalContext.Provider value={{ isOpen, toggleTerminal }}>
      {children}
    </TerminalContext.Provider>
  );
}

export const useTerminal = () => {
  const context = useContext(TerminalContext);
  if (!context) throw new Error("useTerminal must be used within a TerminalProvider");
  return context;
};