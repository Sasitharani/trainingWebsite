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
          <div className="w-3/4 bg-black-500 flex flex-col items-center justify-center relative">
              {/* Happening Buttons Section */}
              <div className="flex flex-col sm:flex-row gap-8 mt-10 mb-12 z-10">
                <Link
                  to="/simple"
                  className="relative inline-block px-10 py-5 rounded-xl font-extrabold text-lg text-white bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-xl shadow-cyan-500/30 hover:from-pink-500 hover:to-yellow-500 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out animate-bounce"
                >
                  Simple
                  <span className="absolute -top-3 -right-3 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full animate-pulse shadow-lg">New</span>
                </Link>
                <Link
                  to="/login"
                  className="relative inline-block px-10 py-5 rounded-xl font-extrabold text-lg text-white bg-gradient-to-r from-green-400 via-teal-500 to-blue-600 shadow-xl shadow-green-500/30 hover:from-orange-500 hover:to-pink-500 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out animate-bounce"
                >
                  With Login
                  <span className="absolute -bottom-3 -left-3 bg-pink-400 text-white text-xs px-2 py-1 rounded-full animate-pulse shadow-lg">Secure</span>
                </Link>
              </div>
              {/* Tiles Section (optional, can be moved below or above buttons) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4 opacity-90">
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
                              border: '2px solid #FFF',
                              borderRadius: '10px',
                          }}
                          data-hover-text={`Hover text for ${tile.text}`}
                          onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'scale(1.1)';
                              e.currentTarget.style.zIndex = '10';
                          }}
                          onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'scale(1)';
                              e.currentTarget.style.zIndex = '1';
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

