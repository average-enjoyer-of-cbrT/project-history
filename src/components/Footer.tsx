import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-gray-800 bg-black/40 backdrop-blur-sm mt-16">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">О проекте</h3>
            <p className="text-sm text-gray-400">
              Этот сайт посвящен событиям Великой Отечественной войны 1941-1945 гг. 
              и подвигу советского народа в борьбе против фашизма.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Навигация</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-white transition-colors">Главная</Link></li>
              <li><Link to="/events/moscow-battle" className="hover:text-white transition-colors">Битва за Москву</Link></li>
              <li><Link to="/events/stalingrad-battle" className="hover:text-white transition-colors">Сталинградская битва</Link></li>
              <li><Link to="/events/leningrad-blockade" className="hover:text-white transition-colors">Блокада Ленинграда</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Память</h3>
            <p className="text-sm text-gray-400">
              Вечная память героям, защитившим Родину и весь мир от нацизма.
              Никто не забыт, ничто не забыто.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>© {currentYear} Великая Отечественная Война | Память и История</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;