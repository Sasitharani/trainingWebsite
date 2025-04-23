import { Link } from 'react-router-dom';

export default function PlacementTraining() {
  return (
    <div className="bg-white p-8">
      <h1 className="text-2xl font-bold mb-4">Placement Training</h1>
      <ul className="list-disc pl-5">
        <li><Link to="/analogy">Analogy</Link></li>
        <li><Link to="/number-series">Number Series</Link></li>
        <li><Link to="/meanings">Meanings</Link></li>
        <li><Link to="/opposites">Opposites</Link></li>
        <li><Link to="/alphanumeric-letters">Alphanumeric Letters</Link></li>
        <li><Link to="/profit-loss">Profit and Loss</Link></li>
        <li><Link to="/cost">Cost</Link></li>
        <li><Link to="/words-rearrangement">Words Rearrangement</Link></li>
        <li><Link to="/calendar">Calendar</Link></li>
      </ul>
    </div>
  );
}
