import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const ManageSchools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    schoolName: '',
    address: '',
    headmaster: '',
    contactPhone: '',
    availableClasses: 'Class 1 to Class 10',
    facilities: '',
    totalStudents: 250,
    announcements: ''
  });

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      setLoading(true);
      const res = await api.get('/schools');
      setSchools(res.data);
    } catch (err) {
      console.error('Error fetching schools:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (school = null) => {
    if (school) {
      setEditId(school._id);
      setFormData({
        schoolName: school.schoolName,
        address: school.address,
        headmaster: school.headmaster,
        contactPhone: school.contactPhone,
        availableClasses: school.availableClasses,
        facilities: school.facilities,
        totalStudents: school.totalStudents,
        announcements: school.announcements || ''
      });
    } else {
      setEditId(null);
      setFormData({
        schoolName: '',
        address: '',
        headmaster: '',
        contactPhone: '',
        availableClasses: 'Class 1 to Class 10',
        facilities: '',
        totalStudents: 250,
        announcements: ''
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/schools/${editId}`, formData);
      } else {
        await api.post('/schools', formData);
      }
      setShowModal(false);
      fetchSchools();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving school facility.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete school record?')) {
      try {
        await api.delete(`/schools/${id}`);
        fetchSchools();
      } catch (err) {
        alert('Error deleting school.');
      }
    }
  };

  return (
    <div className="py-4 bg-light min-vh-100">
      <div className="container-fluid px-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-extrabold text-navy" style={{ color: '#0B2545' }}>School & Education Management</h3>
            <p className="text-secondary small mb-0">Manage village secondary schools, KGBV hostels, Anganwadi centers, and facilities.</p>
          </div>
          <button className="btn btn-warning fw-bold text-dark px-4 rounded-pill" onClick={() => handleOpenModal()}>
            <i className="fa-solid fa-plus me-2"></i> Add School / Center
          </button>
        </div>

        {loading ? (
          <LoadingSpinner message="Fetching school directory..." />
        ) : (
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light small text-uppercase">
                  <tr>
                    <th>School Name</th>
                    <th>Headmaster</th>
                    <th>Contact Phone</th>
                    <th>Total Students</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {schools.map((s) => (
                    <tr key={s._id}>
                      <td className="fw-bold text-dark">{s.schoolName}</td>
                      <td>{s.headmaster}</td>
                      <td>{s.contactPhone}</td>
                      <td><span className="badge bg-primary">{s.totalStudents}</span></td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleOpenModal(s)}>
                          <i className="fa-solid fa-pen-to-square me-1"></i> Edit
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
                  {editId ? 'Edit School Record' : 'Add School Record'}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body p-4">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">School Name *</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.schoolName}
                        onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Headmaster / Principal *</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.headmaster}
                        onChange={(e) => setFormData({ ...formData, headmaster: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Contact Phone *</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.contactPhone}
                        onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Available Classes</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.availableClasses}
                        onChange={(e) => setFormData({ ...formData, availableClasses: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Total Enrolled Students</label>
                      <input
                        type="number"
                        className="form-control bg-light"
                        value={formData.totalStudents}
                        onChange={(e) => setFormData({ ...formData, totalStudents: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
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
                      <label className="form-label small fw-semibold text-dark">Facilities Offered *</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.facilities}
                        onChange={(e) => setFormData({ ...formData, facilities: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer bg-light">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-warning fw-bold text-dark px-4">
                    Save School Record
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

export default ManageSchools;
