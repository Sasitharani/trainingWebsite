import React from 'react';
import { Link } from 'react-router-dom';

const linkStyles = "bg-blue-400 text-blue-900 font-semibold py-3 px-5 rounded-lg neumorphic-button text-lg sm:text-xl transition-transform transform hover:scale-105 hover:shadow-md";
const wrapperStyles = "rectangle p-6 sm:p-8 flex flex-col items-center w-full h-full";

export default function PlacementTraining() {
  return (
    <div className="parallax-section bg-transparent min-h-screen flex items-center justify-center">
      <div className="rectangle p-6 sm:p-8 max-w-4xl mx-auto border-2 border-gray-300 rounded-lg shadow-lg">
        <h1 className="text-3xl sm:text-4xl font-bold text-green-600 text-center mb-6">Placement Training</h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
          <div className={wrapperStyles}>
            <Link to="/analogy" className={linkStyles}>Analogy</Link>
          </div>
          <div className={wrapperStyles}>
            <Link to="/number-series" className={linkStyles}>Number Series</Link>
          </div>
          <div className={wrapperStyles}>
            <Link to="/meanings" className={linkStyles}>Meanings</Link>
          </div>
          <div className={wrapperStyles}>
            <Link to="/opposites" className={linkStyles}>Opposites</Link>
          </div>
          <div className={wrapperStyles}>
            <Link to="/Alphabets" className={linkStyles}>Alphabets</Link>
          </div>
          <div className={wrapperStyles}>
            <Link to="/numbers" className={linkStyles}>Quantitative</Link>
          </div>
          <div className={wrapperStyles}>
            <Link to="/words-rearrangement" className={linkStyles}>Words Rearrangement</Link>
          </div>
          <div className={wrapperStyles}>
            <Link to="/calendar" className={linkStyles}>Calendar</Link>
          </div>
          <div className={wrapperStyles}>
            <Link to="/problem-solving" className={linkStyles}>Problem Solving</Link>
          </div>
          <div className={wrapperStyles}>
            <Link to="/logical" className={linkStyles}>Logical</Link>
          </div>
        </div>
      </div>
    </div>
  );
}


