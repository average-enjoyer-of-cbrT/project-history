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
      <div className={`animate-fadeIn relative duration-300 pb-32 ${transition === 'left' ? '-translate-x-16 opacity-0' : ''} ${transition === 'right' ? 'translate-x-16 opacity-0' : ''}`}>
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
            coordinates: e.coordinates || [54.5, 25],
            coverImage: e.coverImage
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
      </div>
      {/* Кнопки навигации — фиксированная версия поверх всего */}
      <div className="fixed inset-x-0 bottom-0 z-50 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 pb-6">
          <div className="flex justify-between items-center pointer-events-auto">
            {prevEvent ? (
              <button
                aria-label={`К предыдущему событию: ${prevEvent.title}`}
                className="group flex items-center gap-2 sm:gap-4 px-3 sm:px-6 py-3 sm:py-4 rounded-2xl bg-black/70 backdrop-blur-md border border-gray-700/50 hover:bg-black/90 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-x-2 text-xs sm:text-base"
                onClick={() => handleNavigate(prevEvent.id, 'left')}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden border border-gray-700/50 group-hover:border-gray-600/50 transition-all">
                  <img 
                    src={prevEvent.coverImage} 
                    alt={prevEvent.title}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] sm:text-xs text-gray-400 font-medium mb-1">
                    ← {prevEvent.date}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-200 group-hover:text-white transition-colors line-clamp-2 max-w-[120px] sm:max-w-[200px]">
                    {prevEvent.title}
                  </span>
                </div>
              </button>
            ) : <div />}
            {nextEvent ? (
              <button
                aria-label={`К следующему событию: ${nextEvent.title}`}
                className="group flex items-center gap-2 sm:gap-4 px-3 sm:px-6 py-3 sm:py-4 rounded-2xl bg-black/70 backdrop-blur-md border border-gray-700/50 hover:bg-black/90 transition-all duration-300 shadow-lg hover:shadow-2xl hover:translate-x-2 text-xs sm:text-base"
                onClick={() => handleNavigate(nextEvent.id, 'right')}
              >
                <div className="flex flex-col items-end">
                  <span className="text-[10px] sm:text-xs text-gray-400 font-medium mb-1">
                    {nextEvent.date} →
                  </span>
                  <span className="text-xs sm:text-sm text-gray-200 group-hover:text-white transition-colors line-clamp-2 max-w-[120px] sm:max-w-[200px]">
                    {nextEvent.title}
                  </span>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden border border-gray-700/50 group-hover:border-gray-600/50 transition-all">
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
      </div>
    </>
  );
};

export default EventPage;