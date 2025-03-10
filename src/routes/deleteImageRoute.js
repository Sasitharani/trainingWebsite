import express from 'express';

const router = express.Router();

router.delete('/delete-image', (req, res) => {
  // Add your image deletion logic here
  res.send({ message: 'Image deleted successfully' });
});

export default router;
