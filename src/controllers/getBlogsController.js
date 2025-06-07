// Controller to fetch all blogs from the MySQL database
import db from '../db.js';

export const getBlogsController = (req, res) => {
  const sql = 'SELECT * FROM blogs ORDER BY timestamp DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching blogs:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(results);
  });
};
