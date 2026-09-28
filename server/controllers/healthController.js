const HealthService = require('../models/HealthService');

// @desc    Get all health services
// @route   GET /api/health
// @access  Public
const getHealthServices = async (req, res) => {
  try {
    const { serviceType, search } = req.query;
    let filter = {};

    if (serviceType && serviceType !== 'All') {
      filter.serviceType = serviceType;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { servicesOffered: { $regex: search, $options: 'i' } },
        { doctorInCharge: { $regex: search, $options: 'i' } }
      ];
    }

    const services = await HealthService.find(filter).sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create health service (Admin only)
// @route   POST /api/health
// @access  Private/Admin
const createHealthService = async (req, res) => {
  try {
    const { name, serviceType, doctorInCharge, contactNumber, emergencyNumber, address, timing, servicesOffered, healthCamps } = req.body;

    if (!name || !serviceType || !contactNumber || !address || !servicesOffered) {
      return res.status(400).json({ message: 'Name, service type, contact number, address, and services offered are required' });
    }

    const service = await HealthService.create({
      name,
      serviceType,
      doctorInCharge: doctorInCharge || 'Medical Officer',
      contactNumber,
      emergencyNumber: emergencyNumber || '108',
      address,
      timing: timing || '24x7',
      servicesOffered,
      healthCamps: healthCamps || ''
    });

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update health service (Admin only)
// @route   PUT /api/health/:id
// @access  Private/Admin
const updateHealthService = async (req, res) => {
  try {
    const service = await HealthService.findById(req.params.id);

    if (service) {
      Object.assign(service, req.body);
      const updated = await service.save();
      res.json(updated);
    } else {
      res.status(404).json({ message: 'Health service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete health service (Admin only)
// @route   DELETE /api/health/:id
// @access  Private/Admin
const deleteHealthService = async (req, res) => {
  try {
    const service = await HealthService.findById(req.params.id);

    if (service) {
      await service.deleteOne();
      res.json({ message: 'Health service removed successfully' });
    } else {
      res.status(404).json({ message: 'Health service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getHealthServices,
  createHealthService,
  updateHealthService,
  deleteHealthService
};
