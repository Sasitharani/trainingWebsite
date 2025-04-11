import 'tailwindcss/tailwind.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const email = useSelector(state => state.user.email);

  return (
    <header className="bg-black text-white p-4">
      <nav className="flex justify-between items-center">
        <div className="text-2xl font-bold">
          <img
            src="/img/logo.jpg"
            alt="Logo"
            className="w-12 h-12 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_5px_rgba(0,255,255,0.8)]"
          />
        </div>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-gray-400 hover:shadow-[0_0_20px_5px_rgba(0,255,255,0.8)]">Home</Link></li>
          <li><Link to="/coding" className="hover:text-gray-400 hover:shadow-[0_0_20px_5px_rgba(0,255,255,0.8)]">Coding Training</Link></li>
          <li><Link to="/placement" className="hover:text-gray-400 hover:shadow-[0_0_20px_5px_rgba(0,255,255,0.8)]">Placement Training</Link></li>
          <li><Link to="/signup" className="hover:text-gray-400 hover:shadow-[0_0_20px_5px_rgba(0,255,255,0.8)]">Sign Up</Link></li>
          <li><Link to="/logo-animation" className="hover:text-gray-400 hover:shadow-[0_0_20px_5px_rgba(0,255,255,0.8)]">Test Page</Link></li>
          {isLoggedIn ? (
            <li className="hover:text-gray-400">{email.slice(0, email.indexOf('@'))}</li>
          ) : (
            <li><Link to="/login" className="hover:text-gray-400">Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
}
