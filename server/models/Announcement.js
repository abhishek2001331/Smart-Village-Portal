const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide announcement title'],
      trim: true
    },
    titleHi: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      required: [true, 'Please provide announcement content']
    },
    descriptionHi: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      required: true,
      enum: [
        'General',
        'Government',
        'Education',
        'Health',
        'Agriculture',
        'Employment',
        'Emergency'
      ],
      default: 'General'
    },
    image: {
      type: String,
      default: ''
    },
    isUrgent: {
      type: Boolean,
      default: false
    },
    publishedDate: {
      type: Date,
      default: Date.now
    },
    expiryDate: {
      type: Date
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['Active', 'Archived'],
      default: 'Active'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Announcement', announcementSchema);
