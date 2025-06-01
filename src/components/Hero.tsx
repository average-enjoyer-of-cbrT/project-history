import React from 'react';
import { Link } from 'react-router-dom';

interface HeroProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundImage?: string;
}

const Hero: React.FC<HeroProps> = ({ 
  title, 
  subtitle, 
  buttonText, 
  buttonLink,
  backgroundImage 
}) => {
  return (
    <div 
      className="relative h-[70vh] flex items-center justify-center text-center overflow-hidden mb-16"
    >
      {backgroundImage && (
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            filter: 'grayscale(100%) brightness(0.3) contrast(1.2)',
          }}
        ></div>
      )}
      
      <div className="relative z-1 max-w-3xl px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          {title}
        </h1>
        
        {subtitle && (
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        
        {buttonText && buttonLink && (
          <Link 
            to={buttonLink}
            className="inline-block px-6 py-3 border-2 border-white hover:bg-white hover:text-black transition-all duration-300 font-medium tracking-wider"
          >
            {buttonText}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Hero;