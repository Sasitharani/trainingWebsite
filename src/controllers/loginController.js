import bcrypt from 'bcryptjs';
import db from '../db.js'; // Ensure the correct path

const login = async (req, res) => {
  console.log('LoginController: Route hit');
  console.log('LoginController: Request body:', req.body);

  const { email, password } = req.body;
  console.log('Email:', email);
  console.log('Password:', password);

  try {
    const query = 'SELECT * FROM iitiusers WHERE email = ?';
    db.query(query, [email], async (err, results) => {
      if (err) {
        console.error('Error fetching user:', err);
        res.status(500).send('Login failed. Please try again.');
        return;
      }
      if (results.length === 0) {
        console.error('Invalid email or password. No user found with email:', email);
        res.status(401).send({ 
          message: `Login failed. Debug Logs: [\n  'LoginController: Route hit',\n  'LoginController: Request body: ${JSON.stringify(req.body)}',\n  'Email: ${email}',\n  'Password: ${password}'\n]`,
          logs: {
            debugMessage: `Invalid email or password. No user found with email: ${email}`
          }
        });
        return;
      }
      const user = results[0];
      const trimmedPassword = password.trim(); // Trim the password to remove leading/trailing whitespace
      console.log('Comparing passwords:', trimmedPassword, user.password);

      const isPasswordValid = await bcrypt.compare(trimmedPassword, user.password); // Compare trimmed password
      console.log('Password comparison result:', isPasswordValid);

      if (!isPasswordValid) {
        res.status(401).send({ message: 'Invalid email or password.' });
        return;
      } else {
        console.log('Password is valid. Proceeding with login.');
        console.log('User fetched from database:', user); // Debugging log for user data
        res.status(200).send({ 
          message: 'Login successful.',
          user: {
            username: user.username,
            email: user.email,
            membership: user.membership // Ensure membership is included
          }
        });
        return; // Ensure no further code is executed
      }
      // Add server logs to the response for debugging purposes
      res.status(401).send({ 
        message: `Login successful. Debug Logs: [\n  'LoginController: Route hit',\n  'LoginController: Request body: ${JSON.stringify(req.body)}',\n  'Email: ${email}',\n  'Password: ${password}',\n  'Comparing passwords: ${trimmedPassword} ${user.password}',\n  'Password comparison result: ${isPasswordValid}'\n]`,
        logs: {
          enteredPassword: trimmedPassword,
          storedHash: user.password,
          passwordValid: isPasswordValid,
          debugMessage: 'LoginController executed successfully'
        }
      });
    });
  } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send('Error logging in user'); // Handle the error properly
    }
};

export { login }; // Ensure the function is properly exported