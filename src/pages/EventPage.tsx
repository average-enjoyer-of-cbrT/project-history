import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import PhotoGallery from '../components/PhotoGallery';
import EventTimeline from '../components/EventTimeline';
import EventMap from '../components/EventMap';
import { events } from '../data/events'; // Assuming events are sorted chronologically here

interface EventPageProps {
  eventId: string;
}

const EventPage: React.FC<EventPageProps> = ({ eventId }) => {
  const navigate = useNavigate();
  
  // Find current event and its index
  const currentIndex = events.findIndex(e => e.id === eventId);
  const event = events[currentIndex];

  // Get adjacent events info
  const prevEvent = currentIndex > 0 ? events[currentIndex - 1] : null;
  const nextEvent = currentIndex < events.length - 1 ? events[currentIndex + 1] : null;

  useEffect(() => {
    if (!event) {
      navigate('/'); // Navigate to home if event not found
    }
    window.scrollTo(0, 0);
  }, [event, navigate, eventId]);

  if (!event) return null;

  const handleNavigate = (targetId: string) => {
    navigate(`/events/${targetId}`);
  };

  // Common button styles
  const buttonBaseStyle = "group p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 backdrop-blur-md";
  const enabledButtonStyle = "bg-black/50 hover:bg-black/70 border-white/10 hover:border-white/20 text-white shadow-lg";

  return (
    <>
      <div className="animate-fadeIn relative pb-12">
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

        {/* Navigation Buttons */}
        <div className="mt-4 pt-4 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-stretch gap-4 px-4 md:px-0">
          {prevEvent && (
            <button
              onClick={() => handleNavigate(prevEvent.id)}
              className={`${buttonBaseStyle} ${enabledButtonStyle} hover:-translate-x-2`}
            >
              <div className="h-16 w-16 rounded-xl overflow-hidden border border-white/10 group-hover:border-white/20">
                <img 
                  src={prevEvent.coverImage}
                  alt={prevEvent.title}
                  className="h-full w-full object-cover filter grayscale group-hover:grayscale-0 transition-all"
                />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm text-gray-400">← Предыдущее событие</span>
                <span className="text-white/90 font-medium line-clamp-1 max-w-[200px]">
                  {prevEvent.title}
                </span>
                <span className="text-sm text-gray-500">{prevEvent.date}</span>
              </div>
            </button>
          )}

          {nextEvent && (
            <button
              onClick={() => handleNavigate(nextEvent.id)}
              className={`${buttonBaseStyle} ${enabledButtonStyle} hover:translate-x-2 sm:ml-auto`}
            >
              <div className="flex flex-col items-end">
                <span className="text-sm text-gray-400">Следующее событие →</span>
                <span className="text-white/90 font-medium line-clamp-1 max-w-[200px] text-right">
                  {nextEvent.title}
                </span>
                <span className="text-sm text-gray-500">{nextEvent.date}</span>
              </div>
              <div className="h-16 w-16 rounded-xl overflow-hidden border border-white/10 group-hover:border-white/20">
                <img 
                  src={nextEvent.coverImage}
                  alt={nextEvent.title}
                  className="h-full w-full object-cover filter grayscale group-hover:grayscale-0 transition-all"
                />
              </div>
            </button>
          )}
        </div>

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
          <section className="mb-8">
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
    </>
  );
};

export default EventPage;