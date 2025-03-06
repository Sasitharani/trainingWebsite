import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider
import store from './store'; // Import your Redux store
import Front from './components/Front';
import Header from './components/Header';
import CodingTraining from './components/CodingTraining';
import PlacementTraining from './components/PlacementTraining';
import Signup from './components/Signup';
import Login from './components/Login'; // Import Login component

import './App.css';
import './tailwind.css';

function App() {
  return (
    <Provider store={store}> {/* Wrap with Provider */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Front />} />
          <Route path="/coding" element={<CodingTraining />} />
          <Route path="/placement" element={<PlacementTraining />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} /> {/* Added Login route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
