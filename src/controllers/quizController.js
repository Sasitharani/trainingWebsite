import db from '../db.js';

/**
 * Controller to handle quiz uploads and save them to the database.
 * @param {Object} req - The request object containing quiz data.
 * @param {Object} res - The response object to send back the result.
 */
export const uploadQuizController = (req, res) => {
  const quizzes = req.body;
  const email = 'sasitharani@gmail.com'; // Hardcoded email for now

  quizzes.forEach((quiz, index) => {
    const { question, options, answer } = quiz;
    const query = `INSERT INTO questions (Sr_No, email, question, optiona, optionb, optionc, optiond, ans, blank) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      index + 1,
      email,
      question,
      options[0],
      options[1],
      options[2],
      options[3],
      answer,
      '',
    ];

    db.query(query, values, (err) => {
      if (err) {
        console.error('Error inserting quiz:', err);
        return res.status(500).send('Failed to upload quizzes.');
      }
    });
  });

  res.status(200).send('Quizzes uploaded successfully!');
};
