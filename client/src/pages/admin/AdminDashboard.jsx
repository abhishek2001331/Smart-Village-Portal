import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import StatCard from '../../components/StatCard';
import LoadingSpinner from '../../components/LoadingSpinner';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/dashboard');
      setStats(res.data);
    } catch (err) {
      console.error('Error fetching admin stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner message="Generating analytical dashboard & metrics..." />;
  if (!stats) return <div className="p-5 text-center alert alert-danger">Failed to load admin stats.</div>;

  const { summary, charts } = stats;

  // Chart 1: Category Doughnut Chart
  const categoryChartData = {
    labels: charts.complaintsByCategory.labels,
    datasets: [
      {
        label: 'Complaints',
        data: charts.complaintsByCategory.data,
        backgroundColor: ['#0B2545', '#134074', '#EE9B00', '#FF9933', '#138808', '#DC2626', '#2563EB', '#9333EA', '#64748B']
      }
    ]
  };

  // Chart 2: Status Bar Chart
  const statusBarData = {
    labels: charts.complaintsByStatus.labels,
    datasets: [
      {
        label: 'Number of Grievances',
        data: charts.complaintsByStatus.data,
        backgroundColor: ['#D97706', '#2563EB', '#16A34A', '#DC2626']
      }
    ]
  };

  // Chart 3: Monthly Trend Line Chart
  const trendLineData = {
    labels: charts.monthlyTrend.map(m => m.month),
    datasets: [
      {
        label: 'Monthly Grievance Filings',
        data: charts.monthlyTrend.map(m => m.count),
        borderColor: '#134074',
        backgroundColor: 'rgba(19, 64, 116, 0.15)',
        fill: true,
        tension: 0.3
      }
    ]
  };

  return (
    <div className="py-4 bg-light min-vh-100">
      <div className="container-fluid px-4">
        {/* Header */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
          <div>
            <span className="badge bg-danger px-3 py-1 rounded-pill text-uppercase mb-1">Super Admin Control Center</span>
            <h2 className="fw-extrabold text-navy mb-0" style={{ color: '#0B2545' }}>Smart Village Analytics & Administration</h2>
          </div>
          <div className="d-flex gap-2">
            <Link to="/admin/complaints" className="btn btn-navy text-white fw-bold px-3" style={{ backgroundColor: '#0B2545' }}>
              <i className="fa-solid fa-list-check me-2"></i> Manage Complaints
            </Link>
            <Link to="/admin/schemes" className="btn btn-warning fw-bold text-dark px-3">
              <i className="fa-solid fa-hand-holding-heart me-2"></i> Manage Schemes
            </Link>
          </div>
        </div>

        {/* 8 Stat Cards Grid */}
        <div className="row g-3 mb-4">
          <div className="col-xl-3 col-md-6">
            <StatCard title="Registered Citizens" value={summary.totalCitizens} icon="fa-users" color="primary" />
          </div>
          <div className="col-xl-3 col-md-6">
            <StatCard title="Total Complaints" value={summary.totalComplaints} icon="fa-clipboard-list" color="info" />
          </div>
          <div className="col-xl-3 col-md-6">
            <StatCard title="Pending Review" value={summary.pendingComplaints} icon="fa-clock" color="warning" />
          </div>
          <div className="col-xl-3 col-md-6">
            <StatCard title="Resolved Grievances" value={summary.resolvedComplaints} icon="fa-circle-check" color="success" />
          </div>
          <div className="col-xl-3 col-md-6">
            <StatCard title="In Progress" value={summary.inProgressComplaints} icon="fa-spinner" color="primary" />
          </div>
          <div className="col-xl-3 col-md-6">
            <StatCard title="Total Schemes" value={summary.totalSchemes} icon="fa-handshake-angle" color="success" />
          </div>
          <div className="col-xl-3 col-md-6">
            <StatCard title="Public Notices" value={summary.totalAnnouncements} icon="fa-bullhorn" color="warning" />
          </div>
          <div className="col-xl-3 col-md-6">
            <StatCard title="Job Openings" value={summary.totalJobs} icon="fa-briefcase" color="info" />
          </div>
        </div>

        {/* Analytical Charts Row */}
        <div className="row g-4 mb-4">
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
              <h5 className="fw-bold text-dark mb-3">Complaints by Category</h5>
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '260px' }}>
                <Doughnut data={categoryChartData} options={{ responsive: true, maintainAspectRatio: true }} />
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
              <h5 className="fw-bold text-dark mb-3">Resolution Lifecycle Status</h5>
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '260px' }}>
                <Bar data={statusBarData} options={{ responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false } } }} />
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
              <h5 className="fw-bold text-dark mb-3">Monthly Grievance Filing Trend</h5>
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '260px' }}>
                <Line data={trendLineData} options={{ responsive: true, maintainAspectRatio: true }} />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Management Shortcuts */}
        <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
          <h5 className="fw-bold text-dark mb-3">Administrative Management Modules</h5>
          <div className="row g-3">
            <div className="col-md-3">
              <Link to="/admin/complaints" className="card border p-3 text-decoration-none text-dark smart-card">
                <i className="fa-solid fa-list-check fs-3 text-primary mb-2"></i>
                <div className="fw-bold">Manage Complaints</div>
                <div className="small text-muted">Update status & remarks</div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/admin/citizens" className="card border p-3 text-decoration-none text-dark smart-card">
                <i className="fa-solid fa-users-gear fs-3 text-success mb-2"></i>
                <div className="fw-bold">Manage Citizens</div>
                <div className="small text-muted">View citizen registry</div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/admin/schemes" className="card border p-3 text-decoration-none text-dark smart-card">
                <i className="fa-solid fa-hand-holding-heart fs-3 text-warning mb-2"></i>
                <div className="fw-bold">Manage Schemes</div>
                <div className="small text-muted">Add / edit welfare schemes</div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/admin/announcements" className="card border p-3 text-decoration-none text-dark smart-card">
                <i className="fa-solid fa-bullhorn fs-3 text-danger mb-2"></i>
                <div className="fw-bold">Manage Notices</div>
                <div className="small text-muted">Publish public announcements</div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/admin/jobs" className="card border p-3 text-decoration-none text-dark smart-card">
                <i className="fa-solid fa-briefcase fs-3 text-info mb-2"></i>
                <div className="fw-bold">Manage Jobs</div>
                <div className="small text-muted">Post local vacancies</div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/admin/services" className="card border p-3 text-decoration-none text-dark smart-card">
                <i className="fa-solid fa-gears fs-3 text-secondary mb-2"></i>
                <div className="fw-bold">Village Services</div>
                <div className="small text-muted">Update utility status</div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/admin/health" className="card border p-3 text-decoration-none text-dark smart-card">
                <i className="fa-solid fa-hospital fs-3 text-danger mb-2"></i>
                <div className="fw-bold">Health Services</div>
                <div className="small text-muted">Manage PHCs & doctors</div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/admin/agriculture" className="card border p-3 text-decoration-none text-dark smart-card">
                <i className="fa-solid fa-wheat-awn fs-3 text-success mb-2"></i>
                <div className="fw-bold">Agriculture & Mandi</div>
                <div className="small text-muted">Update Kisan advisories</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
