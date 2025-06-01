import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import PhotoGallery from '../components/PhotoGallery';
import EventTimeline from '../components/EventTimeline';
import { events } from '../data/events';

interface EventPageProps {
  eventId: string;
}

const EventPage: React.FC<EventPageProps> = ({ eventId }) => {
  const navigate = useNavigate();
  const event = events.find(e => e.id === eventId);
  
  useEffect(() => {
    if (!event) {
      navigate('/');
    }
    
    window.scrollTo(0, 0);
  }, [event, navigate, eventId]);
  
  if (!event) return null;
  
  return (
    <div className="animate-fadeIn">
      <Hero 
        title={event.title}
        subtitle={event.date}
        backgroundImage={event.coverImage}
      />
      
      <section className="mb-16">
        <h2 className="section-title">Описание</h2>
        {event.description.map((paragraph, index) => (
          <p key={index} className="mb-4 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </section>
      
      {event.timeline && event.timeline.length > 0 && (
        <EventTimeline events={event.timeline} />
      )}
      
      {event.photos && event.photos.length > 0 && (
        <PhotoGallery photos={event.photos} />
      )}
      
      {event.significance && (
        <section className="mb-16">
          <h2 className="section-title">Значение</h2>
          {event.significance.map((paragraph, index) => (
            <p key={index} className="mb-4 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </section>
      )}
      
      {event.casualties && (
        <section>
          <h2 className="section-title">Потери</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-black/30 p-6 rounded-md border border-gray-800">
              <h3 className="text-xl font-medium mb-4">Советские потери</h3>
              <p className="text-gray-300">
                {event.casualties.soviet}
              </p>
            </div>
            
            <div className="bg-black/30 p-6 rounded-md border border-gray-800">
              <h3 className="text-xl font-medium mb-4">Немецкие потери</h3>
              <p className="text-gray-300">
                {event.casualties.german}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default EventPage;