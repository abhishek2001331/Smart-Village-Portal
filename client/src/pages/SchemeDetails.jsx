import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const SchemeDetails = () => {
  const { id } = useParams();
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScheme = async () => {
      try {
        const res = await api.get(`/schemes/${id}`);
        setScheme(res.data);
      } catch (err) {
        console.error('Error fetching scheme details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchScheme();
  }, [id]);

  if (loading) return <LoadingSpinner message="Fetching scheme details..." />;
  if (!scheme) return (
    <div className="container py-5 text-center">
      <h3>Scheme not found</h3>
      <Link to="/schemes" className="btn btn-primary mt-3">Back to Schemes</Link>
    </div>
  );

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        <Link to="/schemes" className="btn btn-outline-secondary btn-sm mb-4">
          <i className="fa-solid fa-arrow-left me-2"></i>Back to All Schemes
        </Link>

        <div className="card border-0 shadow-lg p-4 p-md-5 rounded-4 bg-white">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
            <span className="badge bg-secondary fs-6 px-3 py-2">{scheme.category}</span>
            <span className={`badge ${scheme.status === 'Active' ? 'bg-success' : 'bg-warning'} fs-6 px-3 py-2 rounded-pill`}>
              Status: {scheme.status}
            </span>
          </div>

          <h2 className="fw-extrabold text-navy mb-3" style={{ color: '#0B2545' }}>{scheme.name}</h2>
          <p className="lead text-secondary mb-4">{scheme.description}</p>

          <hr className="my-4" />

          <div className="row g-4 mb-4">
            <div className="col-md-6">
              <div className="bg-light p-4 rounded-3 h-100 border-start border-4 border-success">
                <h5 className="fw-bold text-success mb-3"><i className="fa-solid fa-gift me-2"></i>Scheme Benefits</h5>
                <p className="text-dark mb-0">{scheme.benefits}</p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="bg-light p-4 rounded-3 h-100 border-start border-4 border-primary">
                <h5 className="fw-bold text-primary mb-3"><i className="fa-solid fa-user-check me-2"></i>Eligibility Criteria</h5>
                <p className="text-dark mb-0">{scheme.eligibility}</p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="bg-light p-4 rounded-3 h-100 border-start border-4 border-warning">
                <h5 className="fw-bold text-dark mb-3"><i className="fa-solid fa-file-invoice me-2"></i>Required Documents</h5>
                <p className="text-dark mb-0">{scheme.requiredDocuments}</p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="bg-light p-4 rounded-3 h-100 border-start border-4 border-info">
                <h5 className="fw-bold text-dark mb-3"><i className="fa-solid fa-list-check me-2"></i>Application Process</h5>
                <p className="text-dark mb-0">{scheme.applicationProcess}</p>
              </div>
            </div>
          </div>

          <div className="d-flex flex-wrap align-items-center justify-content-between pt-3 border-top gap-3">
            <div className="small text-muted">
              Last Updated: {new Date(scheme.updatedAt || scheme.createdAt).toLocaleDateString()}
            </div>
            <a href={scheme.officialLink} target="_blank" rel="noopener noreferrer" className="btn btn-warning btn-lg fw-bold text-dark rounded-pill px-4">
              Apply via Official Portal <i className="fa-solid fa-up-right-from-square ms-2"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetails;
