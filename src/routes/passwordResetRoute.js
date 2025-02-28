import express from 'express';
import { resetPassword } from '../controllers/passwordResetController'; // Ensure the correct path

const router = express.Router();

router.post('/reset-password', resetPassword);

export default router;
