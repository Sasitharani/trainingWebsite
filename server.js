import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import quizRoutes from './src/routes/quizRoutes.js';
import checkEmailAvailabilityRoute from './src/routes/checkEmailAvailabilityRoute.js';
import loginRoute from './src/routes/loginRoute.js';
import morgan from 'morgan';

import db from './src/db.js';

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// Use morgan for logging HTTP requests
app.use(morgan('dev')); // Log HTTP requests to the console only

// Use quizRoutes for all quiz-related endpoints
app.use('/api', quizRoutes);

// Use checkEmailAvailabilityRoute for email availability endpoint
app.use('/api', checkEmailAvailabilityRoute);

app.use('/api', loginRoute);


app.listen(PORT, () => {
  console.log(`Server is running on a on port ${PORT}`);
});