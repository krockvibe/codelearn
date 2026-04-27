"use client";

import Link from "next/link";
import { lessons } from "@/data/lessons";
import { useEffect, useState } from "react";

export default function Home() {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("codelearn_progress");
    if (stored) {
      const data = JSON.parse(stored);
      setCompletedLessons(data.completedLessons || []);
    }
  }, []);

  return (
    <div className="flex-1 pt-16">
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/10 via-transparent to-[#f472b6]/10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#6366f1]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#f472b6]/20 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#6366f1]/20 px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-[#34d399] rounded-full animate-pulse" />
              <span className="text-sm font-medium text-[#94a3b8]">Start learning programming today</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Learn to </span>
              <span className="bg-gradient-to-r from-[#6366f1] via-[#22d3ee] to-[#f472b6] bg-clip-text text-transparent">
                Code
              </span>
              <span className="block text-white">the Right Way</span>
            </h1>
            
            <p className="text-lg md:text-xl text-[#94a3b8] mb-10 max-w-2xl mx-auto leading-relaxed">
              Interactive lessons, hands-on practice, and real-time code execution.
              Master programming from zero to hero at your own pace.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/lessons"
                className="px-8 py-4 bg-gradient-to-r from-[#6366f1] to-[#818cf8] text-white font-semibold rounded-full hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2"
              >
                Start Learning
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/practice"
                className="px-8 py-4 border-2 border-[#2e2e3a] text-white font-semibold rounded-full hover:border-[#6366f1] hover:text-[#6366f1] transition-colors inline-flex items-center justify-center gap-2"
              >
                Practice Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#12121a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "5", label: "Core Lessons", icon: "📚" },
              { value: "12+", label: "Exercises", icon: "💪" },
              { value: "100%", label: "Free Forever", icon: "🎉" },
              { value: "0", label: "Setup Required", icon: "⚡" },
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-[#1a1a24] rounded-xl border border-[#2e2e3a]">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-[#64748b] text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#6366f1] font-semibold text-sm uppercase tracking-wider">Lessons</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Start Your Journey</h2>
            <p className="text-[#64748b] mt-4 max-w-xl mx-auto">
              Learn programming fundamentals step by step with interactive lessons designed for complete beginners.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson, index) => {
              const isCompleted = completedLessons.includes(lesson.id);
              return (
                <Link
                  key={lesson.id}
                  href={`/lessons/${lesson.id}`}
                  className="group bg-[#12121a] rounded-xl p-6 border border-[#2e2e3a] hover:border-[#6366f1] transition-all hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{lesson.icon}</div>
                    {isCompleted && (
                      <span className="w-8 h-8 bg-[#34d399]/20 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-[#34d399]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#6366f1] transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="text-[#64748b] text-sm mb-4">{lesson.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      lesson.difficulty === "Beginner" 
                        ? "bg-[#34d399]/20 text-[#34d399]" 
                        : "bg-[#fbbf24]/20 text-[#fbbf24]"
                    }`}>
                      {lesson.difficulty}
                    </span>
                    <span className="text-[#6366f1] text-sm group-hover:translate-x-1 transition-transform">
                      Start →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#12121a] to-[#0a0a0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#22d3ee] font-semibold text-sm uppercase tracking-wider">Code Playground</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-6">
                Learn by Doing
              </h2>
              <p className="text-[#64748b] mb-8 leading-relaxed">
                Write code directly in your browser and see instant results. 
                Our interactive code editor lets you experiment with JavaScript 
                and learn from your mistakes in real-time.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Instant feedback on your code",
                  "No installation required",
                  "Beginner-friendly examples",
                  "Learn JavaScript basics"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#94a3b8]">
                    <span className="w-6 h-6 bg-[#34d399]/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#34d399]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/lessons/1"
                className="inline-flex items-center gap-2 text-[#6366f1] font-semibold hover:gap-3 transition-all"
              >
                Try First Lesson
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#f472b6] rounded-xl blur-2xl opacity-30" />
              <div className="relative bg-[#12121a] rounded-xl overflow-hidden border border-[#2e2e3a]">
                <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a24] border-b border-[#2e2e3a]">
                  <div className="w-3 h-3 rounded-full bg-[#f87171]" />
                  <div className="w-3 h-3 rounded-full bg-[#fbbf24]" />
                  <div className="w-3 h-3 rounded-full bg-[#34d399]" />
                </div>
                <pre className="p-4 text-sm font-mono text-[#22d3ee] overflow-x-auto">
{`// Your first program!
console.log("Hello, World!");

// Variables
let name = "Developer";
let skills = ["JavaScript"];

console.log("Welcome, " + name);`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Coding?
          </h2>
          <p className="text-[#64748b] mb-8 text-lg">
            Join thousands of beginners who have started their programming journey.
            No experience needed - just curiosity!
          </p>
          <Link
            href="/lessons"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#6366f1] to-[#818cf8] text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
          >
            Get Started Free
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}