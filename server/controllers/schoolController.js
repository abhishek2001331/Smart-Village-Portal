const School = require('../models/School');

// @desc    Get all schools / education facilities
// @route   GET /api/schools
// @access  Public
const getSchools = async (req, res) => {
  try {
    const { search } = req.query;
    let filter = {};

    if (search) {
      filter.$or = [
        { schoolName: { $regex: search, $options: 'i' } },
        { headmaster: { $regex: search, $options: 'i' } },
        { facilities: { $regex: search, $options: 'i' } }
      ];
    }

    const schools = await School.find(filter).sort({ createdAt: -1 });
    res.json(schools);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create school facility (Admin only)
// @route   POST /api/schools
// @access  Private/Admin
const createSchool = async (req, res) => {
  try {
    const { schoolName, address, headmaster, contactPhone, availableClasses, facilities, totalStudents, announcements } = req.body;

    if (!schoolName || !address || !headmaster || !contactPhone || !facilities) {
      return res.status(400).json({ message: 'School name, address, headmaster, contact phone, and facilities are required' });
    }

    const school = await School.create({
      schoolName,
      address,
      headmaster,
      contactPhone,
      availableClasses: availableClasses || 'Class 1 to Class 10',
      facilities,
      totalStudents: totalStudents || 200,
      announcements: announcements || 'New academic session admissions open'
    });

    res.status(201).json(school);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update school (Admin only)
// @route   PUT /api/schools/:id
// @access  Private/Admin
const updateSchool = async (req, res) => {
  try {
    const school = await School.findById(req.params.id);

    if (school) {
      Object.assign(school, req.body);
      const updated = await school.save();
      res.json(updated);
    } else {
      res.status(404).json({ message: 'School not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete school (Admin only)
// @route   DELETE /api/schools/:id
// @access  Private/Admin
const deleteSchool = async (req, res) => {
  try {
    const school = await School.findById(req.params.id);

    if (school) {
      await school.deleteOne();
      res.json({ message: 'School removed successfully' });
    } else {
      res.status(404).json({ message: 'School not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSchools,
  createSchool,
  updateSchool,
  deleteSchool
};
