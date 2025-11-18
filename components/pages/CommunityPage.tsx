
import React from 'react';
import { Card } from '../ui/Card';
import { UsersIcon } from '../icons/UsersIcon';

const categories = [
    "🧘 Yoga & Mindfulness",
    "💪 Fitness Tips",
    "💤 Sleep Challenges",
    "🎯 Study/Focus Motivation"
];

const CommunityPage: React.FC = () => {
    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-heading font-bold">Community Hub</h1>

            <Card className="text-center">
                <UsersIcon className="w-16 h-16 text-health-green mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2 font-heading">Join the Conversation</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Connect with like-minded individuals, share your progress, and find motivation. Our community is a positive space for everyone on their wellness journey.
                </p>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <h3 className="text-2xl font-bold mb-4 font-heading">Discussion Categories</h3>
                    <ul className="space-y-3">
                        {categories.map(cat => (
                            <li key={cat} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-lg font-medium cursor-pointer hover:bg-calm-blue/20 dark:hover:bg-calm-blue/30 transition-colors">
                                {cat}
                            </li>
                        ))}
                    </ul>
                </Card>

                <Card>
                    <h3 className="text-2xl font-bold mb-4 font-heading">Community Rules</h3>
                    <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                        <li>Respect others and their opinions.</li>
                        <li>No spam or self-promotion.</li>
                        <li>Stay positive and supportive.</li>
                        <li>Share your experiences and tips.</li>
                        <li>Report any inappropriate behavior.</li>
                    </ul>
                </Card>
            </div>
            
            <Card className="text-center bg-calm-blue text-white">
                <h3 className="text-2xl font-bold mb-3 font-heading">Live Chat Feature Coming Soon!</h3>
                <p>We're working on an integrated live chat to make connecting even easier. Stay tuned!</p>
            </Card>
        </div>
    );
};

export default CommunityPage;
