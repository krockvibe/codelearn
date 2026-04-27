"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/lessons", label: "Lessons" },
  { href: "/practice", label: "Practice" },
  { href: "/progress", label: "Progress" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [progress, setProgress] = useState({ completed: 0, total: 5 });
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("codelearn_progress");
    if (stored) {
      const data = JSON.parse(stored);
      setProgress({
        completed: data.completedLessons?.length || 0,
        total: 5,
      });
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("codelearn_theme");
    setDarkMode(stored !== "light");
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("codelearn_theme", newMode ? "dark" : "light");
  };

  const percentage = Math.round((progress.completed / progress.total) * 100);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f14]/95 backdrop-blur-xl border-b border-[#2d2d3a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#569cd6] to-[#4ec9b0] rounded-lg flex items-center justify-center">
              <span className="text-[#0f0f14] font-bold text-sm">CL</span>
            </div>
            <span className="text-lg font-bold text-[#d4d4d4] hidden sm:block">
              Code<span className="text-[#569cd6]">Learn</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-[#569cd6]/15 text-[#569cd6]"
                    : "text-[#6a6a6a] hover:text-[#d4d4d4]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Terminal-like indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[#1e1e28] rounded-md border border-[#2d2d3a]">
              <span className="w-2 h-2 bg-[#6a9955] rounded-full" />
              <span className="text-xs text-[#6a6a6a] font-mono">~/</span>
            </div>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-md bg-[#1e1e28] border border-[#2d2d3a] flex items-center justify-center hover:border-[#569cd6] transition-colors"
              title={darkMode ? "Light mode" : "Dark mode"}
            >
              {darkMode ? (
                <svg className="w-4 h-4 text-[#cca700]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-[#6a6a6a]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Progress */}
            <div className="relative w-8 h-8">
              <svg className="w-8 h-8 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" fill="none" stroke="#2d2d3a" strokeWidth="3" />
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="url(#progressGrad)"
                  strokeWidth="3"
                  strokeDasharray={`${percentage * 0.94}, 100`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#569cd6" />
                    <stop offset="100%" stopColor="#4ec9b0" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-[#d4d4d4]">
                {percentage}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}