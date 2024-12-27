import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from 'cors';
import upload from './upload.js'; // Import the upload middleware
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'sasitharani@gmail.com',
    pass: 'zfikzmnxyuicssim',
  },
});

app.post('/api/send-email', upload.single('file'), (req, res) => {
  const { name, email, phone, message } = req.body;
  const file = req.file;

  const mailOptions = {
    from: 'sasitharani@gmail.com',
    to: 'sasitharani@gmail.com', // replace with the recipient's email address
    subject: 'Insphile-New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    attachments: file ? [{ filename: file.originalname, path: file.path }] : [],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Error sending email' });
    }
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Email sent successfully' });

    // Delete the file after sending the email
    if (file) {
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        }
      });
    }
  });
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.status(200).json({ message: 'File uploaded successfully', file: req.file });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
