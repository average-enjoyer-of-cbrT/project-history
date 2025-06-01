import React from 'react';
import { TimelineEvent } from '../types';

interface EventTimelineProps {
  events: TimelineEvent[];
}

const EventTimeline: React.FC<EventTimelineProps> = ({ events }) => {
  return (
    <div className="mt-8 mb-12">
      <h2 className="section-title">Хронология событий</h2>
      
      <div className="relative border-l border-gray-700 ml-4 mt-8">
        {events.map((event, index) => (
          <div key={index} className="mb-10 ml-8">
            <div className="absolute w-3 h-3 bg-white rounded-full -left-[6.5px] mt-1.5 border border-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400">{event.date}</time>
            <h3 className="text-lg font-semibold text-white mb-2">{event.title}</h3>
            <p className="text-base font-normal text-gray-400">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventTimeline;