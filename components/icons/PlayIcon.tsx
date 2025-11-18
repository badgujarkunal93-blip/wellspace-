
import React from 'react';
import { IconProps } from './IconProps';

export const PlayIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M8 5v14l11-7z"></path>
    </svg>
);
