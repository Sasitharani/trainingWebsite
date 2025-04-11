import React, { useState } from 'react';
import '../tailwind.css';

const LogoAnimation = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex items-center justify-center h-screen bg-black relative">
      {/* Background with subtle microchip pattern */}
      <div className="absolute inset-0 bg-[url('/img/microchip-pattern.png')] bg-cover opacity-10"></div>

      {/* Central IITI Logo */}
      <div
        className={`relative transition-all duration-500 ${hovered ? 'animate-pulse' : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src="/img/logo.jpg"
          alt="IITI Logo"
          className="w-48 h-48 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_5px_rgba(0,255,255,0.8)]"
        />

        {/* Circuit lines and boxes */}
        {hovered && (
          <>
            <div className="absolute top-0 left-0 w-32 h-16 bg-gray-800 text-white flex items-center justify-center rounded-md shadow-md transition-transform transform -translate-x-20 -translate-y-20">
              Why IITI
            </div>
            <div className="absolute bottom-0 left-0 w-32 h-16 bg-gray-800 text-white flex items-center justify-center rounded-md shadow-md transition-transform transform -translate-x-20 translate-y-20">
              Innovation Hub
            </div>
            <div className="absolute top-0 right-0 w-32 h-16 bg-gray-800 text-white flex items-center justify-center rounded-md shadow-md transition-transform transform translate-x-20 -translate-y-20">
              Web Development Courses
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-16 bg-gray-800 text-white flex items-center justify-center rounded-md shadow-md transition-transform transform translate-x-20 translate-y-20">
              Interview Preparations
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LogoAnimation;
