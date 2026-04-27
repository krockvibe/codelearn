"use client";

export interface ProgressData {
  completedLessons: number[];
  completedExercises: number[];
  streak: number;
  lastActiveDate: string;
  totalXP: number;
}

const STORAGE_KEY = "codelearn_progress";

export function getProgress(): ProgressData {
  if (typeof window === "undefined") {
    return getDefaultProgress();
  }
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return getDefaultProgress();
}

export function saveProgress(data: ProgressData): void {
  if (typeof window === "undefined") return;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getDefaultProgress(): ProgressData {
  return {
    completedLessons: [],
    completedExercises: [],
    streak: 0,
    lastActiveDate: "",
    totalXP: 0
  };
}

export function markLessonComplete(lessonId: number): ProgressData {
  const progress = getProgress();
  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
    progress.totalXP += 50;
    checkStreak(progress);
    saveProgress(progress);
  }
  return progress;
}

export function markExerciseComplete(exerciseId: number): ProgressData {
  const progress = getProgress();
  if (!progress.completedExercises.includes(exerciseId)) {
    progress.completedExercises.push(exerciseId);
    progress.totalXP += 25;
    checkStreak(progress);
    saveProgress(progress);
  }
  return progress;
}

function checkStreak(progress: ProgressData): void {
  const today = new Date().toDateString();
  
  if (progress.lastActiveDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (progress.lastActiveDate === yesterday.toDateString()) {
      progress.streak += 1;
    } else if (progress.lastActiveDate !== today) {
      progress.streak = 1;
    }
    progress.lastActiveDate = today;
  }
}