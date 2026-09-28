import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    jobTitle: '',
    organization: '',
    location: 'Gram Panchayat Kalyanpur',
    description: '',
    qualification: '',
    salary: '',
    jobType: 'Contractual',
    lastDate: '',
    applicationLink: '#',
    status: 'Active'
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await api.get('/jobs');
      setJobs(res.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (job = null) => {
    if (job) {
      setEditId(job._id);
      setFormData({
        jobTitle: job.jobTitle,
        organization: job.organization,
        location: job.location,
        description: job.description,
        qualification: job.qualification,
        salary: job.salary,
        jobType: job.jobType,
        lastDate: job.lastDate ? new Date(job.lastDate).toISOString().slice(0, 10) : '',
        applicationLink: job.applicationLink,
        status: job.status
      });
    } else {
      setEditId(null);
      setFormData({
        jobTitle: '',
        organization: '',
        location: 'Gram Panchayat Kalyanpur',
        description: '',
        qualification: '',
        salary: '',
        jobType: 'Contractual',
        lastDate: '',
        applicationLink: '#',
        status: 'Active'
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/jobs/${editId}`, formData);
      } else {
        await api.post('/jobs', formData);
      }
      setShowModal(false);
      fetchJobs();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving job opening.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete job post?')) {
      try {
        await api.delete(`/jobs/${id}`);
        fetchJobs();
      } catch (err) {
        alert('Error deleting job.');
      }
    }
  };

  return (
    <div className="py-4 bg-light min-vh-100">
      <div className="container-fluid px-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-extrabold text-navy" style={{ color: '#0B2545' }}>Local Employment Management</h3>
            <p className="text-secondary small mb-0">Post and manage Panchayat computer assistant, Anganwadi helper, and MGNREGA openings.</p>
          </div>
          <button className="btn btn-warning fw-bold text-dark px-4 rounded-pill" onClick={() => handleOpenModal()}>
            <i className="fa-solid fa-plus me-2"></i> Post New Job Opening
          </button>
        </div>

        {loading ? (
          <LoadingSpinner message="Fetching job listings..." />
        ) : (
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light small text-uppercase">
                  <tr>
                    <th>Job Title</th>
                    <th>Employer</th>
                    <th>Type</th>
                    <th>Salary / Wage</th>
                    <th>Last Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((j) => (
                    <tr key={j._id}>
                      <td className="fw-bold text-dark">{j.jobTitle}</td>
                      <td className="small text-secondary">{j.organization}</td>
                      <td><span className="badge bg-secondary">{j.jobType}</span></td>
                      <td className="fw-bold text-success">{j.salary}</td>
                      <td className="small text-muted">{new Date(j.lastDate).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge ${j.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                          {j.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleOpenModal(j)}>
                          <i className="fa-solid fa-pen-to-square me-1"></i> Edit
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(j._id)}>
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow">
              <div className="modal-header bg-navy text-white" style={{ backgroundColor: '#0B2545' }}>
                <h5 className="modal-title fw-bold text-white">
                  {editId ? 'Edit Job Opening' : 'Post Job Vacancy'}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body p-4">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Job Title *</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.jobTitle}
                        onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Organization / Department *</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Qualification Needed *</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.qualification}
                        onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Salary / Monthly Wages *</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.salary}
                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-semibold text-dark">Job Type</label>
                      <select
                        className="form-select bg-light"
                        value={formData.jobType}
                        onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                      >
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Contractual">Contractual</option>
                        <option value="Daily Wage">Daily Wage</option>
                        <option value="Apprenticeship">Apprenticeship</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-semibold text-dark">Application Deadline *</label>
                      <input
                        type="date"
                        className="form-control bg-light"
                        value={formData.lastDate}
                        onChange={(e) => setFormData({ ...formData, lastDate: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-semibold text-dark">Status</label>
                      <select
                        className="form-select bg-light"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      >
                        <option value="Active">Active</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold text-dark">Job Responsibilities / Description *</label>
                      <textarea
                        rows="3"
                        className="form-control bg-light"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold text-dark">Application Link / Portal URL</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.applicationLink}
                        onChange={(e) => setFormData({ ...formData, applicationLink: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer bg-light">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-warning fw-bold text-dark px-4">
                    Save Job Posting
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageJobs;
