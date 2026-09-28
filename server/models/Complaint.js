const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema(
  {
    complaintId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    citizen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    citizenName: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Water',
        'Electricity',
        'Roads',
        'Sanitation',
        'Street Lights',
        'Education',
        'Health',
        'Agriculture',
        'Other'
      ]
    },
    subject: {
      type: String,
      required: [true, 'Please enter a subject'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Please enter complaint details']
    },
    location: {
      type: String,
      required: [true, 'Please specify location details']
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Urgent'],
      default: 'Medium'
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Resolved', 'Rejected'],
      default: 'Pending'
    },
    adminResponse: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Complaint', complaintSchema);
