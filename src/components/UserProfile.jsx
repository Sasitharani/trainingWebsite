import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const UserProfile = () => {
    const { username, email } = useSelector((state) => state.user);



    return (
        <div className="relative bg-gray-200 min-h-screen flex items-center justify-center">
      
            <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">User Profile</h1>
                <div className="mb-6">
                    <label className="block text-gray-600 text-sm font-semibold">Username:</label>
                    <p className="text-gray-900 text-lg">{username}</p>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-600 text-sm font-semibold">E-Mail:</label>
                    <p className="text-gray-900 text-lg">{email}</p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
