// Route to fetch all blogs from the database
import express from 'express';
import { getBlogsController } from '../controllers/getBlogsController.js';

const router = express.Router();

router.get('/blogs', getBlogsController);

export default router;
