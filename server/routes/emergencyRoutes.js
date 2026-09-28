const express = require('express');
const router = express.Router();
const {
  getEmergencyContacts,
  createEmergencyContact,
  updateEmergencyContact,
  deleteEmergencyContact
} = require('../controllers/emergencyController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getEmergencyContacts);
router.post('/', protect, adminOnly, createEmergencyContact);
router.put('/:id', protect, adminOnly, updateEmergencyContact);
router.delete('/:id', protect, adminOnly, deleteEmergencyContact);

module.exports = router;
