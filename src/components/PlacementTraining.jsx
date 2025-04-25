import { Link } from 'react-router-dom';


export default function PlacementTraining() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Placement Training</h1>
      <ul className="list-disc pl-5">
        <li><Link to="/analogy">Analogy</Link></li>
        <li><Link to="/number-series">Number Series</Link></li>
        <li><Link to="/meanings">Meanings</Link></li>
        <li><Link to="/opposites">Opposites</Link></li>
        <li><Link to="/Alphabets">Alphabets</Link></li>
        <li><Link to="/numbers">Quantitative</Link></li>
        <li><Link to="/words-rearrangement">Words Rearrangement</Link></li>
        <li><Link to="/calendar">Calendar</Link></li>
      </ul>
      <Link to="/problem-solving" className="text-blue-500 hover:underline">
        Go to Problem Solving
      </Link>
      <Link to="/logical" className="text-blue-500 hover:underline ml-4">
        Go to Logical
      </Link>
      <div className="links">
        <a href="/numbers" className="text-blue-500 hover:underline">Go to Numbers Quiz</a>
      </div>
    </div>
  );
}
