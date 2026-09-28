const AgricultureInfo = require('../models/AgricultureInfo');

// @desc    Get all agriculture advisories and info
// @route   GET /api/agriculture
// @access  Public
const getAgricultureInfo = async (req, res) => {
  try {
    const { category, search } = req.query;
    let filter = {};

    if (category && category !== 'All') {
      filter.category = category;
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const items = await AgricultureInfo.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create agriculture info (Admin only)
// @route   POST /api/agriculture
// @access  Private/Admin
const createAgricultureInfo = async (req, res) => {
  try {
    const { title, category, description, season, contactPhone } = req.body;

    if (!title || !category || !description) {
      return res.status(400).json({ message: 'Title, category, and description are required' });
    }

    const info = await AgricultureInfo.create({
      title,
      category,
      description,
      season: season || 'All Season',
      contactPhone: contactPhone || '1800-180-1551 (Kisan Call Center)'
    });

    res.status(201).json(info);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update agriculture info (Admin only)
// @route   PUT /api/agriculture/:id
// @access  Private/Admin
const updateAgricultureInfo = async (req, res) => {
  try {
    const info = await AgricultureInfo.findById(req.params.id);

    if (info) {
      Object.assign(info, req.body);
      const updated = await info.save();
      res.json(updated);
    } else {
      res.status(404).json({ message: 'Agriculture advisory not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete agriculture info (Admin only)
// @route   DELETE /api/agriculture/:id
// @access  Private/Admin
const deleteAgricultureInfo = async (req, res) => {
  try {
    const info = await AgricultureInfo.findById(req.params.id);

    if (info) {
      await info.deleteOne();
      res.json({ message: 'Agriculture advisory removed successfully' });
    } else {
      res.status(404).json({ message: 'Agriculture advisory not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAgricultureInfo,
  createAgricultureInfo,
  updateAgricultureInfo,
  deleteAgricultureInfo
};
