import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
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
      </ul>
    </div>
  );
}
