import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const ManageAgriculture = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Farming Info',
    description: '',
    season: 'All Season',
    contactPhone: '1800-180-1551 (Kisan Call Center)'
  });

  const categories = [
    'Farming Info',
    'Crop Info',
    'Weather Alert',
    'Government Scheme',
    'Farming Tip',
    'Fertilizer Guide',
    'Irrigation',
    'Market Rates / Mandi'
  ];

  useEffect(() => {
    fetchAgri();
  }, []);

  const fetchAgri = async () => {
    try {
      setLoading(true);
      const res = await api.get('/agriculture');
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching agri items:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditId(item._id);
      setFormData({
        title: item.title,
        category: item.category,
        description: item.description,
        season: item.season,
        contactPhone: item.contactPhone
      });
    } else {
      setEditId(null);
      setFormData({
        title: '',
        category: 'Farming Info',
        description: '',
        season: 'All Season',
        contactPhone: '1800-180-1551 (Kisan Call Center)'
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/agriculture/${editId}`, formData);
      } else {
        await api.post('/agriculture', formData);
      }
      setShowModal(false);
      fetchAgri();
    } catch (err) {
      alert('Error saving agri item.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this advisory?')) {
      try {
        await api.delete(`/agriculture/${id}`);
        fetchAgri();
      } catch (err) {
        alert('Error deleting advisory.');
      }
    }
  };

  return (
    <div className="py-4 bg-light min-vh-100">
      <div className="container-fluid px-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-extrabold text-navy" style={{ color: '#0B2545' }}>Agriculture & Mandi Management</h3>
            <p className="text-secondary small mb-0">Publish crop care advisories, Mandi commodity prices, and Kisan Call Center contacts.</p>
          </div>
          <button className="btn btn-warning fw-bold text-dark px-4 rounded-pill" onClick={() => handleOpenModal()}>
            <i className="fa-solid fa-plus me-2"></i> Add Agri Advisory
          </button>
        </div>

        {loading ? (
          <LoadingSpinner message="Fetching advisories..." />
        ) : (
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light small text-uppercase">
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Season</th>
                    <th>Expert Helpline</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item._id}>
                      <td className="fw-bold text-dark">{item.title}</td>
                      <td><span className="badge bg-success">{item.category}</span></td>
                      <td>{item.season}</td>
                      <td className="small text-primary">{item.contactPhone}</td>
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
                  {editId ? 'Edit Agri Advisory' : 'Add Agri Advisory'}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body p-4">
                  <div className="row g-3">
                    <div className="col-md-8">
                      <label className="form-label small fw-semibold text-dark">Advisory Title *</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-semibold text-dark">Category *</label>
                      <select
                        className="form-select bg-light"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Crop Season</label>
                      <select
                        className="form-select bg-light"
                        value={formData.season}
                        onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                      >
                        <option value="Kharif">Kharif</option>
                        <option value="Rabi">Rabi</option>
                        <option value="Zaid">Zaid</option>
                        <option value="All Season">All Season</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold text-dark">Expert Phone Helpline</label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        value={formData.contactPhone}
                        onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold text-dark">Full Advisory Content *</label>
                      <textarea
                        rows="4"
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
                    Save Advisory
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

export default ManageAgriculture;
