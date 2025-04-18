import express from 'express';
import { uploadQuizController,fetchQuizzesController,test } from '../controllers/quizController.js';

const router = express.Router();



// Route to upload a quiz
router.post('/upload-quiz', uploadQuizController);
router.get('/get-quizzes', fetchQuizzesController);
router.get('/test', test);



export default router;