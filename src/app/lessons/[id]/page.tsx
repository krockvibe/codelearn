"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { lessons } from "@/data/lessons";
import { useEffect, useState } from "react";
import CodeEditor from "@/components/CodeEditor";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = Number(params.id);
  const lesson = lessons.find(l => l.id === lessonId);
  
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [showTryIt, setShowTryIt] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("codelearn_progress");
    if (stored) {
      const data = JSON.parse(stored);
      setCompletedLessons(data.completedLessons || []);
    }
  }, []);

  const markComplete = () => {
    const stored = localStorage.getItem("codelearn_progress");
    let data = stored ? JSON.parse(stored) : {
      completedLessons: [],
      completedExercises: [],
      streak: 0,
      lastActiveDate: "",
      totalXP: 0
    };
    
    if (!data.completedLessons.includes(lessonId)) {
      data.completedLessons.push(lessonId);
      data.totalXP += 50;
      
      const today = new Date().toDateString();
      if (data.lastActiveDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (data.lastActiveDate === yesterday.toDateString()) {
          data.streak += 1;
        } else {
          data.streak = 1;
        }
        data.lastActiveDate = today;
      }
      
      localStorage.setItem("codelearn_progress", JSON.stringify(data));
      setCompletedLessons(data.completedLessons);
    }
    
    router.push("/lessons");
  };

  if (!lesson) {
    return (
      <div className="flex-1 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Lesson not found</h1>
          <Link href="/lessons" className="text-[#6366f1] hover:underline">
            Back to Lessons
          </Link>
        </div>
      </div>
    );
  }

  const isCompleted = completedLessons.includes(lessonId);

  return (
    <div className="flex-1 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <Link href="/lessons" className="text-[#64748b] hover:text-white transition-colors inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Lessons
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#12121a] rounded-xl p-8 border border-[#2e2e3a]">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">{lesson.icon}</span>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl md:text-3xl font-bold text-white">{lesson.title}</h1>
                    {isCompleted && (
                      <span className="w-6 h-6 bg-[#34d399]/20 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#34d399]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full inline-block mt-1 ${
                    lesson.difficulty === "Beginner" 
                      ? "bg-[#34d399]/20 text-[#34d399]" 
                      : "bg-[#fbbf24]/20 text-[#fbbf24]"
                  }`}>
                    {lesson.difficulty}
                  </span>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                {lesson.content.split('\n').map((line, i) => {
                  if (line.startsWith('# ')) {
                    return <h1 key={i} className="text-2xl font-bold text-white mt-8 mb-4">{line.slice(2)}</h1>;
                  }
                  if (line.startsWith('## ')) {
                    return <h2 key={i} className="text-xl font-bold text-white mt-6 mb-3">{line.slice(3)}</h2>;
                  }
                  if (line.startsWith('### ')) {
                    return <h3 key={i} className="text-lg font-semibold text-white mt-4 mb-2">{line.slice(4)}</h3>;
                  }
                  if (line.startsWith('```')) {
                    return null;
                  }
                  if (line.startsWith('- ')) {
                    return <li key={i} className="text-[#94a3b8] ml-4">{line.slice(2)}</li>;
                  }
                  if (line.match(/^\d+\. /)) {
                    return <li key={i} className="text-[#94a3b8] ml-4">{line.slice(line.indexOf('. ') + 2)}</li>;
                  }
                  if (line.trim() === '') {
                    return <br key={i} />;
                  }
                  if (line.includes('`')) {
                    const parts = line.split('`');
                    return (
                      <p key={i} className="text-[#94a3b8]">
                        {parts.map((part, j) => 
                          j % 2 === 1 
                            ? <code key={j} className="bg-[#1a1a24] px-2 py-1 rounded text-[#22d3ee] font-mono text-sm">{part}</code>
                            : part
                        )}
                      </p>
                    );
                  }
                  return <p key={i} className="text-[#94a3b8]">{line}</p>;
                })}
              </div>
            </div>

            <div className="bg-[#12121a] rounded-xl overflow-hidden border border-[#2e2e3a]">
              <div className="px-6 py-4 bg-[#1a1a24] border-b border-[#2e2e3a]">
                <h2 className="text-lg font-semibold text-white">Example Code</h2>
              </div>
              <div className="p-6">
                <pre className="text-sm font-mono text-[#22d3ee] whitespace-pre-wrap">{lesson.exampleCode}</pre>
              </div>
            </div>

            <button
              onClick={() => setShowTryIt(!showTryIt)}
              className="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#6366f1]/20 to-[#f472b6]/20 rounded-xl border border-[#6366f1]/30 hover:border-[#6366f1] transition-colors"
            >
              <span className="text-white font-semibold">💻 Try It Yourself</span>
              <svg className={`w-5 h-5 text-white transition-transform ${showTryIt ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showTryIt && (
              <div className="animate-fade-in">
                <CodeEditor initialCode={lesson.tryItCode} />
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-[#12121a] rounded-xl p-6 border border-[#2e2e3a] sticky top-24">
              <h3 className="text-lg font-semibold text-white mb-4">Lesson Navigation</h3>
              
              <div className="space-y-2 mb-6">
                {lessons.map((l) => (
                  <Link
                    key={l.id}
                    href={`/lessons/${l.id}`}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      l.id === lessonId 
                        ? "bg-[#6366f1]/20 text-white" 
                        : "text-[#64748b] hover:bg-[#1a1a24]"
                    }`}
                  >
                    <span className="text-lg">{l.icon}</span>
                    <span className="text-sm">{l.title}</span>
                    {completedLessons.includes(l.id) && (
                      <svg className="w-4 h-4 text-[#34d399] ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </Link>
                ))}
              </div>

              <button
                onClick={markComplete}
                disabled={isCompleted}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  isCompleted
                    ? "bg-[#34d399]/20 text-[#34d399] cursor-default"
                    : "bg-gradient-to-r from-[#6366f1] to-[#818cf8] text-white hover:opacity-90"
                }`}
              >
                {isCompleted ? "✓ Completed" : "Mark as Complete"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}