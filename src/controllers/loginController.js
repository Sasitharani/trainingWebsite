import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../../db.js'; // Ensure the correct path

const SECRET_KEY = process.env.SECRET_KEY || 'your_default_secret_key'; // Use environment variable or default key

const login = async (req, res) => {
  //console.log('Login Controller called');
  const { email, password } = req.body;
  try {
    const query = 'SELECT * FROM userdb WHERE email = ?';
    db.query(query, [email], async (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Login failed. Please try again.');
        return;
      }
      const user = results[0];

      if (!user) {
        return res.status(404).send({ message: 'User not found!' });
      }

      const passwordIsValid = await bcrypt.compare(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({ message: 'Invalid password!' });
      }

      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
      //console.log('Username:', user.username);
      return res.status(200).json({ token, message: 'Login Successfully', hashedPassword: user.password, username: user.username });
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Error logging in');
  }
};

export { login };
