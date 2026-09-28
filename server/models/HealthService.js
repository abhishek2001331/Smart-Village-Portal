const mongoose = require('mongoose');

const healthServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide facility/center name'],
      trim: true
    },
    serviceType: {
      type: String,
      enum: ['Hospital', 'Primary Health Center', 'Clinic', 'Ambulance', 'Pharmacy', 'Health Camp'],
      required: true
    },
    doctorInCharge: {
      type: String,
      default: 'Dr. Ramesh Kumar'
    },
    contactNumber: {
      type: String,
      required: true
    },
    emergencyNumber: {
      type: String,
      default: '108'
    },
    address: {
      type: String,
      required: true
    },
    timing: {
      type: String,
      default: '8:00 AM - 4:00 PM (Emergency 24x7)'
    },
    servicesOffered: {
      type: String,
      required: true
    },
    healthCamps: {
      type: String,
      default: 'Free Eye & Dental Camp on 1st Sunday of every month'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('HealthService', healthServiceSchema);
