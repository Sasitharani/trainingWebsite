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
      const query = `INSERT INTO questions (email, question, optiona, optionb, optionc, optiond, ans, blank) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      const values = [
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
export const test = async (req, res) => {
    console.log('Step 1: API /test hit'); // Log when the API is hit

}
export const fetchQuizzesController = async (req, res) => {
  try {
    console.log('Step 1: API /get-quizzes hit'); // Log when the API is hit
    const query = 'SELECT Sr_No, question, optiona, optionb, optionc, optiond, ans FROM questions';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Step 2: Error fetching quizzes:', err);
        return res.status(500).send('Failed to fetch quizzes.');
      }
      const quizzes = results.map((row) => ({
        id: row.Sr_No,
        question: row.question,
        options: [row.optiona, row.optionb, row.optionc, row.optiond],
        answer: row.ans,
      }));
      console.log('Step 2: Fetched quizzes:', quizzes); // Log the transformed quizzes
      res.status(200).json(quizzes);
    });
  } catch (error) {
    console.error('Step 2: Error:', error);
    res.status(500).send('An error occurred while fetching quizzes.');
  }
};

export const editQuizController = async (req, res) => {
  const { id } = req.params;
  const { question, options, answer } = req.body;

  try {
    const query = `UPDATE questions SET question = ?, optiona = ?, optionb = ?, optionc = ?, optiond = ?, ans = ? WHERE Sr_No = ?`;
    const values = [
      question,
      options[0],
      options[1],
      options[2],
      options[3],
      answer,
      id,
    ];

    db.query(query, values, (err) => {
      if (err) {
        console.error('Error editing quiz:', err);
        return res.status(500).send('Failed to edit quiz.');
      }
      res.status(200).send('Quiz updated successfully!');
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while editing the quiz.');
  }
};

export const deleteQuizController = async (req, res) => {
  const { id } = req.params;

  try {
    const query = `DELETE FROM questions WHERE Sr_No = ?`;
    console.log('Delete request received for ID:', id); // Debugging log
    console.log('Executing query:', query, 'with ID:', id); // Debugging log
    db.query(query, [id], (err) => {
      if (err) {
        console.error('Error deleting quiz:', err);
        return res.status(500).send('Failed to delete quiz.');
      }
      res.status(200).send('Quiz deleted successfully!');
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while deleting the quiz.');
  }
};

export const deleteQuizzesController = async (req, res) => {
  const { ids } = req.body;

  try {
    const query = `DELETE FROM questions WHERE Sr_No IN (?)`;
    db.query(query, [ids], (err) => {
      if (err) {
        console.error('Error deleting quizzes:', err);
        return res.status(500).send('Failed to delete quizzes.');
      }
      res.status(200).send('Quizzes deleted successfully!');
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while deleting quizzes.');
  }
};
