import db from '../db.js';

/**
 * Controller to handle quiz uploads and save them to the database.
 * @param {Object} req - The request object containing quiz data.
 * @param {Object} res - The response object to send back the result.
 */
export const uploadQuizController = async (req, res) => {
  const quizzes = req.body;

  try {
    for (let i = 0; i < quizzes.length; i++) {
      const quiz = quizzes[i];
      const { question, options, answer, type } = quiz; // Include type
      const query = `INSERT INTO questions (question, optiona, optionb, optionc, optiond, ans, type) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      const values = [
        question,
        options[0],
        options[1],
        options[2],
        options[3],
        answer,
        type, // Add type to the query
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
    const query = 'SELECT Sr_No, question, optiona, optionb, optionc, optiond FROM questions';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Step 2: Error fetching quizzes:', err);
        return res.status(500).send('Failed to fetch quizzes.');
      }
      console.log('Raw database results:', results); // Debugging log for raw results
      const quizzes = results.map((row) => ({
        id: row.Sr_No,
        question: row.question,
        options: [row.optiona, row.optionb, row.optionc, row.optiond],
      }));
      console.log('Step 2: Fetched quizzes:', quizzes); // Log the transformed quizzes
      res.status(200).json(quizzes);
    });
  } catch (error) {
    console.error('Step 2: Error:', error);
    res.status(500).send('An error occurred while fetching quizzes.');
  }
};

export const fetchQuizzesWithAnswerController = async (req, res) => {
  try {
    console.log('API /get-quizzes-with-answer hit');
    const { category } = req.query; // Extract category from query parameters
    console.log('Category received:', category); // Log the received category
    const query = 'SELECT Sr_No, question, optiona, optionb, optionc, optiond, ans, type FROM questions';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching quizzes:', err);
        return res.status(500).send('Failed to fetch quizzes.');
      }
      console.log('Raw database results:', results); // Log raw database results
      const quizzes = results
        .filter((row) => row.type === category) // Filter quizzes by category
        .map((row) => ({
          id: row.Sr_No,
          question: row.question,
          options: [row.optiona, row.optionb, row.optionc, row.optiond],
          answer: row.ans, // Include the answer for temporary storage
          type: row.type, // Include the type for filtering
        }));
      console.log('Filtered quizzes:', quizzes); // Log filtered quizzes
      res.status(200).json(quizzes);
    });
  } catch (error) {
    console.error('Error:', error);
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
      console.log('ID received in controller:', id); // Debugging log to check the ID received
      res.status(200).send(`ID received in controller: ${id}`); // Send the ID back to the browser for debugging
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
