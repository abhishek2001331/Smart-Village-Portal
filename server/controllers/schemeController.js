const Scheme = require('../models/Scheme');

// @desc    Get all schemes (Public)
// @route   GET /api/schemes
// @access  Public
const getSchemes = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { benefits: { $regex: search, $options: 'i' } }
      ];
    }

    const schemes = await Scheme.find(query).sort({ createdAt: -1 });
    res.json(schemes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single scheme by ID
// @route   GET /api/schemes/:id
// @access  Public
const getSchemeById = async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);
    if (!scheme) {
      return res.status(404).json({ message: 'Government Scheme not found' });
    }
    res.json(scheme);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new scheme (Admin only)
// @route   POST /api/schemes
// @access  Private/Admin
const createScheme = async (req, res) => {
  try {
    const { name, category, description, eligibility, benefits, requiredDocuments, applicationProcess, officialLink, startDate, endDate, status, image } = req.body;

    if (!name || !category || !description || !eligibility || !benefits) {
      return res.status(400).json({ message: 'Name, category, description, eligibility, and benefits are required' });
    }

    const scheme = await Scheme.create({
      name,
      category,
      description,
      eligibility,
      benefits,
      requiredDocuments: requiredDocuments || 'Aadhar Card, Income Certificate, Residence Proof',
      applicationProcess: applicationProcess || 'Apply online at official portal or visit Gram Panchayat office',
      officialLink: officialLink || '#',
      startDate: startDate || Date.now(),
      endDate: endDate || null,
      status: status || 'Active',
      image: image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=60'
    });

    res.status(201).json(scheme);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update scheme (Admin only)
// @route   PUT /api/schemes/:id
// @access  Private/Admin
const updateScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);

    if (scheme) {
      Object.assign(scheme, req.body);
      const updatedScheme = await scheme.save();
      res.json(updatedScheme);
    } else {
      res.status(404).json({ message: 'Scheme not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete scheme (Admin only)
// @route   DELETE /api/schemes/:id
// @access  Private/Admin
const deleteScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);

    if (scheme) {
      await scheme.deleteOne();
      res.json({ message: 'Scheme deleted successfully' });
    } else {
      res.status(404).json({ message: 'Scheme not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSchemes,
  getSchemeById,
  createScheme,
  updateScheme,
  deleteScheme
};
