"use client";

import { exercises, Exercise } from "@/data/exercises";
import { useEffect, useState } from "react";

export default function PracticePage() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [currentExercise, setCurrentExercise] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("codelearn_progress");
    if (stored) {
      const data = JSON.parse(stored);
      setCompletedExercises(data.completedExercises || []);
    }
  }, []);

  const exercise = exercises[currentExercise];
  const isCompleted = completedExercises.includes(exercise.id);

  const handleSubmit = () => {
    setShowResult(true);
    if (selectedAnswer === exercise.correctAnswer && !isCompleted) {
      const stored = localStorage.getItem("codelearn_progress");
      let data = stored ? JSON.parse(stored) : {
        completedLessons: [],
        completedExercises: [],
        streak: 0,
        lastActiveDate: "",
        totalXP: 0
      };
      
      if (!data.completedExercises.includes(exercise.id)) {
        data.completedExercises.push(exercise.id);
        data.totalXP += 25;
        
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
        setCompletedExercises([...completedExercises, exercise.id]);
      }
    }
  };

  const nextExercise = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setHintUsed(false);
    setShowSolution(false);
    setCurrentExercise((prev) => (prev + 1) % exercises.length);
  };

  const handleUseHint = () => {
    setHintUsed(true);
  };

  const handleShowSolution = () => {
    setShowSolution(true);
  };

  return (
    <div className="flex-1 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 text-center">
          <span className="text-[#6366f1] font-semibold text-sm uppercase tracking-wider">Practice</span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
            Test Your Knowledge
          </h1>
          <p className="text-[#64748b] max-w-xl mx-auto">
            Challenge yourself with these coding questions. 
            Use hints if you get stuck, and learn from the solutions.
          </p>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div className="text-[#64748b]">
            Question {currentExercise + 1} of {exercises.length}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#64748b]">Score:</span>
            <span className="text-white font-bold">{completedExercises.length}/{exercises.length}</span>
          </div>
        </div>

        <div className="h-2 bg-[#1a1a24] rounded-full mb-8">
          <div 
            className="h-full bg-gradient-to-r from-[#6366f1] to-[#22d3ee] rounded-full transition-all"
            style={{ width: `${((currentExercise + 1) / exercises.length) * 100}%` }}
          />
        </div>

        <div className="bg-[#12121a] rounded-xl p-8 border border-[#2e2e3a]">
          <div className="flex items-start gap-4 mb-6">
            <span className="text-4xl">🧠</span>
            <div>
              <h2 className="text-xl font-semibold text-white">{exercise.question}</h2>
              <span className={`text-xs px-3 py-1 rounded-full inline-block mt-2 ${
                exercise.difficulty === "Beginner" 
                  ? "bg-[#34d399]/20 text-[#34d399]" 
                  : "bg-[#fbbf24]/20 text-[#fbbf24]"
              }`}>
                {exercise.difficulty}
              </span>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            {exercise.options?.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === exercise.correctAnswer;
              
              let bgClass = "bg-[#1a1a24] border-[#2e2e3a]";
              if (showResult) {
                if (isCorrect) {
                  bgClass = "bg-[#34d399]/20 border-[#34d399]";
                } else if (isSelected && !isCorrect) {
                  bgClass = "bg-[#f87171]/20 border-[#f87171]";
                }
              } else if (isSelected) {
                bgClass = "bg-[#6366f1]/20 border-[#6366f1]";
              }
              
              return (
                <button
                  key={index}
                  onClick={() => !showResult && setSelectedAnswer(option)}
                  disabled={showResult}
                  className={`w-full text-left px-6 py-4 rounded-lg border transition-all ${bgClass} ${!showResult ? 'hover:border-[#6366f1]' : ''}`}
                >
                  <span className="text-[#94a3b8] mr-4">{String.fromCharCode(65 + index)}.</span>
                  <span className="text-white">{option}</span>
                  {showResult && isCorrect && (
                    <svg className="w-5 h-5 text-[#34d399] float-right" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <svg className="w-5 h-5 text-[#f87171] float-right" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className={`mb-6 p-4 rounded-lg ${selectedAnswer === exercise.correctAnswer ? "bg-[#34d399]/20 border border-[#34d399]/30" : "bg-[#f87171]/20 border border-[#f87171]/30"}`}>
              <div className="flex items-center gap-2 mb-2">
                {selectedAnswer === exercise.correctAnswer ? (
                  <span className="text-[#34d399] font-semibold">✓ Correct!</span>
                ) : (
                  <span className="text-[#f87171] font-semibold">✗ Not quite!</span>
                )}
              </div>
              <p className="text-[#94a3b8] text-sm">{exercise.solution}</p>
            </div>
          )}

          {!showResult && !hintUsed && (
            <button
              onClick={handleUseHint}
              className="text-[#fbbf24] text-sm hover:underline mb-4"
            >
              💡 Need a hint?
            </button>
          )}

          {hintUsed && !showResult && (
            <div className="mb-4 p-4 bg-[#fbbf24]/10 border border-[#fbbf24]/30 rounded-lg">
              <p className="text-[#fbbf24] text-sm">{exercise.hint}</p>
            </div>
          )}

          {showResult && !showSolution && (
            <button
              onClick={handleShowSolution}
              className="text-[#6366f1] text-sm hover:underline"
            >
              View full solution
            </button>
          )}

          {showSolution && (
            <div className="mt-4 p-4 bg-[#1a1a24] rounded-lg">
              <p className="text-[#94a3b8] text-sm">{exercise.solution}</p>
            </div>
          )}

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSubmit}
              disabled={!selectedAnswer || showResult}
              className="flex-1 py-3 bg-gradient-to-r from-[#6366f1] to-[#818cf8] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              Submit Answer
            </button>
            {showResult && (
              <button
                onClick={nextExercise}
                className="flex-1 py-3 border border-[#2e2e3a] text-white font-semibold rounded-lg hover:border-[#6366f1] transition-colors"
              >
                Next Question →
              </button>
            )}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[#64748b] mb-4">
            Completed {completedExercises.length} of {exercises.length} exercises
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {exercises.map((ex, index) => (
              <button
                key={ex.id}
                onClick={() => {
                  setCurrentExercise(index);
                  setSelectedAnswer(null);
                  setShowResult(false);
                  setHintUsed(false);
                  setShowSolution(false);
                }}
                className={`w-10 h-10 rounded-lg text-sm font-semibold transition-colors ${
                  completedExercises.includes(ex.id)
                    ? "bg-[#34d399]/20 text-[#34d399]"
                    : currentExercise === index
                    ? "bg-[#6366f1] text-white"
                    : "bg-[#1a1a24] text-[#64748b]"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}