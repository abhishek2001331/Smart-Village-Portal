import React, { useState, useEffect } from 'react';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', 'General', 'Government', 'Education', 'Health', 'Agriculture', 'Employment', 'Emergency'];

  useEffect(() => {
    fetchAnnouncements();
  }, [category, search]);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const params = {};
      if (category !== 'All') params.category = category;
      if (search) params.search = search;

      const res = await api.get('/announcements', { params });
      setAnnouncements(res.data);
    } catch (err) {
      console.error('Error fetching announcements:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        <div className="mb-4">
          <span className="badge bg-warning text-dark px-3 py-2 rounded-pill text-uppercase mb-2">Public Notice Board</span>
          <h2 className="fw-extrabold text-dark">Gram Panchayat Notices & Announcements</h2>
          <p className="text-secondary">Stay updated with official Gram Sabha meetings, health camps, electricity maintenance, and village drives.</p>
        </div>

        <div className="card border-0 shadow-sm p-4 mb-4 rounded-4 bg-white">
          <div className="row g-3">
            <div className="col-md-7">
              <input
                type="text"
                className="form-control bg-light"
                placeholder="Search notices by keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-md-5">
              <select className="form-select bg-light" value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner message="Fetching notices..." />
        ) : announcements.length === 0 ? (
          <div className="alert alert-info p-5 text-center rounded-4 shadow-sm">
            <h5>No notices found</h5>
          </div>
        ) : (
          <div className="row g-4">
            {announcements.map((item) => (
              <div key={item._id} className="col-md-6 col-lg-4">
                <div className={`card smart-card border-0 p-4 h-100 ${item.isUrgent ? 'border-start border-4 border-danger' : ''}`}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className={`badge ${item.isUrgent ? 'bg-danger' : 'bg-primary'} rounded-pill`}>
                      {item.category}
                    </span>
                    <small className="text-muted">{new Date(item.publishedDate).toLocaleDateString()}</small>
                  </div>
                  <h5 className="fw-bold text-dark mb-2">{item.title}</h5>
                  {item.titleHi && <h6 className="text-primary small mb-3">{item.titleHi}</h6>}
                  <p className="text-secondary small mb-3">{item.description}</p>
                  {item.descriptionHi && (
                    <div className="bg-light p-3 rounded-3 small text-dark border mb-2">
                      <strong>हिंदी विवरण:</strong> {item.descriptionHi}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;
