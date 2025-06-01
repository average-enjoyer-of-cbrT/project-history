import React from 'react';
import { Photo } from '../types';

interface PhotoGalleryProps {
  photos: Photo[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  return (
    <div className="mt-8 mb-12">
      <h2 className="section-title">Фотогалерея</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <div key={index} className="photo-container rounded-md overflow-hidden shadow-md bg-black/50">
            <img 
              src={photo.url} 
              alt={photo.caption} 
              className="w-full h-64 object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
            <div className="photo-caption">
              {photo.caption}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;