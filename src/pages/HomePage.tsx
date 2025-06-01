import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { events } from '../data/events';

const HomePage: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      <Hero 
        title="Великая Отечественная Война"
        subtitle="1941-1945: Подвиг и память советского народа"
        backgroundImage="https://images.pexels.com/photos/1776444/pexels-photo-1776444.jpeg?auto=compress&cs=tinysrgb&w=1600"
      />
      
      <section className="mb-16">
        <h2 className="section-title">О войне</h2>
        <p className="mb-6 leading-relaxed">
          Великая Отечественная война (22 июня 1941 — 9 мая 1945) — война Союза Советских Социалистических Республик 
          против нацистской Германии и её европейских союзников (Венгрии, Италии, Румынии, Финляндии, Словакии и Хорватии).
        </p>
        <p className="mb-6 leading-relaxed">
          Важнейшая составная часть Второй мировой войны, завершившаяся победой Красной Армии и безоговорочной капитуляцией 
          вооружённых сил Германии. В Советском Союзе война с Германией и её европейскими союзниками официально называлась 
          Великой Отечественной войной в честь Отечественной войны 1812 года.
        </p>
        <p className="leading-relaxed">
          Одна из самых кровопролитных войн в истории человечества. В ходе войны погибло более 26 миллионов советских граждан.
        </p>
      </section>
      
      <section className="mb-16">
        <h2 className="section-title">Ключевые события</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {events.map(event => (
            <Link 
              key={event.id}
              to={`/events/${event.id}`}
              className="bg-black/30 hover:bg-black/50 transition-all duration-300 p-6 rounded-md border border-gray-800 hover:border-gray-700 group"
            >
              <div 
                className="h-48 mb-4 overflow-hidden rounded-md"
                style={{
                  backgroundImage: `url(${event.coverImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'grayscale(100%) contrast(1.1) brightness(0.7)'
                }}
              ></div>
              <h3 className="text-xl font-medium mb-2 group-hover:text-white transition-colors">
                {event.title}
              </h3>
              <p className="text-sm text-gray-400 mb-3">
                {event.date}
              </p>
              <p className="text-gray-300 text-sm line-clamp-3">
                {event.shortDescription}
              </p>
            </Link>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="section-title">Цена Победы</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div>
            <h3 className="text-xl font-medium mb-4">Человеческие потери</h3>
            <p className="text-gray-300 leading-relaxed">
              В годы войны Советский Союз потерял около 26,6 миллионов человек. Это около 13,7% от довоенной 
              численности населения СССР. Из них военные потери составили 8,7 миллионов человек, а остальные — 
              гражданское население.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-4">Материальные потери</h3>
            <p className="text-gray-300 leading-relaxed">
              Было разрушено 1710 городов и посёлков, более 70 тысяч сёл и деревень, 32 тысячи промышленных предприятий,
              65 тысяч километров железнодорожных путей. Страна потеряла около 30% национального богатства.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;