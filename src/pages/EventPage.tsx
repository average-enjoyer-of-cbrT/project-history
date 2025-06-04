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

  // Кнопки перехода между событиями
  const currentIndex = events.findIndex(e => e.id === eventId);
  const prevEvent = currentIndex > 0 ? events[currentIndex - 1] : null;
  const nextEvent = currentIndex < events.length - 1 ? events[currentIndex + 1] : null;

  // Анимация для перехода
  const [transition, setTransition] = React.useState<'none' | 'left' | 'right'>('none');

  useEffect(() => {
    if (!event) {
      navigate('/');
    }
    window.scrollTo(0, 0);
  }, [event, navigate, eventId]);

  const handleNavigate = (id: string, direction: 'left' | 'right') => {
    setTransition(direction);
    setTimeout(() => {
      navigate(`/events/${id}`);
      setTransition('none');
    }, 350);
  };

  if (!event) return null;

  return (
    <div className={`animate-fadeIn relative transition-transform duration-300 ${transition === 'left' ? '-translate-x-16 opacity-0' : ''} ${transition === 'right' ? 'translate-x-16 opacity-0' : ''}`}>
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
      
      {/* Кнопки навигации */}
      <div className="flex justify-between items-center mt-12">
        {prevEvent ? (
          <button
            className="group flex items-center gap-2 px-5 py-3 rounded-lg bg-black/40 border border-gray-700 hover:bg-black/70 transition-all shadow-lg"
            onClick={() => handleNavigate(prevEvent.id, 'left')}
          >
            <span className="text-2xl">←</span>
            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{prevEvent.title}</span>
          </button>
        ) : <div />}
        {nextEvent ? (
          <button
            className="group flex items-center gap-2 px-5 py-3 rounded-lg bg-black/40 border border-gray-700 hover:bg-black/70 transition-all shadow-lg"
            onClick={() => handleNavigate(nextEvent.id, 'right')}
          >
            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{nextEvent.title}</span>
            <span className="text-2xl">→</span>
          </button>
        ) : <div />}
      </div>
    </div>
  );
};

export default EventPage;