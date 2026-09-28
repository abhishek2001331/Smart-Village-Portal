import React, { useState, useEffect } from 'react';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Agriculture = () => {
  const [infoItems, setInfoItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
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
  }, [selectedCategory]);

  const fetchAgri = async () => {
    try {
      setLoading(true);
      const params = {};
      if (selectedCategory !== 'All') params.category = selectedCategory;
      const res = await api.get('/agriculture', { params });
      setInfoItems(res.data);
    } catch (err) {
      console.error('Error fetching agri info:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        <div className="mb-4">
          <span className="badge bg-success px-3 py-2 rounded-pill text-uppercase mb-2">Kisan Krishi Helpdesk</span>
          <h2 className="fw-extrabold text-dark">Agriculture, Soil & Mandi Information</h2>
          <p className="text-secondary">Crop care advisories, fertilizer recommendations, seasonal weather alerts, and Kisan Call Center support.</p>
        </div>

        {/* Mandi & Kisan Call Banner */}
        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <div className="card border-0 bg-success text-white p-4 rounded-4 shadow-sm">
              <div className="d-flex align-items-center gap-3">
                <i className="fa-solid fa-phone-volume fs-1 text-warning"></i>
                <div>
                  <h5 className="fw-bold mb-1 text-white">Toll-Free Kisan Call Center Helpline</h5>
                  <p className="small mb-1 text-light opacity-90">Talk to agricultural experts for free crop disease remedies and fertilizer guides.</p>
                  <div className="fs-4 fw-extrabold text-warning">1800-180-1551</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 bg-navy text-white p-4 rounded-4 shadow-sm" style={{ backgroundColor: '#0B2545' }}>
              <div className="d-flex align-items-center gap-3">
                <i className="fa-solid fa-wheat-awn-circle-exclamation fs-1 text-warning"></i>
                <div>
                  <h5 className="fw-bold mb-1 text-white">Soil Health Testing Lab</h5>
                  <p className="small mb-1 text-light opacity-90">Get free NPK soil card report before sowing wheat or paddy crops.</p>
                  <span className="badge bg-warning text-dark fw-bold">Panchayat Krishi Desk Open</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category selector */}
        <div className="card border-0 shadow-sm p-4 mb-4 rounded-4 bg-white">
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <label className="fw-bold small text-uppercase text-secondary mb-0">Select Category:</label>
            <select className="form-select w-auto bg-light" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner message="Loading agricultural advisories..." />
        ) : (
          <div className="row g-4">
            {infoItems.map((item) => (
              <div key={item._id} className="col-md-6">
                <div className="card smart-card border-0 p-4 h-100">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <span className="badge bg-success">{item.category}</span>
                    <span className="badge bg-secondary rounded-pill">Season: {item.season}</span>
                  </div>
                  <h5 className="fw-bold text-dark mb-2">{item.title}</h5>
                  <p className="text-secondary small mb-3">{item.description}</p>
                  <div className="bg-light p-3 rounded-3 small text-dark d-flex align-items-center justify-content-between">
                    <span><i className="fa-solid fa-headset text-success me-2"></i>Expert Contact:</span>
                    <strong className="text-primary">{item.contactPhone}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Agriculture;
