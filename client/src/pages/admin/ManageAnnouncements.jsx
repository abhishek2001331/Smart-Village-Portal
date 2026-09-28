import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const ManageAnnouncements = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    titleHi: '',
    description: '',
    descriptionHi: '',
    category: 'General',
    isUrgent: false
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/announcements');
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching announcements:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditId(item._id);
      setFormData({
        title: item.title,
        titleHi: item.titleHi || '',
        description: item.description,
        descriptionHi: item.descriptionHi || '',
        category: item.category,
        isUrgent: item.isUrgent
      });
    } else {
      setEditId(null);
      setFormData({
        title: '',
        titleHi: '',
        description: '',
        descriptionHi: '',
        category: 'General',
        isUrgent: false
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/announcements/${editId}`, formData);
      } else {
        await api.post('/announcements', formData);
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      alert('Error saving announcement.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this notice?')) {
      try {
        await api.delete(`/announcements/${id}`);
        fetchData();
      } catch (err) {
        alert('Error deleting notice.');
      }
    }
  };

  return (
    <div className="py-4 bg-light min-vh-100">
      <div className="container-fluid px-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-extrabold text-navy" style={{ color: '#0B2545' }}>Notices & Announcements Management</h3>
            <p className="text-secondary small mb-0">Publish village announcements, meeting alerts, and urgent notices in English & Hindi.</p>
          </div>
          <button className="btn btn-warning fw-bold text-dark px-4 rounded-pill" onClick={() => handleOpenModal()}>
            <i className="fa-solid fa-plus me-2"></i> Post New Announcement
          </button>
        </div>

        {loading ? (
          <LoadingSpinner message="Loading notices..." />
        ) : (
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light small text-uppercase">
                  <tr>
                    <th>Title (English / Hindi)</th>
                    <th>Category</th>
                    <th>Urgent</th>
                    <th>Published Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <div className="fw-bold text-dark">{item.title}</div>
                        {item.titleHi && <small className="text-primary">{item.titleHi}</small>}
                      </td>
                      <td><span className="badge bg-secondary">{item.category}</span></td>
                      <td>
                        {item.isUrgent ? (
                          <span className="badge bg-danger">Urgent Alert</span>
                        ) : (
                          <span className="badge bg-light text-dark border">Normal</span>
                        )}
                      </td>
                      <td className="small text-muted">{new Date(item.publishedDate).toLocaleDateString()}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleOpenModal(item)}>
                          <i className="fa-solid fa-pen-to-square me-1"></i> Edit
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item._id)}>
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
                  {editId ? 'Edit Announcement' : 'Post New Notice'}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body p-4">
                  <div className="row g-3">
                    <div className="col-md-8">
                      <label className="form-label small fw-semibold text-dark">English Title *</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-semibold text-dark">Category</label>
                      <select
                        className="form-select bg-light"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        <option value="General">General</option>
                        <option value="Government">Government</option>
                        <option value="Education">Education</option>
                        <option value="Health">Health</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Employment">Employment</option>
                        <option value="Emergency">Emergency</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold text-dark">Hindi Title (हिंदी शीर्षक)</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.titleHi}
                        onChange={(e) => setFormData({ ...formData, titleHi: e.target.value })}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold text-dark">English Content *</label>
                      <textarea
                        rows="3"
                        className="form-control bg-light"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold text-dark">Hindi Content (हिंदी विवरण)</label>
                      <textarea
                        rows="3"
                        className="form-control bg-light"
                        value={formData.descriptionHi}
                        onChange={(e) => setFormData({ ...formData, descriptionHi: e.target.value })}
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="urgentSwitch"
                          checked={formData.isUrgent}
                          onChange={(e) => setFormData({ ...formData, isUrgent: e.target.checked })}
                        />
                        <label className="form-check-label fw-bold text-danger" htmlFor="urgentSwitch">
                          Mark as Urgent Announcement (Displays Red Alert Banner)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer bg-light">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-warning fw-bold text-dark px-4">
                    Publish Notice
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

export default ManageAnnouncements;
