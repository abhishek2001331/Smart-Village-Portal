const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide scheme name'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Please select category'],
      enum: [
        'Agriculture',
        'Education',
        'Health',
        'Housing',
        'Women & Child',
        'Employment',
        'Pension',
        'Infrastructure',
        'General'
      ]
    },
    description: {
      type: String,
      required: true
    },
    eligibility: {
      type: String,
      required: true
    },
    benefits: {
      type: String,
      required: true
    },
    requiredDocuments: {
      type: String,
      required: true
    },
    applicationProcess: {
      type: String,
      required: true
    },
    officialLink: {
      type: String,
      default: '#'
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: {
      type: Date
    },
    status: {
      type: String,
      enum: ['Active', 'Upcoming', 'Expired'],
      default: 'Active'
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=60'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Scheme', schemeSchema);
