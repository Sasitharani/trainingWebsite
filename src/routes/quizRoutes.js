import express from 'express';
import { uploadQuizController } from '../controllers/quizController.js';

const router = express.Router();

let quizzes = []; // Temporary in-memory storage for quizzes

// Route to upload a quiz
router.post('/upload-quiz', uploadQuizController);

// Route to get all quizzes
router.get('/get-quizzes', (req, res) => {
  console.log('API /get-quizzes hit');
  res.status(200).send(quizzes);
});

export default router;