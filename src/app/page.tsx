"use client";

import Link from "next/link";
import { lessons } from "@/data/lessons";
import { useEffect, useState, useCallback } from "react";

const features = [
  { icon: "📚", title: "Structured Lessons", desc: "Learn step by step with clear examples", tag: "Beginner" },
  { icon: "⌨️", title: "Code Editor", desc: "Write JS directly in your browser", tag: "Interactive" },
  { icon: "🎯", title: "Practice", desc: "Challenge yourself with exercises", tag: "Hands-on" },
  { icon: "📈", title: "Track Progress", desc: "Monitor your growth", tag: "Analytics" },
];

const heroCode = `// Welcome to CodeLearn 🚀
function learnToCode() {
  const skills = ["JS", "Logic"];
  const practice = "daily";
  
  return skills.every(s => 
    practice === "daily"
  );
}

// Start your journey!
learnToCode();
console.log("Hello, Developer!");`;

const heroSlides = [
  { code: "console.log('Hello, World!');", output: "Hello, World!" },
  { code: "let x = 5; x * 2;", output: "10" },
  { code: "[1,2,3].map(x => x*2)", output: "[2, 4, 6]" },
  { code: "async function learn() {}", output: "undefined" },
];

const codeKeywords = [
  { word: "function", class: "syntax-keyword" },
  { word: "const", class: "syntax-keyword" },
  { word: "let", class: "syntax-keyword" },
  { word: "return", class: "syntax-keyword" },
  { word: "console.log", class: "syntax-function" },
  { word: '"Hello, World!"', class: "syntax-string" },
  { word: "5", class: "syntax-number" },
  { word: "=>", class: "syntax-function" },
];

export default function Home() {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("codelearn_progress");
    if (stored) {
      const data = JSON.parse(stored);
      setCompletedLessons(data.completedLessons || []);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      forceUpdate(n => n + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 pt-16">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#569cd6]/5 via-transparent to-[#4ec9b0]/5" />
        <div className="absolute top-20 left-1/3 w-[600px] h-[600px] bg-[#569cd6]/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-[#4ec9b0]/8 rounded-full blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-3 bg-[#569cd6]/10 border border-[#569cd6]/25 px-4 py-2 rounded-full mb-8">
                <span className="w-2 h-2 bg-[#6a9955] rounded-full animate-pulse" />
                <span className="text-sm font-medium text-[#569cd6]">Free for beginners • No setup required</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-[#d4d4d4]">Learn to </span>
                <span className="text-gradient-dev">Code</span>
                <span className="block text-[#d4d4d4] mt-2">Like a Developer</span>
              </h1>
              
              <p className="text-[#6a6a6a] text-lg mb-10 max-w-xl">
                Interactive lessons, terminal-style code editor, 
                and hands-on practice. Master JavaScript from scratch.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/lessons" className="dev-button inline-flex items-center justify-center gap-2">
                  <span>▶</span> Start Coding
                </Link>
                <Link href="/practice" className="dev-button-secondary inline-flex items-center justify-center gap-2">
                  View Curriculum
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-12 pt-8 border-t border-[#2d2d3a]">
                {[
                  { value: "5", label: "Lessons", color: "#569cd6" },
                  { value: "12+", label: "Exercises", color: "#4ec9b0" },
                  { value: "100%", label: "Free", color: "#6a9955" },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                    <div className="text-sm text-[#6a6a6a]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Terminal */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#569cd6] to-[#4ec9b0] rounded-2xl blur-xl opacity-20" />
                <div className="relative dev-card overflow-hidden">
                  {/* Terminal Header */}
                  <div className="terminal-header">
                    <span className="terminal-btn bg-[#f14c4c]" />
                    <span className="terminal-btn bg-[#cca700]" />
                    <span className="terminal-btn bg-[#6a9955]" />
                    <span className="ml-4 text-[#6a6a6a] text-sm font-mono">main.js</span>
                  </div>
                  
                  {/* Terminal Body */}
                  <div className="terminal-body">
                    {heroSlides.map((slide, index) => (
                      <div
                        key={index}
                        className={`transition-all duration-500 ${
                          index === currentSlide 
                            ? "opacity-100" 
                            : "opacity-0 absolute"
                        }`}
                      >
                        <div className="flex gap-2">
                          <span className="text-[#6a6a6a] select-none">1</span>
                          <span className="text-[#d4d4d4]">{slide.code}</span>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <span className="text-[#6a6a6a] select-none">▶</span>
                          <span className="text-[#4ec9b0]">{slide.output}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 p-3 bg-[#1e1e28] rounded-lg border border-[#2d2d3a] animate-float">
                  <span className="text-2xl">⚡</span>
                </div>
                <div className="absolute -bottom-4 -left-4 p-3 bg-[#1e1e28] rounded-lg border border-[#2d2d3a] animate-float" style={{ animationDelay: "1s" }}>
                  <span className="text-xl">🚀</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-[#14141c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#d4d4d4]">Everything You Need</h2>
            <p className="text-[#6a6a6a] mt-4">A complete dev environment in your browser</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="dev-card p-6">
                <span className="text-3xl mb-3 block">{feature.icon}</span>
                <h3 className="text-[#d4d4d4] font-semibold mb-2">{feature.title}</h3>
                <p className="text-[#6a6a6a] text-sm mb-3">{feature.desc}</p>
                <span className={`dev-badge dev-badge-${feature.tag === "Beginner" ? "blue" : feature.tag === "Interactive" ? "green" : feature.tag === "Hands-on" ? "orange" : "purple"}`}>
                  {feature.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lessons */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-[#d4d4d4]">Lessons</h2>
              <p className="text-[#6a6a6a] mt-2">Start your journey here</p>
            </div>
            <Link href="/lessons" className="dev-button-secondary hidden md:inline-flex">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.slice(0, 6).map((lesson) => {
              const isCompleted = completedLessons.includes(lesson.id);
              return (
                <Link
                  key={lesson.id}
                  href={`/lessons/${lesson.id}`}
                  className="dev-card p-6 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{lesson.icon}</span>
                    {isCompleted && (
                      <span className="dev-badge dev-badge-green">✓</span>
                    )}
                  </div>
                  <h3 className="text-[#d4d4d4] font-semibold mb-2 group-hover:text-[#569cd6] transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="text-[#6a6a6a] text-sm mb-3 line-clamp-1">{lesson.description}</p>
                  <span className={`dev-badge ${
                    lesson.difficulty === "Beginner" ? "dev-badge-green" : "dev-badge-orange"
                  }`}>
                    {lesson.difficulty}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#569cd6]/10 via-[#14141c] to-[#4ec9b0]/10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#d4d4d4] mb-6">
            Ready to Start Coding?
          </h2>
          <p className="text-[#6a6a6a] text-lg mb-10">
            Join thousands learning to code. Start now - it's free!
          </p>
          <Link href="/lessons" className="dev-button inline-flex items-center gap-2">
            <span>▶</span> Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}