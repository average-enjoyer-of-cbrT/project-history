import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { events } from '../data/events';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav 
      className={`sticky top-0 z-10 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-medium tracking-wider hover:text-gray-300 transition-colors">
            ВЕЛИКАЯ ОТЕЧЕСТВЕННАЯ ВОЙНА
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-gray-300 transition-colors">
              Главная
            </Link>
            <div className="relative group">
              <button className="hover:text-gray-300 transition-colors">
                События
              </button>
              <div className="absolute left-0 mt-2 w-56 bg-black/90 shadow-lg rounded-md overflow-hidden transform scale-0 group-hover:scale-100 transition-transform origin-top">
                {events.map(event => (
                  <Link 
                    key={event.id}
                    to={`/events/${event.id}`}
                    className="block px-4 py-2 hover:bg-gray-800 transition-colors"
                  >
                    {event.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 mt-4 rounded-md p-4 space-y-3">
            <Link to="/" className="block hover:text-gray-300 transition-colors">
              Главная
            </Link>
            <div className="pt-2 border-t border-gray-800">
              <p className="text-sm text-gray-500 mb-2">События:</p>
              <div className="space-y-2 pl-2">
                {events.map(event => (
                  <Link 
                    key={event.id}
                    to={`/events/${event.id}`}
                    className="block hover:text-gray-300 transition-colors"
                  >
                    {event.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;