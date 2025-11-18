import React from 'react';
import { Page, User } from '../types';
import { HomeIcon } from './icons/HomeIcon';
import { FootprintsIcon } from './icons/FootprintsIcon';
import { CalendarCheckIcon } from './icons/CalendarCheckIcon';
import { DumbbellIcon } from './icons/DumbbellIcon';
import { HeadphonesIcon } from './icons/HeadphonesIcon';
import { UsersIcon } from './icons/UsersIcon';
import { UserCircleIcon } from './icons/UserCircleIcon';
import { LeafIcon } from './icons/LeafIcon';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';
import { LogOutIcon } from './icons/LogOutIcon';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  currentUser: User;
  onLogout: () => void;
}

const navItems = [
  { page: Page.Home, icon: HomeIcon },
  { page: Page.Dashboard, icon: UserCircleIcon },
  { page: Page.Steps, icon: FootprintsIcon },
  { page: Page.Routine, icon: CalendarCheckIcon },
  { page: Page.Workouts, icon: DumbbellIcon },
  { page: Page.SleepFocus, icon: HeadphonesIcon },
  { page: Page.Community, icon: UsersIcon },
];

const NavLink: React.FC<{
    page: Page;
    Icon: React.FC<{ className?: string }>;
    isActive: boolean;
    onClick: () => void;
    label?: string;
}> = ({ page, Icon, isActive, onClick, label }) => (
    <li>
        <button
            onClick={onClick}
            className={`flex items-center w-full p-3 my-1 rounded-lg transition-colors duration-200 ${
                isActive 
                ? 'bg-calm-blue text-white shadow-lg' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
        >
            <Icon className="w-6 h-6" />
            <span className="ml-4 font-medium">{label || page}</span>
        </button>
    </li>
);

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, isDarkMode, toggleDarkMode, currentUser, onLogout }) => {
  return (
    <aside className="w-64 h-screen bg-white dark:bg-gray-800 shadow-2xl flex flex-col p-4 fixed">
      <div className="flex items-center mb-8 px-2">
        <LeafIcon className="w-8 h-8 text-health-green" />
        <h1 className="ml-2 text-2xl font-heading font-bold text-gray-800 dark:text-white">WellSpace</h1>
      </div>
      <nav className="flex-grow">
        <ul>
            {navItems.map(item => (
                <NavLink 
                    key={item.page}
                    page={item.page}
                    Icon={item.icon}
                    isActive={currentPage === item.page}
                    onClick={() => setCurrentPage(item.page)}
                    label={item.page === Page.Dashboard ? currentUser.name : item.page}
                />
            ))}
        </ul>
      </nav>
      <div className="mt-auto">
        <button onClick={toggleDarkMode} className="flex items-center w-full p-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
            {isDarkMode ? <SunIcon className="w-6 h-6 text-yellow-400" /> : <MoonIcon className="w-6 h-6 text-gray-700" />}
            <span className="ml-4 font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
         <button onClick={onLogout} className="flex items-center w-full p-3 mt-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
            <LogOutIcon className="w-6 h-6 text-red-500" />
            <span className="ml-4 font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};