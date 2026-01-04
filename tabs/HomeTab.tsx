import React, { useState, useEffect } from 'react';
import { weekendEvents, featuredEvents, moreEvents, ccMarketProducts, topUsers } from '../services/mockData';
import EventCard from '../components/EventCard';
import ProductCard from '../components/ProductCard';
import { THUMBNAIL_PATTERNS } from '../components/Thumbnails';
import { User, Product } from '../types';

const Clock: React.FC = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options).toUpperCase();
    };

    return (
        <div className="text-right">
            <p className="font-mono text-lg font-bold text-white">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <p className="text-xs text-gray-400">{formatDate(time)}</p>
        </div>
    );
};

interface HomeTabProps {
    user: User;
    onPurchase: (product: Product) => void;
    onSelectClub: (clubId: number) => void;
}

const HomeTab: React.FC<HomeTabProps> = ({ user, onPurchase, onSelectClub }) => {
  const marketCategories = ['Tickets', 'Limited', 'Exclusive', 'At Night', 'Daytime', 'Transport', 'Style', 'Taste', 'Other'];

  return (
    <div className="pb-24 text-white bg-black min-h-screen">
      <div className="p-4 pt-8 flex justify-between items-start">
        <div>
            <h1 className="text-3xl font-bold text-purple-500">ClubJoin</h1>
            <p className="text-gray-400">Your network of nightlife.</p>
        </div>
        <Clock />
      </div>

      <section className="mt-6">
        <h2 className="text-xl font-bold px-4 mb-3">This Weekend</h2>
        <div className="flex overflow-x-auto pl-4 pb-4 no-scrollbar">
          {weekendEvents.map(event => <EventCard key={event.id} event={event} onSelectClub={onSelectClub} />)}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold px-4 mb-3">CC Market</h2>
        <p className="text-sm text-gray-400 px-4 mb-4">Your Level: {user.level} | Balance: {user.ccBalance} CC</p>
        <div className="flex overflow-x-auto px-4 pb-2 no-scrollbar">
            {marketCategories.map(cat => (
                <button key={cat} className="flex-shrink-0 mr-2 bg-gray-800 text-white text-sm px-4 py-2 rounded-full hover:bg-purple-600 transition-colors">{cat}</button>
            ))}
        </div>
        <div className="flex overflow-x-auto pl-4 pb-4 mt-2 no-scrollbar">
          {ccMarketProducts.map(product => (
            <div key={product.id} className="flex-shrink-0 w-64 mr-4">
              <ProductCard product={product} userLevel={user.level} onPurchase={onPurchase} />
            </div>
          ))}
        </div>
      </section>

       <section className="mt-8">
        <h2 className="text-xl font-bold px-4 mb-3">Featured</h2>
        <div className="px-4 grid grid-cols-2 gap-4">
            {featuredEvents.map(event => {
                 const Thumbnail = THUMBNAIL_PATTERNS[event.id % THUMBNAIL_PATTERNS.length];
                 return (
                     <div key={event.id} onClick={() => onSelectClub(event.clubId)} className="relative rounded-lg overflow-hidden h-40 group transform transition-transform duration-300 hover:scale-105 shadow-lg shadow-purple-900/20 cursor-pointer">
                        <div className="w-full h-full bg-black overflow-hidden">
                            <Thumbnail className="w-full h-full text-purple-900 opacity-30 group-hover:opacity-50 transition-opacity" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-3">
                            <h3 className="font-semibold text-white text-sm leading-tight">{event.title}</h3>
                            <p className="text-xs text-purple-400">{event.venue}</p>
                        </div>
                         <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-2 py-1 m-1.5 rounded-full">
                          {event.date}
                        </div>
                    </div>
                )
            })}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold px-4 mb-3">Top 5 Users of the Week</h2>
        <div className="px-4 space-y-2">
            {topUsers.map((u, index) => (
                <div key={u.nickname} className="bg-gray-900 p-2 rounded-lg flex items-center border border-gray-800">
                    <span className="font-bold text-purple-400 w-8 text-center">{index + 1}</span>
                    <img src={u.avatarUrl} alt={u.nickname} className="w-10 h-10 rounded-full mr-3" />
                    <div className="flex-grow">
                        <p className="font-semibold text-white">{u.nickname}</p>
                        <p className="text-xs text-gray-500">XP: {u.xp} | CC Spent: {u.spent}</p>
                    </div>
                </div>
            ))}
        </div>
      </section>

       <section className="mt-8">
        <h2 className="text-xl font-bold px-4 mb-3">More Events</h2>
        <div className="px-4 space-y-2">
            {moreEvents.map(event => (
                <div key={event.id} onClick={() => onSelectClub(event.clubId)} className="bg-gray-900 p-3 rounded-lg flex justify-between items-center border border-gray-800 cursor-pointer hover:bg-gray-800">
                    <div className="flex items-center">
                       <div className="text-center w-16 mr-3">
                           <p className="font-bold text-purple-400">{event.date}</p>
                           <p className="text-xs text-gray-400">{event.time}</p>
                       </div>
                       <div>
                           <p className="font-semibold text-white">{event.title}</p>
                           <p className="text-sm text-gray-500">{event.venue}</p>
                       </div>
                    </div>
                    <button className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full hover:bg-purple-700 transition-colors">Info</button>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default HomeTab;
