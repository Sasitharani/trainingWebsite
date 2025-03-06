import bcrypt from 'bcryptjs';
import db from '../db.js'; // Ensure the correct path

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password from signUpController:', hashedPassword);

    const query = `
      INSERT INTO iitiusers (username, password, email)
      VALUES (?, ?, ?)
    `;
    const values = [username, hashedPassword, email];
    db.query(query, values, (err, results) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Signup failed. Please try again.');
        return;
      }
      res.status(200).send({ message: 'User registered successfully!' });
    });
  } catch (error) {
    res.status(500).send('Error registering user');
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const query = `SELECT * FROM iitiusers WHERE email = ?`;
    db.query(query, [email], async (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Login failed. Please try again.');
        return;
      }
      if (results.length === 0) {
        res.status(401).send('Invalid email or password.');
        return;
      }
      const user = results[0];
      console.log('User fetched from database:', user);
      console.log('Password from request:', password);
      console.log('Hashed password from database:', user.password);

      const passwordValid = await bcrypt.compare(password, user.password);
      console.log('Password valid:', passwordValid);

      if (!passwordValid) {
        res.status(401).send('Invalid email or password.');
        return;
      }
      res.status(200).send({ message: 'Login successful!' });
    });
  } catch (error) {
    res.status(500).send('Error logging in user');
  }
};

export { signup, login };
