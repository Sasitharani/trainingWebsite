import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import UsernameAuthentication from './signUp/Username';
import EmailAuthentication from './signUp/Email';
import PasswordVerification from './signUp/Password';
import PasswordMatch from './signUp/PasswordMatch';
import bcrypt from 'bcryptjs';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state
    const [emailAvailable, setEmailAvailable] = useState(true); // Add email availability state
    const [passwordError, setPasswordError] = useState(' Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.'); // Add password error state
    const [isPasswordValid, setIsPasswordValid] = useState(false); // Add form validity state
    const [isEmailValid, setIsEmailValid] = useState(false); // Add form validity state
    const [isFormValid, setIsFormValid] = useState(false); // Add form validity state
    const[EmailMessage, setEmailMessage] = useState(''); // Add email message state
    const [passwordMatch, setPasswordMatch] = useState('');
    const [matchPasswordVerified, setMatchPasswordVerified] = useState(false);

    const navigate = useNavigate();

    //console.log('loading in the begining:-', loading)   

    const handleSignup = async (e) => {
        e.preventDefault();
        console.log('Sign up form submitted');
        setLoading(true); // Set loading to true

        if (isEmailValid && isPasswordValid && matchPasswordVerified) {
            console.log('All verifications passed, proceeding with signup...');
            try {
                const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before sending it to the server
                const response = await axios.post('https://trainingwebsite-apot.onrender.com/api/signup', {
                    username,
                    email,
                    password: hashedPassword, // Send hashed password
                    phoneNumber
                });

                if (response.status === 200) {
                    setMessage('User registered successfully!');
                    navigate('/login');
                } else {
                    throw new Error('Signup failed');
                }
            } catch (error) {
                setMessage('Signup failed. Please try again.');
                Swal.fire({
                    title: 'Signup Failed',
                    text: 'Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            } finally {
                setLoading(false); // Set loading to false
            }
        }
    };




const checkEmailAvailability = async () => {
        setLoading(true); // Set loading to true before checking email availability
        try {
            console.log('Checking email availability:', email); // Debugging log
            const response = await axios.post('https://trainingwebsite-apot.onrender.com/api/check-email-availability', { email });
            console.log('checkEmailAvailability: Function called');
            console.log('Email to check:', email);

            // Log the full API response
            console.log('API Response:', response);

            if (response.data.available) {
                setEmailAvailable(true);
                setEmailMessage('Email is available');
                setIsEmailValid(true); // Set email validity to true
            } else {
                setEmailAvailable(false);
                setEmailMessage('Email is already taken');
            }
        } catch (error) {
            // Log the error object for debugging
            console.error('Error checking email availability:', error.response || error.message);
            setEmailMessage('Error checking email availability');
        } finally {
            setLoading(false); // Set loading to false after the check
        }
    };

    // Call checkEmailAvailability when the user leaves the email input field
    const handleEmailBlur = () => {
        if (email) {
            checkEmailAvailability();
        }
    };




    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
  
            {loading && (
                <div className="absolute inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="loader text-gray-400"></div>
                    <div className=" text-gray-400">Please wait while we Confirm</div>
                </div>
            )}
            <div className={`relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md ${loading ? 'blur-sm' : ''}`}>
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <form onSubmit={handleSignup}>
                <UsernameAuthentication username={username} setUsername={setUsername} />
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={handleEmailBlur}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                    <button
                        type="button"
                        onClick={checkEmailAvailability}
                        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Check Email Availability
                    </button>
                    {EmailMessage && (
                        <p
                            className={`mt-2 text-sm ${emailAvailable ? 'text-green-600' : 'text-red-600'}`}
                        >
                            {EmailMessage}
                        </p>
                    )}
                </div>
                <PasswordVerification
                password={password}
                setPassword={setPassword}
                passwordError={passwordError}
                setPasswordError={setPasswordError}
                setIsPasswordValid={setIsPasswordValid}
                isPasswordValid={isPasswordValid}
                />
                <PasswordMatch
                    password={password}
                    matchPassword={passwordMatch}
                    setMatchPassword={setPasswordMatch}
                    passwordError={passwordError}
                    setPasswordError={setPasswordError}
                    isPasswordValid={isPasswordValid}
                    setMatchPasswordVerified={setMatchPasswordVerified}
                />

                    <div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className={`font-bold py-2 px-4 rounded bg-green-500 text-white hover:bg-green-600 text-white'
                                `}
                            >
                                Sign Up
                            </button>
                  
                            <button
                                type="button"
                                onClick={() => navigate('/login')}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Login
                            </button>
                        </div>
                        <Link to="/forgot-password" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                            Forgot Password?
                        </Link>
                    </div>
                </form>
                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            </div>
        </div>
    );
};

export default Signup;