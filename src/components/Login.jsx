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
    const [loading, setLoading] = useState(false); // Add loading state

    const navigate = useNavigate();
    const dispatch = useDispatch();                 
    const isLoggedIn = useSelector(state => state.user.isLoggedIn); // Get isLoggedIn from slice

    useEffect(() => {

    }, []); // Add useEffect hook;

    const handleLogin1 = async (e) => {
        console.log('Login function called');
        e.preventDefault();
        setLoading(true); // Set loading to true

        try {
            const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before sending it to the server
            console.log('Hashed Password:', hashedPassword); // Debugging log for hashed password
            //const response = await axios.post('https://trainingwebsite-apot.onrender.com/api/login', {
                const response = await axios.post('http://localhost:3004/api/login', {
                email,
                password // Send plaintext password
            });

            if (response.status === 200) {
                setMessage('Login Successfully');
                dispatch(loginSuccess());
                Swal.fire({
                    title: 'Login Success',
                    text: `You have Sucessfully Logged In.`,
                    icon: 'Success',
                    confirmButtonText: 'OK'
                });
                
                dispatch(login({ 
                    email: response.data.user.email, 
                    username: response.data.user.username, 
                    membership: response.data.user.membership, 
                }));
              
                //localStorage.setItem('user', JSON.stringify({ email, username: response.data.username }));
                navigate('/user-profile');
            } else {
                setMessage(response.data.message || 'Login failed.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setMessage('Login failed. Please try again.');
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    const handleLogout = () => {
        //console.log('Dispatching logout action from Login.jsx');
        dispatch(logout({ meta: { fileName: 'Login.jsx' } })); // Dispatch logout action
        localStorage.removeItem('user'); // Remove user from local storage
        localStorage.removeItem('lastSpinTime'); // Reset last spin time
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
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <button onClick={handleLogin1}>Login</button>
                )}
            </div>
        </div>
    );
};

export default Login;