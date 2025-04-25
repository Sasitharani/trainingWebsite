import express from 'express';
import { login } from '../controllers/loginController.js';

const router = express.Router();

// Route for login
router.post('/login', login);

export default router;
