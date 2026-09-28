import React, { useState, useEffect } from 'react';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Emergency = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await api.get('/emergency');
        setContacts(res.data);
      } catch (err) {
        console.error('Error fetching emergency contacts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        <div className="mb-4 text-center">
          <span className="badge bg-danger px-3 py-2 rounded-pill text-uppercase mb-2">24x7 Public Safety & Rescue</span>
          <h2 className="fw-extrabold text-dark">Emergency Contact Numbers & Helplines</h2>
          <p className="text-secondary">Instant click-to-call emergency directory for Kalyanpur Gram Panchayat residents.</p>
        </div>

        {loading ? (
          <LoadingSpinner message="Fetching emergency contacts..." />
        ) : (
          <div className="row g-4">
            {contacts.map((c) => (
              <div key={c._id} className="col-md-6 col-lg-4">
                <div className="card smart-card border-0 p-4 h-100 border-start border-4 border-danger">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-secondary">{c.availability}</span>
                    <i className="fa-solid fa-phone-volume text-danger fs-4"></i>
                  </div>
                  <h5 className="fw-bold text-dark mb-1">{c.department}</h5>
                  <h6 className="text-secondary small mb-3"><i className="fa-solid fa-user me-1"></i>{c.contactPerson}</h6>
                  
                  {c.address && <p className="small text-muted mb-3"><i className="fa-solid fa-location-dot me-1"></i>{c.address}</p>}

                  <div className="d-grid gap-2">
                    <a href={`tel:${c.phoneNumber}`} className="btn btn-danger font-bold text-white fw-bold">
                      <i className="fa-solid fa-phone me-2"></i> Call {c.phoneNumber}
                    </a>
                    {c.alternatePhone && (
                      <a href={`tel:${c.alternatePhone}`} className="btn btn-outline-secondary btn-sm">
                        Alt: {c.alternatePhone}
                      </a>
                    )}
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

export default Emergency;
