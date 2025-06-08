import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AdminDashboard() {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const isAdmin = useSelector(state =>
    state.user.email === 'sasitharani@gmail.com' || state.user.membership === 'admin'
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else if (!isAdmin) {
      alert('Access denied. Admins only.');
      navigate('/');
    }
  }, [isLoggedIn, isAdmin, navigate]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <ul className="space-y-4">
        <li>
          <Link to="/admin-view" className="text-blue-500 hover:underline">Admin View</Link>
        </li>
        <li>
          <Link to="/admin-quiz" className="text-blue-500 hover:underline">Admin Quiz</Link>
        </li>
        <li>
          <Link to="/admin-blog" className="text-blue-500 hover:underline">Manage Blog Posts</Link>
        </li>
      </ul>
    </div>
  );
}

