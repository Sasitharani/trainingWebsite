import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../../db.js'; // Ensure the correct path

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const query = 'SELECT * FROM iiti WHERE email = ?';
    db.query(query, [email], async (err, results) => {
      if (err) {
        console.error('Error fetching user:', err);
        res.status(500).send('Login failed. Please try again.');
        return;
      }
      if (results.length === 0) {
        res.status(401).send('Invalid email or password.');
        return;
      }
      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).send('Invalid email or password.');
        return;
      }
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      res.status(200).send({ token });
    });
  } catch (error) {
    res.status(500).send('Error logging in user');
  }
};

export { login };
