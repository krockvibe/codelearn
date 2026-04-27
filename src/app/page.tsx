"use client";

import Link from "next/link";
import { lessons } from "@/data/lessons";
import { useEffect, useState, useCallback } from "react";

const features = [
  { icon: "📚", title: "Interactive Lessons", desc: "Learn by doing with hands-on examples" },
  { icon: "💻", title: "Code Editor", desc: "Write and run JavaScript in your browser" },
  { icon: "🎯", title: "Practice Challenges", desc: "Test your knowledge with exercises" },
  { icon: "📊", title: "Track Progress", desc: "Monitor your learning journey" },
];

const heroSlides = [
  { icon: "💻", title: "Write Code", desc: "Create with JavaScript" },
  { icon: "🧠", title: "Learn Logic", desc: "Build problem skills" },
  { icon: "🚀", title: "Build Projects", desc: "Apply your knowledge" },
  { icon: "⚡", title: "Go Live", desc: "Deploy anywhere" },
];

export default function Home() {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("codelearn_progress");
    if (stored) {
      const data = JSON.parse(stored);
      setCompletedLessons(data.completedLessons || []);
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("codelearn_theme");
    setDarkMode(stored === "dark");
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const colors = {
    bg: darkMode ? "var(--bg-dark)" : "var(--bg-dark)",
    textPrimary: darkMode ? "#f1f5f9" : "#ffffff",
    textSecondary: darkMode ? "#94a3b8" : "#94a3b8",
    card: darkMode ? "var(--bg-card)" : "#1e1e2a",
    cardBg: darkMode ? "var(--bg-surface)" : "#16161d",
    border: darkMode ? "var(--border)" : "#2a2a3a",
  };

  return (
    <div className="flex-1 pt-16">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed]/20 via-transparent to-[#06b6d4]/10" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#7c3aed]/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#06b6d4]/10 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left animate-slide-up">
              <div className="inline-flex items-center gap-3 bg-[#7c3aed]/15 border border-[#7c3aed]/30 px-4 py-2 rounded-full mb-8">
                <span className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse" />
                <span className="text-sm font-medium text-[#a78bfa]">Free for beginners</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
                <span className="text-white">Master </span>
                <span className="text-gradient">Programming</span>
                <span className="block text-white mt-2">from Scratch</span>
              </h1>
              
              <p className="text-lg md:text-xl text-[#94a3b8] mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Learn coding through interactive lessons, hands-on practice, 
                and real-time code execution. No experience needed.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/lessons" className="btn-primary inline-flex items-center justify-center gap-2">
                  Start Learning Free
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/practice" className="btn-secondary inline-flex items-center justify-center gap-2">
                  View Curriculum
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-12 pt-8 border-t border-[#2a2a3a] justify-center lg:justify-start">
                {[
                  { value: "5", label: "Lessons" },
                  { value: "12+", label: "Exercises" },
                  { value: "100%", label: "Free" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-[#64748b]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Animated Card */}
            <div className="hidden lg:block relative">
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] rounded-[40px] blur-2xl opacity-40" />
                <div className="relative bg-[#16161d] border border-[#2a2a3a] rounded-3xl p-10 min-h-[360px] overflow-hidden">
                  {/* Code Preview */}
                  <div className="absolute top-6 left-6 right-6 h-40 bg-[#0d0d12] rounded-xl p-4 font-mono text-sm border border-[#2a2a3a]">
                    <div className="flex gap-2 mb-3">
                      <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
                      <span className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                      <span className="w-3 h-3 rounded-full bg-[#10b981]" />
                    </div>
                    <pre className="text-[#22d3ee] text-xs leading-relaxed">
{`// Start learning!
const learn = true;
const practice = "daily";

function success() {
  return learn && practice;
}

console.log("Hello, World!");`}
                    </pre>
                  </div>

                  {/* Slides */}
                  {heroSlides.map((slide, index) => (
                    <div
                      key={index}
                      className={`absolute bottom-10 left-6 right-6 transition-all duration-700 ${
                        index === currentSlide 
                          ? "opacity-100 translate-y-0" 
                          : "opacity-0 translate-y-4"
                      }`}
                    >
                      <div className="flex items-center gap-4 p-4 bg-[#1e1e2a] rounded-xl border border-[#2a2a3a]">
                        <span className="text-4xl">{slide.icon}</span>
                        <div>
                          <div className="font-semibold text-white">{slide.title}</div>
                          <div className="text-sm text-[#64748b]">{slide.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Dots */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {heroSlides.map((_, index) => (
                      <div
                        key={index}
                        className={`h-1.5 rounded-full transition-all ${
                          index === currentSlide 
                            ? "w-6 bg-[#7c3aed]" 
                            : "w-1.5 bg-[#2a2a3a]"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#16161d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="badge badge-primary mb-4">Why CodeLearn</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">Everything You Need to Learn</h2>
            <p className="text-[#64748b] mt-4 max-w-xl mx-auto">
              A complete learning platform designed specifically for beginners
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="card-elevated p-6 rounded-2xl animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-[#64748b] text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lessons Preview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white">Featured Lessons</h2>
              <p className="text-[#64748b] mt-2">Start with the basics</p>
            </div>
            <Link href="/lessons" className="btn-secondary hidden md:inline-flex">
              View All Lessons
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.slice(0, 6).map((lesson, index) => {
              const isCompleted = completedLessons.includes(lesson.id);
              return (
                <Link
                  key={lesson.id}
                  href={`/lessons/${lesson.id}`}
                  className="card-elevated p-6 rounded-2xl group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{lesson.icon}</span>
                    {isCompleted && (
                      <span className="badge badge-success">✓ Complete</span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#7c3aed] transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="text-[#64748b] text-sm mb-4 line-clamp-2">{lesson.description}</p>
                  <span className={`badge ${
                    lesson.difficulty === "Beginner" 
                      ? "badge-success" 
                      : "badge-warning"
                  }`}>
                    {lesson.difficulty}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link href="/lessons" className="btn-secondary">
              View All Lessons
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#7c3aed]/20 via-[#16161d] to-[#06b6d4]/10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-[#64748b] text-lg mb-10">
            Join thousands of beginners who are already learning to code. 
            Start today - it's completely free!
          </p>
          <Link href="/lessons" className="btn-primary inline-flex items-center gap-2 text-lg px-10 py-5">
            Get Started Now
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}