import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

const SubmitComplaint = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category: 'Water',
    subject: '',
    description: '',
    location: user?.address || '',
    priority: 'Medium',
    phone: user?.phone || ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successData, setSuccessData] = useState(null);

  const categories = [
    'Water',
    'Electricity',
    'Roads',
    'Sanitation',
    'Street Lights',
    'Education',
    'Health',
    'Agriculture',
    'Other'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/complaints', formData);
      setSuccessData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit complaint. Please check your fields.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-8">
            <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 bg-white">
              <div className="text-center mb-4">
                <span className="badge bg-warning text-dark px-3 py-2 rounded-pill text-uppercase mb-2">Public Grievance Redressal</span>
                <h3 className="fw-extrabold text-navy" style={{ color: '#0B2545' }}>Submit Public Complaint</h3>
                <p className="small text-secondary">Register water, electricity, sanitation, or road issues with Gram Panchayat Administration.</p>
              </div>

              {error && (
                <div className="alert alert-danger d-flex align-items-center small mb-4" role="alert">
                  <i className="fa-solid fa-circle-exclamation me-2 fs-5"></i>
                  <div>{error}</div>
                </div>
              )}

              {successData ? (
                <div className="alert alert-success p-4 rounded-4 text-center">
                  <i className="fa-solid fa-circle-check fs-1 text-success mb-3"></i>
                  <h4 className="fw-bold text-success">Complaint Submitted Successfully!</h4>
                  <p className="small text-dark mb-3">Your grievance has been logged in the Gram Panchayat system.</p>
                  
                  <div className="bg-white p-3 rounded-3 border mb-4 text-start">
                    <div className="mb-2"><strong>Ticket ID:</strong> <span className="fs-5 text-primary fw-bold">{successData.complaintId}</span></div>
                    <div className="mb-2"><strong>Category:</strong> {successData.category}</div>
                    <div className="mb-2"><strong>Subject:</strong> {successData.subject}</div>
                    <div><strong>Status:</strong> <span className="badge bg-warning text-dark">{successData.status}</span></div>
                  </div>

                  <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-navy text-white fw-bold px-4" style={{ backgroundColor: '#0B2545' }} onClick={() => navigate('/citizen/my-complaints')}>
                      View My Complaints
                    </button>
                    <button className="btn btn-outline-secondary px-4" onClick={() => setSuccessData(null)}>
                      Submit Another Complaint
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold small text-dark">Complaint Category *</label>
                      <select
                        name="category"
                        className="form-select bg-light"
                        value={formData.category}
                        onChange={handleChange}
                        required
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold small text-dark">Urgency / Priority</label>
                      <select
                        name="priority"
                        className="form-select bg-light"
                        value={formData.priority}
                        onChange={handleChange}
                      >
                        <option value="Low">Low Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="High">High Priority</option>
                        <option value="Urgent">Urgent / Emergency</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold small text-dark">Subject / Problem Title *</label>
                      <input
                        type="text"
                        name="subject"
                        className="form-control bg-light"
                        placeholder="e.g. Broken Water Pipe near Ward 3 Community Center"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold small text-dark">Exact Location Details *</label>
                      <input
                        type="text"
                        name="location"
                        className="form-control bg-light"
                        placeholder="House No., Street, Landmark"
                        value={formData.location}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold small text-dark">Contact Phone Number</label>
                      <input
                        type="text"
                        name="phone"
                        className="form-control bg-light"
                        placeholder="+91 Mobile number"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold small text-dark">Detailed Description *</label>
                      <textarea
                        name="description"
                        rows="4"
                        className="form-control bg-light"
                        placeholder="Provide all relevant details about the issue (when it started, impact on residents, etc.)"
                        value={formData.description}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-warning btn-lg fw-bold text-dark w-100 rounded-pill mt-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    ) : (
                      <i className="fa-solid fa-paper-plane me-2"></i>
                    )}
                    Generate Ticket & Submit Complaint
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitComplaint;
