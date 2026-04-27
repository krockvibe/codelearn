"use client";

import Link from "next/link";
import { lessons } from "@/data/lessons";
import { useEffect, useState } from "react";

export default function LessonsPage() {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("codelearn_progress");
    if (stored) {
      const data = JSON.parse(stored);
      setCompletedLessons(data.completedLessons || []);
    }
  }, []);

  return (
    <div className="flex-1 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-12 md:py-20">
          <div className="inline-flex items-center gap-3 bg-[#7c3aed]/15 border border-[#7c3aed]/30 px-4 py-2 rounded-full mb-6">
            <span className="text-[#a78bfa] font-medium">📚 Structured Learning</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
            Learn Programming
            <span className="text-gradient"> Step by Step</span>
          </h1>
          <p className="text-[#94a3b8] text-lg max-w-2xl">
            Master the fundamentals with interactive lessons. 
            Each lesson includes theory, examples, and hands-on practice.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12 p-6 bg-[#16161d] rounded-2xl border border-[#2a2a3a]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-medium">Your Progress</span>
            <span className="text-[#a78bfa] font-semibold">
              {completedLessons.length}/{lessons.length} Complete
            </span>
          </div>
          <div className="h-2 bg-[#2a2a3a] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] rounded-full transition-all"
              style={{ width: `${(completedLessons.length / lessons.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id);
            return (
              <Link
                key={lesson.id}
                href={`/lessons/${lesson.id}`}
                className="card-elevated p-6 rounded-2xl group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl transform group-hover:scale-110 transition-transform">
                    {lesson.icon}
                  </div>
                  {isCompleted && (
                    <span className="badge badge-success">✓ Done</span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#a78bfa] transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-[#64748b] text-sm mb-4 line-clamp-2">{lesson.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`badge ${
                    lesson.difficulty === "Beginner" 
                      ? "badge-success" 
                      : "badge-warning"
                  }`}>
                    {lesson.difficulty}
                  </span>
                  <span className="text-[#7c3aed] text-sm group-hover:translate-x-1 transition-transform">
                    {isCompleted ? "Review →" : "Start →"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center p-10 bg-gradient-to-r from-[#7c3aed]/20 to-[#06b6d4]/10 rounded-2xl border border-[#7c3aed]/30">
          <h3 className="text-xl font-bold text-white mb-3">Ready to Practice?</h3>
          <p className="text-[#64748b] mb-6">Test your knowledge with coding exercises</p>
          <Link href="/practice" className="btn-primary inline-flex items-center gap-2">
            Go to Practice
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}