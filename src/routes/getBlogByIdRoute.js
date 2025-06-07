// Route to fetch a single blog by ID
import express from 'express';
import { getBlogByIdController } from '../controllers/getBlogByIdController.js';

const router = express.Router();

router.get('/blogs/:id', getBlogByIdController);

export default router;
