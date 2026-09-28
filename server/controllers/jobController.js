const Job = require('../models/Job');

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
  try {
    const { search, jobType } = req.query;
    let filter = {};

    if (jobType && jobType !== 'All') {
      filter.jobType = jobType;
    }
    if (search) {
      filter.$or = [
        { jobTitle: { $regex: search, $options: 'i' } },
        { organization: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create job listing (Admin only)
// @route   POST /api/jobs
// @access  Private/Admin
const createJob = async (req, res) => {
  try {
    const { jobTitle, organization, location, description, qualification, salary, jobType, lastDate, applicationLink, status } = req.body;

    if (!jobTitle || !organization || !description || !qualification || !salary || !lastDate) {
      return res.status(400).json({ message: 'Job title, organization, description, qualification, salary, and last date are required' });
    }

    const job = await Job.create({
      jobTitle,
      organization,
      location: location || 'Gram Panchayat Kalyanpur',
      description,
      qualification,
      salary,
      jobType: jobType || 'Contractual',
      lastDate,
      applicationLink: applicationLink || '#',
      status: status || 'Active'
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update job (Admin only)
// @route   PUT /api/jobs/:id
// @access  Private/Admin
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (job) {
      Object.assign(job, req.body);
      const updated = await job.save();
      res.json(updated);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete job (Admin only)
// @route   DELETE /api/jobs/:id
// @access  Private/Admin
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (job) {
      await job.deleteOne();
      res.json({ message: 'Job removed successfully' });
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getJobs,
  createJob,
  updateJob,
  deleteJob
};
