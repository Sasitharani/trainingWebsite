// filepath: c:/projects/trainingWebsite/src/controllers/blogController.js
import db from '../db.js';

// Controller to add a new blog post to the MySQL database
export const addBlogController = (req, res) => {
  const { title, content, author = 'Admin' } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  const sql = 'INSERT INTO blogs (title, content, author) VALUES (?, ?, ?)';
  db.query(sql, [title, content, author], (err, result) => {
    if (err) {
      console.error('Error inserting blog:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ id: result.insertId, title, content, author, timestamp: new Date() });
  });
};
