export interface User {
  name: string;
  email: string;
}

export enum Page {
  Home = 'Home',
  Steps = 'Steps',
  Routine = 'Routine',
  Workouts = 'Workouts',
  SleepFocus = 'Sleep & Focus',
  Community = 'Community',
  Dashboard = 'Dashboard'
}

export interface Workout {
  id: number;
  category: 'Home Workouts' | 'Yoga' | 'Stretching';
  title: string;
  duration: number; // in minutes
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  youtubeId: string;
}

export interface RoutineDay {
  day: number;
  tasks: string[];
  completed: boolean;
}

export interface SleepSound {
  id: number;
  title: string;
  description: string;
  file: string; // Placeholder for audio file path
}