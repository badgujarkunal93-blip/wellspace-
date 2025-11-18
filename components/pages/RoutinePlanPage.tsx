import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { RoutineDay, User } from '../../types';
import { generateRoutinePlan } from '../../services/geminiService';
import { ProgressBar } from '../ui/ProgressBar';
import { PlayIcon } from '../icons/PlayIcon';
import { PauseIcon } from '../icons/PauseIcon';

interface RoutinePlanPageProps {
    currentUser: User;
}

const RoutinePlanPage: React.FC<RoutinePlanPageProps> = ({ currentUser }) => {
    const [freeTime, setFreeTime] = useState<number>(30);
    const [routinePlan, setRoutinePlan] = useState<RoutineDay[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());
    const [planGenerated, setPlanGenerated] = useState<boolean>(false);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const planKey = `${currentUser.email}_routinePlan`;
    const completedKey = `${currentUser.email}_completedDays`;

    useEffect(() => {
        const savedPlan = localStorage.getItem(planKey);
        const savedCompleted = localStorage.getItem(completedKey);
        if (savedPlan) {
            setRoutinePlan(JSON.parse(savedPlan));
            setPlanGenerated(true);
        }
        if (savedCompleted) {
            setCompletedDays(new Set(JSON.parse(savedCompleted)));
        }
    }, [planKey, completedKey]);

    const handleGeneratePlan = useCallback(async () => {
        setIsLoading(true);
        const planData = await generateRoutinePlan(freeTime);
        const planWithCompletion = planData.map(day => ({...day, completed: false}));
        setRoutinePlan(planWithCompletion);
        setCompletedDays(new Set());
        setPlanGenerated(true);
        localStorage.setItem(planKey, JSON.stringify(planWithCompletion));
        localStorage.removeItem(completedKey);
        setIsLoading(false);
    }, [freeTime, planKey, completedKey]);

    const toggleDayCompletion = (dayNumber: number) => {
        const newCompletedDays = new Set(completedDays);
        if (newCompletedDays.has(dayNumber)) {
            newCompletedDays.delete(dayNumber);
        } else {
            newCompletedDays.add(dayNumber);
        }
        setCompletedDays(newCompletedDays);
        localStorage.setItem(completedKey, JSON.stringify(Array.from(newCompletedDays)));
    };
    
    const toggleMusic = () => {
        if (!audioRef.current) return;
        if (isMusicPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsMusicPlaying(!isMusicPlaying);
    };

    const progress = routinePlan.length > 0 ? (completedDays.size / routinePlan.length) * 100 : 0;

    return (
        <div className="space-y-8">
            {/* Hidden audio player with a stable URL */}
            <audio ref={audioRef} src="https://archive.org/download/mbs-relaxing-music-vol-1/01-mbs-relaxing-music-vol-1.mp3" loop />
            <h1 className="text-4xl font-heading font-bold">Your 21-Day Routine Plan</h1>

            {!planGenerated || routinePlan.length === 0 ? (
                <Card>
                    <div className="max-w-md mx-auto text-center">
                        <h2 className="text-2xl font-bold mb-4 font-heading">Build Healthy Habits</h2>
                        <p className="mb-6 text-gray-600 dark:text-gray-400">Let's create a personalized plan to fit your schedule. How much free time do you have per day?</p>
                        <div className="mb-6">
                            <select
                                value={freeTime}
                                onChange={(e) => setFreeTime(Number(e.target.value))}
                                className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                                disabled={isLoading}
                            >
                                <option value={15}>15 minutes</option>
                                <option value={30}>30 minutes</option>
                                <option value={45}>45 minutes</option>
                            </select>
                        </div>
                        <Button onClick={handleGeneratePlan} disabled={isLoading}>
                            {isLoading ? 'Generating Plan...' : 'Create My Plan'}
                        </Button>
                    </div>
                </Card>
            ) : (
                <>
                    <Card>
                        <h2 className="text-2xl font-bold mb-4 font-heading">Your Progress</h2>
                        <ProgressBar value={completedDays.size} max={21} />
                        <p className="text-center mt-3 font-medium">{completedDays.size} of 21 days completed</p>
                        {progress === 100 && (
                            <p className="text-center mt-4 text-lg font-bold text-health-green">
                                Congratulations! You've completed the 21-day plan!
                            </p>
                        )}
                    </Card>

                    <Card className="flex flex-col md:flex-row items-center justify-between bg-indigo-50 dark:bg-indigo-900/50">
                        <div>
                            <h3 className="text-xl font-bold font-heading text-indigo-800 dark:text-indigo-200">Need to relax?</h3>
                            <p className="text-indigo-600 dark:text-indigo-300">Play some calming meditation music to help you focus on your tasks.</p>
                        </div>
                        <Button onClick={toggleMusic} variant="primary" className="mt-4 md:mt-0 bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-500 flex items-center">
                            {isMusicPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
                            <span className="ml-2">{isMusicPlaying ? 'Pause Music' : 'Play Music'}</span>
                        </Button>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {routinePlan.map(day => (
                            <Card key={day.day} className={`flex items-start space-x-4 ${completedDays.has(day.day) ? 'bg-green-50 dark:bg-green-900/50 opacity-70' : ''}`}>
                                <input
                                    type="checkbox"
                                    checked={completedDays.has(day.day)}
                                    onChange={() => toggleDayCompletion(day.day)}
                                    className="h-6 w-6 rounded border-gray-300 text-calm-blue focus:ring-calm-blue mt-1 flex-shrink-0"
                                />
                                <div>
                                    <h3 className="font-bold text-lg">Day {day.day}</h3>
                                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                                        {day.tasks.map((task, index) => (
                                            <li key={index}>{task}</li>
                                        ))}
                                    </ul>
                                </div>
                            </Card>
                        ))}
                    </div>
                     <div className="text-center mt-8">
                         <Button variant="accent" onClick={() => {
                           localStorage.removeItem(planKey);
                           localStorage.removeItem(completedKey);
                           setPlanGenerated(false);
                           setRoutinePlan([]);
                         }}>
                             Generate a New Plan
                         </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default RoutinePlanPage;