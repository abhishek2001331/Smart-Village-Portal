const express = require('express');
const router = express.Router();
const {
  getHealthServices,
  createHealthService,
  updateHealthService,
  deleteHealthService
} = require('../controllers/healthController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getHealthServices);
router.post('/', protect, adminOnly, createHealthService);
router.put('/:id', protect, adminOnly, updateHealthService);
router.delete('/:id', protect, adminOnly, deleteHealthService);

module.exports = router;
