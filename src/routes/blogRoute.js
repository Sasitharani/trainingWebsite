// filepath: c:/projects/trainingWebsite/src/routes/blogRoute.js
import express from 'express';
import { addBlogController } from '../controllers/blogController.js';

const router = express.Router();

// Route to add a new blog post
router.post('/blogs', addBlogController);

export default router;
