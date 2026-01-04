import React from 'react';
import { Event } from '../types';
import { THUMBNAIL_PATTERNS } from './Thumbnails';

interface EventCardProps {
  event: Event;
  onSelectClub: (clubId: number) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onSelectClub }) => {
  const Thumbnail = THUMBNAIL_PATTERNS[event.id % THUMBNAIL_PATTERNS.length];

  return (
    <div onClick={() => onSelectClub(event.clubId)} className="flex-shrink-0 w-80 mr-4 bg-gray-900 rounded-lg overflow-hidden group transform transition-transform duration-300 hover:scale-105 shadow-lg shadow-purple-900/20 cursor-pointer">
      <div className="relative">
        <div className="w-full h-40 bg-black overflow-hidden">
          <Thumbnail className="w-full h-full text-purple-900 opacity-30 group-hover:opacity-50 transition-opacity" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-white font-bold text-lg">{event.title}</h3>
          <p className="text-purple-400 text-sm">{event.venue}</p>
        </div>
        <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 m-2 rounded-full">
          {event.date}
        </div>
      </div>
    </div>
  );
};

export default EventCard;