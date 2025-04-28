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

      if(user.password === trimmedPassword) {  // Check if the password is plain text (for testing purposes)
        console.log('Password is plain text, skipping bcrypt comparison.'); // Debugging log  
        res.status(200).send({ 
          message: 'Login successful', 
          logs: {
            enteredPassword: trimmedPassword,
            storedHash: user.password,
            passwordValid: true
          }
        });
        return;
      }
 
      const isPasswordValid = await bcrypt.compare(trimmedPassword, user.password);
      console.log('Password comparison result:', isPasswordValid); // Debugging log for password comparison result

      if (!isPasswordValid) {
        console.error('Invalid email or password. Password does not match for email:', email); // Log error
        res.status(401).send('Password does not match for email.');
        return;
      }
      res.status(200).send({ 
        message: 'Login successful', 
        logs: {
          enteredPassword: trimmedPassword,
          storedHash: user.password,
          passwordValid: isPasswordValid
        }
      });
    });
  } catch (error) {
    console.error('Error logging in user:', error); // Log error
    res.status(500).send('Error logging in user');
  }
};

export { login };
