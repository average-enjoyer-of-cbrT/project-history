import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-800 bg-black/40 backdrop-blur-sm mt-16">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-center">
          <div className="max-w-2xl text-center">
            <h3 className="text-lg font-medium mb-4">О проекте</h3>
            <p className="text-sm text-gray-400">
              Этот сайт посвящен событиям Великой Отечественной войны 1941-1945 гг. 
              и подвигу советского народа в борьбе против фашизма.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;