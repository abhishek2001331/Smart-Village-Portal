const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: [true, 'Please provide job title'],
      trim: true
    },
    organization: {
      type: String,
      required: [true, 'Please provide organization/employer name']
    },
    location: {
      type: String,
      default: 'Gram Panchayat Kalyanpur'
    },
    description: {
      type: String,
      required: true
    },
    qualification: {
      type: String,
      required: true
    },
    salary: {
      type: String,
      required: true
    },
    jobType: {
      type: String,
      enum: ['Full Time', 'Part Time', 'Contractual', 'Daily Wage', 'Apprenticeship'],
      default: 'Contractual'
    },
    lastDate: {
      type: Date,
      required: true
    },
    applicationLink: {
      type: String,
      default: '#'
    },
    status: {
      type: String,
      enum: ['Active', 'Closed'],
      default: 'Active'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Job', jobSchema);
