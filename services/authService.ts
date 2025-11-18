import { User } from '../types';

// In a real app, this would be a secure backend service.
// For this demo, we use localStorage. Passwords are not securely stored.

const USERS_KEY = 'wellspace_users';
const CURRENT_USER_KEY = 'wellspace_currentUser';

// Helper to get users from localStorage
const getUsers = (): (User & { password: string })[] => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
};

// Helper to save users to localStorage
const saveUsers = (users: (User & { password: string })[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const authService = {
    signUp: (name: string, email: string, password: string): User | null => {
        const users = getUsers();
        const userExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
        if (userExists) {
            return null; // User already exists
        }
        const newUser: User & { password: string } = { name, email, password };
        users.push(newUser);
        saveUsers(users);
        return { name, email };
    },

    login: (email: string, password: string): User | null => {
        const users = getUsers();
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
        return user ? { name: user.name, email: user.email } : null;
    },

    logout: (): void => {
        localStorage.removeItem(CURRENT_USER_KEY);
    },

    getCurrentUser: (): User | null => {
        const user = localStorage.getItem(CURRENT_USER_KEY);
        return user ? JSON.parse(user) : null;
    },

    saveCurrentUser: (user: User): void => {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    }
};