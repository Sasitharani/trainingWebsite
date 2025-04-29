import bcrypt from 'bcryptjs';
import db from '../db.js'; // Ensure the correct path

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = 'SELECT * FROM iitiusers WHERE email = ?';
    db.query(query, [email], async (err, results) => {
      if (err) {
        console.error('Error fetching user:', err);
        res.status(500).send('Login failed. Please try again.');
        return;
      }

      if (results.length === 0) {
        res.status(401).send({ message: 'Email does not exist. Please check the email or register.' });
        return;
      }

      const user = results[0];
      const trimmedPassword = password.trim(); // Trim the password to remove leading/trailing whitespace
      console.log('Comparing passwords:', trimmedPassword, user.password);

      const isPasswordValid = await bcrypt.compare(trimmedPassword, user.password); // Compare trimmed password

      if (!isPasswordValid) {
        res.status(401).send({ message: 'Password wrong. Please check your password.' });
        return;
      }

      res.status(200).send({ message: 'Successful login' });
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).send('Error logging in user');
  }
};

export { login };
