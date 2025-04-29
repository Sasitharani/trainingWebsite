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

// Add global debugging middleware to log all incoming requests
app.use((req, res, next) => {
    console.log(`Global Debug: ${req.method} ${req.originalUrl}`);
    next(); // Pass control to the next middleware or route
});

// Ensure middleware and routes are registered in the correct order
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request bodies

// Use morgan for logging HTTP requests
app.use(morgan('dev')); // Log HTTP requests to the console only

// Register routes
app.use('/api', checkEmailAvailabilityRoute);
app.use('/api', quizRoutes);

//app.use('/api', loginRoute);

// Add a catch-all route to debug unhandled routes
app.use((req, res) => {
    console.log('Catch-All Debug: Route not found:', req.originalUrl);
    res.status(404).send('Route not found');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on a on port ${PORT}`);
});

console.log('Test log: Server is starting...');