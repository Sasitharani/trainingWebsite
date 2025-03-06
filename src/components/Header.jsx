import 'tailwindcss/tailwind.css';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between items-center">
        <div className="text-2xl font-bold">Logo</div>
        <ul className="flex space-x-4">
          <li><a href="#home" className="hover:text-gray-400">Home</a></li>
          <li><a href="#about" className="hover:text-gray-400">About</a></li>
          <li><a href="#services" className="hover:text-gray-400">Courses</a></li>
          <li><a href="#contact" className="hover:text-gray-400">Contact</a></li>
        </ul>
        <div className="relative">
          <button className="bg-gray-700 px-4 py-2 rounded">Menu</button>
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50"> {/* Added z-50 class */}
            <Link to="/" className="block px-4 py-2">Home</Link>
            <Link to="/coding" className="block px-4 py-2">Coding Training</Link>
            <Link to="/placement" className="block px-4 py-2">Placement Training</Link>
            <Link to="/signup" className="block px-4 py-2">Sign Up</Link>
            <Link to="/login" className="block px-4 py-2">Login</Link> {/* Added Login link */}
          </div>
        </div>
      </nav>
    </header>
  );
}
