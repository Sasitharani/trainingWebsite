import express from 'express';
import { uploadQuizController, fetchQuizzesController, test, editQuizController, deleteQuizzesController, deleteQuizController, fetchQuizzesWithAnswerController } from '../controllers/quizController.js';
import { signUpController } from '../controllers/signUpController.js';
import { login } from '../controllers/loginController.js';

const router = express.Router();



// Route to upload a quiz
router.post('/upload-quiz', uploadQuizController);
router.get('/get-quizzes', fetchQuizzesController);
router.get('/test', test);
router.get('/get-quizzes-with-answer', fetchQuizzesWithAnswerController);

// Route to edit a quiz
router.put('/edit-quiz/:id', editQuizController);

// Route to delete a single quiz
router.delete('/delete-quiz/:id', deleteQuizController);

// Route to delete quizzes
router.post('/delete-quizzes', deleteQuizzesController);



// Route to sign up
router.post('/signup', signUpController);
router.post('/login', login);




export default router;