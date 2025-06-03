import React, { useState, useRef, useEffect } from 'react';
import { events } from '../data/events';
import { Event } from '../types';
import { useNavigate } from 'react-router-dom';

const GlobalTimeline = (): JSX.Element => {
  const [activeEvent, setActiveEvent] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Автоматическая прокрутка
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;    let startTime: number | null = null;
    let direction = 1;
    const speed = 0.6; // пикселей за кадр (было 1)
    const pauseDuration = 3000; // 3 секунды паузы (было 2)
    let isPaused = false;
    let pauseTimeout: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      
      if (!isPaused) {
        container.scrollLeft += speed * direction;

        // Проверяем достижение границ
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
          direction = -1;
          isPaused = true;
          pauseTimeout = setTimeout(() => {
            isPaused = false;
          }, pauseDuration);
        } else if (container.scrollLeft <= 0) {
          direction = 1;
          isPaused = true;
          pauseTimeout = setTimeout(() => {
            isPaused = false;
          }, pauseDuration);
        }
      }

      requestAnimationFrame(animate);
    };

    const animation = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animation);
      clearTimeout(pauseTimeout);
    };
  }, []);

  const sortedEvents = React.useMemo(() => {
    const filtered = events
      .filter((event: Event): event is Event & { timeline: NonNullable<Event['timeline']> } => 
        event.timeline !== undefined && event.timeline.length > 0
      );
    return filtered.sort((a, b) => {
      const getYear = (str: string) => {
        const match = str.match(/(\d{4})/);
        return match ? parseInt(match[1], 10) : 0;
      };
      const yearA = getYear(a.date);
      const yearB = getYear(b.date);
      if (yearA === yearB) return 0;
      return yearA - yearB;
    });
  }, []);

  if (sortedEvents.length === 0) {
    return <div>Нет доступных событий</div>;
  }

  const handleEventClick = (eventId: string) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="w-full bg-neutral-900/50 p-8 rounded-lg backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-12 text-center text-gray-100">
        Хронология Великой Отечественной войны
      </h2>
      
      <div className="relative w-full overflow-hidden">
        {/* Линия времени */}
        <div className="absolute w-full h-0.5 bg-white/20 top-6" />
        
        {/* События с автоматической прокруткой */}
        <div 
          ref={scrollContainerRef}
          className="flex items-start gap-16 pb-8 overflow-x-auto scrollbar-hide"
        >
          {sortedEvents.map((event) => (
            <div
              key={event.id}
              className="relative flex flex-col items-center first:pl-4 last:pr-4"
              style={{ minWidth: '350px' }}
            >
              {/* Точка события */}
              <div
                className={`w-5 h-5 rounded-full cursor-pointer transition-all duration-300 
                  ${activeEvent === event.id 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white hover:scale-110'
                  }`}
                onMouseEnter={() => setActiveEvent(event.id)}
                onMouseLeave={() => setActiveEvent(null)}
              />
              
              {/* Дата события */}
              <div className="mt-6 text-center text-sm text-gray-400 font-medium">
                {event.timeline[0].date}
              </div>

              {/* Карточка события */}
              <div 
                className="mt-6 w-[350px] bg-neutral-800/90 rounded-lg shadow-2xl 
                  border border-white/10 transition-all duration-300 cursor-pointer
                  hover:border-white/20 hover:shadow-2xl hover:-translate-y-1"
                onClick={() => handleEventClick(event.id)}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent" />
                  <img
                    src={event.coverImage}
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-t-lg grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold mb-3 text-gray-100 text-xl">{event.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-3">{event.shortDescription}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Градиентные затемнения по краям для индикации прокрутки */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-neutral-900/50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-neutral-900/50 to-transparent" />
      </div>
    </div>
  );
};

export default GlobalTimeline;
