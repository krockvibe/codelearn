"use client";

import { useEffect, useState } from "react";
import { lessons } from "@/data/lessons";
import { exercises } from "@/data/exercises";
import Link from "next/link";

interface ProgressData {
  completedLessons: number[];
  completedExercises: number[];
  streak: number;
  lastActiveDate: string;
  totalXP: number;
}

function getCalendarDays() {
  const days = [];
  const today = new Date();
  for (let i = 27; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    days.push(date);
  }
  return days;
}

export default function ProgressPage() {
  const [progress, setProgress] = useState<ProgressData>({
    completedLessons: [],
    completedExercises: [],
    streak: 0,
    lastActiveDate: "",
    totalXP: 0
  });

  useEffect(() => {
    const stored = localStorage.getItem("codelearn_progress");
    if (stored) {
      setProgress(JSON.parse(stored));
    }
  }, []);

  const lessonProgress = Math.round((progress.completedLessons.length / lessons.length) * 100);
  const exerciseProgress = Math.round((progress.completedExercises.length / exercises.length) * 100);
  const totalProgress = Math.round(((progress.completedLessons.length + progress.completedExercises.length) / (lessons.length + exercises.length)) * 100);

  const calendarDays = getCalendarDays();

  return (
    <div className="flex-1 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <span className="text-[#6366f1] font-semibold text-sm uppercase tracking-wider">Progress</span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
            Track Your Learning Journey
          </h1>
          <p className="text-[#64748b] max-w-2xl">
            See how far you have come and keep up the great work!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-[#12121a] rounded-xl p-6 border border-[#2e2e3a]">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🔥</span>
              <span className="text-[#64748b]">Day Streak</span>
            </div>
            <div className="text-4xl font-bold text-white">{progress.streak}</div>
            <div className="text-[#64748b] text-sm mt-1">consecutive days</div>
          </div>

          <div className="bg-[#12121a] rounded-xl p-6 border border-[#2e2e3a]">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">⭐</span>
              <span className="text-[#64748b]">Total XP</span>
            </div>
            <div className="text-4xl font-bold text-white">{progress.totalXP}</div>
            <div className="text-[#64748b] text-sm mt-1">points earned</div>
          </div>

          <div className="bg-[#12121a] rounded-xl p-6 border border-[#2e2e3a]">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📚</span>
              <span className="text-[#64748b]">Lessons</span>
            </div>
            <div className="text-4xl font-bold text-white">
              {progress.completedLessons.length}/{lessons.length}
            </div>
            <div className="text-[#64748b] text-sm mt-1">completed</div>
          </div>

          <div className="bg-[#12121a] rounded-xl p-6 border border-[#2e2e3a]">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">💪</span>
              <span className="text-[#64748b]">Exercises</span>
            </div>
            <div className="text-4xl font-bold text-white">
              {progress.completedExercises.length}/{exercises.length}
            </div>
            <div className="text-[#64748b] text-sm mt-1">solved</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-[#12121a] rounded-xl p-6 border border-[#2e2e3a]">
            <h3 className="text-lg font-semibold text-white mb-6">Overall Progress</h3>
            
            <div className="flex items-center justify-center mb-8">
              <div className="relative w-40 h-40">
                <svg className="w-40 h-40 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#2e2e3a" strokeWidth="8" />
                  <circle 
                    cx="50" cy="50" r="40" 
                    fill="none" 
                    stroke="url(#progressRing)" 
                    strokeWidth="8"
                    strokeDasharray={`${totalProgress * 2.51}, 251`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="progressRing" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-white">{totalProgress}%</span>
                  <span className="text-[#64748b] text-sm">Complete</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#64748b]">Lessons</span>
                  <span className="text-white">{lessonProgress}%</span>
                </div>
                <div className="h-2 bg-[#1a1a24] rounded-full">
                  <div 
                    className="h-full bg-gradient-to-r from-[#6366f1] to-[#818cf8] rounded-full"
                    style={{ width: `${lessonProgress}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#64748b]">Exercises</span>
                  <span className="text-white">{exerciseProgress}%</span>
                </div>
                <div className="h-2 bg-[#1a1a24] rounded-full">
                  <div 
                    className="h-full bg-gradient-to-r from-[#22d3ee] to-[#34d399] rounded-full"
                    style={{ width: `${exerciseProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#12121a] rounded-xl p-6 border border-[#2e2e3a]">
            <h3 className="text-lg font-semibold text-white mb-6">Activity Calendar</h3>
            
            <div className="grid grid-cols-7 gap-2">
              {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                <div key={i} className="text-center text-xs text-[#64748b]">{day}</div>
              ))}
              {calendarDays.map((date, i) => {
                const dateStr = date.toDateString();
                const isActive = progress.lastActiveDate === dateStr;
                const isToday = date.toDateString() === new Date().toDateString();
                
                return (
                  <div 
                    key={i} 
                    className={`aspect-square rounded-lg flex items-center justify-center text-sm ${
                      isActive 
                        ? "bg-[#6366f1] text-white" 
                        : "bg-[#1a1a24] text-[#64748b]"
                    } ${isToday ? "ring-2 ring-[#22d3ee]" : ""}`}
                  >
                    {date.getDate()}
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-[#1a1a24] rounded" />
                <span className="text-[#64748b]">No activity</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-[#6366f1] rounded" />
                <span className="text-[#64748b]">Active</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-[#12121a] rounded-xl p-6 border border-[#2e2e3a]">
            <h3 className="text-lg font-semibold text-white mb-4">Completed Lessons</h3>
            {progress.completedLessons.length === 0 ? (
              <p className="text-[#64748b]">No lessons completed yet. Start learning!</p>
            ) : (
              <ul className="space-y-3">
                {lessons.filter(l => progress.completedLessons.includes(l.id)).map(lesson => (
                  <li key={lesson.id} className="flex items-center gap-3 p-3 bg-[#1a1a24] rounded-lg">
                    <span>{lesson.icon}</span>
                    <span className="text-white">{lesson.title}</span>
                    <svg className="w-5 h-5 text-[#34d399] ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </li>
                ))}
              </ul>
            )}
            <Link href="/lessons" className="mt-4 text-[#6366f1] text-sm hover:underline block">
              Continue learning →
            </Link>
          </div>

          <div className="bg-[#12121a] rounded-xl p-6 border border-[#2e2e3a]">
            <h3 className="text-lg font-semibold text-white mb-4">Completed Exercises</h3>
            {progress.completedExercises.length === 0 ? (
              <p className="text-[#64748b]">No exercises solved yet. Start practicing!</p>
            ) : (
              <ul className="space-y-3">
                {exercises.filter(e => progress.completedExercises.includes(e.id)).slice(0, 5).map(ex => (
                  <li key={ex.id} className="flex items-center gap-3 p-3 bg-[#1a1a24] rounded-lg">
                    <span className="text-[#34d399]">✓</span>
                    <span className="text-white text-sm truncate">{ex.question.substring(0, 50)}...</span>
                  </li>
                ))}
              </ul>
            )}
            <Link href="/practice" className="mt-4 text-[#6366f1] text-sm hover:underline block">
              Continue practicing →
            </Link>
          </div>
        </div>

        {totalProgress === 100 && (
          <div className="text-center py-12 bg-gradient-to-r from-[#6366f1]/20 to-[#f472b6]/20 rounded-xl border border-[#6366f1]/30">
            <span className="text-6xl mb-4 block">🎉</span>
            <h2 className="text-2xl font-bold text-white mb-2">Congratulations!</h2>
            <p className="text-[#64748b]">You have completed all lessons and exercises!</p>
          </div>
        )}
      </div>
    </div>
  );
}