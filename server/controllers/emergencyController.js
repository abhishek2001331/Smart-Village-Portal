const EmergencyContact = require('../models/EmergencyContact');

// @desc    Get all emergency contacts
// @route   GET /api/emergency
// @access  Public
const getEmergencyContacts = async (req, res) => {
  try {
    const contacts = await EmergencyContact.find({}).sort({ priorityOrder: 1, department: 1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create emergency contact (Admin only)
// @route   POST /api/emergency
// @access  Private/Admin
const createEmergencyContact = async (req, res) => {
  try {
    const { department, contactPerson, phoneNumber, alternatePhone, address, availability, priorityOrder } = req.body;

    if (!department || !phoneNumber) {
      return res.status(400).json({ message: 'Department and phone number are required' });
    }

    const contact = await EmergencyContact.create({
      department,
      contactPerson: contactPerson || 'Officer in Charge',
      phoneNumber,
      alternatePhone: alternatePhone || '',
      address: address || '',
      availability: availability || '24x7 Emergency Service',
      priorityOrder: priorityOrder || 0
    });

    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update emergency contact (Admin only)
// @route   PUT /api/emergency/:id
// @access  Private/Admin
const updateEmergencyContact = async (req, res) => {
  try {
    const contact = await EmergencyContact.findById(req.params.id);

    if (contact) {
      Object.assign(contact, req.body);
      const updated = await contact.save();
      res.json(updated);
    } else {
      res.status(404).json({ message: 'Emergency contact not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete emergency contact (Admin only)
// @route   DELETE /api/emergency/:id
// @access  Private/Admin
const deleteEmergencyContact = async (req, res) => {
  try {
    const contact = await EmergencyContact.findById(req.params.id);

    if (contact) {
      await contact.deleteOne();
      res.json({ message: 'Emergency contact removed successfully' });
    } else {
      res.status(404).json({ message: 'Emergency contact not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getEmergencyContacts,
  createEmergencyContact,
  updateEmergencyContact,
  deleteEmergencyContact
};
