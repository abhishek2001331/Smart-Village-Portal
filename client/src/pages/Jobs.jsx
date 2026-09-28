import React, { useState, useEffect } from 'react';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchJobs();
  }, [search]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await api.get('/jobs', { params: { search } });
      setJobs(res.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        <div className="mb-4">
          <span className="badge bg-warning text-dark px-3 py-2 rounded-pill text-uppercase mb-2">Employment Portal</span>
          <h2 className="fw-extrabold text-dark">Local Jobs & Employment Opportunities</h2>
          <p className="text-secondary">Explore rural apprenticeship, contractual positions, Anganwadi helper, computer operator, and MGNREGA openings.</p>
        </div>

        <div className="card border-0 shadow-sm p-4 mb-4 rounded-4 bg-white">
          <input
            type="text"
            className="form-control bg-light"
            placeholder="Search jobs by title, organization, or qualification..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <LoadingSpinner message="Fetching job vacancies..." />
        ) : jobs.length === 0 ? (
          <div className="alert alert-info p-5 text-center rounded-4 shadow-sm">
            <h5>No current job openings match your query</h5>
          </div>
        ) : (
          <div className="row g-4">
            {jobs.map((job) => (
              <div key={job._id} className="col-lg-6">
                <div className="card smart-card border-0 p-4 h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className="badge bg-primary">{job.jobType}</span>
                      <span className="badge bg-success rounded-pill">{job.status}</span>
                    </div>
                    <h4 className="fw-bold text-dark mb-1">{job.jobTitle}</h4>
                    <h6 className="text-secondary small mb-3"><i className="fa-solid fa-building me-1"></i>{job.organization}</h6>
                    <p className="text-secondary small mb-3">{job.description}</p>
                    
                    <div className="bg-light p-3 rounded-3 small mb-3">
                      <div className="mb-1"><strong className="text-dark">Qualification:</strong> {job.qualification}</div>
                      <div className="mb-1"><strong className="text-dark">Salary/Wages:</strong> <span className="text-success fw-bold">{job.salary}</span></div>
                      <div><strong className="text-dark">Application Deadline:</strong> {new Date(job.lastDate).toLocaleDateString()}</div>
                    </div>
                  </div>

                  <a href={job.applicationLink} target="_blank" rel="noopener noreferrer" className="btn btn-warning fw-bold text-dark w-100">
                    Apply for Position <i className="fa-solid fa-paper-plane ms-1"></i>
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

export default Jobs;
