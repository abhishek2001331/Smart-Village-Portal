import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const ManageComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  // Selected complaint for modal status update
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [statusInput, setStatusInput] = useState('');
  const [remarkInput, setRemarkInput] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    fetchComplaints();
  }, [categoryFilter, statusFilter, search]);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const params = {};
      if (categoryFilter !== 'All') params.category = categoryFilter;
      if (statusFilter !== 'All') params.status = statusFilter;
      if (search) params.search = search;

      const res = await api.get('/complaints/all', { params });
      setComplaints(res.data);
    } catch (err) {
      console.error('Error fetching admin complaints:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (complaint) => {
    setSelectedComplaint(complaint);
    setStatusInput(complaint.status);
    setRemarkInput(complaint.adminResponse || '');
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!selectedComplaint) return;

    setUpdateLoading(true);
    try {
      await api.put(`/complaints/${selectedComplaint._id}/status`, {
        status: statusInput,
        adminResponse: remarkInput
      });
      setSelectedComplaint(null);
      fetchComplaints();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update complaint status.');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this complaint record?')) {
      try {
        await api.delete(`/complaints/${id}`);
        fetchComplaints();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete complaint.');
      }
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
    <div className="py-4 bg-light min-vh-100">
      <div className="container-fluid px-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-extrabold text-navy" style={{ color: '#0B2545' }}>Complaints Management Portal</h3>
            <p className="text-secondary small mb-0">Review citizen grievances, assign priorities, update resolution status, and issue official admin responses.</p>
          </div>
        </div>

        {/* Filters */}
        <div className="card border-0 shadow-sm p-4 mb-4 rounded-4 bg-white">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label small text-uppercase text-secondary fw-semibold">Search Ticket / Subject / Citizen:</label>
              <input
                type="text"
                className="form-control bg-light"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small text-uppercase text-secondary fw-semibold">Category Filter:</label>
              <select className="form-select bg-light" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="All">All Categories</option>
                <option value="Water">Water</option>
                <option value="Electricity">Electricity</option>
                <option value="Roads">Roads</option>
                <option value="Sanitation">Sanitation</option>
                <option value="Street Lights">Street Lights</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label small text-uppercase text-secondary fw-semibold">Status Filter:</label>
              <select className="form-select bg-light" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Complaints Table */}
        {loading ? (
          <LoadingSpinner message="Fetching complaints database..." />
        ) : (
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light small text-uppercase">
                  <tr>
                    <th>Ticket ID</th>
                    <th>Citizen Name</th>
                    <th>Category</th>
                    <th>Subject</th>
                    <th>Location</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Submitted On</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((item) => (
                    <tr key={item._id}>
                      <td><strong className="text-primary">{item.complaintId}</strong></td>
                      <td>
                        <div className="fw-semibold">{item.citizenName}</div>
                        <small className="text-muted">{item.phone}</small>
                      </td>
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
                        <button className="btn btn-sm btn-warning fw-bold text-dark me-2" onClick={() => handleOpenModal(item)}>
                          <i className="fa-solid fa-pen-to-square me-1"></i> Update
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item._id)}>
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal for updating complaint status & remarks */}
      {selectedComplaint && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow">
              <div className="modal-header bg-navy text-white" style={{ backgroundColor: '#0B2545' }}>
                <h5 className="modal-title fw-bold text-white">
                  Update Grievance Status: {selectedComplaint.complaintId}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setSelectedComplaint(null)}></button>
              </div>
              <form onSubmit={handleUpdateStatus}>
                <div className="modal-body p-4">
                  <div className="bg-light p-3 rounded-3 mb-3 small">
                    <div><strong>Citizen:</strong> {selectedComplaint.citizenName} ({selectedComplaint.phone})</div>
                    <div><strong>Category:</strong> {selectedComplaint.category} | <strong>Location:</strong> {selectedComplaint.location}</div>
                    <div className="mt-2"><strong>Description:</strong> {selectedComplaint.description}</div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold text-dark">Update Status:</label>
                    <select
                      className="form-select bg-light"
                      value={statusInput}
                      onChange={(e) => setStatusInput(e.target.value)}
                      required
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold text-dark">Panchayat Official Remark / Response:</label>
                    <textarea
                      rows="4"
                      className="form-control bg-light"
                      placeholder="Write action taken details, technician notes, or resolution confirmation..."
                      value={remarkInput}
                      onChange={(e) => setRemarkInput(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="modal-footer bg-light">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedComplaint(null)}>Cancel</button>
                  <button type="submit" className="btn btn-warning fw-bold text-dark px-4" disabled={updateLoading}>
                    {updateLoading ? 'Saving...' : 'Save & Publish Status Update'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageComplaints;
