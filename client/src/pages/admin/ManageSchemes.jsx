import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const ManageSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Agriculture',
    description: '',
    eligibility: '',
    benefits: '',
    requiredDocuments: '',
    applicationProcess: '',
    officialLink: '#',
    status: 'Active'
  });

  const categories = [
    'Agriculture',
    'Education',
    'Health',
    'Housing',
    'Women & Child',
    'Employment',
    'Pension',
    'Infrastructure',
    'General'
  ];

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      setLoading(true);
      const res = await api.get('/schemes');
      setSchemes(res.data);
    } catch (err) {
      console.error('Error fetching schemes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (scheme = null) => {
    if (scheme) {
      setEditId(scheme._id);
      setFormData({
        name: scheme.name,
        category: scheme.category,
        description: scheme.description,
        eligibility: scheme.eligibility,
        benefits: scheme.benefits,
        requiredDocuments: scheme.requiredDocuments,
        applicationProcess: scheme.applicationProcess,
        officialLink: scheme.officialLink,
        status: scheme.status
      });
    } else {
      setEditId(null);
      setFormData({
        name: '',
        category: 'Agriculture',
        description: '',
        eligibility: '',
        benefits: '',
        requiredDocuments: '',
        applicationProcess: '',
        officialLink: '#',
        status: 'Active'
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/schemes/${editId}`, formData);
      } else {
        await api.post('/schemes', formData);
      }
      setShowModal(false);
      fetchSchemes();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving scheme.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this scheme?')) {
      try {
        await api.delete(`/schemes/${id}`);
        fetchSchemes();
      } catch (err) {
        alert('Error deleting scheme.');
      }
    }
  };

  return (
    <div className="py-4 bg-light min-vh-100">
      <div className="container-fluid px-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-extrabold text-navy" style={{ color: '#0B2545' }}>Government Schemes Management</h3>
            <p className="text-secondary small mb-0">Add, edit, or archive central & state welfare schemes.</p>
          </div>
          <button className="btn btn-warning fw-bold text-dark px-4 rounded-pill" onClick={() => handleOpenModal()}>
            <i className="fa-solid fa-plus me-2"></i> Add New Scheme
          </button>
        </div>

        {loading ? (
          <LoadingSpinner message="Fetching scheme directory..." />
        ) : (
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light small text-uppercase">
                  <tr>
                    <th>Scheme Name</th>
                    <th>Category</th>
                    <th>Benefits</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {schemes.map((s) => (
                    <tr key={s._id}>
                      <td className="fw-bold text-dark">{s.name}</td>
                      <td><span className="badge bg-secondary">{s.category}</span></td>
                      <td className="small text-secondary">{s.benefits}</td>
                      <td>
                        <span className={`badge ${s.status === 'Active' ? 'bg-success' : 'bg-warning'}`}>
                          {s.status}
                        </span>
                      </td>
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

      {/* Modal for Add / Edit */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow">
              <div className="modal-header bg-navy text-white" style={{ backgroundColor: '#0B2545' }}>
                <h5 className="modal-title fw-bold text-white">
                  {editId ? 'Edit Scheme' : 'Add New Government Scheme'}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body p-4">
                  <div className="row g-3">
                    <div className="col-md-8">
                      <label className="form-label small fw-semibold text-dark">Scheme Name *</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-semibold text-dark">Category *</label>
                      <select
                        className="form-select bg-light"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold text-dark">Description *</label>
                      <textarea
                        rows="2"
                        className="form-control bg-light"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                      ></textarea>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Eligibility Criteria *</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.eligibility}
                        onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Financial & Social Benefits *</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.benefits}
                        onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Required Documents</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.requiredDocuments}
                        onChange={(e) => setFormData({ ...formData, requiredDocuments: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Application Process</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.applicationProcess}
                        onChange={(e) => setFormData({ ...formData, applicationProcess: e.target.value })}
                      />
                    </div>
                    <div className="col-md-8">
                      <label className="form-label small fw-semibold text-dark">Official Portal Link</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.officialLink}
                        onChange={(e) => setFormData({ ...formData, officialLink: e.target.value })}
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
                        <option value="Upcoming">Upcoming</option>
                        <option value="Expired">Expired</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="modal-footer bg-light">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-warning fw-bold text-dark px-4">
                    Save Scheme
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

export default ManageSchemes;
