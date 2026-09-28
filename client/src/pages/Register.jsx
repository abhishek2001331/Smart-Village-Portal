import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    village: 'Kalyanpur',
    wardNo: 'Ward 1',
    address: '',
    aadharNo: '',
    occupation: 'Resident'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/auth/register', formData);
      login(res.data);
      navigate('/citizen/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5 bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-7">
            <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 bg-white">
              <div className="text-center mb-4">
                <i className="fa-solid fa-id-card text-warning fs-1 mb-2"></i>
                <h3 className="fw-extrabold text-navy" style={{ color: '#0B2545' }}>Citizen Registration</h3>
                <p className="small text-secondary">Create your digital Smart Village citizen account</p>
              </div>

              {error && (
                <div className="alert alert-danger d-flex align-items-center small mb-4" role="alert">
                  <i className="fa-solid fa-circle-exclamation me-2 fs-5"></i>
                  <div>{error}</div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-dark">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control bg-light"
                      placeholder="e.g. Rajesh Kumar"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-dark">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control bg-light"
                      placeholder="rajesh@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-dark">Password *</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control bg-light"
                      placeholder="At least 6 characters"
                      value={formData.password}
                      onChange={handleChange}
                      minLength={6}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-dark">Mobile Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      className="form-control bg-light"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-dark">Gram Panchayat / Village</label>
                    <input
                      type="text"
                      name="village"
                      className="form-control bg-light"
                      value={formData.village}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-dark">Ward Number</label>
                    <select
                      name="wardNo"
                      className="form-select bg-light"
                      value={formData.wardNo}
                      onChange={handleChange}
                    >
                      <option value="Ward 1">Ward 1</option>
                      <option value="Ward 2">Ward 2</option>
                      <option value="Ward 3">Ward 3</option>
                      <option value="Ward 4">Ward 4</option>
                      <option value="Ward 5">Ward 5</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-dark">Aadhar Number (Optional)</label>
                    <input
                      type="text"
                      name="aadharNo"
                      className="form-control bg-light"
                      placeholder="12-digit Aadhar"
                      value={formData.aadharNo}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-dark">Occupation</label>
                    <input
                      type="text"
                      name="occupation"
                      className="form-control bg-light"
                      placeholder="e.g. Farmer / Artisan / Student"
                      value={formData.occupation}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold small text-dark">Residential Address</label>
                    <textarea
                      name="address"
                      rows="2"
                      className="form-control bg-light"
                      placeholder="House No, Street, Ward details..."
                      value={formData.address}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-warning btn-lg fw-bold text-dark w-100 rounded-pill mb-3"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  ) : (
                    <i className="fa-solid fa-user-plus me-2"></i>
                  )}
                  Create Citizen Account
                </button>
              </form>

              <div className="text-center text-secondary small pt-3 border-top">
                Already registered? <Link to="/login" className="fw-bold text-primary">Sign In Here</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
