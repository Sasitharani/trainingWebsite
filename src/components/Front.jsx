import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import bgImage from '../img/fbg.jpg';
import React from 'react';

export default function Front() {
  const tiles = [
      { bgColor: '#D8BFD8', textColor: '#FFFFFF', text: 'HTML' },
      { bgColor: '#98FF98', textColor: '#F0FFF0', text: 'CSS' },
      { bgColor: '#FFDAB9', textColor: '#FFF5EE', text: 'TailwindCSS' },
      { bgColor: '#87CEEB', textColor: '#F0FFFF', text: 'Javascript' },
      { bgColor: '#FFC107', textColor: '#FFF8DC', text: 'React' },
      { bgColor: '#FF7F50', textColor: '#FFE4E1', text: 'MySQL' },
  ];

  return (
      <div className="h-screen w-screen flex bg-black">
          {/* Left side */}
          <div className="w-1/4 bg-pink-300 flex flex-col justify-center items-center">
              <img src={bgImage} alt="Background" className="w-full h-full object-cover" />
          </div>
          {/* Right side */}
          <div className="w-3/4 bg-black-500">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
                  {tiles.map((tile, index) => (
                      <div
                          key={index}
                          className="m-0 p-2 flex justify-center items-center"
                          style={{
                              backgroundColor: tile.bgColor,
                              color: tile.textColor,
                              width: '280px',
                              height: '250px',
                              transition: 'transform 0.3s',
                              border: '2px solid #FFF', // Added border
                              borderRadius: '10px', // Added rounded border
                          }}
                          data-hover-text={`Hover text for ${tile.text}`} // Placeholder for hover text
                          onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'scale(1.1)';
                              e.currentTarget.style.zIndex = '10'; // Set highest zIndex on hover
                          }}
                          onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'scale(1)';
                              e.currentTarget.style.zIndex = '1'; // Reset zIndex on leave
                          }}
                      >
                          {tile.text}
                      </div>
                  ))}
              </div>
          </div>
      </div>
  );
};

