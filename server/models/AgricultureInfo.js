const mongoose = require('mongoose');

const agricultureInfoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide advisory title'],
      trim: true
    },
    category: {
      type: String,
      enum: [
        'Farming Info',
        'Crop Info',
        'Weather Alert',
        'Government Scheme',
        'Farming Tip',
        'Fertilizer Guide',
        'Irrigation',
        'Market Rates / Mandi'
      ],
      required: true
    },
    description: {
      type: String,
      required: true
    },
    season: {
      type: String,
      enum: ['Kharif', 'Rabi', 'Zaid', 'All Season'],
      default: 'All Season'
    },
    contactPhone: {
      type: String,
      default: '1800-180-1551 (Kisan Call Center)'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('AgricultureInfo', agricultureInfoSchema);
