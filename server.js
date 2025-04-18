import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import quizRoutes from './src/routes/quizRoutes.js';

import db from './src/db.js';

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// Use quizRoutes for all quiz-related endpoints
app.use('/api', quizRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on a on port ${PORT}`);
});