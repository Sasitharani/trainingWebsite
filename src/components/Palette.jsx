import React from 'react';
import { Link } from 'react-router-dom';

const colors = [
  { name: 'HTML', color: 'bg-customPalette-lightPurple', textColor: 'text-white' },
  { name: 'CSS', color: 'bg-customPalette-lightBlue', textColor: 'text-white' },
  { name: 'Tailwind Css', color: 'bg-customPalette-lightGreen', textColor: 'text-gray-800' },
  { name: 'Javascript', color: 'bg-customPalette-lightYellow', textColor: 'text-gray-800' },
  { name: 'React JS', color: 'bg-customPalette-lightPink', textColor: 'text-white' },
  { name: 'Aptitude', color: 'bg-customPalette-lightPurple', textColor: 'text-white' },
  { name: 'Group Discussion', color: 'bg-customPalette-lightBlue', textColor: 'text-white' },
  { name: 'Face to Face Interview', color: 'bg-customPalette-lightGreen', textColor: 'text-gray-800' },
];

export default function Palette() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-4 grid-rows-3 gap-10 border border-gray-300">
        <div className="border border-gray-500 h-42">Cell 1</div>
        <div className="border border-gray-500 h-42">Cell 2</div>
        <div className="border border-gray-500 h-42">Cell 3</div>
        <div className="border border-gray-500 h-42">Cell 4</div>
        <div className="border border-gray-500 h-42">Cell 5</div>
        <div className="border border-gray-500 h-42">Cell 6</div>
        <div className="border border-gray-500 h-42">Cell 7</div>
        <div className="border border-gray-500 h-42">Cell 8</div>
        <div className="border border-gray-500 h-42">Cell 9</div>
        <div className="border border-gray-500 h-42">Cell 10</div>
        <div className="border border-gray-500 h-42">Cell 11</div>
        <div className="border border-gray-500 h-42">Cell 12</div>
        {/* <Link 
          to="/html" 
          className="col-span-1 row-span-1 w-1/4 h-1/4 bg-customPalette-lightPurple flex items-center justify-center rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
        >
          <span className="text-white font-semibold">HTML</span>
        </Link>
        <Link 
          to="/css" 
          className="col-span-1 row-span-1 w-1/4 h-1/4 bg-customPalette-lightBlue flex items-center justify-center rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
        >
          <span className="text-white font-semibold">CSS</span>
        </Link>
        <Link 
          to="/tailwindcss" 
          className="col-span-1 row-span-1 w-1/4 h-2/5 bg-customPalette-lightGreen flex items-center justify-center rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
        >
          <span className="text-gray-800 font-semibold">Tailwind Css</span>
        </Link>
        <Link 
          to="/javascript" 
          className="col-span-1 row-span-1 w-1/4 h-1/4 bg-customPalette-lightYellow flex items-center justify-center rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
        >
          <span className="text-gray-800 font-semibold">Javascript</span>
        </Link>
        <Link 
          to="/reactjs" 
          className="col-span-2 row-span-1 w-1/2 h-2/5 bg-customPalette-lightPink flex items-center justify-center rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
        >
          <span className="text-white font-semibold">React JS</span>
        </Link>
        <Link 
          to="/aptitude" 
          className="col-span-1 row-span-1 w-1/4 h-1/4 bg-customPalette-lightPurple flex items-center justify-center rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
        >
          <span className="text-white font-semibold">Aptitude</span>
        </Link>
        <Link 
          to="/groupdiscussion" 
          className="col-span-2 row-span-1 w-1/2 h-2/5 bg-customPalette-lightBlue flex items-center justify-center rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
        >
          <span className="text-white font-semibold">Group Discussion</span>
        </Link>
        <Link 
          to="/facetofaceinterview" 
          className="col-span-1 row-span-1 w-1/4 h-1/4 bg-customPalette-lightGreen flex items-center justify-center rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
        >
          <span className="text-gray-800 font-semibold">Face to Face Interview</span>
        </Link> */}
      </div>
    </div>
  );
}
