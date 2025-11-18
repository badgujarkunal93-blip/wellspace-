import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Workout, User } from '../../types';

const workoutsData: Workout[] = [
  { id: 1, category: 'Home Workouts', title: '5-Min Full Body Warmup', duration: 5, level: 'Beginner', youtubeId: 'sWBVb_0G5K0' },
  { id: 2, category: 'Yoga', title: 'Morning Yoga Flow', duration: 15, level: 'Beginner', youtubeId: '4C-gxOE0j7s' },
  { id: 3, category: 'Stretching', title: 'Desk Posture Fix Exercises', duration: 10, level: 'Beginner', youtubeId: 'BdfTuxdfvVc' },
  { id: 4, category: 'Home Workouts', title: '15-Min Cardio Blast', duration: 15, level: 'Intermediate', youtubeId: 'ml6cT4AZdqI' },
  { id: 5, category: 'Yoga', title: 'Power Yoga for Strength', duration: 30, level: 'Intermediate', youtubeId: 'kFdN8_M23pE' },
  { id: 6, category: 'Stretching', title: 'Full Body Cool Down', duration: 10, level: 'Beginner', youtubeId: 'sRtcS_a_B30' },
];

type Category = 'All' | 'Home Workouts' | 'Yoga' | 'Stretching';

interface WorkoutCardProps {
    workout: Workout;
    completedWorkouts: Set<number>;
    toggleCompleted: (id: number) => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, completedWorkouts, toggleCompleted }) => {
    const isDone = completedWorkouts.has(workout.id);
    return (
        <Card className="flex flex-col">
            <div className="aspect-w-16 aspect-h-9 mb-4 rounded-lg overflow-hidden">
                <iframe 
                    src={`https://www.youtube.com/embed/${workout.youtubeId}`}
                    title={workout.title} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-full"
                    >
                </iframe>
            </div>
            <h3 className="text-xl font-bold font-heading flex-grow">{workout.title}</h3>
            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 my-3">
                <span>⏱ {workout.duration} min</span>
                <span>🔰 {workout.level}</span>
            </div>
            <Button 
                variant={isDone ? 'secondary' : 'primary'}
                onClick={() => toggleCompleted(workout.id)}
            >
                {isDone ? '✅ Done!' : 'Mark as Done'}
            </Button>
        </Card>
    );
};

interface WorkoutsPageProps {
    currentUser: User;
}

const WorkoutsPage: React.FC<WorkoutsPageProps> = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState<Category>('All');
  const [completedWorkouts, setCompletedWorkouts] = useState<Set<number>>(new Set());
  const completedKey = `${currentUser.email}_completedWorkouts`;

  useEffect(() => {
      const savedCompleted = localStorage.getItem(completedKey);
      if (savedCompleted) {
          setCompletedWorkouts(new Set(JSON.parse(savedCompleted)));
      }
  }, [completedKey]);

  const toggleCompleted = (id: number) => {
      const newCompleted = new Set(completedWorkouts);
      if (newCompleted.has(id)) {
          newCompleted.delete(id);
      } else {
          newCompleted.add(id);
      }
      setCompletedWorkouts(newCompleted);
      localStorage.setItem(completedKey, JSON.stringify(Array.from(newCompleted)));
  };

  const filteredWorkouts = activeTab === 'All' ? workoutsData : workoutsData.filter(w => w.category === activeTab);
  const tabs: Category[] = ['All', 'Home Workouts', 'Yoga', 'Stretching'];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-heading font-bold">Workouts & Yoga</h1>
      
      <div className="flex space-x-2 border-b-2 border-gray-200 dark:border-gray-700 mb-6">
        {tabs.map(tab => (
            <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-lg font-semibold transition-colors duration-200 ${
                    activeTab === tab 
                    ? 'border-b-2 border-calm-blue text-calm-blue'
                    : 'text-gray-500 hover:text-calm-blue'
                }`}
            >
                {tab}
            </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredWorkouts.map(workout => (
            <WorkoutCard key={workout.id} workout={workout} completedWorkouts={completedWorkouts} toggleCompleted={toggleCompleted} />
        ))}
      </div>
    </div>
  );
};

export default WorkoutsPage;