import React, { useEffect, useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs'; // Replaced bcrypt with bcryptjs for browser compatibility
import { Link, useNavigate } from 'react-router-dom';
import GoogleLogin from '../GoogleLogin'; // Import GoogleLogin component
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, login, logout } from '../store/userSlice'; // Import actions
import Swal from 'sweetalert2';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();                 
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);

    // Function to check if user is admin
    const isAdminEmail = (email) => {
        // List of admin emails
        const adminEmails = ['sasitharani@gmail.com'];
        return adminEmails.includes(email.toLowerCase());
    };

    useEffect(() => {

    }, []); // Add useEffect hook;
    const handleLogin1 = async (e) => {
        console.log('Login function called');
        e.preventDefault();
        setLoading(true);

        try {
            // Check if this is an admin email before making the API call
            const isAdmin = isAdminEmail(email);
            console.log('Is admin email:', isAdmin); // Debug log

            // Make the API call
                const response = await axios.post('https://trainingwebsite-apot.onrender.com/api/login', {
                    email,
                    password
                });

                if (response.status === 200) {
                    // Create user data object
                    const userData = {
                        email: response.data.user.email,
                        username: response.data.user.username || email.split('@')[0],
                        membership: response.data.user.membership, // Always use backend value
                        isAdmin: isAdmin, // Set based on email check
                        isLoggedIn: true
                    };

                    console.log('Saving user to localStorage:', userData); // Debug log
                    localStorage.setItem('user', JSON.stringify(userData));

                    // Update Redux state
                    dispatch(loginSuccess());
                    dispatch(login(userData));

                    // Success message
                    Swal.fire({
                    title: isAdmin ? 'Admin Login Success' : 'Login Success',
                    text: isAdmin ? 'You have successfully logged in as an administrator.' : 'You have successfully logged in.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });

                // Explicitly handle navigation based on admin status
                if (isAdmin) {
                    console.log('Redirecting to admin dashboard'); // Debug log
                    setTimeout(() => {
                        navigate('/admin-dashboard');
                    }, 100); // Small delay to ensure state updates first
                } else {
                    console.log('Redirecting to user profile'); // Debug log
                    navigate('/user-profile');
            }
            } else {
                setMessage(response.data.message || 'Login failed.');
        }
        } catch (error) {
            console.error('Error during login:', error);
            setMessage('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        dispatch(logout({ meta: { fileName: 'Login.jsx' } }));
        localStorage.removeItem('user');
        localStorage.removeItem('lastSpinTime');
        navigate('/login');
    };

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orangePastel to-pinkPastel relative">

            {loading && (
                <div className="absolute inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="loader"></div>
                </div>
            )}
            <div className={`bg-white p-8 shadow-2xl rounded-3xl w-full max-w-md relative ${loading ? 'blur-sm' : ''}`}>
                <h2 className="text-2xl font-bold mb-6 text-center z-20">Login</h2>
                <form onSubmit={handleLogin1}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Please enter your Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Login
                        </button>
                        <GoogleLogin
                            setLoading={setLoading}
                            setMessage={setMessage}
                            dispatch={dispatch}
                            navigate={navigate}
                        />
                        <button
                            type="button"
                            onClick={() => navigate('/signup')}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Sign Up
                        </button>
                    </div>
                    <Link to="/forgot-password" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                            Forgot Password?
                    </Link>
                </form>
                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
                {user ? (
                    <button
                        onClick={handleLogout}
                        className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                        Logout
                    </button>
                ) : null}
            </div>
        </div>
    );
};

export default Login;