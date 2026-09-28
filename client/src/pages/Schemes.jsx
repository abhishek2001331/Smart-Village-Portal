import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Schemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
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
  }, [selectedCategory, search]);

  const fetchSchemes = async () => {
    try {
      setLoading(true);
      const params = {};
      if (selectedCategory !== 'All') params.category = selectedCategory;
      if (search) params.search = search;

      const res = await api.get('/schemes', { params });
      setSchemes(res.data);
    } catch (err) {
      console.error('Error fetching schemes:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        <div className="mb-4">
          <span className="badge bg-primary px-3 py-2 rounded-pill text-uppercase mb-2">Government Schemes Directory</span>
          <h2 className="fw-extrabold text-dark">Central & State Welfare Schemes</h2>
          <p className="text-secondary">Search, filter, and explore eligibility criteria, direct cash transfers, and application processes for village residents.</p>
        </div>

        {/* Search & Filters */}
        <div className="card border-0 shadow-sm p-4 mb-4 rounded-4 bg-white">
          <div className="row g-3">
            <div className="col-md-7">
              <label className="form-label fw-semibold small text-uppercase text-secondary">Search Schemes:</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0"><i className="fa-solid fa-magnifying-glass text-secondary"></i></span>
                <input
                  type="text"
                  className="form-control border-start-0 bg-light"
                  placeholder="Search by scheme name, benefits, or document requirements..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-5">
              <label className="form-label fw-semibold small text-uppercase text-secondary">Category Filter:</label>
              <select
                className="form-select bg-light"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner message="Loading government schemes directory..." />
        ) : schemes.length === 0 ? (
          <div className="alert alert-info p-5 text-center rounded-4 shadow-sm">
            <i className="fa-solid fa-folder-open fs-1 text-primary mb-3"></i>
            <h5 className="fw-bold">No schemes matching your criteria</h5>
            <p className="small text-secondary mb-0">Try adjusting your search terms or select "All" categories.</p>
          </div>
        ) : (
          <div className="row g-4">
            {schemes.map((scheme) => (
              <div key={scheme._id} className="col-lg-6">
                <div className="card smart-card border-0 p-4 h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className="badge bg-secondary">{scheme.category}</span>
                      <span className={`badge ${scheme.status === 'Active' ? 'bg-success' : 'bg-warning'} rounded-pill`}>
                        {scheme.status}
                      </span>
                    </div>
                    <h4 className="fw-bold text-dark mb-2">{scheme.name}</h4>
                    <p className="text-secondary small mb-3">{scheme.description}</p>
                    
                    <div className="bg-light p-3 rounded-3 mb-3 small">
                      <div className="mb-2"><strong className="text-dark"><i className="fa-solid fa-gift text-success me-2"></i>Benefits:</strong> {scheme.benefits}</div>
                      <div className="mb-2"><strong className="text-dark"><i className="fa-solid fa-user-check text-primary me-2"></i>Eligibility:</strong> {scheme.eligibility}</div>
                      <div><strong className="text-dark"><i className="fa-solid fa-file-lines text-warning me-2"></i>Required Docs:</strong> {scheme.requiredDocuments}</div>
                    </div>
                  </div>

                  <div className="pt-2 d-flex justify-content-between align-items-center border-top">
                    <Link to={`/schemes/${scheme._id}`} className="btn btn-gov-primary btn-sm px-3">
                      View Full Details <i className="fa-solid fa-arrow-right ms-1"></i>
                    </Link>
                    <a href={scheme.officialLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary btn-sm px-3">
                      Official Portal <i className="fa-solid fa-arrow-up-right-from-square ms-1"></i>
                    </a>
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

export default Schemes;
