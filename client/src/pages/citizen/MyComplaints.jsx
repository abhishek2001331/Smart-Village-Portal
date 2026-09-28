import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    fetchMyComplaints();
  }, []);

  const fetchMyComplaints = async () => {
    try {
      setLoading(true);
      const res = await api.get('/complaints/my');
      setComplaints(res.data);
    } catch (err) {
      console.error('Error fetching my complaints:', err);
    } finally {
      setLoading(false);
    }
  };

  const getBadgeClass = (status) => {
    switch (status) {
      case 'Pending': return 'badge-pending';
      case 'In Progress': return 'badge-in-progress';
      case 'Resolved': return 'badge-resolved';
      case 'Rejected': return 'badge-rejected';
      default: return 'bg-secondary';
    }
  };

  const filtered = filterStatus === 'All'
    ? complaints
    : complaints.filter(c => c.status === filterStatus);

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
          <div>
            <h3 className="fw-extrabold text-navy" style={{ color: '#0B2545' }}>My Complaint History</h3>
            <p className="text-secondary small mb-0">Track all grievances filed by you with Panchayat administration.</p>
          </div>
          <Link to="/citizen/submit-complaint" className="btn btn-warning fw-bold text-dark rounded-pill px-4">
            <i className="fa-solid fa-plus me-2"></i> Submit New Complaint
          </Link>
        </div>

        {/* Filter bar */}
        <div className="card border-0 shadow-sm p-3 mb-4 rounded-4 bg-white">
          <div className="d-flex align-items-center gap-3">
            <label className="fw-semibold small text-secondary mb-0">Status Filter:</label>
            <select className="form-select w-auto bg-light" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="All">All Complaints</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner message="Fetching your grievances..." />
        ) : filtered.length === 0 ? (
          <div className="alert alert-light border p-5 text-center rounded-4 shadow-sm">
            <i className="fa-solid fa-folder-open fs-1 text-primary mb-3"></i>
            <h5>No complaints found for status "{filterStatus}"</h5>
          </div>
        ) : (
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light small text-uppercase">
                  <tr>
                    <th>Ticket ID</th>
                    <th>Category</th>
                    <th>Subject</th>
                    <th>Location</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Submitted</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item) => (
                    <tr key={item._id}>
                      <td><strong className="text-primary">{item.complaintId}</strong></td>
                      <td><span className="badge bg-secondary">{item.category}</span></td>
                      <td className="fw-semibold">{item.subject}</td>
                      <td className="small text-muted">{item.location}</td>
                      <td>
                        <span className={`badge ${item.priority === 'Urgent' ? 'bg-danger' : 'bg-light text-dark border'}`}>
                          {item.priority}
                        </span>
                      </td>
                      <td>
                        <span className={`badge rounded-pill ${getBadgeClass(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="small text-muted">{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td>
                        <Link to={`/citizen/complaint/${item._id}`} className="btn btn-sm btn-outline-dark">
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyComplaints;
