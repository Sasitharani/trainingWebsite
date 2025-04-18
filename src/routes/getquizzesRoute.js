import express from 'express';
import {fetchQuizzesController } from '../controllers/quizController.js';

const router = express.Router();

let quizzes = []; // Temporary in-memory storage for quizzes

router.post('/get-quizzes', fetchQuizzesController);



export default router;