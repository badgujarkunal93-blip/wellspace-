import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { FootprintsIcon } from '../icons/FootprintsIcon';
import { CalendarCheckIcon } from '../icons/CalendarCheckIcon';
import { HeadphonesIcon } from '../icons/HeadphonesIcon';
import { UsersIcon } from '../icons/UsersIcon';
import { DumbbellIcon } from '../icons/DumbbellIcon';
import { ProgressBar } from '../ui/ProgressBar';
import { User } from '../../types';

interface StatCardProps {
    Icon: React.FC<{className?: string}>;
    title: string;
    value: string;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ Icon, title, value, color }) => (
    <Card className="text-center">
        <Icon className={`w-12 h-12 mx-auto mb-3 ${color}`} />
        <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
    </Card>
);

interface DashboardPageProps {
    currentUser: User;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ currentUser }) => {
    const [stats, setStats] = useState({
        currentSteps: 0,
        routineProgress: 0,
        focusHours: '0.0',
        sleepSessions: 0,
        completedWorkouts: 0,
    });

    useEffect(() => {
        const stepsKey = `${currentUser.email}_steps`;
        const routineKey = `${currentUser.email}_completedDays`;
        const workoutsKey = `${currentUser.email}_completedWorkouts`;
        const focusMinutesKey = `${currentUser.email}_focusMinutes`;
        const sleepSessionsKey = `${currentUser.email}_sleepSessions`;

        const currentSteps = parseInt(localStorage.getItem(stepsKey) || '0', 10);
        const routineProgress = JSON.parse(localStorage.getItem(routineKey) || '[]').length;
        const completedWorkouts = JSON.parse(localStorage.getItem(workoutsKey) || '[]').length;
        const focusMinutes = parseInt(localStorage.getItem(focusMinutesKey) || '0', 10);
        const sleepSessions = parseInt(localStorage.getItem(sleepSessionsKey) || '0', 10);

        setStats({
            currentSteps,
            routineProgress,
            completedWorkouts,
            focusHours: (focusMinutes / 60).toFixed(1),
            sleepSessions
        });
    }, [currentUser.email]);
    

    // Badge data
    const badges = [
        { name: "Early Bird", description: "Woke up early for 7 days!", unlocked: false }, // Logic to be implemented
        { name: "Zen Master", description: "Completed 10 meditation sessions.", unlocked: stats.sleepSessions >= 10 },
        { name: "Active Bee", description: "Walked 50,000 steps in a week.", unlocked: false }, // Logic to be implemented
        { name: "Routine Rockstar", description: "Completed a 21-day plan.", unlocked: stats.routineProgress >= 21 },
    ];
    
    return (
        <div className="space-y-8">
            <div className="flex items-center space-x-4">
                <div className="w-24 h-24 rounded-full bg-calm-blue flex items-center justify-center text-white text-4xl font-bold">
                    {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h1 className="text-4xl font-heading font-bold">Welcome Back, {currentUser.name}!</h1>
                    <p className="text-xl text-gray-500 dark:text-gray-400">Here's a snapshot of your wellness journey.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard Icon={FootprintsIcon} title="Current Steps" value={stats.currentSteps.toLocaleString()} color="text-calm-blue" />
                <StatCard Icon={CalendarCheckIcon} title="Routine Progress" value={`${stats.routineProgress} / 21 Days`} color="text-health-green" />
                <StatCard Icon={DumbbellIcon} title="Workouts Done" value={String(stats.completedWorkouts)} color="text-red-500" />
                <StatCard Icon={HeadphonesIcon} title="Focus Hours" value={`${stats.focusHours} hrs`} color="text-focus-gold" />
                <StatCard Icon={HeadphonesIcon} title="Sleep Sessions" value={String(stats.sleepSessions)} color="text-indigo-500" />
                <StatCard Icon={UsersIcon} title="Community Rank" value="#-" color="text-pink-500" />
            </div>

            <Card>
                <h2 className="text-2xl font-bold mb-4 font-heading">21-Day Plan Progress</h2>
                <ProgressBar value={stats.routineProgress} max={21} />
                <p className="text-center mt-3 font-medium">{stats.routineProgress} of 21 days completed</p>
            </Card>

            <Card>
                <h2 className="text-2xl font-bold mb-4 font-heading">Achievements & Badges</h2>
                <div className="flex flex-wrap gap-6">
                    {badges.map(badge => (
                        <div key={badge.name} className={`text-center p-4 rounded-lg w-40 ${badge.unlocked ? 'bg-focus-gold/20' : 'bg-gray-100 dark:bg-gray-700'}`}>
                            <div className={`text-5xl mb-2 ${!badge.unlocked && 'opacity-30'}`}>{badge.name === "Early Bird" ? '☀️' : badge.name === "Zen Master" ? '🧘' : badge.name === "Active Bee" ? '🐝' : '🌟'}</div>
                            <h3 className="font-bold">{badge.name}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{badge.description}</p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default DashboardPage;