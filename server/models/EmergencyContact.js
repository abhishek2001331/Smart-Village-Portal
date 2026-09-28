const mongoose = require('mongoose');

const emergencyContactSchema = new mongoose.Schema(
  {
    department: {
      type: String,
      required: [true, 'Please provide department name'],
      trim: true
    },
    contactPerson: {
      type: String,
      default: 'Officer in Charge'
    },
    phoneNumber: {
      type: String,
      required: true
    },
    alternatePhone: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    availability: {
      type: String,
      default: '24x7 Emergency Service'
    },
    priorityOrder: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('EmergencyContact', emergencyContactSchema);
