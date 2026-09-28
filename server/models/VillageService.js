const mongoose = require('mongoose');

const villageServiceSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: [true, 'Please provide service name'],
      trim: true
    },
    serviceNameHi: {
      type: String,
      default: ''
    },
    department: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['Available', 'Partially Available', 'Unavailable', 'Under Maintenance'],
      default: 'Available'
    },
    fees: {
      type: String,
      default: 'Free / Nominal Fee'
    },
    processingTime: {
      type: String,
      default: '3-7 Working Days'
    },
    contactPerson: {
      type: String,
      default: 'Gram Sachiv / Officer'
    },
    formLink: {
      type: String,
      default: '#'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('VillageService', villageServiceSchema);
