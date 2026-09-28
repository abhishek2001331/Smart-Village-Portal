import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const ComplaintDetails = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await api.get(`/complaints/${id}`);
        setComplaint(res.data);
      } catch (err) {
        console.error('Error loading complaint detail:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <LoadingSpinner message="Fetching complaint detail..." />;
  if (!complaint) return (
    <div className="container py-5 text-center">
      <h3>Complaint Record Not Found</h3>
      <Link to="/citizen/my-complaints" className="btn btn-primary mt-3">Back to My Complaints</Link>
    </div>
  );

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
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        <Link to="/citizen/my-complaints" className="btn btn-outline-secondary btn-sm mb-4">
          <i className="fa-solid fa-arrow-left me-2"></i>Back to My Complaints
        </Link>

        <div className="card border-0 shadow-lg p-4 p-md-5 rounded-4 bg-white">
          <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-3">
            <div>
              <span className="badge bg-secondary mb-2 me-2">{complaint.category}</span>
              <span className={`badge ${complaint.priority === 'Urgent' ? 'bg-danger' : 'bg-info text-dark'} mb-2`}>
                Priority: {complaint.priority}
              </span>
              <h3 className="fw-bold text-dark mb-1">{complaint.subject}</h3>
              <div className="small text-muted">
                Ticket ID: <strong className="text-primary fs-6">{complaint.complaintId}</strong> | Date: {new Date(complaint.createdAt).toLocaleString()}
              </div>
            </div>
            <span className={`badge rounded-pill fs-6 ${getBadgeClass(complaint.status)} px-3 py-2`}>
              Status: {complaint.status}
            </span>
          </div>

          <hr />

          <div className="row g-3 mb-4 small">
            <div className="col-md-6">
              <strong className="text-dark">Applicant Name:</strong> {complaint.citizenName}
            </div>
            <div className="col-md-6">
              <strong className="text-dark">Contact Phone:</strong> {complaint.phone}
            </div>
            <div className="col-md-6">
              <strong className="text-dark">Problem Location:</strong> {complaint.location}
            </div>
            <div className="col-md-6">
              <strong className="text-dark">Last Updated:</strong> {new Date(complaint.updatedAt).toLocaleString()}
            </div>
          </div>

          <div className="mb-4">
            <h6 className="fw-bold text-dark mb-2 text-uppercase">Full Grievance Description:</h6>
            <div className="bg-light p-4 rounded-3 text-secondary border">
              {complaint.description}
            </div>
          </div>

          {complaint.adminResponse ? (
            <div className="alert alert-success border-0 p-4 rounded-4">
              <h5 className="fw-bold text-success mb-2">
                <i className="fa-solid fa-user-shield me-2"></i>Official Admin Resolution & Remarks:
              </h5>
              <p className="mb-0 text-dark fs-6">{complaint.adminResponse}</p>
            </div>
          ) : (
            <div className="alert alert-info border-0 p-3 rounded-3 small">
              <i className="fa-solid fa-circle-info me-2"></i>
              Your grievance has been received and assigned to the Ward Officer. Status updates will be posted here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetails;
