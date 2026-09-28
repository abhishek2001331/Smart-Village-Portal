const express = require('express');
const router = express.Router();
const {
  getAgricultureInfo,
  createAgricultureInfo,
  updateAgricultureInfo,
  deleteAgricultureInfo
} = require('../controllers/agricultureController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getAgricultureInfo);
router.post('/', protect, adminOnly, createAgricultureInfo);
router.put('/:id', protect, adminOnly, updateAgricultureInfo);
router.delete('/:id', protect, adminOnly, deleteAgricultureInfo);

module.exports = router;
