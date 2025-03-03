import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import db from '../db.js'; // Ensure the correct path

const sendResetEmail = async (req, res) => {
  const { email, code } = req.body;

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'sasitharani@gmail.com',
      pass: 'zcyjkhdknezjzkrg',
    },
  });

  const resetLink = `http://localhost:3000/forgot-password?code=${code}`;

  const htmlContent = `
    <h2>Password Reset Request</h2>
    <p>Click the link below to reset your password:</p>
    <a href="${resetLink}">${resetLink}</a>
  `;

  try {
    await transporter.sendMail({
      from: '"Support" <sasitharani@gmail.com>',
      to: [email, 'sasitharani@gmail.com'],
      subject: "Password Reset",
      html: htmlContent,
    });
    res.status(200).send({ message: 'Reset email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email. Please try again.');
  }
};

const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const query = `
      UPDATE iitiusers SET password = ? WHERE email = ?
    `;
    const values = [hashedPassword, email];
    db.query(query, values, (err, results) => {
      if (err) {
        console.error('Error updating password:', err);
        res.status(500).send('Password reset failed. Please try again.');
        return;
      }
      res.status(200).send({ message: 'Password reset successfully!' });
    });
  } catch (error) {
    res.status(500).send('Error resetting password');
  }
};

export { sendResetEmail, resetPassword };
