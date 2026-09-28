const express = require('express');
const router = express.Router();
const {
  getSchools,
  createSchool,
  updateSchool,
  deleteSchool
} = require('../controllers/schoolController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getSchools);
router.post('/', protect, adminOnly, createSchool);
router.put('/:id', protect, adminOnly, updateSchool);
router.delete('/:id', protect, adminOnly, deleteSchool);

module.exports = router;
