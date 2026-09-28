import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    serviceName: '',
    serviceNameHi: '',
    department: '',
    description: '',
    status: 'Available',
    fees: 'Free / Nominal Fee',
    processingTime: '3-7 Working Days',
    contactPerson: 'Gram Sachiv',
    formLink: '#'
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await api.get('/services');
      setServices(res.data);
    } catch (err) {
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (service = null) => {
    if (service) {
      setEditId(service._id);
      setFormData({
        serviceName: service.serviceName,
        serviceNameHi: service.serviceNameHi || '',
        department: service.department,
        description: service.description,
        status: service.status,
        fees: service.fees,
        processingTime: service.processingTime,
        contactPerson: service.contactPerson,
        formLink: service.formLink
      });
    } else {
      setEditId(null);
      setFormData({
        serviceName: '',
        serviceNameHi: '',
        department: '',
        description: '',
        status: 'Available',
        fees: 'Free / Nominal Fee',
        processingTime: '3-7 Working Days',
        contactPerson: 'Gram Sachiv',
        formLink: '#'
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/services/${editId}`, formData);
      } else {
        await api.post('/services', formData);
      }
      setShowModal(false);
      fetchServices();
    } catch (err) {
      alert('Error saving service status.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete service item?')) {
      try {
        await api.delete(`/services/${id}`);
        fetchServices();
      } catch (err) {
        alert('Error deleting service.');
      }
    }
  };

  return (
    <div className="py-4 bg-light min-vh-100">
      <div className="container-fluid px-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-extrabold text-navy" style={{ color: '#0B2545' }}>Public Services Status Portal</h3>
            <p className="text-secondary small mb-0">Update real-time availability of water supply, rural electricity, BharatNet, and revenue certificate services.</p>
          </div>
          <button className="btn btn-warning fw-bold text-dark px-4 rounded-pill" onClick={() => handleOpenModal()}>
            <i className="fa-solid fa-plus me-2"></i> Add Village Service
          </button>
        </div>

        {loading ? (
          <LoadingSpinner message="Fetching public services status..." />
        ) : (
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light small text-uppercase">
                  <tr>
                    <th>Service Name</th>
                    <th>Department</th>
                    <th>Fees</th>
                    <th>Processing Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((s) => (
                    <tr key={s._id}>
                      <td>
                        <div className="fw-bold text-dark">{s.serviceName}</div>
                        {s.serviceNameHi && <small className="text-primary">{s.serviceNameHi}</small>}
                      </td>
                      <td><span className="badge bg-secondary">{s.department}</span></td>
                      <td className="small text-secondary">{s.fees}</td>
                      <td className="small text-muted">{s.processingTime}</td>
                      <td>
                        <span className={`badge ${s.status === 'Available' ? 'bg-success' : s.status === 'Under Maintenance' ? 'bg-warning text-dark' : 'bg-danger'}`}>
                          {s.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleOpenModal(s)}>
                          <i className="fa-solid fa-pen-to-square me-1"></i> Edit Status
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(s._id)}>
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
                  {editId ? 'Edit Village Service' : 'Add Village Service'}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body p-4">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">English Service Name *</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.serviceName}
                        onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Hindi Service Name (हिंदी नाम)</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.serviceNameHi}
                        onChange={(e) => setFormData({ ...formData, serviceNameHi: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Department Name *</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Operational Status *</label>
                      <select
                        className="form-select bg-light"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      >
                        <option value="Available">Available</option>
                        <option value="Partially Available">Partially Available</option>
                        <option value="Under Maintenance">Under Maintenance</option>
                        <option value="Unavailable">Unavailable</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Fees</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.fees}
                        onChange={(e) => setFormData({ ...formData, fees: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Processing Time</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.processingTime}
                        onChange={(e) => setFormData({ ...formData, processingTime: e.target.value })}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold text-dark">Service Description *</label>
                      <textarea
                        rows="2"
                        className="form-control bg-light"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="modal-footer bg-light">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-warning fw-bold text-dark px-4">
                    Save Service
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

export default ManageServices;
