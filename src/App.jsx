import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CarInfinity from './carinfinity/CarInfinity'; // Adjust the import path as necessary

import './App.css';
import './tailwind.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CarInfinity />} />
        {/* Add other routes here */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
