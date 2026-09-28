import React, { useState, useEffect } from 'react';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    fetchServices();
  }, [statusFilter]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const params = {};
      if (statusFilter !== 'All') params.status = statusFilter;
      const res = await api.get('/services', { params });
      setServices(res.data);
    } catch (err) {
      console.error('Error fetching village services:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Available': return 'bg-success';
      case 'Partially Available': return 'bg-warning text-dark';
      case 'Unavailable': return 'bg-danger';
      case 'Under Maintenance': return 'bg-info text-dark';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        <div className="mb-4">
          <span className="badge bg-primary px-3 py-2 rounded-pill text-uppercase mb-2">Public Infrastructure & Utility Services</span>
          <h2 className="fw-extrabold text-dark">Gram Panchayat Public Services Status</h2>
          <p className="text-secondary">Real-time status updates on drinking water supply, village electricity grid, BharatNet Wi-Fi, waste management, and revenue certificates.</p>
        </div>

        <div className="card border-0 shadow-sm p-4 mb-4 rounded-4 bg-white">
          <div className="d-flex align-items-center gap-3">
            <label className="fw-bold small text-uppercase text-secondary mb-0">Filter by Operational Status:</label>
            <select className="form-select w-auto bg-light" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All Services</option>
              <option value="Available">Available</option>
              <option value="Partially Available">Partially Available</option>
              <option value="Under Maintenance">Under Maintenance</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner message="Checking village utility status..." />
        ) : (
          <div className="row g-4">
            {services.map((service) => (
              <div key={service._id} className="col-md-6 col-lg-4">
                <div className="card smart-card border-0 p-4 h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className="badge bg-secondary">{service.department}</span>
                      <span className={`badge ${getStatusBadge(service.status)} rounded-pill`}>
                        {service.status}
                      </span>
                    </div>
                    <h5 className="fw-bold text-dark mb-1">{service.serviceName}</h5>
                    {service.serviceNameHi && <h6 className="text-primary small mb-3">{service.serviceNameHi}</h6>}
                    <p className="text-secondary small mb-3">{service.description}</p>
                    
                    <div className="bg-light p-3 rounded-3 small mb-3">
                      <div className="mb-1"><strong>Fees:</strong> {service.fees}</div>
                      <div className="mb-1"><strong>Processing Time:</strong> {service.processingTime}</div>
                      <div><strong>Officer Contact:</strong> {service.contactPerson}</div>
                    </div>
                  </div>

                  <a href={service.formLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline-navy btn-sm border-dark text-dark w-100">
                    Service Portal / Application <i className="fa-solid fa-up-right-from-square ms-1"></i>
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

export default Services;
