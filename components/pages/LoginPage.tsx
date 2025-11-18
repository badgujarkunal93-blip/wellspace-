import React, { useState } from 'react';
import { User } from '../../types';
import { authService } from '../../services/authService';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { LeafIcon } from '../icons/LeafIcon';

interface LoginPageProps {
    onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            if (isLoginView) {
                const user = authService.login(email, password);
                if (user) {
                    onLogin(user);
                } else {
                    setError("Invalid email or password.");
                }
            } else {
                if (!name || !email || !password) {
                    setError("All fields are required.");
                    return;
                }
                const newUser = authService.signUp(name, email, password);
                if (newUser) {
                    onLogin(newUser);
                } else {
                    setError("An account with this email already exists.");
                }
            }
        } catch (err) {
            setError("An unexpected error occurred.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-light-gray dark:bg-gray-900 font-sans">
            <div className="w-full max-w-md px-4">
                <div className="flex justify-center mb-8">
                     <LeafIcon className="w-12 h-12 text-health-green" />
                     <h1 className="ml-3 text-4xl font-heading font-bold text-gray-800 dark:text-white">WellSpace</h1>
                </div>
                <Card className="shadow-2xl">
                    <h2 className="text-2xl font-bold text-center mb-2 font-heading text-gray-800 dark:text-white">
                        {isLoginView ? 'Welcome Back' : 'Create Your Account'}
                    </h2>
                    <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
                        {isLoginView ? 'Login to continue your wellness journey.' : 'Start your wellness journey with us.'}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLoginView && (
                             <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-calm-blue focus:border-calm-blue"
                                />
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-calm-blue focus:border-calm-blue"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-calm-blue focus:border-calm-blue"
                            />
                        </div>
                        
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                        <Button type="submit" variant="primary" className="w-full">
                            {isLoginView ? 'Log In' : 'Sign Up'}
                        </Button>
                    </form>
                    
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
                        {isLoginView ? "Don't have an account?" : "Already have an account?"}
                        <button onClick={() => { setIsLoginView(!isLoginView); setError(null); }} className="font-medium text-calm-blue hover:underline ml-1">
                            {isLoginView ? 'Sign Up' : 'Log In'}
                        </button>
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;