import db from '../db.js';

export const checkEmailAvailabilityController = async (req, res) => {
  const { email } = req.body;

  try {
    console.log('checkEmailAvailabilityController: Route hit');
    console.log('Email availability check API hit with email:', email); // Log the email being checked
    const query = 'SELECT email FROM iitiusers WHERE email = ?';
    db.query(query, [email], (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (results.length > 0) {
        return res.status(200).json({ available: false, message: 'Email is already taken' });
      } else {
        return res.status(200).json({ available: true, message: 'Email is available' });
      }
    });
  } catch (error) {
    console.error('Error during email availability check:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
