import 'tailwindcss/tailwind.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const email = useSelector(state => state.user.email);
  const isAdmin = useSelector(state =>
    state.user.email === 'sasitharani@gmail.com' || state.user.membership === 'admin'
  );

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action to update Redux state
    localStorage.removeItem('user'); // Clear user data from local storage
    navigate('/'); // Redirect to the home page
  };

  return (
    <header className="bg-blue-700 text-white p-4">
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
          <li><Link to="/blog" className="hover:text-gray-400 hover:shadow-[0_0_20px_5px_rgba(0,255,255,0.8)]">Blog</Link></li>
          <li><Link to="/signup" className="hover:text-gray-400 hover:shadow-[0_0_20px_5px_rgba(0,255,255,0.8)]">Sign Up</Link></li>
          {isAdmin && <li><Link to="/test" className="hover:text-gray-400">Test</Link></li>}
          {isAdmin && <li><Link to="/admin-view" className="hover:text-gray-400">Admin View</Link></li>}
          {isAdmin && <li><Link to="/admin-quiz" className="hover:text-gray-400">Admin Quiz</Link></li>}
          {isLoggedIn ? (
            <>
              {email && <li className="hover:text-gray-400">{email.split('@')[0]}</li>}
              <li><button onClick={handleLogout} className="hover:text-gray-400 hover:shadow-[0_0_20px_5px_rgba(0,255,255,0.8)]">Logout</button></li>
            </>
          ) : (
            <li><Link to="/login" className="hover:text-gray-400 hover:shadow-[0_0_20px_5px_rgba(0,255,255,0.8)]">Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
}

