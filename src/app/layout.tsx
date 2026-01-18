import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { TerminalProvider } from "../components/context/TerminalContext";
import TerminalSidebar from "../components/ui/TerminalSidebar";
import SmoothScroll from "../components/layout/SmoothScroll";
import SocialSidebar from "../components/sections/SocialSidebar";
// Remove SmoothScroll import

const suisse = localFont({
  src: [
    { path: '../../public/fonts/SuisseIntl/Suisse_Intl_Regular.ttf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/SuisseIntl/Suisse_Intl_Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-suisse',
  display: 'swap',
});

const suisseMono = localFont({
  src: [
    { path: '../../public/fonts/SuisseIntl/Suisse_Intl_Mono.ttf', weight: '400', style: 'normal' },
  ],
  variable: '--font-suisse-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Moses Chengo | Creative Developer",
  description: "Portfolio of Moses Chengo, Kenyan Full Stack Developer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${suisse.variable} ${suisseMono.variable} antialiased overflow-x-hidden`}>
        {/* We removed SmoothScroll Wrapper */}
        <TerminalSidebar />
        <SocialSidebar />
          <div className="noise-overlay" /> {/* The Expensive Grain */}
          <SmoothScroll>
          {children}
        </SmoothScroll>
          
      </body>
    </html>
  );
}