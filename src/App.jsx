import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlacementTraining from './components/PlacementTraining';
import Analogy from './components/Analogy';
import NumberSeries from './components/NumberSeries';
import Meanings from './components/Meanings';
import Opposites from './components/Opposites';
import AlphanumericLetters from './components/AlphanumericLetters';
import ProfitLoss from './components/ProfitLoss';
import Cost from './components/Cost';
import WordsRearrangement from './components/WordsRearrangement';
import Calendar from './components/Calendar';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlacementTraining />} />
        <Route path="/analogy" element={<Analogy />} />
        <Route path="/number-series" element={<NumberSeries />} />
        <Route path="/meanings" element={<Meanings />} />
        <Route path="/opposites" element={<Opposites />} />
        <Route path="/alphanumeric-letters" element={<AlphanumericLetters />} />
        <Route path="/profit-loss" element={<ProfitLoss />} />
        <Route path="/cost" element={<Cost />} />
        <Route path="/words-rearrangement" element={<WordsRearrangement />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </Router>
  );
}
