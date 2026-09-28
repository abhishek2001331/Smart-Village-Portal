import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const ManageHealth = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    serviceType: 'Primary Health Center',
    doctorInCharge: '',
    contactNumber: '',
    emergencyNumber: '108',
    address: '',
    timing: '8:00 AM - 4:00 PM',
    servicesOffered: '',
    healthCamps: ''
  });

  useEffect(() => {
    fetchHealth();
  }, []);

  const fetchHealth = async () => {
    try {
      setLoading(true);
      const res = await api.get('/health');
      setServices(res.data);
    } catch (err) {
      console.error('Error fetching health services:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditId(item._id);
      setFormData({
        name: item.name,
        serviceType: item.serviceType,
        doctorInCharge: item.doctorInCharge || '',
        contactNumber: item.contactNumber,
        emergencyNumber: item.emergencyNumber || '108',
        address: item.address,
        timing: item.timing || '8:00 AM - 4:00 PM',
        servicesOffered: item.servicesOffered,
        healthCamps: item.healthCamps || ''
      });
    } else {
      setEditId(null);
      setFormData({
        name: '',
        serviceType: 'Primary Health Center',
        doctorInCharge: '',
        contactNumber: '',
        emergencyNumber: '108',
        address: '',
        timing: '8:00 AM - 4:00 PM',
        servicesOffered: '',
        healthCamps: ''
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/health/${editId}`, formData);
      } else {
        await api.post('/health', formData);
      }
      setShowModal(false);
      fetchHealth();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving health center.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this health service record?')) {
      try {
        await api.delete(`/health/${id}`);
        fetchHealth();
      } catch (err) {
        alert('Error deleting health service.');
      }
    }
  };

  return (
    <div className="py-4 bg-light min-vh-100">
      <div className="container-fluid px-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-extrabold text-navy" style={{ color: '#0B2545' }}>Health Facilities Management</h3>
            <p className="text-secondary small mb-0">Manage PHC clinics, generic pharmacy depots, doctor contacts, and medical camps.</p>
          </div>
          <button className="btn btn-warning fw-bold text-dark px-4 rounded-pill" onClick={() => handleOpenModal()}>
            <i className="fa-solid fa-plus me-2"></i> Add Health Center
          </button>
        </div>

        {loading ? (
          <LoadingSpinner message="Fetching health centers..." />
        ) : (
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light small text-uppercase">
                  <tr>
                    <th>Facility Name</th>
                    <th>Type</th>
                    <th>Doctor In Charge</th>
                    <th>Phone / Emergency</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((h) => (
                    <tr key={h._id}>
                      <td className="fw-bold text-dark">{h.name}</td>
                      <td><span className="badge bg-danger">{h.serviceType}</span></td>
                      <td>{h.doctorInCharge}</td>
                      <td>{h.contactNumber} / <strong className="text-danger">{h.emergencyNumber}</strong></td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleOpenModal(h)}>
                          <i className="fa-solid fa-pen-to-square me-1"></i> Edit
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(h._id)}>
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
                  {editId ? 'Edit Health Facility' : 'Add Health Facility'}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body p-4">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Facility Name *</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Service Type *</label>
                      <select
                        className="form-select bg-light"
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      >
                        <option value="Hospital">Hospital</option>
                        <option value="Primary Health Center">Primary Health Center</option>
                        <option value="Clinic">Clinic</option>
                        <option value="Ambulance">Ambulance</option>
                        <option value="Pharmacy">Pharmacy</option>
                        <option value="Health Camp">Health Camp</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Doctor / Medical Officer</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.doctorInCharge}
                        onChange={(e) => setFormData({ ...formData, doctorInCharge: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Contact Number *</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.contactNumber}
                        onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Emergency Hotline</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.emergencyNumber}
                        onChange={(e) => setFormData({ ...formData, emergencyNumber: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Timing Hours</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.timing}
                        onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold text-dark">Address *</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold text-dark">Services Offered *</label>
                      <textarea
                        rows="2"
                        className="form-control bg-light"
                        value={formData.servicesOffered}
                        onChange={(e) => setFormData({ ...formData, servicesOffered: e.target.value })}
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="modal-footer bg-light">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-warning fw-bold text-dark px-4">
                    Save Health Center
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

export default ManageHealth;
