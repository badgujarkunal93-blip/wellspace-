
import React from 'react';
import { Page } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { FootprintsIcon } from '../icons/FootprintsIcon';
import { DumbbellIcon } from '../icons/DumbbellIcon';
import { HeadphonesIcon } from '../icons/HeadphonesIcon';
import { UsersIcon } from '../icons/UsersIcon';
import { CalendarCheckIcon } from '../icons/CalendarCheckIcon';

interface HomePageProps {
  setCurrentPage: (page: Page) => void;
}

const features = [
  { name: Page.Steps, icon: FootprintsIcon, description: "Monitor your daily activity and stay motivated.", color: "text-calm-blue" },
  { name: Page.Workouts, icon: DumbbellIcon, description: "Access simple home workouts and yoga flows.", color: "text-health-green" },
  { name: Page.SleepFocus, icon: HeadphonesIcon, description: "Improve sleep and focus with curated sounds.", color: "text-focus-gold" },
  { name: Page.Routine, icon: CalendarCheckIcon, description: "Build healthy habits with a 21-day plan.", color: "text-purple-500" },
  { name: Page.Community, icon: UsersIcon, description: "Connect with others on a wellness journey.", color: "text-pink-500" },
];

const testimonials = [
    { quote: "WellSpace helped me reduce screen stress in just 2 weeks! The focus timer is a game-changer.", author: "Alex J." },
    { quote: "I love the 21-day routine. It's so easy to follow and has made a real difference in my energy levels.", author: "Maria S." },
    { quote: "Finally, an app that uses technology for good. The sleep music has drastically improved my sleep quality.", author: "David L." },
];

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
  return (
    <div className="space-y-16 animate-fadeIn">
      {/* Hero Section */}
      <section className="text-center bg-gradient-to-br from-calm-blue/20 via-health-green/20 to-focus-gold/20 dark:from-calm-blue/30 dark:via-health-green/30 dark:to-focus-gold/30 rounded-3xl p-12 -m-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Balance Your Mind, Body & Screen Time
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Track your steps, focus better, sleep peacefully, and stay fit — all in one place.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="primary" onClick={() => setCurrentPage(Page.Routine)}>Start My Plan</Button>
            <Button variant="secondary" onClick={() => setCurrentPage(Page.Community)}>Join Community</Button>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section>
        <h2 className="text-3xl font-heading font-bold text-center mb-10">Your Digital Wellness Toolkit</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(feature => (
            <Card key={feature.name} className="text-center">
              <div className={`mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full h-16 w-16 flex items-center justify-center`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-2 font-heading">{feature.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <h2 className="text-3xl font-heading font-bold text-center mb-10">What Our Community Says</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="flex flex-col">
              <p className="text-gray-600 dark:text-gray-300 italic flex-grow">"{testimonial.quote}"</p>
              <p className="text-right font-bold mt-4 text-calm-blue dark:text-focus-gold">- {testimonial.author}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 dark:text-gray-400 border-t dark:border-gray-700 pt-8">
        <div className="space-x-4 mb-4">
          <a href="#" className="hover:text-calm-blue">About</a>
          <a href="#" className="hover:text-calm-blue">Contact</a>
          <a href="#" className="hover:text-calm-blue">Privacy</a>
        </div>
        <p>Made with ❤️ on Lovable</p>
      </footer>
    </div>
  );
};

export default HomePage;
