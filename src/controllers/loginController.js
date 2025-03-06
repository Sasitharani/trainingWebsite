import bcrypt from 'bcryptjs';
import db from '../db.js'; // Ensure the correct path

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log('Email:', email);
  console.log('Password:', password);

  // Trim the password to remove leading and trailing whitespace
  const trimmedPassword = password.trim();
  console.log('Trimmed Password:', trimmedPassword);

  try {
    const query = 'SELECT * FROM iitiusers WHERE email = ?';
    db.query(query, [email], async (err, results) => {
      if (err) {
        console.error('Error fetching user:', err); // Log error
        res.status(500).send('Login failed. Please try again.');
        return;
      }
      if (results.length === 0) {
        console.error('Invalid email or password. No user found with email:', email); // Log error
        res.status(401).send('Invalid email or password.');
        return;
      }
      const user = results[0];
      console.log('Comparing passwords:', trimmedPassword, user.password);

      // Rehash the trimmed password and log it
      const rehashedPassword = await bcrypt.hash(trimmedPassword, 10);
      console.log('Rehashed Password:', rehashedPassword);

      const isPasswordValid = await bcrypt.compare(trimmedPassword, user.password);
      console.log('Password valid:', isPasswordValid);

      if (!isPasswordValid) {
        console.error('Invalid email or password. Password does not match for email:', email); // Log error
        res.status(401).send('Password does not match for email.');
        return;
      }
      res.status(200).send({ message: 'Login successful' });
    });
  } catch (error) {
    console.error('Error logging in user:', error); // Log error
    res.status(500).send('Error logging in user');
  }
};

export { login };
