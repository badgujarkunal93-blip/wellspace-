
import React from 'react';

interface ProgressBarProps {
    value: number;
    max: number;
    colorClass?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, max, colorClass = 'bg-health-green' }) => {
    const percentage = max > 0 ? (value / max) * 100 : 0;

    return (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
            <div
                className={`${colorClass} h-4 rounded-full transition-all duration-500 ease-out`}
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );
};
