import express from 'express';
import { uploadQuizController, fetchQuizzesController, test, editQuizController, deleteQuizzesController, deleteQuizController, fetchQuizzesWithoutAnswerController } from '../controllers/quizController.js';

const router = express.Router();



// Route to upload a quiz
router.post('/upload-quiz', uploadQuizController);
router.get('/get-quizzes', fetchQuizzesController);
router.get('/test', test);
router.get('/get-quizzes-no-answer', fetchQuizzesWithoutAnswerController);

// Route to edit a quiz
router.put('/edit-quiz/:id', editQuizController);

// Route to delete a single quiz
router.delete('/delete-quiz/:id', deleteQuizController);

// Route to delete quizzes
router.post('/delete-quizzes', deleteQuizzesController);



export default router;