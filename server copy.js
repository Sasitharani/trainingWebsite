import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import moment from 'moment-timezone'; // Import moment-timezone
import db from './db.js'; // Import the connection pool
import deleteImageRoute from './src/routes/deleteImageRoute.js'; // Import deleteImageRoute
import getAllImagesRoute from './src/routes/getAllImagesRoute.js'; // Import getAllImagesRoute
import loginRoute from './src/routes/loginRoute.js'; // Import loginRoute
import googleLoginRoute from './src/routes/googleLoginRoute.js'; // Ensure the correct path
import signupRoute from './src/routes/signupRoute.js'; // Import signupRoute
import checkEmailAvailabilityRoute from './src/routes/checkEmailAvailabilityRoute.js'; // Import checkEmailAvailabilityRoute
import fileUploadSendEmailRoute from './src/routes/fileUploadSendEmailRoute.js'; // Import fileUploadSendEmailRoute
import passwordResetRoute from './src/routes/passwordResetRoute.js'; // Import passwordResetRoute
import hashThePasswordRoute from './src/routes/hashThePasswordRoute.js'; // Import hashThePasswordRoute
import comparePasswordRoute from './src/routes/comparePaswswordRoute.js'; // Import comparePasswordRoute
import imgForVote1Route from './src/routes/imgForVote1Route.js'; // Import imgForVote1Route
import getImagesInVote1PageRoute from './src/routes/getImagesInVote1PageRoute.js'; // Import getImagesInVote1PageRoute
import voteForVote1Route from './src/routes/voteForVote1Route.js'; // Import voteForVote1Route
import createUserSessionDBRoute from './src/routes/createUserSessionDBRoute.js'; // Import createUserSessionDBRoute
import fetchVotesDetailsRoute from './src/routes/fetchVotesDetailsRoute.js'; // Import fetchVotesDetailsRoute
import updateVotesRoute from './src/routes/updateVotesRoutes.js'; // Import updateVotesRoute
import spinWheelRoute from './src/routes/spinWheelRoute.js'; // Correct the file extension to .jsx
import logsRoute from './src/routes/logsRoute.js'; // Import logsRoute
import './src/scheduler/createUserSessionJob.js'; // Import the scheduler script

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

const logLevels = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  fatal: 5
};

const currentLogLevel = logLevels[process.env.LOG_LEVEL || 'info'];

// Middleware to log console messages
const logMiddleware = (req, res, next) => {
  const originalConsoleLog = console.log;
  const originalConsoleError = console.error;

  const insertLog = (message, type, level) => {
    if (logLevels[level] < currentLogLevel) return;

    const now = moment().tz('Asia/Kolkata'); // Convert to IST
    const date = now.format('YYYY-MM-DD');
    const time = now.format('HH:mm:ss');
    const logMessage = `[${now.toISOString()}] [${level}] ${message}`;

    const query = 'INSERT INTO logs (Date, Time, Message, Type) VALUES (?, ?, ?, ?)';

    const values = [date, time, logMessage, type];

    const executeQuery = (retries = 3) => {
      db.query(query, values, (err) => {
        if (err) {
          originalConsoleError('Error inserting log:', err);
          if (retries > 0) {
            originalConsoleLog(`Retrying... (${retries} attempts left)`);
            setTimeout(() => executeQuery(retries - 1), 1000);
          }
        }
      });
    };

    executeQuery();
  };

  console.log = (message, ...optionalParams) => {
    insertLog(message, 'log', 'info');
    originalConsoleLog(message, ...optionalParams);
  };

  console.error = (message, ...optionalParams) => {
    insertLog(message, 'error', 'error');
    originalConsoleError(message, ...optionalParams);
  };

  next();
};

app.use(logMiddleware);

// Use the imported routes
app.use('/api', deleteImageRoute);
app.use('/api', getAllImagesRoute);
app.use('/api', loginRoute);
app.use('/api', googleLoginRoute); // Ensure the correct route
app.use('/api', signupRoute);
app.use('/api', checkEmailAvailabilityRoute);
app.use('/api', fileUploadSendEmailRoute);
app.use('/api', passwordResetRoute);
app.use('/api', hashThePasswordRoute);
app.use('/api', comparePasswordRoute);
app.use('/api', imgForVote1Route);
app.use('/api', getImagesInVote1PageRoute);
app.use('/api', voteForVote1Route);
app.use('/api', createUserSessionDBRoute);
app.use('/api', fetchVotesDetailsRoute);
app.use('/api', updateVotesRoute);
app.use('/api', spinWheelRoute); // Add this line
app.use('/api', logsRoute); // Use the logs route

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});