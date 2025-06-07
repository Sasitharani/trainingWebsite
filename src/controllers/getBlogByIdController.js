// Controller to fetch a single blog by ID from the MySQL database
import db from '../db.js';

export const getBlogByIdController = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM blogs WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching blog by ID:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (!results.length) return res.status(404).json({ error: 'Blog not found' });
    res.status(200).json(results[0]);
  });
};
