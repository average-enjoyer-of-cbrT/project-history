import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import PhotoGallery from '../components/PhotoGallery';
import EventTimeline from '../components/EventTimeline';
import EventMap from '../components/EventMap';
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
    <>
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

      <section className="mb-16">
        <h2 className="section-title">Карта события</h2>
        <EventMap 
          events={events.map(e => ({
            id: e.id,
            title: e.title,
            date: e.date,
            coordinates: e.coordinates || [54.5, 25]
          }))}
          currentEventId={eventId}
        />
      </section>
      
      {event.timeline && event.timeline.length > 0 && (
        <EventTimeline events={event.timeline} />
      )}
      
      {event.photos && event.photos.length > 0 && (
        <PhotoGallery photos={event.photos.map((url: string, idx: number) => ({ url, caption: `Фото ${idx + 1}` }))} />
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
      <div className="fixed bottom-0 left-0 w-full z-50 flex justify-center pointer-events-none">
        <div className="w-full max-w-6xl px-2 pb-4 flex justify-between items-end gap-2 pointer-events-auto">
          {prevEvent ? (
            <button
              className="group flex items-center gap-4 px-4 py-3 rounded-2xl bg-black/80 backdrop-blur-md border border-gray-700/50 hover:bg-black/90 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-x-2 pointer-events-auto"
              onClick={() => handleNavigate(prevEvent.id, 'left')}
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-700/50 group-hover:border-gray-600/50 transition-all">
                <img 
                  src={prevEvent.coverImage} 
                  alt={prevEvent.title}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all"
                />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs text-gray-400 font-medium mb-1">
                  ← {prevEvent.date}
                </span>
                <span className="text-sm text-gray-200 group-hover:text-white transition-colors line-clamp-2 max-w-[120px] md:max-w-[200px]">
                  {prevEvent.title}
                </span>
              </div>
            </button>
          ) : <div />}
          {nextEvent ? (
            <button
              className="group flex items-center gap-4 px-4 py-3 rounded-2xl bg-black/80 backdrop-blur-md border border-gray-700/50 hover:bg-black/90 transition-all duration-300 shadow-lg hover:shadow-2xl hover:translate-x-2 pointer-events-auto"
              onClick={() => handleNavigate(nextEvent.id, 'right')}
            >
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-400 font-medium mb-1">
                  {nextEvent.date} →
                </span>
                <span className="text-sm text-gray-200 group-hover:text-white transition-colors line-clamp-2 max-w-[120px] md:max-w-[200px]">
                  {nextEvent.title}
                </span>
              </div>
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-700/50 group-hover:border-gray-600/50 transition-all">
                <img 
                  src={nextEvent.coverImage} 
                  alt={nextEvent.title}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all"
                />
              </div>
            </button>
          ) : <div />}
        </div>
      </div>
      {/* конец блока кнопок */}
      </div>
    </>
  );
};

export default EventPage;