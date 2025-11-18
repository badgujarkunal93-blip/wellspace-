import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { PlayIcon } from '../icons/PlayIcon';
import { PauseIcon } from '../icons/PauseIcon';
import { RotateCwIcon } from '../icons/RotateCwIcon';
import { User, SleepSound } from '../../types';

const sleepSounds: SleepSound[] = [
    { id: 1, title: 'Deep Sleep', description: 'Delta Waves Binaural Beats', file: 'https://archive.org/download/BinauralBeatsForStudying/Binaural%20Beats%20-%20Delta%20Waves%20%28For%20Deep%20Sleep%29.mp3' },
    { id: 2, title: 'Calming Mind', description: 'Theta Waves Binaural Beats', file: 'https://archive.org/download/BinauralBeatsForStudying/Binaural%20Beats%20-%20Theta%20Waves%20%28For%20Relaxation%20And%20Meditation%29.mp3' },
    { id: 3, title: 'Relaxing Night Rain', description: 'Natural rain sounds', file: 'https://archive.org/download/RainyMood/RainyMood.mp3' },
];

const quotes = [
    "Silence isn’t empty; it’s full of answers.",
    "Stay focused, you’re doing great!",
    "The secret of getting ahead is getting started.",
    "Concentrate all your thoughts upon the work at hand.",
];

const WORK_DURATION = 25 * 60; // 25 minutes
const BREAK_DURATION = 5 * 60; // 5 minutes

interface SleepFocusPageProps {
    currentUser: User;
}

const SleepFocusPage: React.FC<SleepFocusPageProps> = ({ currentUser }) => {
    const [timer, setTimer] = useState(WORK_DURATION);
    const [isActive, setIsActive] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [currentQuote, setCurrentQuote] = useState(quotes[0]);
    const [playingSoundId, setPlayingSoundId] = useState<number | null>(null);

    const intervalRef = useRef<number | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const focusMinutesKey = `${currentUser.email}_focusMinutes`;
    const sleepSessionsKey = `${currentUser.email}_sleepSessions`;

    useEffect(() => {
        if (isActive && timer > 0) {
            intervalRef.current = window.setInterval(() => {
                setTimer(t => t - 1);
            }, 1000);
        } else if (timer === 0) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setIsActive(false);
            
            if (isBreak) { // Break finished
                setIsBreak(false);
                setTimer(WORK_DURATION);
            } else { // Work session finished
                const savedMinutes = parseInt(localStorage.getItem(focusMinutesKey) || '0', 10);
                localStorage.setItem(focusMinutesKey, String(savedMinutes + (WORK_DURATION / 60)));
                setIsBreak(true);
                setTimer(BREAK_DURATION);
            }
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive, timer, isBreak, focusMinutesKey]);

    useEffect(() => {
        const quoteInterval = setInterval(() => {
            setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        }, 10000);
        return () => clearInterval(quoteInterval);
    }, []);
    
    // Cleanup audio on component unmount
    useEffect(() => {
        audioRef.current = new Audio();
        return () => {
            audioRef.current?.pause();
            audioRef.current = null;
        }
    }, []);


    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsActive(false);
        setIsBreak(false);
        setTimer(WORK_DURATION);
    };

    const toggleSound = (sound: SleepSound) => {
        if (!audioRef.current) return;

        if (playingSoundId === sound.id) { // Is playing, so pause it
            audioRef.current.pause();
            setPlayingSoundId(null);
        } else { // Not playing, so play it
            audioRef.current.src = sound.file;
            audioRef.current.play();
            setPlayingSoundId(sound.id);

            // Increment sleep session count
            const savedSessions = parseInt(localStorage.getItem(sleepSessionsKey) || '0', 10);
            localStorage.setItem(sleepSessionsKey, String(savedSessions + 1));
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    return (
        <div className="space-y-10">
            <h1 className="text-4xl font-heading font-bold">Sleep & Focus</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Focus Mode */}
                <Card className="flex flex-col items-center justify-center text-center">
                    <h2 className="text-3xl font-bold mb-2 font-heading">Focus Mode</h2>
                    <p className="mb-6 text-gray-500 dark:text-gray-400">{isBreak ? 'Time for a break!' : 'Time to focus!'}</p>
                    <div className={`text-7xl font-mono font-bold mb-6 p-4 rounded-lg ${isBreak ? 'text-health-green' : 'text-calm-blue'}`}>
                        {formatTime(timer)}
                    </div>
                    <div className="flex gap-4 mb-8">
                        <Button onClick={toggleTimer} variant="primary" className="w-32">
                            {isActive ? <PauseIcon className="w-6 h-6 mx-auto" /> : <PlayIcon className="w-6 h-6 mx-auto" />}
                        </Button>
                        <Button onClick={resetTimer} variant="accent">
                             <RotateCwIcon className="w-6 h-6 mx-auto" />
                        </Button>
                    </div>
                    <p className="italic text-gray-600 dark:text-gray-300 transition-opacity duration-500">"{currentQuote}"</p>
                </Card>

                {/* Sleep Sounds */}
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold font-heading">Sleep Sounds</h2>
                    {sleepSounds.map(sound => (
                        <Card key={sound.id} className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold">{sound.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400">{sound.description}</p>
                            </div>
                            <button 
                                onClick={() => toggleSound(sound)}
                                className="bg-health-green text-white rounded-full p-3 hover:bg-green-600 transition-colors"
                                aria-label={playingSoundId === sound.id ? `Pause ${sound.title}` : `Play ${sound.title}`}
                            >
                                {playingSoundId === sound.id ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
                            </button>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SleepFocusPage;