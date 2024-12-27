import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Front from './components/Front';
import Contact from './components/Contact';
import Header from './components/Header';
import Page1 from './components/Page1';

import './App.css';
import './tailwind.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Front />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/page1" element={<Page1 />} />
        {/* Add other routes here */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
