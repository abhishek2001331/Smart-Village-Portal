const VillageService = require('../models/VillageService');

// @desc    Get all village public services
// @route   GET /api/services
// @access  Public
const getServices = async (req, res) => {
  try {
    const { status, search } = req.query;
    let filter = {};

    if (status && status !== 'All') {
      filter.status = status;
    }
    if (search) {
      filter.$or = [
        { serviceName: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const services = await VillageService.find(filter).sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create village service (Admin only)
// @route   POST /api/services
// @access  Private/Admin
const createService = async (req, res) => {
  try {
    const { serviceName, serviceNameHi, department, description, status, fees, processingTime, contactPerson, formLink } = req.body;

    if (!serviceName || !department || !description) {
      return res.status(400).json({ message: 'Service name, department, and description are required' });
    }

    const service = await VillageService.create({
      serviceName,
      serviceNameHi: serviceNameHi || '',
      department,
      description,
      status: status || 'Available',
      fees: fees || 'Free',
      processingTime: processingTime || '3-7 Working Days',
      contactPerson: contactPerson || 'Gram Sachiv',
      formLink: formLink || '#'
    });

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update village service (Admin only)
// @route   PUT /api/services/:id
// @access  Private/Admin
const updateService = async (req, res) => {
  try {
    const service = await VillageService.findById(req.params.id);

    if (service) {
      Object.assign(service, req.body);
      const updated = await service.save();
      res.json(updated);
    } else {
      res.status(404).json({ message: 'Village service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete village service (Admin only)
// @route   DELETE /api/services/:id
// @access  Private/Admin
const deleteService = async (req, res) => {
  try {
    const service = await VillageService.findById(req.params.id);

    if (service) {
      await service.deleteOne();
      res.json({ message: 'Village service removed successfully' });
    } else {
      res.status(404).json({ message: 'Village service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getServices,
  createService,
  updateService,
  deleteService
};
