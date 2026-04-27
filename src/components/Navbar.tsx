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
    if (stored) {
      setDarkMode(stored === "dark");
      if (stored === "light") {
        document.documentElement.classList.add("light");
      }
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("codelearn_theme", newMode ? "dark" : "light");
    if (newMode) {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

  const percentage = Math.round((progress.completed / progress.total) * 100);
  const bgClass = darkMode ? "bg-[#0a0a0f]/80" : "bg-white/80";
  const borderClass = darkMode ? "border-[#2e2e3a]" : "border-slate-200";
  const textClass = darkMode ? "text-white" : "text-slate-900";
  const mutedClass = darkMode ? "text-[#94a3b8]" : "text-slate-600";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${bgClass} backdrop-blur-xl border-b ${borderClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#6366f1] to-[#f472b6] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CL</span>
            </div>
            <span className={`text-xl font-bold bg-gradient-to-r from-[#6366f1] via-[#22d3ee] to-[#f472b6] bg-clip-text text-transparent ${!darkMode && "text-slate-900"}`}>
              CodeLearn
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors relative ${
                  pathname === link.href
                    ? textClass
                    : `${mutedClass} hover:${textClass}`
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#6366f1] to-[#22d3ee] rounded-full" />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`w-10 h-10 rounded-lg border flex items-center justify-center hover:border-[#6366f1] transition-colors ${
                darkMode ? "bg-[#1a1a24] border-[#2e2e3a]" : "bg-slate-100 border-slate-200"
              }`}
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            <div className="relative w-10 h-10">
              <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke={darkMode ? "#2e2e3a" : "#e2e8f0"}
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="3"
                  strokeDasharray={`${percentage * 0.94}, 100`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
              </svg>
              <span className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${textClass}`}>
                {percentage}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}