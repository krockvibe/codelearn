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
        <div className="py-12 md:py-16">
          <div className="inline-flex items-center gap-3 bg-[#569cd6]/10 border border-[#569cd6]/25 px-4 py-2 rounded-full mb-6">
            <span className="text-[#569cd6] font-medium">📚 Lesson 1/5</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#d4d4d4] mt-2 mb-4">
            Learn <span className="text-gradient-dev">Programming</span>
          </h1>
          <p className="text-[#6a6a6a] text-lg max-w-xl">
            Interactive lessons with code examples. 
            Write and run JavaScript directly in your browser.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-12 p-5 bg-[#1e1e28] rounded-xl border border-[#2d2d3a]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[#d4d4d4] font-medium">Your Progress</span>
            <span className="text-[#569cd6] font-semibold">
              {completedLessons.length}/{lessons.length} complete
            </span>
          </div>
          <div className="h-1.5 bg-[#2d2d3a] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#569cd6] to-[#4ec9b0]"
              style={{ width: `${(completedLessons.length / lessons.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {lessons.map((lesson) => {
            const isCompleted = completedLessons.includes(lesson.id);
            return (
              <Link
                key={lesson.id}
                href={`/lessons/${lesson.id}`}
                className="dev-card p-5 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-4xl">{lesson.icon}</span>
                  {isCompleted && (
                    <span className="dev-badge dev-badge-green">✓</span>
                  )}
                </div>
                <h3 className="text-[#d4d4d4] font-semibold mb-2 group-hover:text-[#569cd6] transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-[#6a6a6a] text-sm mb-3 line-clamp-2">{lesson.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`dev-badge ${
                    lesson.difficulty === "Beginner" ? "dev-badge-green" : "dev-badge-orange"
                  }`}>
                    {lesson.difficulty}
                  </span>
                  <span className="text-[#569cd6] text-sm">
                    {isCompleted ? "Review →" : "Start →"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center p-8 bg-gradient-to-r from-[#569cd6]/10 to-[#4ec9b0]/5 rounded-xl border border-[#569cd6]/20">
          <h3 className="text-xl font-bold text-[#d4d4d4] mb-2">Ready for Practice?</h3>
          <p className="text-[#6a6a6a] mb-5">Test your knowledge with coding challenges</p>
          <Link href="/practice" className="dev-button inline-flex items-center gap-2">
            → Go to Practice
          </Link>
        </div>
      </div>
    </div>
  );
}