const express = require('express');
const multer = require('multer');
const { authenticateToken } = require('../middleware/authMiddleware');
const {
  uploadMedia,
  getMedia,
  listMedia,
  updateMedia,
  deleteMedia
} = require('../controllers/mediaController');

const upload = multer();
const router = express.Router();

router.post('/upload', authenticateToken, upload.single('file'), uploadMedia);
router.get('/:mediaId', authenticateToken, getMedia);
router.get('/', authenticateToken, listMedia);
router.patch('/:mediaId', authenticateToken, updateMedia);
router.delete('/:mediaId', authenticateToken, deleteMedia);

module.exports = router;
