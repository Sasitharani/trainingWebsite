import express from 'express';
import { login } from '../controllers/loginController.js';

const router = express.Router();

// Add debugging log to confirm route registration
console.log('LoginRoute: Registering /login route');

router.post('/login', (req, res, next) => {
    console.log('LoginRoute: /login route hit'); // Debugging log for route hit
    next(); // Pass control to the login controller
}, login);

export default router;
