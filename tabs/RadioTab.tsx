
import React from 'react';
import { ICONS } from '../constants';

const RadioTab: React.FC = () => {
    const studioPhone = '+41782344704';

    const weeklySchedule = [
        { day: 'MON', show: 'Melodic Mondays w/ Guest', time: '20:00 - 22:00' },
        { day: 'TUE', show: 'Techno Tuesday: Deep Cuts', time: '20:00 - 22:00' },
        { day: 'WED', show: 'Worldwide Grooves', time: '18:00 - 20:00' },
        { day: 'THU', show: 'Throwback Thursday: 90s House', time: '20:00 - 22:00' },
        { day: 'FRI', show: 'PLW Residents Night', time: '22:00 - 00:00' },
        { day: 'SAT', show: 'Saturday Night Live from the Club', time: '23:00 - 01:00' },
        { day: 'SUN', show: 'Chillout Sundays', time: '16:00 - 18:00' },
    ];

  return (
    <div className="pb-24 text-white bg-black min-h-screen p-4 flex flex-col">
      <h1 className="text-3xl font-bold text-purple-500 mb-6 mt-4">Radio</h1>

      {/* Primary Radio Player */}
      <div className="bg-gray-900 border border-purple-900/50 rounded-xl overflow-hidden shadow-lg shadow-purple-900/20 mb-8 animate-fade-in">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
            <div>
                <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest">Live Stream</p>
                <h2 className="text-lg font-bold text-white">PeopleWeLike Radio</h2>
            </div>
            <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-bold text-gray-400">ON AIR</span>
            </div>
        </div>
        
        <div className="w-full bg-black flex items-center justify-center">
            <iframe 
                src="https://peoplewelike.radio" 
                width="100%" 
                height="450" 
                frameBorder="0"
                className="w-full"
                title="PeopleWeLike Radio Player"
                allow="autoplay"
            ></iframe>
        </div>
      </div>
      
      {/* Schedule Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center">
            <span className="mr-2">Weekly Schedule</span>
            <span className="h-px flex-grow bg-gray-800"></span>
        </h2>
        <div className="space-y-2">
            {weeklySchedule.map(item => (
                <div key={item.day} className="bg-gray-900 p-3 rounded-lg flex items-center border border-gray-800 hover:border-purple-500/30 transition-colors">
                   <div className="text-center w-16 mr-3">
                       <p className="font-bold text-purple-400">{item.day}</p>
                       <p className="text-[10px] text-gray-400 uppercase">{item.time}</p>
                   </div>
                   <div className="flex-1">
                       <p className="font-semibold text-white text-sm">{item.show}</p>
                   </div>
                </div>
            ))}
        </div>
      </div>

      {/* Interaction Buttons */}
      <div className="mt-auto pt-4 grid grid-cols-2 gap-4">
        <a href={`tel:${studioPhone}`} className="flex flex-col items-center justify-center bg-gray-900 border border-gray-800 p-4 rounded-xl font-semibold hover:bg-purple-600 transition-all group">
            <div className="bg-gray-800 p-2 rounded-full mb-2 group-hover:bg-purple-500 transition-colors">
                {ICONS.phone}
            </div>
            <span className="text-sm">Call Studio</span>
        </a>
        <a href={`https://wa.me/${studioPhone}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center bg-gray-900 border border-gray-800 p-4 rounded-xl font-semibold hover:bg-purple-700 transition-all group">
             <div className="bg-gray-800 p-2 rounded-full mb-2 group-hover:bg-purple-500 transition-colors">
                {ICONS.whatsapp}
            </div>
            <span className="text-sm">WhatsApp</span>
        </a>
      </div>

      <style>{`
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
        @keyframes fade-in { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default RadioTab;
