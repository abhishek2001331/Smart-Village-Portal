import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const ManageEmergency = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    department: '',
    contactPerson: 'Officer in Charge',
    phoneNumber: '',
    alternatePhone: '',
    address: '',
    availability: '24x7 Emergency Service',
    priorityOrder: 0
  });

  useEffect(() => {
    fetchEmergency();
  }, []);

  const fetchEmergency = async () => {
    try {
      setLoading(true);
      const res = await api.get('/emergency');
      setContacts(res.data);
    } catch (err) {
      console.error('Error fetching emergency contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditId(item._id);
      setFormData({
        department: item.department,
        contactPerson: item.contactPerson,
        phoneNumber: item.phoneNumber,
        alternatePhone: item.alternatePhone || '',
        address: item.address || '',
        availability: item.availability || '24x7 Emergency Service',
        priorityOrder: item.priorityOrder || 0
      });
    } else {
      setEditId(null);
      setFormData({
        department: '',
        contactPerson: 'Officer in Charge',
        phoneNumber: '',
        alternatePhone: '',
        address: '',
        availability: '24x7 Emergency Service',
        priorityOrder: 0
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/emergency/${editId}`, formData);
      } else {
        await api.post('/emergency', formData);
      }
      setShowModal(false);
      fetchEmergency();
    } catch (err) {
      alert('Error saving emergency contact.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this emergency contact?')) {
      try {
        await api.delete(`/emergency/${id}`);
        fetchEmergency();
      } catch (err) {
        alert('Error deleting emergency contact.');
      }
    }
  };

  return (
    <div className="py-4 bg-light min-vh-100">
      <div className="container-fluid px-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-extrabold text-navy" style={{ color: '#0B2545' }}>Emergency Contacts Management</h3>
            <p className="text-secondary small mb-0">Manage Police, Ambulance, Fire, Women Helpline, and Electricity fault numbers.</p>
          </div>
          <button className="btn btn-warning fw-bold text-dark px-4 rounded-pill" onClick={() => handleOpenModal()}>
            <i className="fa-solid fa-plus me-2"></i> Add Emergency Contact
          </button>
        </div>

        {loading ? (
          <LoadingSpinner message="Fetching emergency directory..." />
        ) : (
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light small text-uppercase">
                  <tr>
                    <th>Department</th>
                    <th>Contact Person</th>
                    <th>Phone Number</th>
                    <th>Availability</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c) => (
                    <tr key={c._id}>
                      <td className="fw-bold text-dark">{c.department}</td>
                      <td>{c.contactPerson}</td>
                      <td className="fw-bold text-danger">{c.phoneNumber}</td>
                      <td><span className="badge bg-secondary">{c.availability}</span></td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleOpenModal(c)}>
                          <i className="fa-solid fa-pen-to-square me-1"></i> Edit
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(c._id)}>
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
                  {editId ? 'Edit Emergency Contact' : 'Add Emergency Contact'}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body p-4">
                  <div className="row g-3">
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
                      <label className="form-label small fw-semibold text-dark">Contact Person / Officer</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Primary Phone Number *</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Alternate Phone</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.alternatePhone}
                        onChange={(e) => setFormData({ ...formData, alternatePhone: e.target.value })}
                      />
                    </div>
                    <div className="col-md-8">
                      <label className="form-label small fw-semibold text-dark">Availability Hours</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.availability}
                        onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-semibold text-dark">Display Order</label>
                      <input
                        type="number"
                        className="form-control bg-light"
                        value={formData.priorityOrder}
                        onChange={(e) => setFormData({ ...formData, priorityOrder: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold text-dark">Office Address</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer bg-light">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-warning fw-bold text-dark px-4">
                    Save Helpline Number
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

export default ManageEmergency;
