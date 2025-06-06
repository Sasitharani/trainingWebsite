import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider
import store from './store'; // Import your Redux store
import Front from './components/Front';
import Header from './components/Header';
import CodingTraining from './components/CodingTraining';
import PlacementTraining from './components/PlacementTraining';
import Signup from './components/Signup';
import Login from './components/Login';
import UserProfile from './components/UserProfile'; // Import UserProfile component
import Palette from './components/Palette'; // Import Palette component
import LogoAnimation from './components/LogoAnimation';
import AdminQuizPage from './components/quizes/AdminQuizPage';
import Analogy from './components/quizes/Analogy';
import NumberSeries from './components/quizes/NumberSeries';
import Meanings from './components/quizes/Meanings';
import Opposites from './components/quizes/Opposites';
import Alphabets from './components//quizes/Alphabets';
import ProblemSolving from './components/quizes/ProblemSolving';
import Logical from './components/quizes/Logical';
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Cost from './components/quizes/Numbers';
import WordsRearrangement from './components/quizes/WordsRearrangement';
import Calendar from './components/quizes/Calendar';
import AdminBlog from './pages/AdminBlog'; // Make sure this path is correct

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
import ProfitAndLoss from './components/ProfitAndLoss';
import Numbers from './components/quizes/Numbers';
import AdminView from './components/quizes/AdminView';
import AdminDashboard from './components/AdminDashboard';

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
          <Route path="/login" element={<Login />} />
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
          <Route path="/admin-quiz" element={<AdminQuizPage />} />
          <Route path="/analogy" element={<Analogy />} />
          <Route path="/number-series" element={<NumberSeries />} />
          <Route path="/meanings" element={<Meanings />} />
          <Route path="/opposites" element={<Opposites />} />
          <Route path="/Alphabets" element={<Alphabets />} />
          <Route path="/profit-loss" element={<ProfitAndLoss />} />
          <Route path="/numbers" element={<Numbers />} />
          <Route path="/words-rearrangement" element={<WordsRearrangement />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/problem-solving" element={<ProblemSolving />} /> {/* Added Problem Solving route */}
          <Route path="/logical" element={<Logical />} /> {/* Added Logical route */}
          <Route path="/admin-view" element={<AdminView />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="*" element={<Navigate to="/" />} />
            <Route path="/admin-blog" element={<AdminBlog />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
