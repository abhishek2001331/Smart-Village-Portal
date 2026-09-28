const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema(
  {
    schoolName: {
      type: String,
      required: [true, 'Please provide school name'],
      trim: true
    },
    address: {
      type: String,
      required: true
    },
    headmaster: {
      type: String,
      required: true
    },
    contactPhone: {
      type: String,
      required: true
    },
    availableClasses: {
      type: String,
      default: 'Class 1 to Class 10'
    },
    facilities: {
      type: String,
      required: true
    },
    totalStudents: {
      type: Number,
      default: 250
    },
    announcements: {
      type: String,
      default: 'Admissions open for Academic Session 2026-27'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('School', schoolSchema);
