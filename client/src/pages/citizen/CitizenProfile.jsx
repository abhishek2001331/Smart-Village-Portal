import React, { useState, useContext } from 'react';
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

const CitizenProfile = () => {
  const { user, updateUserState } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    village: user?.village || 'Kalyanpur',
    wardNo: user?.wardNo || 'Ward 1',
    address: user?.address || '',
    aadharNo: user?.aadharNo || '',
    occupation: user?.occupation || 'Resident',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });
    setLoading(true);

    try {
      const res = await api.put('/auth/profile', formData);
      updateUserState(res.data);
      setMsg({ type: 'success', text: 'Profile updated successfully!' });
      setFormData({ ...formData, password: '' });
    } catch (err) {
      setMsg({ type: 'danger', text: err.response?.data?.message || 'Failed to update profile.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-7">
            <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 bg-white">
              <div className="text-center mb-4">
                <i className="fa-solid fa-user-gear text-warning fs-1 mb-2"></i>
                <h3 className="fw-extrabold text-navy" style={{ color: '#0B2545' }}>Citizen Profile Management</h3>
                <p className="small text-secondary">View and update your residency details and contact phone</p>
              </div>

              {msg.text && (
                <div className={`alert alert-${msg.type} small mb-4`} role="alert">
                  {msg.text}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-dark">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control bg-light"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-dark">Email Address (Read-only)</label>
                    <input
                      type="email"
                      className="form-control bg-light"
                      value={user?.email || ''}
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-dark">Mobile Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      className="form-control bg-light"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-dark">Occupation</label>
                    <input
                      type="text"
                      name="occupation"
                      className="form-control bg-light"
                      value={formData.occupation}
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
                    <label className="form-label fw-semibold small text-dark">Aadhar Number</label>
                    <input
                      type="text"
                      name="aadharNo"
                      className="form-control bg-light"
                      value={formData.aadharNo}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-dark">New Password (Optional)</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control bg-light"
                      placeholder="Leave blank to keep unchanged"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold small text-dark">Residential Address</label>
                    <textarea
                      name="address"
                      rows="2"
                      className="form-control bg-light"
                      value={formData.address}
                      onChange={handleChange}
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
                    <i className="fa-solid fa-floppy-disk me-2"></i>
                  )}
                  Save Profile Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenProfile;
