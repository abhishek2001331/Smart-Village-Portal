import React, { useState, useEffect } from 'react';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Health = () => {
  const [healthServices, setHealthServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('All');

  const types = ['All', 'Hospital', 'Primary Health Center', 'Clinic', 'Ambulance', 'Pharmacy', 'Health Camp'];

  useEffect(() => {
    fetchHealth();
  }, [filterType]);

  const fetchHealth = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filterType !== 'All') params.serviceType = filterType;
      const res = await api.get('/health', { params });
      setHealthServices(res.data);
    } catch (err) {
      console.error('Error fetching health services:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        <div className="mb-4">
          <span className="badge bg-danger px-3 py-2 rounded-pill text-uppercase mb-2">Public Health Portal</span>
          <h2 className="fw-extrabold text-dark">Village Hospitals & Primary Health Centers</h2>
          <p className="text-secondary">Explore medical officers, OPD timings, generic pharmacy discounts, 108 emergency ambulance pickup, and upcoming health checkup camps.</p>
        </div>

        <div className="card border-0 shadow-sm p-4 mb-4 rounded-4 bg-white">
          <div className="d-flex align-items-center gap-3">
            <label className="fw-bold small text-uppercase text-secondary mb-0">Facility Type:</label>
            <select className="form-select w-auto bg-light" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              {types.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner message="Loading health services..." />
        ) : (
          <div className="row g-4">
            {healthServices.map((facility) => (
              <div key={facility._id} className="col-lg-6">
                <div className="card smart-card border-0 p-4 h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className="badge bg-danger">{facility.serviceType}</span>
                      <span className="badge bg-success rounded-pill"><i className="fa-solid fa-phone me-1"></i> Emergency: {facility.emergencyNumber}</span>
                    </div>
                    <h4 className="fw-bold text-dark mb-1">{facility.name}</h4>
                    <p className="text-secondary small mb-3"><i className="fa-solid fa-location-dot me-1 text-danger"></i>{facility.address}</p>
                    
                    <div className="bg-light p-3 rounded-3 small mb-3">
                      <div className="mb-1"><strong className="text-dark">Doctor / Medical Officer:</strong> {facility.doctorInCharge}</div>
                      <div className="mb-1"><strong className="text-dark">Timing:</strong> {facility.timing}</div>
                      <div className="mb-1"><strong className="text-dark">Services:</strong> {facility.servicesOffered}</div>
                      {facility.healthCamps && <div><strong className="text-dark">Special Camps:</strong> {facility.healthCamps}</div>}
                    </div>
                  </div>

                  <a href={`tel:${facility.contactNumber}`} className="btn btn-outline-danger btn-sm w-100 fw-bold">
                    <i className="fa-solid fa-phone me-2"></i> Call Facility ({facility.contactNumber})
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Health;
