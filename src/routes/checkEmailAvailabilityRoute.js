import express from 'express';
import { checkEmailAvailabilityController } from '../controllers/checkEmailAvailabilityController.js';

const router = express.Router();

// Route to check email availability
router.post('/check-email-availability', checkEmailAvailabilityController);

export default router;
