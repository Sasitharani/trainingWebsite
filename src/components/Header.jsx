import 'tailwindcss/tailwind.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const email = useSelector(state => state.user.email);

  return (
    <header className="bg-pink-500 text-white p-4">
      <nav className="flex justify-between items-center">
        <div className="text-2xl font-bold">Logo</div>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-gray-400">Home</Link></li>
          <li><Link to="/coding" className="hover:text-gray-400">Coding Training</Link></li>
          <li><Link to="/placement" className="hover:text-gray-400">Placement Training</Link></li>
          <li><Link to="/signup" className="hover:text-gray-400">Sign Up</Link></li>
    
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
