const express = require('express');
const router = express.Router();
const {
  createComplaint,
  getMyComplaints,
  trackComplaint,
  getComplaintById,
  getAllComplaints,
  updateComplaintStatus,
  deleteComplaint
} = require('../controllers/complaintController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/track/:ticketId', trackComplaint);
router.post('/', protect, createComplaint);
router.get('/my', protect, getMyComplaints);
router.get('/all', protect, adminOnly, getAllComplaints);
router.get('/:id', protect, getComplaintById);
router.put('/:id/status', protect, adminOnly, updateComplaintStatus);
router.delete('/:id', protect, adminOnly, deleteComplaint);

module.exports = router;
