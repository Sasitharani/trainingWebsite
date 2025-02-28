import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import bgImage from '../img/bg.jpg';

export default function Front() {
  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8"></h1>
        <Link to="/coding" className="bg-blue-500 text-white px-4 py-2 rounded mr-4">Coding Training</Link>
        <Link to="/placement" className="bg-green-500 text-white px-4 py-2 rounded">Placement Training</Link>
      </div>
    </div>
  );
}
