
import React from 'react';
import { IconProps } from './IconProps';

export const FootprintsIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 16v-2.38c0-1.47 1.2-2.69 2.69-2.69h1.31a2 2 0 0 0 1.54-.73L12 6l2.46 4.2a2 2 0 0 0 1.54.73h1.31c1.49 0 2.69 1.21 2.69 2.69V16"></path>
        <path d="M4 20h4a1 1 0 0 0 1-1v-3H4v3a1 1 0 0 0 1 1z"></path>
        <path d="M15 20h4a1 1 0 0 0 1-1v-3h-5v3a1 1 0 0 0 1 1z"></path>
    </svg>
);
