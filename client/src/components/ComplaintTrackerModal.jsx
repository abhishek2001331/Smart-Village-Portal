import React, { useState } from 'react';
import api from '../services/api';

const ComplaintTrackerModal = ({ show, onClose }) => {
  const [ticketId, setTicketId] = useState('');
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!show) return null;

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!ticketId.trim()) return;

    setLoading(true);
    setError('');
    setComplaint(null);

    try {
      const res = await api.get(`/complaints/track/${ticketId.trim()}`);
      setComplaint(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'No complaint found with this Ticket ID');
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

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow">
          <div className="modal-header bg-navy text-white" style={{ backgroundColor: '#0B2545' }}>
            <h5 className="modal-title fw-bold text-white">
              <i className="fa-solid fa-magnifying-glass-location me-2 text-warning"></i>
              Track Complaint Ticket
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body p-4">
            <form onSubmit={handleTrack} className="mb-4">
              <label className="form-label fw-semibold text-dark">Enter Ticket ID:</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="e.g. CMP-20260913-W892"
                  value={ticketId}
                  onChange={(e) => setTicketId(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-warning fw-bold text-dark px-4" disabled={loading}>
                  {loading ? (
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  ) : (
                    <i className="fa-solid fa-search me-2"></i>
                  )}
                  Search Status
                </button>
              </div>
            </form>

            {error && (
              <div className="alert alert-danger d-flex align-items-center" role="alert">
                <i className="fa-solid fa-circle-exclamation me-2 fs-5"></i>
                <div>{error}</div>
              </div>
            )}

            {complaint && (
              <div className="card border-0 bg-light p-4 rounded-3 shadow-sm">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <span className="badge bg-secondary mb-2">{complaint.category}</span>
                    <h5 className="fw-bold text-dark mb-1">{complaint.subject}</h5>
                    <div className="small text-muted">
                      Ticket ID: <strong className="text-primary">{complaint.complaintId}</strong> | Submitted: {new Date(complaint.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <span className={`badge rounded-pill ${getBadgeClass(complaint.status)} fs-6`}>
                    {complaint.status}
                  </span>
                </div>

                <div className="row g-3 mb-3 small">
                  <div className="col-md-6">
                    <strong className="text-dark">Applicant Name:</strong> {complaint.citizenName}
                  </div>
                  <div className="col-md-6">
                    <strong className="text-dark">Location:</strong> {complaint.location}
                  </div>
                  <div className="col-md-6">
                    <strong className="text-dark">Priority:</strong> <span className={`fw-bold text-${complaint.priority === 'Urgent' ? 'danger' : 'dark'}`}>{complaint.priority}</span>
                  </div>
                  <div className="col-md-6">
                    <strong className="text-dark">Last Updated:</strong> {new Date(complaint.updatedAt).toLocaleString()}
                  </div>
                </div>

                <div className="mb-3">
                  <h6 className="fw-bold text-dark mb-1 small text-uppercase">Description:</h6>
                  <p className="small text-secondary bg-white p-3 rounded border mb-0">{complaint.description}</p>
                </div>

                {complaint.adminResponse ? (
                  <div className="alert alert-success border-0 mb-0">
                    <h6 className="fw-bold mb-1 text-success"><i className="fa-solid fa-user-shield me-2"></i>Panchayat Administration Remark:</h6>
                    <p className="small mb-0 text-dark">{complaint.adminResponse}</p>
                  </div>
                ) : (
                  <div className="alert alert-info border-0 mb-0 small">
                    <i className="fa-solid fa-clock me-2"></i>Your grievance has been routed to the relevant ward supervisor. An official status update will appear here once reviewed.
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="modal-footer bg-light">
            <button type="button" className="btn btn-secondary px-4" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintTrackerModal;
