import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import StatCard from '../../components/StatCard';
import LoadingSpinner from '../../components/LoadingSpinner';

const CitizenDashboard = () => {
  const { user } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyComplaints = async () => {
      try {
        const res = await api.get('/complaints/my');
        setComplaints(res.data);
      } catch (err) {
        console.error('Error loading citizen complaints:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyComplaints();
  }, []);

  const getBadgeClass = (status) => {
    switch (status) {
      case 'Pending': return 'badge-pending';
      case 'In Progress': return 'badge-in-progress';
      case 'Resolved': return 'badge-resolved';
      case 'Rejected': return 'badge-rejected';
      default: return 'bg-secondary';
    }
  };

  const pendingCount = complaints.filter(c => c.status === 'Pending').length;
  const inProgressCount = complaints.filter(c => c.status === 'In Progress').length;
  const resolvedCount = complaints.filter(c => c.status === 'Resolved').length;

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        {/* Welcome Header */}
        <div className="card border-0 shadow-sm p-4 mb-4 rounded-4 bg-navy text-white" style={{ backgroundColor: '#0B2545' }}>
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div>
              <span className="badge bg-warning text-dark fw-bold px-3 py-1 rounded-pill mb-2 text-uppercase">Citizen Portal</span>
              <h2 className="fw-extrabold mb-1 text-white">Welcome, {user?.name}!</h2>
              <p className="small text-light opacity-90 mb-0">
                Gram Panchayat: <strong>{user?.village || 'Kalyanpur'}</strong> | {user?.wardNo || 'Ward 1'} | Mobile: {user?.phone || 'N/A'}
              </p>
            </div>
            <div className="d-flex gap-2">
              <Link to="/citizen/submit-complaint" className="btn btn-warning fw-bold text-dark px-4 rounded-pill">
                <i className="fa-solid fa-plus-circle me-2"></i> Submit Complaint
              </Link>
              <Link to="/citizen/profile" className="btn btn-outline-light px-4 rounded-pill">
                <i className="fa-solid fa-user-gear me-2"></i> Edit Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Counter Stats */}
        <div className="row g-4 mb-4">
          <div className="col-md-3 col-6">
            <StatCard title="Total Complaints" value={complaints.length} icon="fa-list-check" color="primary" />
          </div>
          <div className="col-md-3 col-6">
            <StatCard title="Pending Review" value={pendingCount} icon="fa-clock" color="warning" />
          </div>
          <div className="col-md-3 col-6">
            <StatCard title="In Progress" value={inProgressCount} icon="fa-spinner" color="info" />
          </div>
          <div className="col-md-3 col-6">
            <StatCard title="Resolved Issues" value={resolvedCount} icon="fa-circle-check" color="success" />
          </div>
        </div>

        {/* Recent Complaints Table */}
        <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold text-navy mb-0" style={{ color: '#0B2545' }}>My Submitted Complaints</h5>
            <Link to="/citizen/my-complaints" className="btn btn-outline-primary btn-sm rounded-pill">
              View All Complaints <i className="fa-solid fa-arrow-right ms-1"></i>
            </Link>
          </div>

          {loading ? (
            <LoadingSpinner message="Loading your filed grievances..." />
          ) : complaints.length === 0 ? (
            <div className="alert alert-light border p-5 text-center rounded-3">
              <i className="fa-solid fa-file-circle-plus fs-1 text-primary mb-3"></i>
              <h5>No complaints submitted yet</h5>
              <p className="small text-secondary mb-3">If you are facing water, electricity, road, or sanitation issues in your ward, file a complaint now.</p>
              <Link to="/citizen/submit-complaint" className="btn btn-warning fw-bold text-dark rounded-pill px-4">
                Submit New Complaint
              </Link>
            </div>
          ) : (
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
                    <th>Submitted On</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.slice(0, 5).map((item) => (
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
                          View Status
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;
