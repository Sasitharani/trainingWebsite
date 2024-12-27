import React, { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="w-full text-white p-4 flex justify-between items-center fixed top-0 left-0  z-10 bg-black ">
      <h1 className="text-2xl font-bold">Insphile Management Solutions</h1>
      <nav>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        <ul className={`md:flex space-x-12 ${isMenuOpen ? 'fixed inset-0 bg-black flex flex-col items-start justify-center space-y-4 p-4' : 'hidden'}`}>
          <li className="hover:text-yellow-500 font-medium text-lg"><a href="#home">Home</a></li>
          <li className="hover:text-yellow-500 font-medium text-lg"><a href="#service">Our Services</a></li>
          <li 
            className="hover:text-yellow-500 font-medium text-lg relative group"
            onMouseEnter={() => setIsDropdownOpen(true)}
          >
            <a href="#db" className="flex items-center">What do we do</a>
            <ul className={`absolute ${isDropdownOpen ? 'block' : 'hidden'} bg-black text-white mt-2 space-y-2 p-2` }             onMouseLeave={() => setIsDropdownOpen(false)}>
              <li className="hover:text-yellow-500 font-medium text-lg"><a href="#3">Candidate Database</a></li>
              <li className="hover:text-yellow-500 font-medium text-lg"><a href="#4">Onboarding</a></li>
              <li className="hover:text-yellow-500 font-medium text-lg"><a href="#5">Collaboration</a></li>
            </ul>
          </li>
          <li className="hover:text-yellow-500 font-medium text-lg"><a href="#sectors">Sectors</a></li>
          <li className="font-medium text-lg relative group">
            <a href="#testimonials" className="hover:text-yellow-500 flex items-center font-medium text-lg">
            Testimonials
            </a>
          </li>
          <li className="hover:text-yellow-500 font-medium text-lg"><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}