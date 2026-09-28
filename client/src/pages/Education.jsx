import React, { useState, useEffect } from 'react';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Education = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await api.get('/schools');
        setSchools(res.data);
      } catch (err) {
        console.error('Error fetching schools:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSchools();
  }, []);

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        <div className="mb-4">
          <span className="badge bg-primary px-3 py-2 rounded-pill text-uppercase mb-2">Education & Literacy</span>
          <h2 className="fw-extrabold text-dark">Gram Panchayat Schools & Learning Centers</h2>
          <p className="text-secondary">Government secondary schools, Kasturba Gandhi Balika Vidyalaya, and Anganwadi centers with headmaster contact details and facilities.</p>
        </div>

        {loading ? (
          <LoadingSpinner message="Fetching educational facilities..." />
        ) : (
          <div className="row g-4">
            {schools.map((school) => (
              <div key={school._id} className="col-lg-6">
                <div className="card smart-card border-0 p-4 h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className="badge bg-primary">Co-Education / Residential</span>
                      <span className="badge bg-info text-dark rounded-pill"><i className="fa-solid fa-graduation-cap me-1"></i> Students: {school.totalStudents}</span>
                    </div>
                    <h4 className="fw-bold text-dark mb-1">{school.schoolName}</h4>
                    <p className="text-secondary small mb-3"><i className="fa-solid fa-location-dot me-1 text-primary"></i>{school.address}</p>
                    
                    <div className="bg-light p-3 rounded-3 small mb-3">
                      <div className="mb-1"><strong className="text-dark">Headmaster / Principal:</strong> {school.headmaster}</div>
                      <div className="mb-1"><strong className="text-dark">Classes Available:</strong> {school.availableClasses}</div>
                      <div className="mb-1"><strong className="text-dark">Facilities:</strong> {school.facilities}</div>
                      <div><strong className="text-dark">Announcements:</strong> {school.announcements}</div>
                    </div>
                  </div>

                  <a href={`tel:${school.contactPhone}`} className="btn btn-outline-primary btn-sm w-100 fw-bold">
                    <i className="fa-solid fa-phone me-2"></i> Contact Headmaster ({school.contactPhone})
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

export default Education;
