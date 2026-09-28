import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { LanguageContext } from '../context/LanguageContext';
import StatCard from '../components/StatCard';
import ComplaintTrackerModal from '../components/ComplaintTrackerModal';

const Home = () => {
  const { t } = useContext(LanguageContext);
  const [announcements, setAnnouncements] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [services, setServices] = useState([]);
  const [showTrackerModal, setShowTrackerModal] = useState(false);
  const [ticketInput, setTicketInput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [annRes, schemeRes, serviceRes] = await Promise.all([
          api.get('/announcements'),
          api.get('/schemes'),
          api.get('/services')
        ]);
        setAnnouncements(annRes.data.slice(0, 4));
        setSchemes(schemeRes.data.slice(0, 4));
        setServices(serviceRes.data.slice(0, 4));
      } catch (err) {
        console.error('Failed to load home page data:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-banner">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <span className="badge bg-warning text-dark fw-bold px-3 py-2 rounded-pill mb-3 text-uppercase">
                <i className="fa-solid fa-circle-check me-2"></i> Official Digital Panchayat Portal
              </span>
              <h1 className="fw-extrabold display-5 mb-3 text-white">
                {t('heroTitle')}
              </h1>
              <p className="lead text-light mb-4 opacity-90">
                {t('heroSubtitle')}
              </p>
              
              <div className="d-flex flex-wrap gap-3 mb-4">
                <button
                  className="btn btn-warning btn-lg fw-bold text-dark rounded-pill px-4"
                  onClick={() => setShowTrackerModal(true)}
                >
                  <i className="fa-solid fa-magnifying-glass me-2"></i>
                  {t('trackComplaintBtn')}
                </button>
                <Link to="/citizen/submit-complaint" className="btn btn-outline-light btn-lg fw-bold rounded-pill px-4">
                  <i className="fa-solid fa-file-pen me-2"></i>
                  {t('submitComplaintBtn')}
                </Link>
                <Link to="/schemes" className="btn btn-light btn-lg text-navy fw-bold rounded-pill px-4" style={{ color: '#0B2545' }}>
                  <i className="fa-solid fa-hand-holding-hand me-2"></i>
                  {t('exploreSchemesBtn')}
                </Link>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="card border-0 shadow-lg p-4 bg-white text-dark rounded-4">
                <h5 className="fw-bold text-navy mb-3 d-flex align-items-center" style={{ color: '#0B2545' }}>
                  <i className="fa-solid fa-ticket text-warning me-2 fs-4"></i>
                  Quick Complaint Status Search
                </h5>
                <p className="small text-muted mb-3">
                  Panchayat residents can instantly check their complaint resolution status by entering their unique ticket ID below.
                </p>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg border-2"
                    placeholder="e.g. CMP-20260913-W892"
                    value={ticketInput}
                    onChange={(e) => setTicketInput(e.target.value)}
                  />
                  <button
                    className="btn btn-primary fw-bold px-4"
                    style={{ backgroundColor: '#0B2545', borderColor: '#0B2545' }}
                    onClick={() => setShowTrackerModal(true)}
                  >
                    Track
                  </button>
                </div>
                <div className="d-flex justify-content-between small text-secondary">
                  <span><i className="fa-solid fa-shield-halved me-1 text-success"></i> 24x7 Online Tracking</span>
                  <span><i className="fa-solid fa-building-columns me-1 text-primary"></i> Direct Redressal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Statistics Bar */}
      <section className="py-5 bg-white border-bottom">
        <div className="container">
          <div className="text-center mb-4">
            <h3 className="section-title">{t('quickStats')}</h3>
          </div>
          <div className="row g-4">
            <div className="col-md-3 col-6">
              <StatCard title={t('registeredCitizens')} value="1,240+" icon="fa-users" color="primary" subtitle="Verified Gram Residents" />
            </div>
            <div className="col-md-3 col-6">
              <StatCard title={t('totalComplaints')} value="385" icon="fa-file-circle-check" color="warning" subtitle="Submitted Tickets" />
            </div>
            <div className="col-md-3 col-6">
              <StatCard title={t('resolvedIssues')} value="342" icon="fa-circle-check" color="success" subtitle="88.8% Resolution Rate" />
            </div>
            <div className="col-md-3 col-6">
              <StatCard title={t('activeSchemes')} value="24" icon="fa-hand-holding-heart" color="info" subtitle="Central & State Schemes" />
            </div>
          </div>
        </div>
      </section>

      {/* Urgent Notices Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h3 className="section-title mb-1">{t('urgentAnnouncements')}</h3>
              <p className="text-muted small mb-0">Official updates broadcast by Kalyanpur Gram Panchayat administration.</p>
            </div>
            <Link to="/announcements" className="btn btn-outline-primary rounded-pill fw-bold btn-sm px-3">
              {t('viewAllNotices')} <i className="fa-solid fa-arrow-right ms-1"></i>
            </Link>
          </div>

          <div className="row g-4">
            {announcements.map((item) => (
              <div key={item._id} className="col-md-6 col-lg-3">
                <div className="card h-100 smart-card border-0">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className={`badge ${item.isUrgent ? 'bg-danger' : 'bg-primary'} rounded-pill`}>
                        {item.category}
                      </span>
                      <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                        {new Date(item.publishedDate).toLocaleDateString()}
                      </small>
                    </div>
                    <h5 className="card-title fw-bold text-dark fs-6 mb-2">{item.title}</h5>
                    <p className="card-text text-secondary small line-clamp-3 mb-3">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Government Schemes Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h3 className="section-title mb-1">{t('govtSchemesTitle')}</h3>
              <p className="text-muted small mb-0">Financial assistance, housing, healthcare, and agricultural support for rural households.</p>
            </div>
            <Link to="/schemes" className="btn btn-outline-navy rounded-pill fw-bold btn-sm px-3 border-dark text-dark">
              View All Schemes <i className="fa-solid fa-arrow-right ms-1"></i>
            </Link>
          </div>

          <div className="row g-4">
            {schemes.map((scheme) => (
              <div key={scheme._id} className="col-lg-6">
                <div className="card smart-card border-0 p-4 h-100">
                  <div className="d-flex align-items-start gap-3">
                    <div className="bg-warning bg-opacity-20 text-warning p-3 rounded-3 d-flex align-items-center justify-content-center" style={{ width: '56px', height: '56px', flexShrink: 0 }}>
                      <i className="fa-solid fa-handshake-angle fs-3 text-dark"></i>
                    </div>
                    <div>
                      <span className="badge bg-secondary mb-2">{scheme.category}</span>
                      <h5 className="fw-bold text-dark mb-2">{scheme.name}</h5>
                      <p className="text-secondary small mb-3">{scheme.description}</p>
                      <div className="bg-light p-3 rounded-3 mb-3 small">
                        <div className="mb-1"><strong className="text-dark">Benefits:</strong> {scheme.benefits}</div>
                        <div><strong className="text-dark">Eligibility:</strong> {scheme.eligibility}</div>
                      </div>
                      <Link to={`/schemes/${scheme._id}`} className="btn btn-sm btn-gov-primary me-2">
                        View Scheme Details
                      </Link>
                      <a href={scheme.officialLink} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-secondary">
                        Official Portal <i className="fa-solid fa-up-right-from-square ms-1"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Hotline Bar */}
      <section className="py-5 text-white" style={{ backgroundColor: '#07162C' }}>
        <div className="container">
          <div className="text-center mb-4">
            <h3 className="fw-bold text-white mb-2">{t('emergencyTitle')}</h3>
            <p className="text-light opacity-75 small">Click to dial immediate 24x7 emergency helpline services.</p>
          </div>
          <div className="row g-4 text-center">
            <div className="col-md-3 col-6">
              <a href="tel:112" className="card border-0 bg-danger text-white p-3 rounded-4 text-decoration-none shadow">
                <i className="fa-solid fa-shield-halved fs-1 mb-2"></i>
                <h6 className="fw-bold mb-1">{t('police')}</h6>
                <span className="fs-4 fw-extrabold">112</span>
              </a>
            </div>
            <div className="col-md-3 col-6">
              <a href="tel:108" className="card border-0 bg-success text-white p-3 rounded-4 text-decoration-none shadow">
                <i className="fa-solid fa-truck-medical fs-1 mb-2"></i>
                <h6 className="fw-bold mb-1">{t('ambulance')}</h6>
                <span className="fs-4 fw-extrabold">108</span>
              </a>
            </div>
            <div className="col-md-3 col-6">
              <a href="tel:101" className="card border-0 bg-warning text-dark p-3 rounded-4 text-decoration-none shadow">
                <i className="fa-solid fa-fire-extinguisher fs-1 mb-2"></i>
                <h6 className="fw-bold mb-1">{t('fire')}</h6>
                <span className="fs-4 fw-extrabold">101</span>
              </a>
            </div>
            <div className="col-md-3 col-6">
              <a href="tel:1090" className="card border-0 bg-primary text-white p-3 rounded-4 text-decoration-none shadow">
                <i className="fa-solid fa-person-breastfeeding fs-1 mb-2"></i>
                <h6 className="fw-bold mb-1">{t('womenHelpline')}</h6>
                <span className="fs-4 fw-extrabold">1090</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tracker Modal */}
      <ComplaintTrackerModal show={showTrackerModal} onClose={() => setShowTrackerModal(false)} />
    </div>
  );
};

export default Home;
