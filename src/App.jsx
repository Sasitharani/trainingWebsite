import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Front from './components/Front';
import Header from './components/Header';
import CodingTraining from './components/CodingTraining';
import PlacementTraining from './components/PlacementTraining';

import './App.css';
import './tailwind.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Front />} />
        <Route path="/coding" element={<CodingTraining />} />
        <Route path="/placement" element={<PlacementTraining />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
