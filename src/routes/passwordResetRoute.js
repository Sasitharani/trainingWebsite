import express from 'express';
import { resetPassword, sendResetEmail } from '../controllers/passwordResetController.js'; // Ensure the correct path

const router = express.Router();

router.post('/reset-password', resetPassword);
router.post('/send-reset-email', sendResetEmail);

export default router; // Ensure the router is exported as default
