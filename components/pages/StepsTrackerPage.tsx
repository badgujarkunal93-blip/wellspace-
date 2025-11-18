import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FootprintsIcon } from '../icons/FootprintsIcon';
import { User } from '../../types';

const MOCK_STEPS_GOAL = 6000;

const MOCK_WEEKLY_DATA = [
  { name: 'Mon', steps: 4500 },
  { name: 'Tue', steps: 5200 },
  { name: 'Wed', steps: 3800 },
  { name: 'Thu', steps: 6100 },
  { name: 'Fri', steps: 5800 },
  { name: 'Sat', steps: 7200 },
  { name: 'Sun', steps: 4100 },
];

interface StepsTrackerPageProps {
    currentUser: User;
}

const StepsTrackerPage: React.FC<StepsTrackerPageProps> = ({ currentUser }) => {
  const stepsKey = `${currentUser.email}_steps`;
  const [currentSteps, setCurrentSteps] = useState(0);

  useEffect(() => {
    const savedSteps = localStorage.getItem(stepsKey);
    const initialSteps = savedSteps ? parseInt(savedSteps, 10) : 0;
    setCurrentSteps(initialSteps);

    const interval = setInterval(() => {
        setCurrentSteps(prev => {
            const newSteps = prev + Math.floor(Math.random() * 50);
            if (newSteps <= MOCK_STEPS_GOAL * 1.2) {
                localStorage.setItem(stepsKey, String(newSteps));
                return newSteps;
            }
            return prev;
        });
    }, 5000);
    return () => clearInterval(interval);
  }, [stepsKey]);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-heading font-bold">Track Your Steps, Stay Active Every Day</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 flex flex-col items-center justify-center text-center">
            <FootprintsIcon className="w-16 h-16 text-calm-blue mb-4"/>
            <p className="text-gray-500 dark:text-gray-400 text-lg">Current Steps</p>
            <p className="text-6xl font-bold text-gray-800 dark:text-white my-2">{currentSteps.toLocaleString()}</p>
        </Card>
        
        <Card className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4 font-heading">Today's Goal</h2>
            <ProgressBar value={currentSteps} max={MOCK_STEPS_GOAL} />
            <p className="text-center mt-3 text-lg font-medium">
                You’ve completed <span className="text-health-green font-bold">{currentSteps.toLocaleString()}</span> of <span className="text-calm-blue font-bold">{MOCK_STEPS_GOAL.toLocaleString()}</span> steps today!
            </p>
        </Card>
      </div>

      <Card>
        <h2 className="text-2xl font-bold mb-6 font-heading">Your 7-Day Activity Log</h2>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={MOCK_WEEKLY_DATA} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="steps" stroke="#4A90E2" strokeWidth={3} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="bg-focus-gold/20 dark:bg-focus-gold/30">
        <p className="text-center text-lg text-yellow-800 dark:text-yellow-200">
            <strong>Wellness Tip:</strong> Every 2,000 steps you take can contribute to a longer, healthier life. Keep moving! 😉
        </p>
      </Card>
    </div>
  );
};

export default StepsTrackerPage;