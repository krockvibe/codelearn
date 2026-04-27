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
        <div className="py-12">
          <span className="text-[#6366f1] font-semibold text-sm uppercase tracking-wider">Lessons</span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
            Learn Programming Step by Step
          </h1>
          <p className="text-[#64748b] max-w-2xl">
            Master the fundamentals of programming with our interactive lessons.
            Each lesson includes theory, examples, and hands-on practice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => {
            const isCompleted = completedLessons.includes(lesson.id);
            return (
              <Link
                key={lesson.id}
                href={`/lessons/${lesson.id}`}
                className="group bg-[#12121a] rounded-xl p-6 border border-[#2e2e3a] hover:border-[#6366f1] transition-all hover:-translate-y-1"
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
                    {isCompleted ? "Review →" : "Start →"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/practice"
            className="inline-flex items-center gap-2 text-[#6366f1] font-semibold hover:gap-3 transition-all"
          >
            Ready for Practice?
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}