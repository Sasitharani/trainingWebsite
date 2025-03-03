import FTP from 'ftp';
import path from 'path';
import db from '../db.js'; // Ensure the correct path

const deleteImage = async (req, res) => {
  const { imageId } = req.body;
  try {
    const query = 'SELECT * FROM images WHERE id = ?';
    db.query(query, [imageId], (err, results) => {
      if (err) {
        console.error('Error fetching image:', err);
        res.status(500).send('Delete failed. Please try again.');
        return;
      }
      if (results.length === 0) {
        res.status(404).send('Image not found.');
        return;
      }
      const image = results[0];
      const client = new FTP();
      client.on('ready', () => {
        client.delete(image.path, (err) => {
          if (err) {
            console.error('Error deleting image from FTP:', err);
            res.status(500).send('Delete failed. Please try again.');
            return;
          }
          const deleteQuery = 'DELETE FROM images WHERE id = ?';
          db.query(deleteQuery, [imageId], (err) => {
            if (err) {
              console.error('Error deleting image from database:', err);
              res.status(500).send('Delete failed. Please try again.');
              return;
            }
            res.status(200).send({ message: 'Image deleted successfully!' });
          });
        });
      });
      client.connect({
        host: process.env.FTP_HOST,
        user: process.env.FTP_USER,
        password: process.env.FTP_PASSWORD,
      });
    });
  } catch (error) {
    res.status(500).send('Error deleting image');
  }
};

export { deleteImage };
