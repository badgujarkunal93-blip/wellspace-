import React, { useState, useEffect } from 'react';
import { Page, User } from './types';
import { Sidebar } from './components/Sidebar';
import HomePage from './components/pages/HomePage';
import StepsTrackerPage from './components/pages/StepsTrackerPage';
import RoutinePlanPage from './components/pages/RoutinePlanPage';
import WorkoutsPage from './components/pages/WorkoutsPage';
import SleepFocusPage from './components/pages/SleepFocusPage';
import CommunityPage from './components/pages/CommunityPage';
import DashboardPage from './components/pages/DashboardPage';
import LoginPage from './components/pages/LoginPage';
import { authService } from './services/authService';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(isDark);

    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);
  
  const handleLogin = (user: User) => {
    setCurrentUser(user);
    authService.saveCurrentUser(user);
    setCurrentPage(Page.Home);
  };
  
  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <HomePage setCurrentPage={setCurrentPage} />;
      case Page.Steps:
        return <StepsTrackerPage currentUser={currentUser} />;
      case Page.Routine:
        return <RoutinePlanPage currentUser={currentUser} />;
      case Page.Workouts:
        return <WorkoutsPage currentUser={currentUser} />;
      case Page.SleepFocus:
        return <SleepFocusPage currentUser={currentUser} />;
      case Page.Community:
        return <CommunityPage />;
      case Page.Dashboard:
        return <DashboardPage currentUser={currentUser} />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="flex min-h-screen font-sans bg-light-gray dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;