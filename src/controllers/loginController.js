import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../../db.js'; // Ensure the correct path

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log('Email:', email);
  console.log('Password:', password);
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
      console.log('Comparing passwords:', password, user.password);

      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log('Password valid:', isPasswordValid);

      if (!isPasswordValid) {
        console.error('Invalid email or password. Password does not match for email:', email); // Log error
        res.status(401).send('Password does not match for email.');
        return;
      }
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      res.status(200).send({ token });
    });
  } catch (error) {
    console.error('Error logging in user:', error); // Log error
    res.status(500).send('Error logging in user');
  }
};

export { login };
