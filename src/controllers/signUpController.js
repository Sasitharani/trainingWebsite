import bcrypt from 'bcryptjs';
import db from '../db.js';

export const signUpController = async (req, res) => {
  const { username, email, password, phoneNumber } = req.body;

  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword); // Debugging log for hashed password

    // Insert the user into the database
    const query = 'INSERT INTO iitiusers (username, email, password, phoneNumber, membership) VALUES (?, ?, ?, ?, ?)';
    const values = [username, email, hashedPassword, phoneNumber, 'free']; // Default membership is 'free'

    db.query(query, values, (err) => {
      if (err) {
        console.error('Error inserting user into database:', err);
        return res.status(500).json({ message: 'Failed to register user' });
      }
      res.status(200).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
