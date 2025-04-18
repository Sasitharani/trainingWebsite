import db from '../db.js';

/**
 * Controller to handle quiz uploads and save them to the database.
 * @param {Object} req - The request object containing quiz data.
 * @param {Object} res - The response object to send back the result.
 */
export const uploadQuizController = async (req, res) => {
  const quizzes = req.body;
  console.log('API /upload-quiz hit', quizzes); // Log the received quizzes
  const email = 'sasitharani@gmail.com'; // Hardcoded email for now

  try {
    for (let i = 0; i < quizzes.length; i++) {
      const quiz = quizzes[i];
      const { question, options, answer } = quiz;
      const query = `INSERT INTO questions (email, question, optiona, optionb, optionc, optiond, ans, blank) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const values = [
        i + 1,
        email,
        question,
        options[0],
        options[1],
        options[2],
        options[3],
        answer,
        '',
      ];

      await new Promise((resolve, reject) => {
        db.query(query, values, (err) => {
          if (err) {
            console.error('Error inserting quiz:', err);
            return reject(err);
          }
          resolve();
        });
      });
    }

    res.status(200).send('Quizzes uploaded successfully!');
  } catch (error) {
    console.error('Error uploading quizzes:', error);
    res.status(500).send('Failed to upload quizzes.');
  }
};
