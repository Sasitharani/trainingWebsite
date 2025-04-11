import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider
import store from './store'; // Import your Redux store
import Front from './components/Front';
import Header from './components/Header';
import CodingTraining from './components/CodingTraining';
import PlacementTraining from './components/PlacementTraining';
import Signup from './components/Signup';
import Login from './components/Login'; // Import Login component
import UserProfile from './components/UserProfile'; // Import UserProfile component
import Palette from './components/Palette'; // Import Palette component
import LogoAnimation from './components/LogoAnimation';

import './App.css';
import './tailwind.css';

import HTML from './main/HTML';
import CSS from './main/CSS';
import TailwindCss from './main/TailwindCss';
import Javascript from './main/Javascript';
import ReactJS from './main/ReactJS';
import Aptitude from './main/Aptitude';
import GroupDiscussion from './main/GroupDiscussion';
import FaceToFaceInterview from './main/FaceToFaceInterview';

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
          <Route path="/user-profile" element={<UserProfile />} /> {/* Added UserProfile route */}
          <Route path="/palette" element={<Palette />} /> {/* Added Palette route */}
          <Route path="/logo-animation" element={<LogoAnimation />} />
          <Route path="/html" element={<HTML />} />
          <Route path="/css" element={<CSS />} />
          <Route path="/tailwindcss" element={<TailwindCss />} />
          <Route path="/javascript" element={<Javascript />} />
          <Route path="/reactjs" element={<ReactJS />} />
          <Route path="/aptitude" element={<Aptitude />} />
          <Route path="/groupdiscussion" element={<GroupDiscussion />} />
          <Route path="/facetofaceinterview" element={<FaceToFaceInterview />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
